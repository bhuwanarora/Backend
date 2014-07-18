module BooksGraphHelper

	def self.neo_init
		@neo = Neography::Rest.new
	end

	# ************************************************

	# MATCH (b:Book)-[:BookFeed*0..]->(news_feed)
	# WHERE ID(b)=BOOK_ID
	# RETURN labels(news_feed), news_feed

	# ************************************************
	
	def self.get_feed book_id
		@neo ||= self.neo_init
		clause = "MATCH (b:Book)-[:BookFeed*0..]->(news_feed) WHERE ID(b)="+book_id.to_s+" RETURN labels(news_feed), news_feed"
		puts clause.blue.on_red
		@neo.execute_query(clause)["data"]
	end

	# ************************************************

	# MATCH (b:Book), (u:User)
	# WHERE ID(b)=BOOK_ID AND ID(u)=USER_ID
	# WITH b
	# OPTIONAL MATCH (u)-[:RatingAction]->(rn:RatingNode)-[:Rate]->(b)  
	# OPTIONAL MATCH (u)-[:TimingAction]->(tm:TimingNode)-[:Timer]->(b)
	# RETURN b, rn.rating, tm.time_index

	# ************************************************
	def self.get_details(book_id, user_id=nil)
		@neo = Neography::Rest.new
		if user_id
			clause = "MATCH (b:Book), (u:User) WHERE ID(b)="+book_id.to_s+" AND ID(u)="+user_id.to_s+" WITH b	OPTIONAL MATCH (u)-[:RatingAction]->(rn:RatingNode)-[:Rate]->(b) OPTIONAL MATCH (u)-[:TimingAction]->(tm:TimingNode)-[:Timer]->(b) RETURN b, rn.rating, tm.time_index"
			puts clause.blue.on_red
			book = @neo.execute_query(clause)["data"][0]
		else
			clause = "MATCH (book:Book) WHERE ID(book)="+book_id.to_s+" RETURN book"
			puts clause.blue.on_red
			book = @neo.execute_query(clause)["data"][0][0]["data"]
		end
		book
	end
end