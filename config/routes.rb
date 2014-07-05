require 'resque/server'
ReadersDoor::Application.routes.draw do
  resources :facebooks

  mount Resque::Server, :at => "/resque"
#  mount MadChatter::RailsEngine => "/chat"
  
  mount RailsAdmin::Engine => '/admin', :as => 'rails_admin'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
  resources :tags

  resources :categories

  resources :prizes

  resources :books

  resources :users

  resources :authors

  resources :edges

  resources :human_profiles

  resources :chat_messages

  resources :website

  get 'recommended_books'     => "recommendations#books",    :as => "recommended_books"
  get 'recommendations'          => "recommendations#index",    :as => "recommendations"

  get 'random_quote'             => "website#random_quote",    :as => "random_quote"
  get 'coming_soon'              => "website#coming_soon",     :as => "coming_soon"
  get "invalid_user"             => "users#invalid_user",      :as => "invalid_user"
  post "books/find_by_isbn"      => "books#find_by_isbn",      :as => "find_book_by_isbn"
  post "books/remove_tag"        => "books#remove_tag",        :as => "remove_tag_for_book"
  post "books/add_tag"           => "books#add_tag",           :as => "add_tag_for_book"
  get "search_books"             => "books#search",            :as => "search_books"
  get "tags_by_chr"              => "tags#get_by_chr",         :as => "tags_by_chr"
  get "logs_by_tag"              => "logs#get_by_tag",         :as => "logs_by_tag"
  get "logs_by_user"             => "logs#get_by_user",        :as => "logs_by_user"
  get "logout"                   => "users#logout",            :as => "logout_user"
  get "add_tag_to_subcategory"   => "tags#map",                :as => "add_tag_to_subcategory"
  get "remove_tag_from_subcategory" => "tags#unmap",           :as => "remove_tag_from_subcategory"
  get "test"                     => "users#test",              :as => "test"

  get "new_child_category"      => "categories#new_child_category", :as => "new_child_category"
  post "add_child_category"     => "categories#add_child_category", :as => "add_child_category"
  post "email_subscription"     => "website#email_subscription",    :as => "email_subscription"

  get  "freebase"                => "tests#freebase",                  :as => "freebase"
  get  "freebase_search"         => "tests#freebase_search",           :as => "freebase_search"
  get  "freebase_resource"       => "tests#freebase_resource",         :as => "freebase_resource"
  get "horizontal_scroll"        => "tests#horizontal_scroll",         :as => "horizontal_scroll"
  get "angular_test"             => "tests#angular_test",              :as => "angular_test"

  get "verify"                   => "users#verify",                     :as => "verify"   
  get "trends"                   => "books#trends",                     :as => "trends"   
  get "thumbs"                   => "books#thumbs",                     :as => "thumbs"
  get "book_count"               => "books#count",                      :as => "get_book_count"
  # root :to => "website#coming_soon"
  root :to => "recommendations#index"

  get 'tree'                      => "categories#show_tree",  :as => "show_tree"
  get 'search_tag'                => "tags#search_tag",       :as => "search_tag"
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
