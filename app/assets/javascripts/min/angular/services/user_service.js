homeApp.service("userService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(c){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert(d.ServerError)};return a.get(c).then(f,g),e.promise},f=function(c,e){var f=b.defer(),g=function(a){return f.resolve(a.data)},h=function(a){if(500==a.status)alert(d.ServerError);else if(403==a.status)return f.reject(a)};return a.post(c,e).then(g,h),f.promise};this.recover_password=function(a){return e("/api/v0/recover_password?"+a)},this.get_user=function(){return e("/api/v0/user")},this.get_detailed_info=function(a){return e(angular.isDefined(a)?"/api/v0/user_profile_info?id="+a:"/api/v0/user_profile_info")},this.logout=function(){return e("/api/v0/logout")},this.get_followed_by=function(){return e("/api/v0/followed_by")},this.save_feedback=function(a){return f("/api/v0/save_feedback",a)},this.save_user_info=function(a){return f("/api/v0/save_info",a)},this.handle_facebook_user=function(a){return f("/api/v0/fb",a)},this.handle_google_user=function(a){return f("/api/v0/google",a)},this.authenticate=function(a){return f("/api/v0/authenticate",a)},this.update_profile=function(a){return f("/api/v0/profile",a)},this.get_user_details=function(a){return e(angular.isDefined(a)?"/api/v0/user_details?id="+a:"/api/v0/user_details")},this.get_personal_notifications=function(){return e("/api/v0/personal_notifications")},this.get_notifications=function(a,b,c){return e(angular.isDefined(b)?angular.isDefined(c)?"/api/v0/notifications?skip_count="+a+"&id="+b+"&debug="+!0:"/api/v0/notifications?skip_count="+a+"&id="+b:"/api/v0/notifications?skip_count="+a)},this.get_influential_books=function(){return e("/api/v0/get_influential_books")},this.get_latest_notification=function(){return e("/api/v0/latest_notification")},this.get_info_data=function(){return e("/api/v0/info_data")},this.get_personal_feed=function(a){return e(angular.isDefined(a)?"/api/v0/notifications?id="+a:"/api/v0/notifications")},this.get_feed=function(a){return e(angular.isDefined(a)?"/api/v0/feed_news?id="+a:"/api/v0/feed_news")},this.news_visited=function(a){return e("/api/v0/news_visited?id="+a)},this.follow=function(a,b){return f("/api/v0/follow?id="+a+"&status="+b)},this.get_blog_feed=function(a){return a=a||0,e("/api/v0/feed_blog?skip_count="+a)},this.get_last_blog=function(){return e("/api/v0/last_blog")},this.get_regions=function(){return e("/api/v0/regions")}}]);