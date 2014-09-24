websiteApp.directive("moreFilters",["$rootScope","$timeout",function(){return{restrict:"E",controller:["$scope","recommendationService","websiteService","RecommendationUIConstants",function(a,b,c,d){a.handle_left_columns=function(){a.column_heights={show_filters:!0,notifications_style:{"max-height":d.NotificationsMinHeight},friends_grid_style:{height:d.FriendsGridMinHeight}}},a.stop_click_propagation=function(a){a.stopPropagation()},a.toggle_menu=function(){a.show_menu?(a.show_menu=!1,a.filter_expanded=!1):(a.show_menu=!0,a.filter_expanded=!0)}}],templateUrl:"/assets/angular/widgets/partials/more_filters.html"}}]),websiteApp.directive("notificationLink",function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/partials/notification_link.html"}}),websiteApp.directive("tickerPopup",function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/partials/ticker_popup.html"}}),websiteApp.directive("filter",["$rootScope","$timeout","$routeParams",function(a,b,c){return{restrict:"E",scope:{filter:"=data",url:"@",hideIcon:"@",iconClass:"@"},controller:["$scope",function(d){_initialise_filters=function(c){if(d.filter){var e=d.filter.id,f=d.filter.name,g=e==parseInt(d.$routeParams.label_id),h=e==parseInt(d.$routeParams.trend_id),i=e==parseInt(d.$routeParams.grid_id);if(g||h||i){if(d.active=!0,-1==a.filters[c].indexOf(e)){a.filters[c].push(e);var j="SUCCESS-'"+f+"' added to filters.",k=notify(a,j,b);d.$on("destroy",function(){b.cancel(k)})}}else d.active=!1}},_add_listeners=function(){d.$on("resetFilter",function(){d.active&&(d.active=!1)})},(_init=function(){d.$routeParams=c,_initialise_filters("more_filters"),_add_listeners()})()}],templateUrl:"/assets/angular/widgets/partials/filter.html"}}]),websiteApp.directive("mainHeader",["$timeout","$rootScope",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.toggle_notification_popup=function(){angular.isDefined(b.popups)&&angular.isDefined(b.popups.show_notifications_popup)&&b.popups.show_notifications_popup?b.popups.show_notifications_popup=!1:(b.popups={},b.popups.show_notifications_popup=!0),c.hide_notification_circle=!0,event.stopPropagation()},_add_listeners=function(){c.$on("gamifyCount",function(d,e,f){if(c.initiate_counting)c.count=c.count+e;else{c.initiate_counting=!0,c.count=e;var g=a(function(){c.is_additive=f,b.user.total_count=f?b.user.total_count+c.count:b.user.total_count-c.count,c.initiate_counting=!1;var d=a(function(){c.count=!1},3e3);c.$on("destroy",function(){a.cancel(d)})},200);c.$on("destroy",function(){a.cancel(g)})}})},(_init=function(){c.count=!1,_add_listeners()})()}],templateUrl:"/assets/angular/widgets/partials/main_header.html"}}]),websiteApp.directive("recommendationFooter",["scroller","$rootScope","websiteService","$timeout","$cookieStore","RecommendationUIConstants",function(a,b,c,d,e,f){return{restrict:"E",controller:["$scope",function(a){a.toggle_bookmarked=function(d){if(b.user.show_profile=!1,!a.bookmark_selected){a.panel_selected="BOOKMARK",e.put("tab",a.panel_selected),a.bookmark_selected=!0,a.read_selected=!1;var f=0;c.get_books_bookmarked(f).then(function(a){angular.isArray(a)&&(b.user.books={},b.user.books.bookmarked=[],angular.forEach(a,function(a){var c=[];angular.forEach(b.labels,function(b){if(a[2].indexOf(b.name)>=0)var d={name:b.name,checked:!0};else var d={name:b.name,checked:!1};c.push(d)},c);var d={isbn:a[0],id:a[1],bookmark_status:!0,labels:c};this.push(d)},b.user.books.bookmarked))})}d.stopPropagation()},a.toggle_recommendations=function(){b.user.show_profile=!1,(a.bookmark_selected||a.read_selected)&&(a.read_selected=!1,a.bookmark_selected=!1,a.panel_selected="",e.put("tab",a.panel_selected),a.reset())},a.toggle_read=function(){if(b.user.show_profile=!1,!a.read_selected){a.glowShelf=!1,a.bookmark_selected=!1,a.read_selected=!0,a.panel_selected="READ",e.put("tab",a.panel_selected);var d=0;c.get_books_read(d).then(function(a){b.user.books={},b.user.books.read=[],angular.forEach(a,function(a){var b={isbn:a[0],id:a[1],status:!0};this.push(b)},b.user.books.read)})}},a.reset_filter=function(b,c,d,e){var f="timeGroup"==d||"readingTime"==d||"country"==d;if(c){if(f){var g={name:"<span class='icon-loop'></span><span>&nbsp;Reset</span>"};a.advance_filter_changed(g,d)}else a.clear_filter(e,d),a.genre="";b.stopPropagation()}else f||(a.handle_left_columns(),_handle_filter_selection(d))},_handle_filter_selection=function(b){if("genre"==b){a.show_lists=!1,a.genre_selected=!0;var c=d(function(){a.genre_selected=!1},1e3);a.$on("destroy",function(){d.cancel(c)})}if("author"==b){a.show_lists=!1,a.author_selected=!0;var c=d(function(){a.author_selected=!1},500);a.$on("destroy",function(){d.cancel(c)})}},a.handle_notification_ticker_size=function(c,d){var e=angular.isDefined(c);if(e)var g=c.deltaY>0;else var g=d;g&&(a.column_heights={notifications_style:{"max-height":f.NotificationsMaxHeight},friends_grid_style:{height:f.FriendsGridMinHeight},show_filters:!1}),delete b.ticker_popup,e&&c.stopPropagation()},a.goto_info_card=function(){b.user.compressed_info=!1,b.user.collapsed_column=!0,b.user.collapsed_filters=!0,b.user.collapsed_friends=!0,b.user.collapsed_trends=!0,b.user.collapsed_lists=!0,b.user.collapsed_left_column=!0,b.popups.left_panel_width={width:"15%"}},a.toggle_footer=function(){a.compact_footer=!0},_init_shelf=function(){a.read_selected=!1,(angular.isUndefined(a.bookmark_selected)||!a.bookmark_selected)&&(a.bookmark_selected=!1)},_add_listeners=function(){open_shelf_event=a.$on("showBookReadShelf",function(){a.read_selected=!0,event.stopPropagation()})},_init_left_column=function(){a.show_lists=!1,a.column_heights={notifications_style:{"max-height":f.NotificationsMinHeight},friends_grid_style:{height:f.FriendsGridMinHeight},show_filters:!0}},(_init=function(){_init_left_column(),_init_shelf(),a.compact_footer=window.innerWidth<1e3?!0:!1,a.genre_selected=!1,a.author_selected=!1,a.column_heights={show_filters:!1}})()}],templateUrl:"/assets/angular/widgets/partials/recommendation_footer.html"}}]),websiteApp.directive("bookGrid",["recommendationService","$rootScope",function(a,b){return{restrict:"E",scope:{grid:"=data"},controller:["$scope",function(a){(_init=function(){a.user_id=b.user.id})()}],templateUrl:"/assets/angular/widgets/partials/book_grid.html"}}]),websiteApp.directive("infoCard",["$rootScope","$timeout","sharedService","websiteService","WebsiteUIConstants","scroller","$cookieStore",function(a,b,c,d,e,f,g){return{restrict:"E",controller:["$scope","websiteService",function(d,f){d.mark_as_read=function(a,b){angular.isDefined(a.id)&&c.mark_as_read(d,a,b)},d.stop_propagation=function(a){a.stopPropagation()},d.save_genre=function(a){var b={genre:a.id,status:!0};f.save_user_info(b)},d.remove_genre=function(a){var b={genre:a.id,status:!1};f.save_user_info(b)},d.search_info_card=function(a,c){var f=a.keyCode==e.KeyUp,g=a.keyCode==e.KeyDown,h=a.keyCode==e.Enter,i=a.keyCode==e.Backspace,j=!(f||g||h);if(j){if("BOOK"==c)var k=d.info.search_book.length>3;else var k=d.info.search_author.length>3;k?(d.popular_books=[{title:"Searching..."}],search_input_timeout=b(function(){d.handle_search_input(c)},300)):i?"BOOK"==c?(d.popular_books=[],d.get_popular_books()):(d.popular_authors=[],d.get_popular_authors()):d.popular_books=[{title:"Type more characters..."}]}},d.handle_search_input=function(a){d.loading=!0,"BOOK"==a?f.search_books(d.info.search_book).then(function(a){d.popular_books=[],a=a.results,0!=a.length?angular.forEach(a,function(a){var b=null!=a[4],c={isbn:a[0],id:a[1],title:a[2],author_name:a[3],status:b};this.push(c)},d.popular_books):d.popular_books=[{title:"No results found..."}],d.loading=!1,b.cancel(search_input_timeout)}):f.search_authors("q="+d.info.search_author).then(function(a){d.popular_authors=[],0!=a.length?angular.forEach(a,function(a){var b={name:a[0]};this.push(b)},d.popular_authors):d.popular_authors=[{title:"No results found..."}],d.loading=!1,b.cancel(search_input_timeout)})},d._get_genres=function(){(angular.isUndefined(d.info.genres)||0==d.info.genres.length)&&(d.info.genres=[],f.get_genres().then(function(a){angular.forEach(a,function(a){var b=null!=a[3],c={name:a[0],id:a[1],icon:a[2],status:b};this.push(c)},d.info.genres)}))},_profile_status_colors=function(){var b=a.user.profile_status;0==b?a.user.profile_status_color="#4374e0":1==b?a.user.profile_status_color="#65b045":2==b?a.user.profile_status_color="#d73d32":3==b?a.user.profile_status_color="#11a9cc":4==b?a.user.profile_status_color="#981b48":5==b?a.user.profile_status_color="#7e3794":6==b?a.user.profile_status_color="#4374e0":7==b?a.user.profile_status_color="#981b48":8==b&&(a.user.profile_status_color="#981b48")},_handle_info_card_bindings=function(b){1==a.user.profile_status?b._get_genres():2==a.user.profile_status?b.get_popular_books():3==a.user.profile_status&&(navigator.geolocation?navigator.geolocation.getCurrentPosition(function(c){var d=c.coords.latitude,e=c.coords.longitude;a.user.latitude=d,a.user.longitude=e,b.set_location()}):x.innerHTML="Geolocation is not supported by this browser.")},_get_info_data=function(){f.get_info_data().then(function(a){d.book_counts=a.reading_count_list,d.user_book_count=d.book_counts[0]})},d.edit_books_read=function(){d.goto_info_card(),a.user.profile_status=2,d.get_popular_books()},d.edit_genres_like=function(){d.goto_info_card(),a.user.profile_status=1,d._get_genres()},d.edit_authors_read=function(){d.goto_info_card(),a.user.profile_status=3,d.get_popular_authors()},d.get_popular_authors=function(){var a=d.popular_authors.length,b=!d.loading;b&&(d.loading=!0,f.get_popular_authors(a).then(function(a){angular.forEach(a,function(a){var b={name:a[0]};this.push(b)},d.popular_authors),d.loading=!1}))},d.get_popular_books=function(){var a=d.popular_books.length,b=!d.loading;b&&(d.loading=!0,f.get_popular_books(a).then(function(a){angular.forEach(a,function(a){var b=null!=a[4],c={isbn:a[0],id:a[1],title:a[2],author_name:a[3],status:b};this.push(c)},d.popular_books),d.loading=!1}))},d.prev_profile_state=function(){a.user.profile_status=0!=a.user.profile_status?a.user.profile_status-1:3,_handle_info_card_bindings(d),_profile_status_colors()},d.next_profile_state=function(){a.user.profile_status=3!=a.user.profile_status?a.user.profile_status+1:0,_handle_info_card_bindings(d),_profile_status_colors()},d.stop_horizontal_scroll=function(a){a.stopPropagation()},d.user_profile_changed=function(a){var b={profile:a.name};f.save_user_info(b)},d.add_book=function(){},d.add_author=function(){},d.set_user_name=function(){if(angular.isDefined(a.user.name)&&a.user.name.length>0){var b={name:a.user.name};f.save_user_info(b)}},d.set_email=function(){if(angular.isDefined(a.user.email)&&a.user.email.length>0){var b={email:a.user.email};f.save_user_info(b)}},d.set_gender=function(){if(a.user.gender){var b={gender:a.user.gender};f.save_user_info(b)}},d.set_init_book_read_count=function(){if(a.user.init_book_read_count){var b={init_book_read_count:a.user.init_book_read_count};f.save_user_info(b)}},d.set_init_book_written_count=function(){if(a.user.init_book_written_count){var b={init_book_written_count:a.user.init_book_written_count};f.save_user_info(b)}},d.set_location=function(){if(a.user.latitude){var b={latitude:a.user.latitude,longitude:a.user.longitude};f.save_user_info(b)}},d.set_date_of_birth=function(){var b={selectedYear:a.user.selectedYear,selectedMonth:a.user.selectedMonth,selectedDay:a.user.selectedDay};f.save_user_info(b)},(_init=function(){a.user.profile_status=0,_profile_status_colors(),_get_info_data(),d.popular_books=[],d.popular_authors=[],d.loading=!1,d.info={search_book:"",search_author:"",genres:[]},d.profileOptions=[{name:"Reader"},{name:"Author"},{name:"Publisher"},{name:"Editor"}],angular.isUndefined(g.get("ask_info"))?(a.user.compressed_info=!1,g.put("ask_info",!0)):a.user.compressed_info=!0,d.profileSelected={name:"Reader"},d.info_card_width=350,d.info_card_ratio=1.34})()}],templateUrl:"/assets/angular/widgets/base/widget/info_card.html"}}]);var facebook_invite=function(){FB.ui({method:"apprequests",message:"Your Message diaolog"})};