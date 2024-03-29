module FeedHelper
   	# Note that we are treating notifications, global feed and any other feed as feed
   	ActionCreate = "Create"
   	ActionUpdate = "Update"
   	ActionDelete = "Delete"

	def self.create_user_feed user_id
		clause = "MATCH ()-[r:FeedNext{user_id:"+user_id.to_s+"}]-() DELETE r"
		clause.execute

		clause = " MATCH (a:BookmarkNode) "\
		" WHERE a.user_id="+user_id.to_s+" AND a.label <> 'FromFacebook' AND a.label <> 'Visited' "\
		" RETURN ID(a) AS id, a.created_at AS created_at "\
		" UNION ALL MATCH (a:EndorseNode) "\
		" WHERE  a.user_id ="+user_id.to_s+" "\
		" RETURN ID(a) AS id, a.created_at AS created_at "\
		" UNION ALL MATCH (a:FollowsNode) "\
		" WHERE a.user_id = "+user_id.to_s+
		" RETURN ID(a) AS id, a.created_at AS created_at "\
		" UNION ALL MATCH (a:StatusNode) "\
		" WHERE a.user_id = "+user_id.to_s+" "\
		" RETURN ID(a) AS id, a.created_at AS created_at "\
		" UNION ALL MATCH (a:RecommendNode) "\
		" WHERE a.user_id = "+user_id.to_s+" "\
		" RETURN ID(a) AS id, a.created_at AS created_at "
		feed = clause.execute

		if feed.length == 0
			clause = "MATCH (u) WHERE ID(u)="+user_id.to_s+" CREATE UNIQUE (u)-[:FeedNext{user_id:"+user_id.to_s+"}]->(u)"
			clause.execute 
		else
			feed.sort_by!{|single_feed| ((single_feed["created_at"].present?) ? single_feed["created_at"] : 0)}

			clause = " MATCH (n1), (n2) WHERE ID(n1)="+user_id.to_s+" AND ID(n2)="+feed[0]["id"].to_s+" CREATE UNIQUE (n1)<-[:FeedNext{user_id:"+user_id.to_s+"}]-(n2) "
			clause.execute
			for index in 0..(feed.length - 2)
				clause = " MATCH (n1), (n2) WHERE ID(n1)="+feed[index]["id"].to_s+" AND ID(n2)="+feed[index+1]["id"].to_s+" CREATE UNIQUE (n1)<-[:FeedNext{user_id:"+user_id.to_s+"}]-(n2) "
				clause.execute
			end
			clause = " MATCH (n1), (n2) WHERE ID(n1)="+feed[feed.length - 1]["id"].to_s+" AND ID(n2)="+user_id.to_s+" CREATE UNIQUE (n1)<-[:FeedNext{user_id:"+user_id.to_s+"}]-(n2) "
			clause.execute
		end

	end
end