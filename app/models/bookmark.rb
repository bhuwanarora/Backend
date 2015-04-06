class Bookmark < Neo

	def initialize(user_id, book_id, key)
		@user_id = user_id
		@book_id = book_id
		@key = key
	end

	def self.match_not media
		" WHERE NOT (user)-[:Labelled]->(:Label)-[:BookmarkedOn]->(:BookmarkNode)-[:BookmarkAction]->(" + media.downcase + ") "
	end

	def self.match_path media, end_label_defined=false, label="user"
		if end_label_defined
			ending_node = "(" + media.downcase + ")"
		else
			ending_node = "(" + media.downcase + ":"  + media.camelcase + ")"
		end
		" OPTIONAL MATCH (" + label + ")-[labelled:Labelled]->(label:Label)-[bookmarked_on:BookmarkedOn]->(bookmark_node:BookmarkNode)-[bookmark_action:BookmarkAction]->" + ending_node
	end

	def self.optional_match_label media
		" OPTIONAL MATCH (label)-[bookmarked_on:BookmarkedOn]->(bookmark_node:BookmarkNode)-[bookmark_action:BookmarkAction]->" + media
	end

	def match
		" MATCH (user:User), (book:Book), (label:Label) WHERE ID(user)=" + @user_id.to_s + " AND ID(book)=" + @book_id.to_s + " AND label.key = \""+@key+"\" WITH user, book, label "
	end

	def self.match
	 	" OPTIONAL MATCH (user)-[labelled:Labelled]->(label:Label)-[bookmarked_on:BookmarkedOn]->(bookmark_node:BookmarkNode)-[bookmark_action:BookmarkAction]->(book) "
	end

	def create_label_bookmark_node
		" CREATE (label)-[bookmarked_on:BookmarkedOn]->(bookmark_node: BookmarkNode{label:\""+@key+"\", book_id:"+@book_id.to_s+", user_id:"+@user_id.to_s+"}) " 
	end

	def self.create_bookmark_node_book
		" CREATE (bookmark_node)-[bookmark_action:BookmarkAction]->(book) "
	end

	def self.set_title
		" SET bookmark_node.title = book.title "
	end

	def self.set_author_name
		" SET bookmark_node.author = book.author_name "
	end

	def self.set_name
		" SET bookmark_node.name = user.name "
	end

	def self.set_email
		" SET bookmark_node.email=user.email "
	end

	def self.set_isbn
		" SET bookmark_node.isbn = book.isbn "
	end

	def self.set_created_at
		" SET bookmark_node.created_at = " + Time.now.to_i.to_s + " "
	end

	def self.set_updated_at
		" SET bookmark_node.updated_at = " + Time.now.to_i.to_s + " "
	end

	def self.set_thumb
		" SET bookmark_node.thumb = COALESCE(user.thumb,"") "
	end

	def self.label_and_labelled
		", label, labelled "
	end

	def self.set_timestamp
		" SET bookmark_node.timestamp = " + Time.now.to_i.to_s + " "
	end

	def create
		UsersBook.new(@book_id, @user_id).match + User.create_label(@key) + create_label_bookmark_node + Bookmark.create_bookmark_node_book + Bookmark.set_title + Bookmark.set_author_name + Bookmark.set_name + Bookmark.set_email + Bookmark.set_isbn + Bookmark.set_created_at + Bookmark.set_updated_at + " WITH user, book, bookmark_node, label, labelled "
	end

	def add
		operation = "+"
		set_clause = Book.set_bookmark_count(operation) + User.set_bookmark_count(operation) + Label.set_bookmark_count(operation) + UsersLabel.set_bookmark_count(operation) + User.set_total_count(Constants::BookmarkPoints, operation)

		clause = create + User::Feed.new(@user_id).create("bookmark_node") + Bookmark.label_and_labelled + ", book " + Book::Feed.new(@user_id).create("bookmark_node") + Bookmark.label_and_labelled + set_clause
		puts "BOOK BOOKMARKED".green
		clause
	end

	def self.delete_bookmark_relations
		"  DELETE bookmarked_on, bookmark_action WITH user, book, labelled, label, bookmark_node "
	end

	def self.delete_bookmark
		" MATCH ()-[relation]-(bookmark_node) DELETE relation, bookmark_node "
	end

	def remove
		operation = "-"
		set_clause = Book.set_bookmark_count(operation) + User.set_bookmark_count(operation) + Label.set_bookmark_count(operation) + UsersLabel.set_bookmark_count(operation) + User.set_total_count(Constants::BookmarkPoints, operation) + Bookmark.with_group("user", "book", "bookmark_node", "labelled", "label")
		
		feednext_clause = User::Feed.new(@user_id).delete_feed("bookmark_node") + ", book, labelled, label "

		bookfeed_next_clause = Book::Feed.new(@user_id).delete_feed("bookmark_node") + ", labelled, label "

		clause = match + Bookmark::Node::BookLabel.match_path + Bookmark.delete_bookmark_relations + set_clause + feednext_clause + bookfeed_next_clause + Bookmark.delete_bookmark

		puts "REMOVE BOOKMARKED".green
		clause
	end

	def self.have_left_a_mark_on_me
		match_user_to_books_clause = " WITH u, l, m, b OPTIONAL MATCH (u)-->(l)-->(m)-->(b) WITH user, COUNT(DISTINCT book) as total_book_count MATCH (user)-->(label)-->(bookmark)-->(book)-[:FromCategory]->()-[:HasRoot*0..1]->(root_category{is_root:true}) WITH total_book_count, user, root_category "
		match_user_to_category_clause = "OPTIONAL MATCH  (user)-[likes_category:Likes]->(root_category) WITH user, likes_category, root_category, total_book_count MATCH (user)-[likes_category:Likes]->(root_category) "
		set_likeability_index_clause = "SET likes_category.likeability_index = TOFLOAT(likes_category.weight*1.0/total_book_count)"
		clause = match_user_to_books_clause + match_user_to_category_clause + set_likeability_index_clause							
		
		set_favourite_clause = ", likes_category.favourite = true"
		clause	
	end

	def self.basic_info
		" ID(bookmark_node) AS status , bookmark_node.name AS bookmarked_by, bookmark_node.timestamp AS time "
	end

	def self.grouped_basic_info
		" {status: ID(bookmark_node), bookmarked_by: bookmark_node.name, time: bookmark_node.timestamp} AS bookmark_node "
	end
end