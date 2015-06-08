angular.module("d3",[]).service("d3Service",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e;return e}]);;homeApp.service("searchService",["$http","$q","$rootScope","WebsiteUIConstants","search_service_url",function(a,b,c,d,e){this.raw=function(c){var d=c.q,f=c.type,g=c.skip,h=c.count;return params_string="q="+d,angular.isDefined(f)&&(params_string=params_string+"&type="+f),g&&(params_string=params_string+"&skip="+g),h&&(params_string=params_string+"&count="+h),_deferred_request("/api/v0/search?"+params_string,b,a,e)},this.raw_detailed=function(c,d){return angular.isDefined(d)?_deferred_request("/api/v0/search_detailed?q="+c+"&type="+d,b,a,e):_deferred_request("/api/v0/search_detailed?q="+c,b,a,e)},this.get_top_searches=function(){return _deferred_request("/api/v0/top_searches",b,a,e)}}]);;homeApp.service("statusService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){this.post_status=function(c){var c=angular.toJson(c);return _deferred_post_request("/api/v0/create_status",c,b,a)}}]);;homeApp.service("feedService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){this.get_feed=function(c){return _deferred_request("/api/v0/feed?skip_count="+c,b,a)},this.get_notifications=function(){return _deferred_request("/api/v0/personal_notifications",b,a)},this.get_bookmarks=function(c){return _deferred_request("/api/v0/get_bookmarks?id="+c,b,a)}}]);;homeApp.service("userService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){this.recover_password=function(c){return _deferred_request("/api/v0/recover_password?"+c,b,a)},this.get_user=function(){return _deferred_request("/api/v0/user",b,a)},this.get_detailed_info=function(c){return angular.isDefined(c)?_deferred_request("/api/v0/user_profile_info?id="+c,b,a):_deferred_request("/api/v0/user_profile_info",b,a)},this.logout=function(){return _deferred_request("/api/v0/logout",b,a)},this.get_followed_by=function(){return _deferred_request("/api/v0/followed_by",b,a)},this.save_feedback=function(c){return _deferred_post_request("/api/v0/save_feedback",c,b,a)},this.save_user_info=function(c){return _deferred_post_request("/api/v0/save_info",c,b,a)},this.handle_facebook_user=function(c){return _deferred_post_request("/api/v0/fb",c,b,a)},this.handle_google_user=function(c){return _deferred_post_request("/api/v0/google",c,b,a)},this.authenticate=function(c){return _deferred_post_request("/api/v0/authenticate",c,b,a)},this.update_profile=function(c){return _deferred_post_request("/api/v0/profile",c,b,a)},this.get_user_details=function(c){return angular.isDefined(c)?_deferred_request("/api/v0/user_details?id="+c,b,a):_deferred_request("/api/v0/user_details",b,a)},this.get_personal_notifications=function(){return _deferred_request("/api/v0/personal_notifications",b,a)},this.get_notifications=function(c,d,e){return angular.isDefined(d)?angular.isDefined(e)?_deferred_request("/api/v0/notifications?skip_count="+c+"&id="+d+"&debug="+!0,b,a):_deferred_request("/api/v0/notifications?skip_count="+c+"&id="+d,b,a):_deferred_request("/api/v0/notifications?skip_count="+c,b,a)},this.get_influential_books=function(){return _deferred_request("/api/v0/get_influential_books",b,a)},this.get_latest_notification=function(){return _deferred_request("/api/v0/latest_notification",b,a)},this.get_info_data=function(){return _deferred_request("/api/v0/info_data",b,a)},this.get_personal_feed=function(c,d){return d=d||0,angular.isDefined(c)?_deferred_request("/api/v0/notifications?id="+c+"&skip="+d,b,a):_deferred_request("/api/v0/notifications?skip="+d,b,a)},this.get_feed=function(c){return angular.isDefined(c)?_deferred_request("/api/v0/feed_news?id="+c,b,a):_deferred_request("/api/v0/feed_news",b,a)},this.news_visited=function(c){return _deferred_request("/api/v0/news_visited?id="+c,b,a)},this.follow=function(c,d){return _deferred_request("/api/v0/follow?id="+c+"&status="+d,b,a)},this.get_blog_feed=function(c,d){return c=c||0,d=d||!1,_deferred_request("/api/v0/feed_blog?skip_count="+c+"&multiple="+d,b,a)},this.get_last_blog=function(){return _deferred_request("/api/v0/last_blog",b,a)},this.get_regions=function(){return _deferred_request("/api/v0/regions",b,a)},this.suggest_communities=function(){return _deferred_request("/api/v0/suggest_communities",b,a)},this.recommend=function(c,d){return _deferred_request("/api/v0/recommend?friends_id="+c+"&book_id="+d,b,a)}}]);;homeApp.service("genreService",["$http","$q","$rootScope","WebsiteUIConstants","search_service_url",function(a,b,c,d){this.search_genres=function(c){return _deferred_request("/api/v0/search?q="+c+"&type=Genre",b,a)},this.get_genres=function(){return _deferred_request("/api/v0/genres",b,a)}}]);;homeApp.service("bookService",["$http","$q","$rootScope","WebsiteUIConstants","search_service_url",function(a,b,c,d,e){var f=function(){if(angular.isDefined(c.reader))var a=c.reader.id;else var a=c.user.id;return a};this.get_basic_book_details=function(c){return _deferred_request("/api/v0/basic_book?id="+c,b,a)},this.handle_facebook_books=function(c){return _deferred_post_request("/api/v0/fb_books",c,b,a)},this.get_book_details=function(c){return _deferred_request("/api/v0/book?"+c,b,a)},this.handle_influential_books=function(c,d){return _deferred_request("/api/v0/influential_books?id="+c+"&status="+d,b,a)},this.get_books_bookmarked=function(c){return _deferred_request("/api/v0/books_bookmarked?skip_count="+c+"&id="+f(),b,a)},this.get_books_read=function(c){return _deferred_request("/api/v0/books_read?skip_count="+c+"&id="+f(),b,a)},this.search_books=function(c,d){return _deferred_request("/api/v0/search?q="+c+"&skip="+d+"&type=Book",b,a,e)},this.get_popular_books=function(c){return _deferred_request("/api/v0/popular_books?q="+c,b,a)},this.books_on_signup=function(c){return _deferred_request("/api/v0/books_on_signup?q="+c,b,a)},this.endorse_book=function(c,d){return _deferred_request("/api/v0/endorse_book?id="+c+"&status="+d,b,a)},this.update_visited=function(c){return _deferred_request("/api/v0/update_visited?id="+c,b,a)},this.get_feed=function(c,d){return _deferred_request("/api/v0/book_feed?id="+c+"&skip_count="+d,b,a)},this.rate_book=function(c,d){return _deferred_request("/api/v0/rate?id="+c+"&data="+d,b,a)},this.get_real_news=function(c){return _deferred_request("/api/v0/book_news?id="+c,b,a)},this.get_borrow_users=function(c){return _deferred_request("/api/v0/borrow_users?id="+c,b,a)},this.get_interesting_info=function(c){return _deferred_request("/api/v0/get_interesting_info?id="+c,b,a)},this.get_top_searches=function(){return _deferred_request("/api/v0/top_searches",b,a,e)}}]);;homeApp.service("authorService",["$http","$q","$rootScope","WebsiteUIConstants","base_url","search_service_url",function(a,b,c,d,e,f){this.search_authors=function(c){return _deferred_request("/api/v0/search?q="+c+"&type=Author",b,a,f)},this.get_popular_authors=function(c){return _deferred_request("/api/v0/popular_authors?skip_count="+c,b,a)},this.get_details=function(c,d){return _deferred_request("/api/v0/author_details?id="+c+"&skip="+d,b,a)},this.follow=function(c,d){return _deferred_request("/api/v0/follow_author?id="+c+"&status="+d,b,a)}}]);;homeApp.service("shelfService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){this.get_all_shelves=function(){return _deferred_request("/api/v0/labels",b,a)},this.add_new_label=function(c,d){return _deferred_request("/api/v0/add_new_label?label="+c+"&type="+d,b,a)},this.bookmark=function(c){return _deferred_post_request("/api/v0/bookmark",c,b,a)}}]);;homeApp.service("infinityService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){this.get_books=function(d){e=angular.extend(c.filters,{skip_count:d});var e=angular.toJson(e);return _deferred_request("/api/v0/get_filtered_books?q="+e,b,a)},this.get_small_reads=function(){return _deferred_request("/api/v0/small_reads",b,a)},this.get_books_from_favourite_author=function(){return _deferred_request("/api/v0/books_from_favourite_author",b,a)},this.get_books_from_favourite_category=function(){return _deferred_request("/api/v0/books_from_favourite_category",b,a)},this.get_books_from_favourite_era=function(){return _deferred_request("/api/v0/books_from_favourite_era",b,a)},this.get_books_on_friends_shelves=function(){return _deferred_request("/api/v0/books_on_friends_shelves",b,a)},this.get_books_from_unexplored_subjects=function(){return _deferred_request("/api/v0/books_from_unexplored_subjects",b,a)}}]);;homeApp.service("networkService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){this.get_followers=function(c){return angular.isDefined(c)?_deferred_request("/api/v0/followers?skip="+c,b,a):_deferred_request("/api/v0/followers",b,a)},this.get_users_followed=function(c){return angular.isDefined(c)?_deferred_request("/api/v0/users_followed?skip="+c,b,a):_deferred_request("/api/v0/users_followed",b,a)}}]);;homeApp.service("sharedService",["$timeout","$rootScope","ColorConstants","$location","bookService","shelfService","$mdToast","infinityService","$mdDialog",function(a,b,c,d,e,f,g,h,i){this.get_popular_books=function(a,b){var c=!(a.info.loading||!angular.isUndefined(a.constant)&&a.constant.show_book||!angular.isUndefined(a.info.author_filter)&&a.info.author_filter||!angular.isUndefined(a.info.group_by_alphabet)&&a.info.group_by_alphabet||a.info.reading_time_filter||a.info.published_era_filter||a.info.custom_loading||a.info.subject_filter||!(a.info.infinity||angular.isUndefined(a.info.infinity)||angular.isDefined(b)));c&&this.load_popular_books(a,b)},this.show_book_dialog=function(a,b,c,d){a.active_book=c,a.active_book.show_info_only=!0,i.show({templateUrl:"/assets/angular/html/news/book.html",scope:b,preserveScope:!0,clickOutsideToClose:!0,targetEvent:d}),d.stopPropagation()},this.filtered_books=function(a){if(!a.info.fetching_books){var b=a.info.books.length;a.info.loading=!0,a.info.fetching_books=!0,h.get_books(b).then(function(b){angular.forEach(b.books,function(a){var b=Math.floor(Math.random()*c.value.length),d=angular.extend(a,{color:c.value[b]});this.push(d)},a.info.books),a.info.loading=!1,a.info.fetching_books=!1,delete b.books,a.info.other_info=b})}},this.toggle_bookmark=function(a,b,c){var d={bottom:!1,top:!0,left:!1,right:!0},e=function(){return Object.keys(d).filter(function(a){return d[a]}).join(" ")};if(angular.isUndefined(b)||!b)var h=!0;else var h=!1;var i=c.id,j=c.type,k=a.label_key||a.key,l={id:i,type:j,shelf:k,status:h};f.bookmark(l),g.show({controller:"toastController",templateUrl:"assets/angular/html/shared/toast/bookmark_action.html",hideDelay:6e3,position:e()})},this.load_popular_books=function(a,b){a.info.loading=!0,angular.isUndefined(b)&&(b=angular.isUndefined(a.info.books)?[]:a.info.books);var d=b.length;angular.isUndefined(a.filters)&&(a.filters={});var f=angular.extend(a.filters,{skip_count:d});f=angular.toJson(f);var g=function(b){var c=!1;return angular.forEach(a.info.categories,function(a){angular.equals(a,b)&&(c=!0)}),!c};e.get_popular_books(f).then(function(d){var e=function(a){if(a.pages_count<50)var b="For a flight journey";else if(a.pages_count<100)var b="For a weekend getaway";else if(a.pages_count<=250)var b="For a week holiday";else if(a.pages_count>250)var b="For a month vacation";else var b="Dont Know";return b},f=function(a){if(a.published_year>2e3)var b="Contemporary";else if(a.published_year>=1939&&a.published_year<2e3)var b="Post Modern Literature";else if(a.published_year>=1900&&a.published_year<1939)var b="Modernism";else if(a.published_year>=1837&&a.published_year<1901)var b="Victorian Literature";else if(a.published_year>=1900&&a.published_year<1939)var b="Romanticism";else if(a.published_year>=1798&&a.published_year<1837)var b="Neo Classical Period";else if(a.published_year>=1900&&a.published_year<1939)var b="English Renaissance";else if(a.published_year>=1660&&a.published_year<1798)var b="Middle English Literature";else if(a.published_year>=1900&&a.published_year<1939)var b="Old English Literature";else var b="Don't Know";return b};angular.forEach(d,function(b){angular.isDefined(a.info.categories)&&angular.forEach(b.root_category,function(b){0==a.info.categories.length?null!=b.name&&a.info.categories.push(b):angular.forEach(a.info.categories,function(a){!angular.equals(b,a)&&g(b)&&null!=b.name&&this.push(b)},a.info.categories)});var d=Math.floor(Math.random()*c.value.length),h=null!=b.status,i=e(b),j=f(b),k={published_era:j,reading_time:i,status:h,isBook:!0,colspan:1,color:c.value[d],rowspan:1,alphabet:b.title[0]};k=angular.extend(b,k),this.push(k)},b),a.info.loading=!1})}}]);