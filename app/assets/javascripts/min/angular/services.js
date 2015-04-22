angular.module("d3",[]).service("d3Service",["$http","$q","$rootScope","WebsiteUIConstants",function(){var a;return a}]);;homeApp.service("searchService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(e){var f=b.defer(),g=function(a){return f.resolve(a.data)},h=function(a){c.user.loading=!1,500==a.status&&alert(d.ServerError)};return a.get(e).then(g,h),f.promise};this.raw=function(a,b){return e(angular.isDefined(b)?"/api/v0/search?q="+a+"&type="+b:"/api/v0/search?q="+a)},this.raw_detailed=function(a,b){return e(angular.isDefined(b)?"/api/v0/search_detailed?q="+a+"&type="+b:"/api/v0/search_detailed?q="+a)}}]);;homeApp.service("statusService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(c,e){var f=b.defer(),g=function(a){return f.resolve(a.data)},h=function(a){if(500==a.status)alert(d.ServerError);else if(403==a.status)return f.reject(a)};return a.post(c,e).then(g,h),f.promise};this.post_status=function(a){var a=angular.toJson(a);return e("/api/v0/create_status",a)}}]);;homeApp.service("feedService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(c){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert(d.ServerError)};return a.get(c).then(f,g),e.promise};this.get_feed=function(a){return e("/api/v0/feed?skip_count="+a)},this.get_notifications=function(){return e("/api/v0/personal_notifications")}}]);;homeApp.service("userService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(c){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert(d.ServerError)};return a.get(c).then(f,g),e.promise},f=function(c,e){var f=b.defer(),g=function(a){return f.resolve(a.data)},h=function(a){if(500==a.status)alert(d.ServerError);else if(403==a.status)return f.reject(a)};return a.post(c,e).then(g,h),f.promise};this.recover_password=function(a){return e("/api/v0/recover_password?"+a)},this.get_user=function(){return e("/api/v0/user")},this.get_detailed_info=function(a){return e(angular.isDefined(a)?"/api/v0/user_profile_info?id="+a:"/api/v0/user_profile_info")},this.logout=function(){return e("/api/v0/logout")},this.get_followed_by=function(){return e("/api/v0/followed_by")},this.save_feedback=function(a){return f("/api/v0/save_feedback",a)},this.save_user_info=function(a){return f("/api/v0/save_info",a)},this.handle_facebook_user=function(a){return f("/api/v0/fb",a)},this.handle_google_user=function(a){return f("/api/v0/google",a)},this.authenticate=function(a){return f("/api/v0/authenticate",a)},this.update_profile=function(a){return f("/api/v0/profile",a)},this.get_user_details=function(a){return e(angular.isDefined(a)?"/api/v0/user_details?id="+a:"/api/v0/user_details")},this.get_personal_notifications=function(){return e("/api/v0/personal_notifications")},this.get_notifications=function(a,b,c){return e(angular.isDefined(b)?angular.isDefined(c)?"/api/v0/notifications?skip_count="+a+"&id="+b+"&debug="+!0:"/api/v0/notifications?skip_count="+a+"&id="+b:"/api/v0/notifications?skip_count="+a)},this.get_influential_books=function(){return e("/api/v0/get_influential_books")},this.get_latest_notification=function(){return e("/api/v0/latest_notification")},this.get_info_data=function(){return e("/api/v0/info_data")},this.get_personal_feed=function(a){return e(angular.isDefined(a)?"/api/v0/notifications?id="+a:"/api/v0/notifications")},this.get_feed=function(){return e("/api/v0/get_feed")},this.news_visited=function(a){return e("/api/v0/news_visited?id="+a)}}]);;homeApp.service("genreService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(c){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert(d.ServerError)};return a.get(c).then(f,g),e.promise};this.search_genres=function(a){return e("/api/v0/search?q="+a+"&type=Genre")},this.get_genres=function(){return e("/api/v0/genres")}}]);;homeApp.service("bookService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(){if(angular.isDefined(c.reader))var a=c.reader.id;else var a=c.user.id;return a},f=function(c){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert(d.ServerError)};return a.get(c).then(f,g),e.promise},g=function(c,e){var f=b.defer(),g=function(a){return f.resolve(a.data)},h=function(a){if(500==a.status)alert(d.ServerError);else if(403==a.status)return f.reject(a)};return a.post(c,e).then(g,h),f.promise};this.get_basic_book_details=function(a){return f("/api/v0/basic_book?id="+a)},this.handle_facebook_books=function(a){return g("/api/v0/fb_books",a)},this.get_book_details=function(a){return f("/api/v0/book?"+a)},this.handle_influential_books=function(a,b){return f("/api/v0/influential_books?id="+a+"&status="+b)},this.get_books_bookmarked=function(a){return f("/api/v0/books_bookmarked?skip_count="+a+"&id="+e())},this.get_books_read=function(a){return f("/api/v0/books_read?skip_count="+a+"&id="+e())},this.search_books=function(a,b){return f("/api/v0/search?q="+a+"&skip="+b+"&type=Book")},this.get_popular_books=function(a){return f("/api/v0/popular_books?q="+a)},this.books_on_signup=function(a){return f("/api/v0/books_on_signup?q="+a)},this.endorse_book=function(a,b){return f("/api/v0/endorse_book?id="+a+"&status="+b)},this.update_visited=function(a){return f("/api/v0/update_visited?id="+a)},this.get_feed=function(a,b){return f("/api/v0/book_feed?id="+a+"&skip_count="+b)},this.rate_book=function(a,b){return f("/api/v0/rate?id="+a+"&data="+b)},this.get_real_news=function(a){return f("/api/v0/book_news?id="+a)}}]);;homeApp.service("authorService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(c){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert(d.ServerError)};return a.get(c).then(f,g),e.promise};this.search_authors=function(a){return e("/api/v0/search?q="+a+"&type=Author")},this.get_popular_authors=function(a){return e("/api/v0/popular_authors?skip_count="+a)},this.get_details=function(a){return e("/api/v0/author_details?id="+a)}}]);;homeApp.service("shelfService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(e){var f=b.defer(),g=function(a){return f.resolve(a.data)},h=function(a){c.user.loading=!1,500==a.status&&alert(d.ServerError)};return a.get(e).then(g,h),f.promise};this.get_all_shelves=function(){return e("/api/v0/labels")},this.add_new_label=function(a){return e("/api/v0/add_new_label?label="+a)},this.bookmark=function(a){return a=angular.toJson(a),e("/api/v0/bookmark?q="+a)}}]);