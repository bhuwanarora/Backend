ReadersDoor::Application.routes.draw do
  #############################################
  #API ROUTES
  #############################################
  namespace :api do
    namespace :v0 do
      match "search"                                 => 'search_api#search',                            :via => [:put, :get, :post]
      match "search_books"                           => 'search_api#search_books',                      :via => [:put, :get, :post]
      match "search_authors"                         => 'search_api#search_authors',                    :via => [:put, :get, :post]
      match "search_genres"                          => 'search_api#search_genres',                     :via => [:put, :get, :post]

    end
  end
end