module Api
	module V0
		class AuthorsApiController < ApplicationController
			def get_similar_authors
				user_uuid = params[:id]
				author_uuid = params[:author_id]
				if user_uuid && author_uuid
					info = AuthorApi.get_similar_authors(user_uuid, author_uuid)
					status = 200
				else
					info = {:message => "Invalid Request"}
					status = 400
				end
				render :json => info, :status => status
			end

			def get_author_details
				author_uuid = params[:author_id]
				if author_id
					info = AuthorApi.get_author_details
					status = 200
				else
					info = {:message => "Invalid Request"}
					status = 400
				end
				render :json => info, :status => status
			end

			def get_popular_authors
				authors = AuthorApi.get_popular_authors params
				render :json => authors, :status => 200
			end


		end
	end
end