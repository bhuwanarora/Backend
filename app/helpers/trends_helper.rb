module TrendsHelper

	require 'nokogiri'
	require 'open-uri'
	require 'google-search'

	def self.social_mention
		# puts "socialmention".red
		# url = "http://socialmention.com/"
		# doc = Nokogiri::HTML(open(url))
		# trends = doc.css('.clearfix a')
		# results = []

		# for trend in trends
		# 	results.push trend.children.text
		# end

		# url = "http://www.google.com/trends/?geo=IN"
		# doc = Nokogiri::HTML(open(url))
		# trends = doc.css('.hottrends-single-trend-title')
		
		# for trend in trends
		# 	results.push trend.children.text
		# end
		
		# url = "https://news.google.com/news"
		# doc = Nokogiri::HTML(open(url))
		# trends = doc.css('.titletext')
		
		@news_sources ||= self.get_news_sources
		for news_source in @news_sources
			news_links = self.get_news news_source["url"]
			
			for news_link in news_links
				tags = self.get_tags news_link
				puts tags
			end
		
		end


		# for trend in trends
		# 	trend = trend.children.text.gsub("\"", "'") rescue ""
		# 	if trend
		# 		results.push trend
		# 	end
		# end
		


		count = 0
	    neo = Neography::Rest.new 
	    # clause = "MATCH (t:Trending) WHERE t.status=1 SET t.status=0 "
	    # neo.execute_query clause

	    for trend in results
	    	begin
		      	trend_index = trend.downcase.gsub(" ", "").gsub("\"", "'").to_s rescue ""
		      	# news = Google::Search::News.new(:query => trend).first
		      	if news.present?
			      	
			      	thumb = Google::Search::Image.new(:query => trend).first
			      	publisher_thumb = Google::Search::Image.new(:query => news.publisher.to_s).first.thumbnail_uri rescue ""
			      	if trend_index.present?
			        	big_clause = " MERGE (t"+count.to_s+":Trending{indexed_trending_topic:\""+trend_index+"\"}) ON CREATE SET t"+count.to_s+".searched_words = \""+trend.gsub("\"", "").to_s+"\", t"+count.to_s+".status = 1, t"+count.to_s+".name=\""+trend+"\", t"+count.to_s+".timestamp="+Time.now.to_i.to_s+", t"+count.to_s+".title=\""+news.title.gsub("\"", "").to_s+"\", t"+count.to_s+".content=\""+news.content.gsub("\"", "").to_s+"\", t"+count.to_s+".url=\""+news.uri.to_s+"\", t"+count.to_s+".publisher_thumb=\""+publisher_thumb.to_s+"\", t"+count.to_s+".thumbnail_url=\""+thumb.thumbnail_uri.to_s+"\", t"+count.to_s+".thumb=\""+thumb.uri.to_s+"\", t"+count.to_s+".location=\""+news.location.to_s+"\", t"+count.to_s+".publisher=\""+news.publisher.to_s+"\", t"+count.to_s+".redirect_url=\""+news.redirect_uri.to_s+"\" ON MATCH SET t"+count.to_s+".status = 1 WITH t"+count.to_s
			      	end
					Google::Search::Book.new(:query => trend).each do |book|
						indexed_title = book.title.downcase.gsub(" ", "").gsub(":", "").gsub("'", "").gsub("!", "").gsub("[", "").gsub("[", "").gsub("\"", "")
						clause = " START book=node:node_auto_index('indexed_title:\""+indexed_title+"\"') CREATE UNIQUE (t"+count.to_s+")-[:RelatedBooks]->(book) "
						puts (big_clause + clause).blue.on_red
						begin
				    		neo.execute_query (big_clause + clause)
							puts ""
						rescue Exception => e
							puts e.to_s
						end
					end
				end
	    	rescue Exception => e
	    		
	    	end
	      count = count + 1
	    end
	end

	def self.link_new_books(trend_id, keywords)
		neo = Neography::Rest.new 
		
		clause = "MATCH (t:Trending)-[r:RelatedBooks]->(:Book) WHERE ID(t)="+trend_id.to_s+" DELETE r SET t.searched_words = \""+keywords.to_s+"\""
		neo.execute_query clause

		big_clause = "MATCH (t:Trending) WHERE ID(t)="+trend_id.to_s+" WITH t"

		Google::Search::Book.new(:query => keywords).each do |book|
			indexed_title = book.title.downcase.gsub(" ", "").gsub(":", "").gsub("'", "").gsub("!", "").gsub("[", "").gsub("[", "").gsub("\"", "").to_s
			clause = " START book=node:node_auto_index('indexed_title:\""+indexed_title+"\"') CREATE UNIQUE (t)-[:RelatedBooks]->(book) "
			puts (big_clause + clause).blue.on_red
			begin
	    		neo.execute_query (big_clause + clause)
				puts ""
			rescue Exception => e
				puts e.to_s
			end
		end
	end

	def self.get_news news_source
		news_links = []
		doc = Nokogiri::HTML(open(URI(news_source))).css('.esc .esc-lead-article-title a')
		for news_link in doc
			news_links << news_link["href"]
		end
		news_links
	end

	def self.get_news_sources
		@news_sources = []
		google_news_edition_url = "https://support.google.com/news/answer/40237?hl=en"
		doc = Nokogiri::HTML(open(google_news_edition_url)).css('.i a')
		for news_source in doc
			if (news_source.children.text =~ /^[a-zA-Z]+$/) == 0 and !news_source.nil?
				@news_sources << {"url" => news_source["href"], "region" => news_source.children.text}
			end
		end
		@news_sources
	end

	def self.get_tags news_link
		query = Constants::NLPService + news_link rescue debugger
		uri = URI(query)
		response = Net::HTTP.get(uri)
	end
		
end