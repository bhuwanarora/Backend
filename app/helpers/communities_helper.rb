module CommunitiesHelper

	def self.handle_one_community community
		c_name = community['value']
		c_books = CommunitiesHelper.fetch_books_database_net(c_name)
		book_name,authors = (c_books[c_name]).transpose
		output = {}
		if CommunitiesHelper.has_required_book_count(book_name)	
			output[:book] = c_books
			output[:relevance] = {'relevance' => community['relevance'],
						'relevanceOriginal' => community['relevanceOriginal']}
			community_google_content = GoogleSearchHelper.search_multiple_types(c_name, 
				[GoogleSearchHelper::SearchTypes[:video]])
			c_videos = community_google_content[GoogleSearchHelper::SearchTypes[:video]]
			if c_videos.present?
				output[:video] = c_videos
			end
		end
		output		
	end

	def self.create news_metadata
		begin
			if(news_metadata["available"]==false)
				return
			end
			communities_books = []		
			relevance = []	 # This is the relevance which we will use
			communities_videos = {}
			communities_web_urls = {}	
			response = NewsHelper.fetch_tags news_metadata["news_link"]
			debugger
			puts response.red
			if response.is_json? 
				response = JSON.parse(response)			
				communities = CommunitiesHelper.handle_communities response
				skip = 10000
				debugger
				timer = communities.length * skip -1
				for i in 0..timer do
					if (i % skip) == 0
						output = self.handle_one_community communities[i/skip]
						if output.present?
							community_name = communities[i/skip]['value']
							communities_books << output[:book]
							relevance << output[:relevance]
							communities_videos[community_name] = output[:video]
							communities_web_urls[community_name] = communities[i/skip]['url_list']
							debugger
						end
					end
				end			
				unless communities_books.blank?
					news_id = News.create(news_metadata).execute[0]["news_id"]
					news_metadata["news_id"] = news_id
					params = {:type => "News", :response => news_id}
					IndexerWorker.perform_async(params)
					NewsHelper.map_topics(news_metadata["news_id"], response["Hierarchy"])
					CommunitiesHelper.map_books(communities_books.zip(relevance), news_metadata, communities_web_urls)
					CommunitiesHelper.map_videos communities_videos
					News.new(news_metadata["news_id"]).add_notification.execute
					if news_metadata.present? && news_metadata["image_url"].present? && news_metadata["news_id"].present?
						type = "news"
						VersionerWorker.perform_async(news_metadata["news_id"], news_metadata["image_url"], type)
					end
				end
			end
		rescue Exception => e			
			puts e.to_s.red
		end
	end

	def self.handle_communities response
		communities = []		
		response["Tags"].each do |social_tag|
			if social_tag['value'] != ""
				communities << social_tag
				
			end
		end
		WikiHelper.obtain_wiki_similar_communities communities
	end

	# This funnction first checks the database for books, if no books are present,
	# it calls google api to fetch books	
	def self.fetch_books_database_net community
		clause = Community.search_by_name(community) + Community.match_books + "RETURN book.title,book.author_name"		
		books_list = clause.execute				
		if(books_list.empty?)
			books = CommunitiesHelper.fetch_books community
		else
			books = {community => []}
			books_list.each do |book|
				if(book.has_key?("book.author_name"))
					author = book["book.author_name"] # it will be array, now it is not
					if(author.nil?)
						next
					end
					books[community] << [book["book.title"],[author[1..author.length]]]
				end
			end			
		end
		books 
	end

	def self.has_required_book_count books
		!books.blank? && books.length >= Constant::Count::MinimumCommunityBooks
	end

	def self.map_community_videos community, videos
		Community.merge(community) + videos.map{|video| (Video.merge(video) + Video.merge_community)}.join(" WITH community ")
	end

	def self.map_videos communities_videos
		clause = ""
		communities_videos.each{|community,videos| clause += map_community_videos(community, videos) }
		clause.execute
	end

	def self.map_books communities_books, news_metadata, communities_web_urls = {}
		batch_size_cypher = 4
		communities_books.each do |community_books,relevance|
			community_books.each do |community, books_authors|
				books,authors = books_authors.transpose
				clause =  News.new(news_metadata["news_id"]).match + Community.merge(community, communities_web_urls[community]) + ", news " + Community.set_importance + " WITH community, news " + News.merge_community(relevance)
	        	clause_temp = clause
				books.each_with_index do |book,i|
					authorlist_string = authors[i].sort.join('').search_ready						
					unique_indices = authors[i].map{|author| (book.search_ready + author.search_ready)}
					clause_temp += Book.search_by_unique_indices(unique_indices) + " , community " + Community.merge_book + " WITH community "
					if((i+1)%batch_size_cypher == 0)
						clause_temp += News.return_init + Community.basic_info
						clause_temp.execute
						clause_temp = clause
					end
				end
				if(clause_temp.length > clause.length)
					clause_temp += News.return_init + Community.basic_info
					clause_temp.execute
				end
				community_info = (clause + Community.return_group(Community.basic_info)).execute[0]
				params = {:type => "Community", :response => community_info["id"]}
				IndexerWorker.perform_async(params)

				if community_info.present? && community_info["image_url"].present? && community_info["id"].present?
					type = "community"
					VersionerWorker.perform_async(community_info["id"], community_info["image_url"], type)
				end
			end
		end
	end

	def self.fetch_books community
		community_books = {community => []}
		count = 0
		books_info = Book::GoogleBooks.get community
		if books_info.present?
			books,author_list = books_info.transpose			
			books.each_with_index do |book,index|				
				if(author_list[index].nil?)					
					next
				end
				authors = author_list[index]			
				authors = authors.sort
				#author_string = authors.join('').search_ready
				#unique_index = book.search_ready + author_string
				books_id = (BookHelper.get_by_one_author(book, authors) + Book.unwind("books") + " RETURN ID(book) AS id").execute
				#book_info = (Book.get_by_unique_index(unique_index).execute)[0]
				if books_id.present? && books_id[0].present? && books_id[0]["id"].present?
					community_books[community] << [book,authors]
					books_id.each do |book_id|
						BookHelper.set_author_list(authors,book_id["id"]).execute
					end
				end
			end
		end		
		community_books
	end

	def self.fetch_book_ids community
		community_books = {community => []}
		count = 0
		books_info = Book::GoogleBooks.get community
		if books_info.present?
			books,author_list = books_info.transpose
			books.each_with_index do |book,index|
				if(author_list[index].nil?)
					next
				end
				authors = author_list[index]
				authors = authors.sort
				books_id = (BookHelper.get_by_one_author(book, authors) + Book.unwind("books") + " RETURN ID(book) AS id").execute
				if books_id.present? && books_id[0].present? && books_id[0]["id"].present?
					books_id.each do |book_id|
						community_books[community] << book_id["id"]
						BookHelper.set_author_list(authors,book_id["id"]).execute
					end
				end
			end
		end
		community_books
	end

	#deletes links to books for all communities before a time_stamp
	def self.get_communities_created_before created_before
		CommunitiesHelper.match_by_creation_time(created_before) + " WITH community "\
		"" + Community.return_group("ID(community) as id", "community.name as name ")
	end

	def self.match_by_creation_time created_before
		"MATCH (community:Community) WHERE community.created_at <= " + created_before.to_s + " "
	end

	def self.delete_community_to_book_links id
		Community.new(id).match + ""\
		"MATCH (community)-[r:RelatedBooks]->(:Book) "\
		"DELETE r "
	end

	def self.create_book_links community_id, community_name
		books = CommunitiesHelper.fetch_book_ids community_name
		books = books[community_name]
		clause = Community.new(community_id).match
		clause += "WHERE community.name = " + "\'" + community_name.gsub("'","\\\\'") + "\'  WITH community "
		or_clause = ""
		books.each_with_index do |book_id,index|
			if index == 0
				or_clause += " ID(book) =" + book_id.to_s + " "
			else
				or_clause += " OR ID(book) =" + book_id.to_s + " "
			end
		end
		if(books.length > 0)
			clause += " MATCH (book:Book) WHERE " + or_clause + Community.merge_book + " RETURN ID(community) "
		else
			clause += " RETURN ID(community)"
		end
		clause
	end

	def self.reset_book_links created_before
		communities = CommunitiesHelper.get_communities_created_before(created_before).execute
		communities.each do |community|
			if(community["name"].present?)
				CommunitiesHelper.delete_community_to_book_links(community["id"]).execute
				CommunitiesHelper.create_book_links(community["id"], community["name"]).execute
			end
		end
	end
end