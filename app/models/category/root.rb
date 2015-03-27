class Category::Root < Category

	def self.basic_info
		super("root_category")
	end

	def self.get_books skip, length
		super("root_category", skip, length)
	end

	def self.get_books_for_user skip, length
		super("root_category", skip, length)
	end

	def self.get_all
		" MATCH (root_category:Category{is_root:true}) " + self.basic_info
	end
end