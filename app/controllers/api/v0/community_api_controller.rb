module Api
	module V0
		class CommunityApiController < ApplicationController
			def get_books
				community_id = params[:community_id]
				info  = Api::V0::CommunityApi.get_books community_id
				render :json => info, :status => 200
			end

			def get_users
				user_id = session[:user_id]
				info  = Api::V0::CommunityApi.get_users community_id
				render :json => info, :status => 200
			end

			def get_communities_chronologically
				user_id = session[:user_id]
				info  = Api::V0::CommunityApi.get_communities_chronologically community_id
				render :json => info, :status => 200
			end
		end
	end
end