class Book::SmallRead < Book
	Limit = 8

	def initialise
		@best_small_read ||= Constant::Id::BestSmallRead
	end

	def self.match_best_read
		@best_small_read ||= Constant::Id::BestSmallRead
		" MATCH (small_read:Book) WHERE ID(small_read) = " + @best_small_read.to_s+"  WITH small_read "
	end

	def self.path
		clause = " MATCH path = (node)-[:NextSmallRead*" + Limit.to_s + "]->(last_node) WITH path "
	end

	def self.path_nodes length
		self.match_best_read + self.nth_node(length) + self.path + ", EXTRACT(n in nodes(path)|n) AS books UNWIND books AS book "
	end

	def self.nth_node length
		self.match_best_read + " MATCH (small_read)-[:NextSmallRead*" + length.to_s + "]->(node) WITH node "
	end

	def self.path_nodes_after skip
		self.nth_node(skip) + self.path_nodes(Limit)
	end

	def self.get_sorted_books skip_count, limit=Limit
		Book::SmallRead.nth_node(skip_count) + Book::SmallRead.path + "," +  Book::SmallRead.extract_unwind("book") + Book::SmallRead.return_init + ::Book.basic_info + ::Book.order_desc + Book::SmallRead.limit(Limit)
	end
end