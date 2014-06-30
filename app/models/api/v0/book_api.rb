module Api
	module V0
		class BookApi
			def self.bookmarked_books
				self.recommendations.map do |s|
					s['bookmark_status'] = 1
					s
				end
			end

			def self.get_book(title, author_name)
				@neo = Neography::Rest.new
				clause = "MATCH (book:Book) WHERE book.title =~ \"(?i)"+title+"\" AND book.author_name =~ \"(?i)"+author_name+"\" RETURN book"
				puts clause.blue.on_red
				book = @neo.execute_query(clause)["data"]
				book
			end

			def self.push_recommendations
				self.recommendations
			end

			def self.get_timeline id
				test_moments = [
					{
						:user => {
							:id => 1,
							:thumb => "assets/profile_pic.jpeg"
						},
						:timestamp => "2 days ago",
						:votes => 23,
						:quote => "When someone is seeking, it happens quite easily that he only sees the thing 
								that he is seeking; that he is unable to find anything, unable to absorb anything because 
								he is only thinking of the thing he is seeking...",
						:moment => "Death broken down into molecular importance."
					},
					{
						:user => {
							:id => 1,
							:thumb => "assets/profile_pic.jpeg"
						},
						:timestamp => "2 days ago",
						:votes => 23,
						:quote => "When someone is seeking, it happens quite easily that he only sees the thing 
								that he is seeking; that he is unable to find anything, unable to absorb anything because 
								he is only thinking of the thing he is seeking...",
						:moment => "Death broken down into molecular importance."
					},
					{
						:user => {
							:id => 1,
							:thumb => "assets/profile_pic.jpeg"
						},
						:timestamp => "2 days ago",
						:votes => 23,
						:quote => "When someone is seeking, it happens quite easily that he only sees the thing 
								that he is seeking; that he is unable to find anything, unable to absorb anything because 
								he is only thinking of the thing he is seeking...",
						:moment => "Death broken down into molecular importance."
					},
					{
						:user => {
							:id => 1,
							:thumb => "assets/profile_pic.jpeg"
						},
						:timestamp => "2 days ago",
						:votes => 23,
						:quote => "When someone is seeking, it happens quite easily that he only sees the thing 
								that he is seeking; that he is unable to find anything, unable to absorb anything because 
								he is only thinking of the thing he is seeking...",
						:moment => "Death broken down into molecular importance."
					},
					{
						:user => {
							:id => 1,
							:thumb => "assets/profile_pic.jpeg"
						},
						:timestamp => "2 days ago",
						:votes => 23,
						:quote => "When someone is seeking, it happens quite easily that he only sees the thing 
								that he is seeking; that he is unable to find anything, unable to absorb anything because 
								he is only thinking of the thing he is seeking...",
						:moment => "Death broken down into molecular importance."
					},
					{
						:user => {
							:id => 1,
							:thumb => "assets/profile_pic.jpeg"
						},
						:timestamp => "2 days ago",
						:votes => 23,
						:quote => "When someone is seeking, it happens quite easily that he only sees the thing 
								that he is seeking; that he is unable to find anything, unable to absorb anything because 
								he is only thinking of the thing he is seeking...",
						:moment => "Death broken down into molecular importance."
					}
				]
				info = {"moments" => test_moments}
			end

			def self.get_popular_books params
				skip_count = params[:skip_count]
				unless skip_count
					skip_count = 0
				end
				@neo = Neography::Rest.new
				clause = "MATCH (book:Book) WITH book, toInt(book.gr_reviews_count) + toInt(book.gr_ratings_count) AS weight RETURN book, weight as weight ORDER BY weight DESC SKIP "+(10*skip_count.to_i).to_s+" LIMIT 10"
				puts clause.blue.on_red
				begin
					books =  @neo.execute_query(clause)["data"]
				rescue Exception => e
					puts e.to_s.red
					books = [{:message => "Error in finding books"}]
					# books =  @neo.execute_query(clause)["data"]
				end
				results = []
				for book in books
					book = book[0]["data"]
					isbn = book["isbn"].split(",")[0] rescue nil
					thumb = "http://covers.openlibrary.org/b/isbn/"+isbn+"-S.jpg" rescue ""
					book = {
						:title => book["title"],
						:author_name => book["author_name"],
						:thumb => thumb
					}
					results.push book
				end
				results
			end

			def self.recommendations filters={}
				skip_clause = ""
				if filters["reset"]
					$redis.set 'book_ids', ""
					puts "RESET TRUE".red.on_yellow.blink
				else
					if filters["reset_count"]
						skip_clause = "SKIP "+(filters["reset_count"] * 10).to_s+" "
						puts "RESET "+filters["reset_count"].to_s+" FALSE".red.on_yellow.blink
					end
				end

				book_ids = ($redis.get 'book_ids').split(",")
				# puts book_ids.sort
				@neo = Neography::Rest.new
				random = Random.new.rand(1..100)
				results = []


				init_match_clause = "MATCH (book:Book) "
				distinct_clause = "ALL (id in "+book_ids.to_s+" WHERE toInt(id) <> ID(book)) "
				random_clause = "ID(book)%"+random.to_s+"=0 AND rand() > 0.3 "
				with_clause = "WITH book, toInt(book.gr_ratings_count) * toInt(book.gr_reviews_count) * toInt(book.gr_rating) AS total_weight, toInt(book.gr_ratings_count) * toInt(book.gr_rating) AS rating_weight "
				return_clause = "RETURN book"
				order_clause = ", total_weight, rating_weight ORDER BY rating_weight DESC, total_weight DESC, book.gr_rating DESC "
				limit_clause = "LIMIT 10 "


				if filters["other_filters"].present?
					where_clause = ""
					match_clause = ""
					book_name = filters["other_filters"]["title"]
					author_name = filters["other_filters"]["author_name"]
					show_all = filters["other_filters"]["show_all"]
					if book_name.present?
						if show_all
							puts "book_name "+book_name+" show_all ".green
							where_clause = where_clause + " book.title=~\"(?i)"+book_name+".*\" "
						else
							puts "book_name "+book_name+" author_name "+author_name+" ".green
							where_clause = where_clause + " book.title=~\"(?i)"+book_name+"\" AND book.author_name=~\"(?i)"+author_name+"\" "
						end
					else
						if filters["other_filters"]["country"].present?
							where_clause = where_clause + ""
							match_clause = match_clause + ""
						end
						if filters["other_filters"]["readingTime"].present?
							read_time = filters["other_filters"]["readingTime"]
							match_clause = match_clause + ", (rt:ReadTime{name: '"+read_time+"'})<-[:WithReadingTime]-(book) "
							if where_clause.present?
								where_clause = where_clause + " AND book.page_count <> 0 "
							else
								where_clause = where_clause + " book.page_count <> 0 "
							end
						end
						if filters["other_filters"]["timeGroup"].present?
							category = "Era: "+filters["other_filters"]["timeGroup"].gsub(/\(.*?\)/, "").strip
							time_range =  filters["other_filters"]["timeGroup"][/\(.*?\)/]
											.gsub("(","")
											.gsub(")","")
											.split("-")
							match_clause = match_clause + ", (book)-[:Published_in]->(y:Year) "
							clause = " toInt(y.year) > "+time_range[0]+
									" AND toInt(y.year) < "+time_range[1]+" "
							if where_clause.present?
								where_clause = where_clause + " AND"+clause
							else
								where_clause = where_clause + clause
							end
						end
						if filters["other_filters"]["author"].present?
							author_name =  filters["other_filters"]["author"]
							category = "Written by "+ author_name
							match_clause = match_clause + ", (author:Author)-[:Wrote]->(book) "
							clause = " author.name =~ '(?i)"+author_name+"' "
							if where_clause.present?
								where_clause = where_clause + " AND"+clause
							else
								where_clause = where_clause + clause
							end
						end
						if filters["other_filters"]["genre"].present?
							genre = filters["other_filters"]["genre"]
							category = "Genre: "+genre
							match_clause = match_clause + ", (genre:Genre)<-[:Belongs_to]-(book) "
							clause = " genre.name =~ '(?i)"+genre+"' "
							if where_clause.present?
								where_clause = where_clause + " AND"+clause
							else
								where_clause = where_clause + clause
							end
						end
					end
					if where_clause.present? && match_clause.present?
						clause = init_match_clause+match_clause+"WHERE "+
							where_clause+with_clause+return_clause+order_clause+skip_clause+limit_clause
					elsif match_clause.present?
						clause = init_match_clause+match_clause+with_clause+return_clause+order_clause+skip_clause+limit_clause
					elsif where_clause.present?
						clause = init_match_clause+"WHERE "+where_clause+return_clause
					else
						category = "Must Reads"
						clause = init_match_clause+"WHERE "+random_clause+with_clause+return_clause+order_clause+skip_clause+limit_clause
					end
				else
					category = "Must Reads"
					clause = init_match_clause+"WHERE "+random_clause+with_clause+return_clause+order_clause+skip_clause+limit_clause
				end


				puts clause.blue.on_red
				begin
					books = @neo.execute_query(clause)["data"]
				rescue Exception => e
					puts "ERROR "+e.to_s.blue.on_red.blink
					$redis.set 'book_ids', ""
					books = @neo.execute_query(clause)["data"]
				end
				puts books.length.to_s.red.on_blue


				for book in books
					node_id = book[0]["self"].gsub("http://localhost:7474/db/data/node/", "")
					book_sent = book_ids.include? node_id
					# puts "#{book_sent} #{node_id} #{book_ids.split(',').sort.join(',')}"
					unless book_sent
						if book_ids.present?
							book_ids = ($redis.get 'book_ids')+","+node_id
						else
							book_ids = node_id
						end
						$redis.set 'book_ids', book_ids
						book = book[0]["data"]
						isbn = book["isbn"].split(",")[0] rescue nil
						thumb = "http://covers.openlibrary.org/b/isbn/"+isbn+"-L.jpg" rescue ""
						book = {
							:title => book["title"],
							:author_name => book["author_name"],
							:rating => book["gr_rating"].to_f*2,
							:readers_count => book["gr_ratings_count"],
							:discussions_count => book["gr_reviews_count"],
							:reviews_count => book["gr_reviews_count"],
							:published_year => book["published_year"],
							:page_count => book["page_count"],
							:thumb => {
								:url => thumb
							},
							:category => {
								:name => category
							},
							:summary => book["description"],
							:users => [
								{
									:id => 1,
									:url => "",
									:name => "test user",
									:thumb => "assets/profile_pic.jpeg"
								},
								{
									:id => 2,
									:url => "",
									:name => "test user",
									:thumb => "assets/profile_pic.jpeg"
								},
								{
									:id => 3,
									:url => "",
									:name => "test user",
									:thumb => "assets/profile_pic.jpeg"
								},
								{
									:id => 4,
									:url => "",
									:name => "test user",
									:thumb => "assets/profile_pic.jpeg"
								},
								{
									:id => 5,
									:url => "",
									:name => "test user",
									:thumb => "assets/profile_pic.jpeg"
								},
								{
									:id => 6,
									:url => "",
									:name => "test user",
									:thumb => "assets/profile_pic.jpeg"
								}
							],
							:users_count => 15
						}
						results.push book
					end
				end
				results
			end

			def self.detailed_book id
				if id == "1"
					thumb = "assets/books/20.jpeg"
				elsif id == "2"
					thumb = "assets/books/15.jpeg"
				elsif id == "3"
					thumb = "assets/books/11.jpeg"
				elsif id == "4"
					thumb = "assets/books/13.jpeg"
				elsif id == "5"
					thumb = "assets/books/a2.jpeg"
				elsif id == "13"
					thumb = "assets/Siddhartha.jpg"
				end
				_test_book_info(id, thumb)
			end

			def self.tooltip
				info = {
					:id => 1,
					:recommended => 0
				}
			end

			private
			def self._test_book_info(id, thumb)
				info = {
					:id => id,
					:title => "Test Book",
					:author_name => "Test Author",
					:thumb => thumb,
					:summary => "Siddhartha is a novel by Hermann Hesse 
						that deals with the spiritual journey of 
						self-discovery of a man named Siddhartha 
						during the time of the Gautama Buddha. 
						The book, Hesse's ninth novel, was written 
						in German, in a simple, lyrical style. It was 
						published in the U.S. in 1951 and became 
						influential during the 1960s. Hesse dedicated 
						Siddhartha to his wife Ninon and supposedly 
						afterwards to Romain Rolland and Wilhelm 
						Gundert. The word Siddhartha is made up 
						of two words in the Sanskrit language, 
						siddha + artha, which together means 
						\"he who has found meaning\" or \"he who 
						has attained his goals\". In fact, the Buddha's 
						own name, before his renunciation, was 
						Siddhartha Gautama, Prince of Kapilvastu, 
						Nepal. In this book, the Buddha is referred 
						to as \"Gotama\".",
					:background_color => "#FFD946",
					:characters => [
						{
							:id => 3,
							:name => "Siddhartha",
							:description => "The protagonist, who is constantly
							 searching for enlightenment. He eventually finds it 
							 through the knowledge of the river."
						},
						{
							:id => 4,
							:name => "Govinda",
							:description => "Siddhartha's best friend."
						},
						{
							:id => 5,
							:name => "Gotama",
							:description => "Spiritual leader; Buddha. Many look up to him and follow his doctrine."
						},
						{
							:id => 6,
							:name => "Vasudeva",
							:description => "Add a description to this character",
						},
						{
							:id => 7,
							:name => "Kamala",
							:description => "Siddhartha's lover"
						},
						{
							:id => 8,
							:name => "Kamaswami",
							:description => "The Merchant who teaches Siddhartha the tricks of his trade."
						}
					],
					:first_sentence => "SIDDHARTHA, the handsome son of the Brahmin, the young falcon, grew up 
						together with his friend Govinda, the Brahmin's son, in the shadow of the house, in the sun of the 
						riverbank near the boats, in the shadow of the sala forest, and in the shadow of the fig trees.",
					:note_for_parents => "Although a child could understand the words, it would be really hard to 
						comprehend the underlying meaning. Wait until high school.",
					:quotes => [
						{
							:quote => "When someone is seeking, it happens quite easily that he only sees the thing 
								that he is seeking; that he is unable to find anything, unable to absorb anything because 
								he is only thinking of the thing he is seeking...",
							:from => "",
							:like_count => 23,
							:dislike_count => 5,
							:share_count => 34
						},
						{
							:quote => "To whom else should one sacrifice, to whom else was veneration due but to him, 
								the Only One, Atman? And where was Atman to be found, where did he dwell, where did his eternal 
								heart beat if not in ones own self, in the innermost, in the indestructible essence that every 
								person bore within? But where, where was this self, this innermost, this ultimate? It was not 
								flesh and blood, it was not thinking or consciousness that was what the wisest teach. But then 
								where, where was it? To pierce there, to the self, to myself, to Atman was there any other path 
								worth seeking?",
							:from => "Siddhartha",
							:like_count => 23,
							:dislike_count => 5,
							:share_count => 34
						},
						{
							:quote => "Her clever red lips taught him a lot. Her tender, supple hand taught him a lot. In 
								regard to love, he was still a boy, and he tended to plunge into pleasure blindly, endlessly, 
								insatiably. So she thoroughly taught him that one cannot take pleasure without giving pleasure, 
								and that every gesture, every caress, every touch, every glance, every last bit of the body has 
								its secret, which brings happiWEness to the person who knows how to wake it.",
							:from => "",
							:like_count => 23,
							:dislike_count => 5,
							:share_count => 34
						},
						{
							:quote => "She taught him that after a celebration of love the lovers should not part without 
								admiring each other, without being conquered or having conquered, so that neither is bleak or 
								glutted or has the bad feeling of having misused or been misused.",
							:from => "",
							:like_count => 23,
							:dislike_count => 5,
							:share_count => 34
						},
						{
							:quote => "Where are you going, by friend?I am not going anywhere. We  are always on the way. 
								But where are you going, Siddhartha?It is the same with me at it is with you, my friend. I am not 
								going anywhere. I am only on the way.",
							:from => "",
							:like_count => 23,
							:dislike_count => 5,
							:share_count => 34
						},
						{
							:quote => "But today he only saw one of the rivers secrets, one that gripped his soul. He saw 
								that the water continually flowed and flowed and yet it was always there; it was always the same 
								and yet every moment it was new.",
							:from => "",
							:like_count => 23,
							:dislike_count => 5,
							:share_count => 34
						},
						{
							:quote => "Where are you going, by friend?I am not going anywhere. We  are always on the way. 
								But where are you going, Siddhartha?It is the same with me at it is with you, my friend. I am not 
								going anywhere. I am only on the way.",
							:from => "",
							:like_count => 23,
							:dislike_count => 5,
							:share_count => 34
						},
						{
							:quote => "But today he only saw one of the rivers secrets, one that gripped his soul. He saw 
								that the water continually flowed and flowed and yet it was always there; it was always the same 
								and yet every moment it was new.",
							:from => "",
							:like_count => 23,
							:dislike_count => 5,
							:share_count => 34
						}
					],
					:themes => [
						{
							:title => "The Search for Spiritual Enlightenment: Describe this theme.",
							:description => ""
						},
						{
							:title => "Inner vs. Exterior Guidance",
							:description => ""
						},
						{
							:title => "The Wisdom of Indirection",
							:description => ""
						},
						{
							:title => "Love",
							:description => ""
						},
						{
							:title => "Om",
							:description => ""
						},
						{
							:title => "Polarities",
							:description => ""
						}
					],
					:subject_places => [

					],
					:movie_based => nil,
					:tags => [
						{
							:id => 1,
							:name => "1001 books you must read before you die",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 2,
							:name => "20th century",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 3,
							:name => "adventure",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 4,
							:name => "allegorical novel",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 5,
							:name => "allegory",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 6,
							:name => "asia",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 7,
							:name => "boring",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 8,
							:name => "buddha",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 9,
							:name => "buddhism",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 10,
							:name => "caste system",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 11,
							:name => "classic",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 12,
							:name => "classic literature",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 13,
							:name => "classics",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 14,
							:name => "coming of age",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						},
						{
							:id => 15,
							:name => "eastern philosophy",
							:url => "",
							:book_count => 3435,
							:books_url => "",
							:like_count => 12413,
							:dislike_count => 32
						}
					],
					:news => [
						{
							:thumb => "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/2/19
							/1392802798841/d7111211-6010-4fb3-a86f-5416a7051b9d-460x276.jpeg",
							:title => "Billy Corgan to perform eight-hour jam inspired by Herman Hesse's 
							Siddhartha",
							:description => "Billy Corgan has announced that he will be performing an 
							eight-hour jam inspired by the Herman Hesse novella Siddhartha. The all-day 
							ambient show will be presented at his Chicago tea shop on 28 February.

							The Smashing Pumpkins bandleader shared concert details by posting on Facebook
							 (via Stereogum). [The] performance will be centered around an ambient/musical 
							 interpretation of [the book] ... built by modular synthesis, on the fly, he 
							 wrote. Readings of the text [will] go hand in hand with whatever is created.
							  The show will begin at noon and last between eight and nine hours.

							Said tea shop, Madame ZuZus, was launched in 2012. Corgan described it then 
							as a salon ... [where] like-minded people can discuss ideas and performance 
							art. From the start, Corgan emphasised that he wanted this space to be a 
							showcase for literature, including his own poetry; he admitted to the Chicago 
							Tribune that he has been writing a spiritual memoir since around 2010.

							Indeed, Corgan is one of those 30m-album-selling rockers for whom an eight-hour 
							Buddhist synth jam seems par for the course. Before his tea shop, the 46-year-old 
							launched a religion/philosophy website called Everything From Here To There. He 
							also became a wrestling promoter. And although many critics might mock Corgans 
							pretense, his fans have his back: Hes just hanging out at his tea shop playing 
							music, one wrote on Facebook. How is that pretentious?",
							:source => "http://www.theguardian.com/",
							:type => "img",
							:timestamp => "29 May 1999"
						},
						{
							:thumb => "http://www.youtube.com/watch?feature=player_embedded&v=C3tV8n-CVnA",
							:title => "Herman Hesses Siddhartha, Interpreted For Modular Synthesizer By 
							William Corgan",
							:description => "Heres the video stream for the 8-hour marathon version of Herman 
							Hesses Siddhartha, interpreted for modular synthesizer by William Corgan (of The 
								Smashing Pumpkins). 

							Its from a live improvised performance at at Madame ZuZu?s Teahouse (Chicago). 
							Corgan describes the event as an ambient/musical interpretation of Hermann 
							Hesse?s Siddhartha; built by modular synthesis, on the fly.",
							:type => "video",
							:timestamp => "29 June 1999"
						}
					],
					:total_reviews_count => 23,
					:reviews => [
						{
							:heading => "A well written concise life story of Siddhartha",
							:content => "A well written concise life story of Siddhartha that attempts to relate 
							the volatile fluctuations of the Buddhist life and his struggle with a return to 
							hedonism. I am not certain if this book was an attempt to appeal to the Buddhist philosophy, 
							but I did not finish with an affectionate empathy toward Buddhism. However, the final 
							concept Siddhartha comes to about loving, respecting, and revering the world and living 
							things instead of looking down upon these things disdainfully was notable. Perhaps we 
							all struggle with the inclination to hate the world for the ugliness inside of it, but 
							to rise above this reality and see it with love and kindness can only be positive step 
							toward progress and peace. ",
							:user => {
								:id => 1,
								:name => "Test User",
								:thumb => "assets/profile_pic.jpeg",
								:url => "",
							},
							:comment_count => 12,
							:timestamp => "4 days ago",
							:like_count => 13,
							:dislike_count => 14,
							:comments => [
								{
									:user => {
										:id => 1,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "i adore this book and will always buy it at a used book store for some i love.",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
								{
									:user => {
										:id => 2,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "great",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
							]
						},
						{
							:heading => "A well written concise life story of Siddhartha",
							:content => "A well written concise life story of Siddhartha that attempts to relate 
							the volatile fluctuations of the Buddhist life and his struggle with a return to 
							hedonism. I am not certain if this book was an attempt to appeal to the Buddhist philosophy, 
							but I did not finish with an affectionate empathy toward Buddhism. However, the final 
							concept Siddhartha comes to about loving, respecting, and revering the world and living 
							things instead of looking down upon these things disdainfully was notable. Perhaps we 
							all struggle with the inclination to hate the world for the ugliness inside of it, but 
							to rise above this reality and see it with love and kindness can only be positive step 
							toward progress and peace. ",
							:user => {
								:id => 1,
								:name => "Test User",
								:thumb => "assets/profile_pic.jpeg",
								:url => "",
							},
							:comment_count => 12,
							:timestamp => "4 days ago",
							:like_count => 13,
							:dislike_count => 14,
							:comments => [
								{
									:user => {
										:id => 1,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "i adore this book and will always buy it at a used book store for some i love.",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
								{
									:user => {
										:id => 2,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "great",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
							]
						},
						{
							:heading => "A well written concise life story of Siddhartha",
							:content => "A well written concise life story of Siddhartha that attempts to relate 
							the volatile fluctuations of the Buddhist life and his struggle with a return to 
							hedonism. I am not certain if this book was an attempt to appeal to the Buddhist philosophy, 
							but I did not finish with an affectionate empathy toward Buddhism. However, the final 
							concept Siddhartha comes to about loving, respecting, and revering the world and living 
							things instead of looking down upon these things disdainfully was notable. Perhaps we 
							all struggle with the inclination to hate the world for the ugliness inside of it, but 
							to rise above this reality and see it with love and kindness can only be positive step 
							toward progress and peace. ",
							:user => {
								:id => 1,
								:name => "Test User",
								:thumb => "assets/profile_pic.jpeg",
								:url => "",
							},
							:comment_count => 12,
							:timestamp => "4 days ago",
							:like_count => 13,
							:dislike_count => 14,
							:comments => [
								{
									:user => {
										:id => 1,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "i adore this book and will always buy it at a used book store for some i love.",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
								{
									:user => {
										:id => 2,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "great",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
							]
						},
						{
							:heading => "A well written concise life story of Siddhartha",
							:content => "A well written concise life story of Siddhartha that attempts to relate 
							the volatile fluctuations of the Buddhist life and his struggle with a return to 
							hedonism. I am not certain if this book was an attempt to appeal to the Buddhist philosophy, 
							but I did not finish with an affectionate empathy toward Buddhism. However, the final 
							concept Siddhartha comes to about loving, respecting, and revering the world and living 
							things instead of looking down upon these things disdainfully was notable. Perhaps we 
							all struggle with the inclination to hate the world for the ugliness inside of it, but 
							to rise above this reality and see it with love and kindness can only be positive step 
							toward progress and peace. ",
							:user => {
								:id => 1,
								:name => "Test User",
								:thumb => "assets/profile_pic.jpeg",
								:url => "",
							},
							:comment_count => 12,
							:timestamp => "4 days ago",
							:like_count => 13,
							:dislike_count => 14,
							:comments => [
								{
									:user => {
										:id => 1,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "i adore this book and will always buy it at a used book store for some i love.",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
								{
									:user => {
										:id => 2,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "great",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
							]
						},
						{
							:heading => "A well written concise life story of Siddhartha",
							:content => "A well written concise life story of Siddhartha that attempts to relate 
							the volatile fluctuations of the Buddhist life and his struggle with a return to 
							hedonism. I am not certain if this book was an attempt to appeal to the Buddhist philosophy, 
							but I did not finish with an affectionate empathy toward Buddhism. However, the final 
							concept Siddhartha comes to about loving, respecting, and revering the world and living 
							things instead of looking down upon these things disdainfully was notable. Perhaps we 
							all struggle with the inclination to hate the world for the ugliness inside of it, but 
							to rise above this reality and see it with love and kindness can only be positive step 
							toward progress and peace. ",
							:user => {
								:id => 1,
								:name => "Test User",
								:thumb => "assets/profile_pic.jpeg",
								:url => "",
							},
							:comment_count => 12,
							:timestamp => "4 days ago",
							:like_count => 13,
							:dislike_count => 14,
							:comments => [
								{
									:user => {
										:id => 1,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "i adore this book and will always buy it at a used book store for some i love.",
									:timestamp => "6 years ago",
									:id => 1,
									:url => "",
									:comments => [
										{
											:user => {
												:id => 1,
												:thumb => "assets/profile_pic.jpeg",
												:name => "test_user",
												:url => ""
											},
											:comment => "i adore this book and will always buy it at a used book store for some i love.",
											:timestamp => "6 years ago",
											:id => 1,
											:url => "",
											:nested => true
										},
										{
											:user => {
												:id => 2,
												:thumb => "assets/profile_pic.jpeg",
												:name => "test_user",
												:url => ""
											},
											:comment => "great",
											:timestamp => "6 years ago",
											:id => 1,
											:url => "",
											:nested => true
										}
									]
								},
								{
									:user => {
										:id => 2,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "great",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								}
							]
						},
						{
							:heading => "A well written concise life story of Siddhartha",
							:content => "A well written concise life story of Siddhartha that attempts to relate 
							the volatile fluctuations of the Buddhist life and his struggle with a return to 
							hedonism. I am not certain if this book was an attempt to appeal to the Buddhist philosophy, 
							but I did not finish with an affectionate empathy toward Buddhism. However, the final 
							concept Siddhartha comes to about loving, respecting, and revering the world and living 
							things instead of looking down upon these things disdainfully was notable. Perhaps we 
							all struggle with the inclination to hate the world for the ugliness inside of it, but 
							to rise above this reality and see it with love and kindness can only be positive step 
							toward progress and peace. ",
							:user => {
								:id => 1,
								:name => "Test User",
								:thumb => "assets/profile_pic.jpeg",
								:url => "",
							},
							:comment_count => 12,
							:timestamp => "4 days ago",
							:like_count => 13,
							:dislike_count => 14,
							:comments => [
								{
									:user => {
										:id => 1,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "i adore this book and will always buy it at a used book store for some i love.",
									:timestamp => "6 years ago",
									:id => 1,
									:url => "",
									:comments => [
										{
											:user => {
												:id => 1,
												:thumb => "assets/profile_pic.jpeg",
												:name => "test_user",
												:url => ""
											},
											:comment => "i adore this book and will always buy it at a used book store for some i love.",
											:timestamp => "6 years ago",
											:id => 1,
											:url => ""
										},
										{
											:user => {
												:id => 2,
												:thumb => "assets/profile_pic.jpeg",
												:name => "test_user",
												:url => ""
											},
											:comment => "great",
											:timestamp => "6 years ago",
											:id => 1,
											:url => ""
										}
									]
								},
								{
									:user => {
										:id => 2,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "great",
									:timestamp => "6 years ago",
									:id => 1,
									:url => ""
								},
							]
						}
					],
					:discussions => [
						{
							:user => {
								:id => 1,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "i adore this book and will always buy it at a used book store for some i love.",
							:timestamp => "6 years ago",
							:id => 1,
							:url => "",
							:comments => [
								{
									:user => {
										:id => 1,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "i adore this book and will always buy it at a used book store for some i love.",
									:timestamp => "6 years ago",
									:id => 1,
									:url => "",
									:nested => true
								},
								{
									:user => {
										:id => 2,
										:thumb => "assets/profile_pic.jpeg",
										:name => "test_user",
										:url => ""
									},
									:comment => "great",
									:timestamp => "6 years ago",
									:id => 1,
									:url => "",
									:nested => true
								}
							]
						},
						{
							:user => {
								:id => 2,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "great",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 13,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "I read this book for a class in my first year of university and 
							something within the story (the philosophy) touched me very deeply. Perhaps one of 
							the most personally influential books I've read.",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 12,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "I could not complete this book coz of my sister. When I was reading this one 
							day she saw and started reading and after that she did not return it. Waiting her to finish 
							it so I can compelet.",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 5,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "My boyfriend just finished reading this and said it was the best book he has 
							ever read.",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 6,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "the line, \"i can wait, i can think and i can starve\" it's stuck in my head",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 7,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "this book is journey to inside and outside of our ",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 8,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "This book changed my life and is a must read through different stages of life!",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 9,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "I don't think I have something to say for this book. I am just speech less. I felt 
							crying like Govinda after reading the book, time and again. A life changing book.",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 10,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "when you read this book you realize that there is a big world out there waiting you 
							to experience.",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 11,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "I think for prof Siddharthas massage and his influence knowledge we need to read 
							it 2 times in our life. One before 30 year and the second time after 50...",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						},
						{
							:user => {
								:id => 19,
								:thumb => "assets/profile_pic.jpeg",
								:name => "test_user",
								:url => ""
							},
							:comment => "'Hermann Hesse' is one of my love and 'Siddhartha' is a very nice novel.",
							:timestamp => "6 years ago",
							:id => 1,
							:url => ""
						}
					],
					:total_discussions_count => 0,
					:author => {
						:name => "Hermann Hesse",
						:thumb => "assets/1113469.jpg",
						:born_on => "BORN_ON",
						:books => [
							{
								:name => "Steppenwolf",
								:published_year => "1900",
								:url => ""
							},
							{
								:name => "Glass Bead Game",
								:published_year => "1900",
								:url => ""
							},
							{
								:name => "Demian",
								:published_year => "1900",
								:url => ""
							},
							{
								:name => "Gertrud",
								:published_year => "1990",
								:url => ""
							}
						],
						:awards => [
							{
								:year => 1906,
								:name => "Bauernfeld-Preis"
							},
							{
								:years => "Mejstrik-Preis of the Schiller Foundation in Vienna",
								:year => 1928
							},
							{
								:year => 1936,
								:name => "Gottfried-Keller-Preis"
							},
							{
								:year => 1946,
								:name => "Goethe Prize"
							},
							{
								:year => 1946,
								:name => "Nobel Prize in Literature"
							},
							{
								:year => 1947,
								:name => "Honorary Doctorate from the University of Bern"
							}
						],
						:summary => "Hermann Hesse was a German-Swiss poet, novelist, and painter. In 
						1946, he received the Nobel Prize in Literature. His best known works include 
						Steppenwolf, Siddhartha, and The Glass Bead Game (also known as Magister Ludi) 
						which explore an individual's search for spirituality outside society.

						Hesse was born in the Black Forest town of Calw to a Christian missionary family. 
						Both of his parents served with a Basel Mission to India, where Hesse's mother 
						Marie Gundert was born in 1842. Hesse's father, Johannes Hesse, was born in 1877 
						in Estonia, the son of a doctor. The Hesse family had lived in Calw since 1873, 
						where they operated a missionary publishing house under the direction of Hesse's 
						grandfather, Hermann Gundert.

						Hesse spent his first years of life surrounded by the spirit of Swabian piety. 
						In 1880 the family moved to Basel, Switzerland, for six years, then returned to 
						Calw. After successful attendance at the Latin School in Gppingen, Hesse began 
						to attend the Evangelical Theological Seminary in Maulbronn in 1891. Here in 
						March 1892, Hesse showed his rebellious character and in one instance he fled 
						from the Seminary and was found in a field a day later.

						During this time, Hesse began a journey through various institutions and schools, 
						and experienced intense conflicts with his parents. In May, after an attempt at 
						suicide, he spent time at an institution in Bad Boll under the care of theologian 
						and minister Christoph Friedrich Blumhardt. Later he was placed in a mental 
						institution in Stetten im Remstal, and then a boys' institution in Basel.

						In the early summer of 1894, he began a fourteen month mechanic apprenticeship 
						at a clock tower factory in Calw. The monotony of soldering and filing work made 
						him resolve to turn himself toward more spiritual activities. In October 1895, 
						he was ready to begin wholeheartedly a new apprenticeship with a bookseller in 
							Tbingen. This experience from his youth he returns to later in his novel, 
							Beneath the Wheel.

						On October 17, 1895, Hesse began working in the bookshop Heckenhauer in Tbingen, 
						which had a specialized collection in theology, philology, and law. Hesse's 
						assignment there consisted of organizing, packing, and archiving the books. 
						After the end of each twelve hour workday, Hesse pursued his own work further, 
						and he spent his long, idle Sundays with books rather than friends. Hesse 
						studied theological writings, and later Goethe, Lessing, Schiller, and several 
						texts on Greek mythology. In 1896, his poem 'Madonna' appeared in a Viennese 
						periodical.

						By 1898, Hesse had a respectable income that enabled his financial independence 
						from his parents. During this time, he concentrated on the works of the German 
						Romantics, including much of the work from Clemens Brentano, Joseph Freiherr 
						von Eichendorff, Friedrich Holderlin and Novalis. In letters to his parents, 
						he expressed a belief that \"the morality of artists is replaced by aesthetics.\"

						In the fall, Hesse released his first small volume of poetry, Romantic Songs 
						and in the summer of 1899, a collection of prose, entitled One Hour After 
						Midnight. Both works were a business failure. In two years, only 54 of the 600 
						printed copies of the former were sold, and the latter received only one printing 
						and sold sluggishly. Nevertheless, the Leipzig publisher Eugen Diederichs was 
						convinced of the literary quality of the work and from the beginning regarded 
						the publications more as encouragement of a young author than as profitable 
						business.",
						:died => "DIED_ON",
						:website => "WEBSITE",
						:genres => [
							{
								:name => "Literature & Fiction",
								:url => ""
							},
							{
								:name => "Poetry",
								:url => ""
							}
						]
					}
				}
			end
		end
	end
end