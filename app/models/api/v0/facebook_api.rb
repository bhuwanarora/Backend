module Api
	module V0
		class FacebookApi
			def self.map params
				name = params["name"]
				author = params["written_by"]
				facebook_id = params["id"]
				original_book_id = Book.get_by_unique_index("#{name.to_s.search_ready.strip}#{author.to_s.search_ready.strip}").execute[0]['book_id'] rescue ""
				if original_book_id.present?
					relations = FacebookBook.get_relations(facebook_id).execute[0]
					(FacebookBook.new(facebook_id).handle_relations(original_book_id, relations) + Book.set_facebook_book(facebook_id) + " WITH book AS facebook_book " +  FacebookBook.new(facebook_id).map(params)).execute 
				else
					(FacebookBook.new(facebook_id).match + FacebookBook.where_not_book + FacebookBook.new(facebook_id).map(params)).execute   	
				end  
			end
		end
	end
end