ReadersDoor::Application.routes.draw do
  #############################################
  #API ROUTES
  #############################################
  namespace :api do
    namespace :v0 do
      match "get_books"                              => 'infinity_api#get_books',                       :via => [:put, :get, :post]
    end
  end
end