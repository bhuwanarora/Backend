ReadersDoor::Application.routes.draw do
  #############################################
  #API ROUTES
  #############################################
  namespace :api do
    namespace :v0 do
      
      match "user_details"                            => 'users_api#get_user_details',                  :via => [:put, :get, :post]
      match "user_profile_info"                       => 'users_api#user_profile_info',                 :via => [:put, :get, :post]
      match "authenticate"                            => 'users_api#authenticate',                      :via => [:put, :get, :post]
      match "profile"                                 => 'users_api#update_profile',                    :via => [:put, :get, :post]
      match "image"                                   => 'users_api#image',                             :via => [:put, :get, :post]
      match "personal_notifications"                  => 'users_api#notifications',                     :via => [:put, :get, :post]
      match "recover_password"                        => 'users_api#recover_password',                  :via => [:put, :get, :post]
      match "logout"                                  => 'users_api#logout',                            :via => [:put, :get, :post]
      match 'save_info'                               => 'users_api#save_info',                         :via => [:put, :get, :post]
      match 'mar'                                     => 'users_api#mark_as_read',                      :via => [:put, :get, :post]
      match 'recommend'                               => 'users_api#recommend',                         :via => [:put, :get, :post]
      match 'bookmark'                                => 'users_api#bookmark',                          :via => [:put, :get, :post]
      match 'comment'                                 => 'users_api#comment',                           :via => [:put, :get, :post]
      match 'wdyf'                                    => 'users_api#what_do_you_feel_about_this_book',  :via => [:put, :get, :post]
      match 'time'                                    => 'users_api#time',                              :via => [:put, :get, :post]
      match 'rate'                                    => 'users_api#rate',                              :via => [:put, :get, :post]
      match 'own'                                     => 'users_api#own',                               :via => [:put, :get, :post]
      match 'like'                                    => 'users_api#like',                              :via => [:put, :get, :post]
      match 'dislike'                                 => 'users_api#dislike',                           :via => [:put, :get, :post]
      match 'post_review'                             => 'users_api#post_review',                       :via => [:put, :get, :post]
      match 'edit_review'                             => 'users_api#edit_review',                       :via => [:put, :get, :post]
      match 'follow'                                  => 'users_api#follow',                            :via => [:put, :get, :post]
      match "endorse_book"                            => 'users_api#endorse_book',                      :via => [:put, :get, :post]
      match "tiny_reads"                              => 'users_api#get_tiny_reads',                    :via => [:put, :get, :post]
      match "get_sorted_genres"                       => 'users_api#get_sorted_genres',                 :via => [:put, :get, :post]
      match "influential_books"                       => 'users_api#handle_influential_books',          :via => [:put, :get, :post]
      match "get_influential_books"                   => 'users_api#get_influential_books',             :via => [:put, :get, :post]

      match 'user_info'                               => 'users_api#user_info',                         :via => [:put, :get, :post]
      match 'user'                                    => 'users_api#user',                              :via => [:put, :get, :post]
      match 'friends'                                 => 'users_api#get_most_connected_friends',        :via => [:put, :get, :post]
      match 'followed_by'                             => 'users_api#get_followed_by',                   :via => [:put, :get, :post]
      
      match 'info_data'                               => 'users_api#get_info_card_data',                :via => [:put, :get, :post]
      match 'books_read'                              => 'users_api#books_read',                        :via => [:put, :get, :post]
      match 'books_bookmarked'                        => 'users_api#books_bookmarked',                  :via => [:put, :get, :post]
      match 'fb'                                      => 'users_api#fb',                                :via => [:put, :get, :post]
      match 'google'                                  => 'users_api#google',                            :via => [:put, :get, :post]
      match 'small_reads'                             => 'users_api#get_small_reads',                   :via => [:put, :get, :post]
      match 'books_from_favourite_author'             => 'users_api#get_books_from_favourite_author',   :via => [:put, :get, :post]
      match 'books_from_favourite_category'           => 'users_api#get_books_from_likeable_category',  :via => [:put, :get, :post]
      match 'books_from_favourite_era'                => 'users_api#get_books_from_favourite_era',      :via => [:put, :get, :post]
      match 'books_on_friends_shelves'                => 'users_api#get_books_on_friends_shelves',      :via => [:put, :get, :post]
      match 'books_from_unexplored_subjects'          => 'users_api#get_books_from_unexplored_subjects',:via => [:put, :get, :post]
      # match 'get_feed'                                => 'users_api#get_feed',                          :via => [:put, :get, :post]
      match 'followers'                               => 'users_api#get_followers',                     :via => [:put, :get, :post]
      match 'users_followed'                          => 'users_api#get_users_followed',                :via => [:put, :get, :post]
      match 'news_visited'                            => 'users_api#news_visited',                      :via => [:put, :get, :post]
      match 'borrow_users'                            => 'users_api#get_lenders',                       :via => [:put, :get, :post]
      match 'follow_community'                        => 'users_api#follow_community',                  :via => [:put, :get, :post]
      match 'intro'                                   => 'users_api#set_intro_seen_status',             :via => [:put, :get, :post]
      match 'set_region'                              => 'users_api#set_region',                        :via => [:put, :get, :post]
      match "get_bookmarks"                           => 'users_api#get_bookmarks',                     :via => [:put, :get, :post]
      match "search_friends"                          => 'users_api#search_friends',                    :via => [:put, :get, :post]
      match "social_books"                            => 'users_api#social_books',                      :via => [:put, :get, :post]
      match "get_communities"                         => 'users_api#get_communities',                   :via => [:put, :get, :post]
      match "notify_borrow"                           => 'users_api#notify_borrow',                     :via => [:put, :get, :post]
      match "get_friends_of_friend"                   => 'users_api#get_friends_of_friend',             :via => [:put, :get, :post]
      match "get_social_feed"                         => 'users_api#get_social_feed',                   :via => [:put, :get, :post]
      match "get_global_feed"                         => 'users_api#get_global_feed',                   :via => [:put, :get, :post]
      match "invite"                          => 'users_api#invite',
                            :via => [:get]
    end
  end
end