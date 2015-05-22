module Api
	module V0
		class SearchApiController < ApplicationController

			def search
				query_params = params[:q].strip
				count = params[:count].to_i
				type = params[:type]
				puts type.to_s.white
				if !(session[:query] == query_params and session[:query_type] == type) 
					puts " search with params"
					results = SearchApi.search(params)
					session[:query] = query_params
					session[:query_type] = type
					session[:scroll_id] = results["scroll_id"] if results["scroll_id"].present?
					results = results["results"]
				elsif session[:scroll_id].present?
					puts " search with scroll id "
					results = SearchApi.search_by_scroll_id(session[:scroll_id])
					session[:scroll_id] = results["scroll_id"] if (results.present? && results["scroll_id"].present?)
					results = results["results"]
				else
					puts " search rest all "
					results = SearchApi.search(params)["results"]
				end
				puts query_params.to_s.white
				puts session[:query].to_s.white
				puts session[:scroll_id].to_s.red rescue ""
				puts results.to_s.green
				render :json => results, :status => 200
			end
		end
	end
end