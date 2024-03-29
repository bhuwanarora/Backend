class Bookmark::Type::ReadButCantRememberASingleThingAboutIt < Bookmark::Type
	def initialize(user_id, book_id)
		@key = "ReadButCantRememberASingleThingAboutIt"
		@user_id = user_id
		@book_id = book_id
		@bookmark = Bookmark.new(@user_id, @book_id, @key)
	end

	def self.match user_id
		@key ||= "ReadButCantRememberASingleThingAboutIt"
		" OPTIONAL MATCH (user)-[:Labelled]->(label:Label{key:\""+@key+"\"})-[bookmarked_on:BookmarkedOn]->(bookmark_node:BookmarkNode)-[bookmark_action:BookmarkAction]->(book:Book) WHERE bookmark_node.user_id = " + user_id.to_s + " WITH user, label, bookmark_node, book "
	end

	def self.get_all user_id
		@key ||= "ReadButCantRememberASingleThingAboutIt"
		Bookmark::Type::ReadButCantRememberASingleThingAboutIt.match(user_id) + " RETURN " + Book.basic_info
	end

	def add
		@bookmark.add
	end

	def remove
		@bookmark.remove
	end
end