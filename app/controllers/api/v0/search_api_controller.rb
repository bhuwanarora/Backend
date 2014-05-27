module Api
	module V0
		class SearchApiController < ApplicationController
			def search
				query_params = params[:q].strip
				count = params[:count].to_i
				type = params[:t]
				results = SearchApi.search(query_params, count, type)
				render :json => {:results => results}, :status => 200
			end

		end
	end
end