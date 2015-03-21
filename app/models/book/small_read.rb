class Book::SmallRead < Book
	Limit = 30

	def initialise
		@best_small_read ||= Constants::BestSmallRead
	end

	def self.match_best_read
		@best_small_read ||= Constants::BestSmallRead
		" MATCH (small_read:Book) WHERE ID(small_read) = " + @best_small_read.to_s+"  WITH small_read "
	end

	def self.path
		clause = " MATCH path = (node)-[:NextSmallRead*" + Limit.to_s + "]->(last_node) WITH path "
	end

	def self.path_nodes
		self.path + ", EXTRACT(n in nodes(path)|n) AS books UNWIND books AS book "
	end

	def self.nth_node length
		Book::SmallRead.match_best_read + " MATCH (small_read)-[:NextSmallRead*" + length.to_s + "]->(node) WITH node "
	end

	def self.path_nodes_after skip
		Book::SmallRead.nth_node(skip) + Book::SmallRead.path_nodes
	end

	def self.get_sorted_books skip_count
		::Book::SmallRead.path_nodes_after(skip_count) + return_init + ::Book.basic_info + ::Book.order_desc + limit(Limit)
	end
end