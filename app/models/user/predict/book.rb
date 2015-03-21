class User::Predict::Book < User::Predict
	Limit = 30


	def initialize(user_id, skip_count)
		@user_id = user_id
		@skip_count = skip_count
		@user = User.new(user_id)
	end

	def likely_books_read
		range = @user.get_init_book_count_range.execute[0]["init_book_read_count"]
		case range
		when Constants::ChildBookCountRange
			data = handle_few_books_read
		when Constants::AdoloscentBookCountRange
			data = handle_average_number_books_read
		when Constants::AboutToBeAdultBookCountRange
			data = handle_average_number_books_read
		when Constants::AdultBookCountRange
			data = handle_average_number_books_read
		when Constants::AboutToDieBookCountRange
			data = handle_average_number_books_read
		end
		data
	end

	def handle_average_number_books_read
	 	
	end

	def handle_few_books_read 
		#FIXME path nodes are increasing with scroll
		clause = @user.match + UsersBook.optional_match_mark_as_read + UsersBook.optional_match_rating + return_init +  ::Book.basic_info + ::Book.rating + ::Book.mark_as_read
		data = clause.execute

		has_linked_books = data[0]["book_id"].blank? ? false : true rescue false
		unless has_linked_books
			clause =  ::Book::SmallRead.path_nodes_after(@skip_count) + return_init + ::Book.basic_info + ::Book.order_desc + limit(Limit)
			data = clause.execute
		end
		data
	end
end