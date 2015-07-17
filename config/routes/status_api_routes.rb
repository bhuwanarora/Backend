ReadersDoor::Application.routes.draw do
  #############################################
  #API ROUTES
  #############################################
  namespace :api do
    namespace :v0 do
      	match "create_status"                                  => 'status_api#create',                              :via => [:post, :get, :put]
    end
  end
end