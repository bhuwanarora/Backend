class Community < Neo

	def initialize id
		@id = id
	end

	def match
		" MATCH (community:Community) WHERE ID(community) = " + @id.to_s + " WITH community "
	end

	def self.basic_info
		" community.view_count AS view_count, community.name AS name "
	end

	def match_books 
		" MATCH (community)-[:RelatedBooks]->(book:Book) WITH community, book "
	end

	def get_books
		match + match_books + Book.order_desc + Community.limit(Constants::CommunityBooksCount.to_s) + Neo.return_init + Book.basic_info
	end

	def match_users
		" MATCH (community)<-[of_community:OfCommunity]-(follow_node:FollowNode)<-[follows:Follows]-(user:User) WITH community, follow_node, user "
	end

	def self.set_name

	end

	def self.set_importance
		" SET community.importance = COALESCE(community.importance, 0) + 1 "
	end

	def self.detailed_info
		
	end

	def get_users
		match + match_users + Community.limit(Constants::CommunityUsersCount) + Community.return_init + User.basic_info
	end


	def self.get_news
		" MATCH (community)<-[:Hastopic]-(news:News) WITH community, news "
	end



	def get_communities_chronologically
		match + Community.get_news + News.match_chronological_news + News.match_community + Community.return_init + Community.basic_info 
	end


	def self.set_follow_count
		" SET community.follow_count = COALESCE(community.follow_count,0) + 1 "
	end
end