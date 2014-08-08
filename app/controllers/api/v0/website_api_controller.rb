module Api
	module V0
		class WebsiteApiController < ApplicationController
			def genres
                @neo ||= neo_init
				filter = params[:q]
                genres = WebsiteApi.get_root_categories(session[:user_id])
                
				render :json => genres, :status => 200
			end
			
			def book_lists
				@neo = Neography::Rest.new
				clause = "MATCH (bg:BookGrid) RETURN ID(bg), bg.name"
				info = @neo.execute_query(clause)["data"]
				render :json => info, :status => 200
			end

			def trends
				neo = Neography::Rest.new
    			clause = "MATCH (t:Trending) WHERE t.status = 1 RETURN t.name, ID(t), t.timestamp"
    			puts clause.blue.on_red
    			trends = neo.execute_query(clause)["data"]
				render :json => trends, :status => 200
			end

			def countries
				filter = params[:q]
				results = {:countries => CountryGroup.all}
				render :json => results, :status => 200
			end

            def labels
                labels = WebsiteApi.get_labels session[:user_id]
                render :json => labels, :status => 200
            end

            def times
                time_groups = WebsiteApi.get_time_groups
                results = {:times => time_groups}
                render :json => results, :status => 200
            end

            def read_times
                @neo ||= neo_init
                clause = "MATCH (r:ReadTime) RETURN r"
                puts clause.blue.on_red
                read_times = @neo.execute_query(clause)["data"]
                results = {:read_times => read_times}
                render :json => results, :status => 200
            end

			def get_user_details
				info = UserApi.get_details session[:user_id]				
				render :json => info, :status => 200
			end

			def authenticate
				authentication_info = UserApi.authenticate(session, params)
				if authentication_info[:authenticate]
					render :json => authentication_info, :status => 200
				else
					render :json => authentication_info, :status => 403
				end
			end

			def update_profile
				profile_status = params[:user['profile_status']]
				profile_status = profile_status + 1;
				render :json => {:message => "success", :profile_status => profile_status, :user_id => 1}, :status => 200
			end

			def image
				image_url = SearchPage.all(:order => "RANDOM()").first.background_image_url
				render :json => {:url => image_url}, :status => 200
			end

			def notifications
				news_feed = WebsiteApi.get_news_feed session[:user_id]
				render :json => {:notifications => news_feed}, :status => 200
			end

			def latest_notification
				news_feed = WebsiteApi.get_latest_notification session[:user_id]
				render :json => {:notifications => news_feed}, :status => 200
			end

			def save_feedback
				WebsiteApi.save_feedback(params[:feedback], session[:user_id])
				render :json => {:message => "Success"}, :status => 200
			end

            private
            def neo_init
                @neo = Neography::Rest.new
            end

		end
	end
end