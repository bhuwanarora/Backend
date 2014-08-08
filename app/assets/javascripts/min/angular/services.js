websiteApp.service("recommendationService",["$http","$q","$rootScope",function(a,b,c){this.get_recommendations=function(){var a=angular.toJson(c.filters);return _deferred_request("/api/v0/recommendations?count=5&q="+a)},this.get_grid_books=function(){return _deferred_request("/api/v0/grid")},this.get_book_lists=function(){return _deferred_request("/api/v0/book_lists")},this.push_recommendations=function(){return _deferred_request("/api/v0/push_recommendations")},this.get_filters=function(){return _deferred_request("/api/v0/filters")},this.get_genres=function(a){return _deferred_request("/api/v0/genres?"+a)},this.get_countries=function(a){return _deferred_request("/api/v0/countries?"+a)},this.get_time_groups=function(){return _deferred_request("/api/v0/times")},this.get_read_times=function(){return _deferred_request("/api/v0/read_times")},this.get_labels=function(){return _deferred_request("/api/v0/labels")},_deferred_request=function(d){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){c.loading=!1,500==a.status&&alert("internal server error")};return a.get(d).then(f,g),e.promise}}]);;websiteApp.service("sharedService",["$timeout","$rootScope","widgetService","websiteService","stropheService",function(a,b,c,d,e){this.is_logged_in=function(a){d.get_user().then(function(c){c.logged_in&&(b.user.logged=!0,b.user.id=c.id,a.$emit("getNotifications"),d.get_user_details().then(function(a){angular.extend(b.user,a)}),e.start_connection())})},this.mark_as_read=function(d,e,f){var g=e.title,h=e.author_name;if(e.status){e.status=!1;var i=b.user.books.read.indexOf(e);b.user.books.read.splice(i,1);var j="SUCCESS-Removed from <span class='icon-books'></span> Books Read. ";b.user.book_read_count=b.user.book_read_count-1;var k=5,l=angular.isDefined(e.user_rating)&&null!=e.user_rating,m=angular.isDefined(e.time_index)&&null!=e.time_index;l&&(delete e.user_rating,k+=10),m&&(delete e.time_index,k+=10),b.$broadcast("gamifyCount",k,!1)}else{if(b.user.name)var n=b.user.name;else var n=b.user.email;var j="<span><b>"+n+"</b> </span><br/><span> added </span><span class='site_color'>"+g+"</span>&nbsp;to&nbsp;<span class='icon-books'></span><span>&nbsp;books read.</span>",o="assets/profile_pic.jpeg",p={thumb:o,message:j,timestamp:(new Date).getTime(),book:{id:e.id,title:g,author_name:h,isbn:e.isbn},user:{id:b.user.id,name:n}};b.$broadcast("gamifyCount",5,!0),b.user.book_read_count=b.user.book_read_count+1,d.$emit("addToNotifications",p),e.status=!0,b.user.books.read.push(e),j="SUCCESS-Added to <span class='icon-books'></span> Books Read. "}c.mark_as_read(e.id,e.status);var q=notify(b,j,a);d.$on("destroy",function(){a.cancel(q),a.cancel(glow_event)}),f.stopPropagation()}}]);;websiteApp.factory("appSocket",["socketFactory",function(a){var b=a();return b.forward("error"),b}]);;websiteApp.service("stropheService",["$rootScope",function(a){this.start_connection=function(){var b=function(a){if(a==Strophe.Status.CONNECTED){var b=new Strophe.Builder("presence");this.connection.send(b),this.connection.addHandler(function(){return!0},null,"presence")}return!0};if(angular.isDefined(a.user.email))var c=a.user.email.split("@");else var c="admin";c[0]=c[0].concat("@misha-pc");var d=a.user.password;this.connection=new Strophe.Connection("http://localhost:5280/http-bind"),this.connection.connect(c[0],d,b)},this.send_notification=function(a){var b=function(){return!0},c="abclearner2@misha-pc",d=new Strophe.Builder("message",{to:c,type:"notification"}).c("body").t(a);this.connection.addHandler(b,null,"message","notification"),this.connection.send(d)}}]);;websiteApp.service("websiteService",["$http","$q","$rootScope",function(a,b){this.get_user=function(){return _deferred_request("/api/v0/user")},this.save_feedback=function(a){return _deferred_post_request("/api/v0/save_feedback",a)},this.save_user_info=function(a){return _deferred_post_request("/api/v0/save_info",a)},this.handle_facebook_user=function(a){return _deferred_post_request("/api/v0/fb",a)},this.handle_google_user=function(a){return _deferred_post_request("/api/v0/google",a)},this.get_book_details=function(a){return _deferred_request("/api/v0/book?"+a)},this.get_books_bookmarked=function(a){return _deferred_request("/api/v0/books_bookmarked?skip_count="+a)},this.get_books_read=function(a){return _deferred_request("/api/v0/books_read?skip_count="+a)},this.search_books=function(a){return _deferred_request("/api/v0/search_books?q="+a)},this.search_authors=function(a){return _deferred_request("/api/v0/search_authors?q="+a)},this.search_genres=function(a){return _deferred_request("/api/v0/search_genres?"+a)},this.get_trending_topics=function(){return _deferred_request("/api/v0/trends")},this.authenticate=function(a){return _deferred_post_request("/api/v0/authenticate",a)},this.update_profile=function(a){return _deferred_post_request("/api/v0/profile",a)},this.get_user_details=function(){return _deferred_request("/api/v0/user_details")},this.get_genres=function(){return _deferred_request("/api/v0/genres")},this.get_background_image=function(){return _deferred_request("/api/v0/image")},this.get_notifications=function(){return _deferred_request("/api/v0/notifications")},this.get_latest_notification=function(){return _deferred_request("/api/v0/latest_notification")},this.search=function(a,b,c){return _deferred_request("/api/v0/search?count="+c+"&q="+a+"&t="+b)},this.get_info_data=function(){return _deferred_request("/api/v0/info_data")},this.get_popular_books=function(a){return _deferred_request("/api/v0/popular_books?skip_count="+a)},this.get_popular_authors=function(a){return _deferred_request("/api/v0/popular_authors?skip_count="+a)},_deferred_request=function(c){var d=b.defer(),e=function(a){return d.resolve(a.data)},f=function(a){500==a.status&&alert("internal server error")};return a.get(c).then(e,f),d.promise},_deferred_post_request=function(c,d){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){if(500==a.status)alert("internal server error");else if(403==a.status)return e.reject(a)};return a.post(c,d).then(f,g),e.promise}}]);;websiteApp.service("widgetService",["$http","$q","$rootScope",function(a,b){this.get_book_feed=function(a){return _deferred_request("/api/v0/book_feed?id="+a)},this.save_genre=function(a){return _deferred_post_request("/api/v0/save_genre",a)},this.populate_tooltips=function(a){return _deferred_request("/api/v0/tooltip?id="+a)},this.mark_as_read=function(a,b){return _deferred_post_request("/api/v0/mar",{book_id:a,data:b})},this.recommend=function(a){return _deferred_post_request("/api/v0/recommend",a)},this.bookmark=function(a){return _deferred_post_request("/api/v0/bookmark",a)},this.comment=function(a){return _deferred_post_request("/api/v0/comment",a)},this.what_do_you_feel=function(a,b,c){return _deferred_post_request("/api/v0/wdyf",{id:a,type:b,data:c})},this.record_time=function(a,b){return _deferred_post_request("/api/v0/time",{id:a,data:b})},this.rate_this_book=function(a){return _deferred_post_request("/api/v0/rate",a)},this.own_this_book=function(a,b){return _deferred_post_request("/api/v0/own",{book_id:a,data:b})},this.like=function(a,b){return _deferred_post_request("/api/v0/like",{id:a,type:b})},this.dislike=function(a,b){return _deferred_post_request("/api/v0/dislike",{id:a,type:b})},this.post_a_review=function(a,b){return _deferred_post_request("/api/v0/post_review",{book_id:id,data:b})},this.follow=function(a,b,c){return _deferred_post_request("/api/v0/follow",{id:a,type:b,data:c})},this.get_moments=function(){return _deferred_request("/api/v0/moments?id=1")},this.get_friends=function(a){return _deferred_request("/api/v0/friends?id="+a)},this.get_labels=function(){return _deferred_request("/api/v0/labels")},this.get_affiliate_links=function(a){return _deferred_request("/api/v0/affiliate_links?id="+a)},this.add_thumbnail=function(a){return _deferred_post_request("/api/v0/add_thumbnail",a)},_deferred_request=function(c){var d=b.defer(),e=function(a){return d.resolve(a.data)},f=function(a){500==a.status&&alert("internal server error")};return a.get(c).then(e,f),d.promise},_deferred_post_request=function(c,d){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert("internal server error")};return a.post(c,d).then(f,g),e.promise}}]);