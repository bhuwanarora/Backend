websiteApp.service("websiteService",["$http","$q","$rootScope",function(a,b,c){this.recover_password=function(a){return _deferred_request("/api/v0/recover_password?"+a)},this.handle_facebook_books=function(a){return _deferred_post_request("/api/v0/fb_books",a)},this.test=function(a){return _deferred_post_request("/api/v0/test",a)},this.get_user=function(){return _deferred_request("/api/v0/user")},this.get_detailed_info=function(a){return _deferred_request("/api/v0/user_profile_info?id="+a)},this.logout=function(){return _deferred_request("/api/v0/logout")},this.get_followed_by=function(){return _deferred_request("/api/v0/followed_by")},this.save_feedback=function(a){return _deferred_post_request("/api/v0/save_feedback",a)},this.save_user_info=function(a){return _deferred_post_request("/api/v0/save_info",a)},this.handle_facebook_user=function(a){return _deferred_post_request("/api/v0/fb",a)},this.handle_google_user=function(a){return _deferred_post_request("/api/v0/google",a)},this.get_book_details=function(a){return _deferred_request("/api/v0/book?"+a)},this.get_books_bookmarked=function(a){return _deferred_request("/api/v0/books_bookmarked?skip_count="+a+"&id="+_user_id())},this.get_books_read=function(a){return _deferred_request("/api/v0/books_read?skip_count="+a+"&id="+_user_id())},this.search_books=function(a,b){return _deferred_request("/api/v0/search_books?q="+a+"&skip="+b)},this.search_authors=function(a){return _deferred_request("/api/v0/search_authors?"+a)},this.search_genres=function(a){return _deferred_request("/api/v0/search_genres?"+a)},this.get_trending_topics=function(){return _deferred_request("/api/v0/trends")},this.authenticate=function(a){return _deferred_post_request("/api/v0/authenticate",a)},this.update_profile=function(a){return _deferred_post_request("/api/v0/profile",a)},this.get_user_details=function(a){return _deferred_request(angular.isDefined(a)?"/api/v0/user_details?id="+a:"/api/v0/user_details")},this.get_genres=function(){return _deferred_request("/api/v0/genres")},this.get_background_image=function(){return _deferred_request("/api/v0/image")},this.get_personal_notifications=function(){return _deferred_request("/api/v0/personal_notifications")},this.get_notifications=function(a,b,c){return _deferred_request(angular.isDefined(b)?angular.isDefined(c)?"/api/v0/notifications?skip_count="+a+"&id="+b+"&debug="+!0:"/api/v0/notifications?skip_count="+a+"&id="+b:"/api/v0/notifications?skip_count="+a)},this.get_latest_notification=function(){return _deferred_request("/api/v0/latest_notification")},this.search=function(a,b,c){return _deferred_request("/api/v0/search?count="+c+"&q="+a+"&t="+b)},this.get_info_data=function(){return _deferred_request("/api/v0/info_data")},this.get_popular_books=function(a){return _deferred_request("/api/v0/popular_books?skip_count="+a)},this.get_popular_authors=function(a){return _deferred_request("/api/v0/popular_authors?skip_count="+a)},_user_id=function(){if(angular.isDefined(c.reader))var a=c.reader.id;else var a=c.user.id;return a},_deferred_request=function(c){var d=b.defer(),e=function(a){return d.resolve(a.data)},f=function(a){500==a.status&&alert(WebsiteUIConstants.ServerError)};return a.get(c).then(e,f),d.promise},_deferred_post_request=function(c,d){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){if(500==a.status)alert(WebsiteUIConstants.ServerError);else if(403==a.status)return e.reject(a)};return a.post(c,d).then(f,g),e.promise}}]);