websiteApp.controller("bookTimelineController",["$scope","$rootScope","$timeout","widgetService","$route","$routeParams","$interval",function(a,b,c,d,e,f,g){_init=function(){d.get_moments().then(function(b){a.moments=b.moments})},_init()}]);;websiteApp.controller("recommendationsController",["$scope","$rootScope","$timeout","recommendationService","$route","$routeParams","$interval","widgetService","scroller","websiteService","sharedService","$cookieStore","RecommendationUIConstants","$location","IntroConstants","WebsiteUIConstants",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){a.handle_height_of_popup=function(b,c){var d=angular.isDefined(b);if(d)var e=b.deltaY>0;else var e=c;e&&(a.ticker_popup_style={height:m.TickerPopupMaxHeight}),d&&b.stopPropagation()},a.show_all_friends=function(){a._get_friends(30)},a._set_likes=function(a,b){angular.forEach(b[0],function(a,c){this.push({id:b[1][c],name:a,icon:b[2][c]})},a)},a._set_influential_books=function(a,b){angular.forEach(b[4],function(a,c){this.push({isbn:b[3][c],id:a,title:b[5][c],author_name:b[6][c]})},a)},a._get_user_profile_info=function(c){var d=function(b){angular.isUndefined(b.detailed_info)&&j.get_detailed_info(c).then(function(c){b.detailed_info=!0,b.likes=[],b.influential_books=[],a._set_likes(b.likes,c),a._set_influential_books(b.influential_books,c)})};c==b.user.id?(d(b.user),a.fetch_new_feed()):(d(b.reader),a.fetch_new_feed(b.reader.id))},a.toggle_profile=function(c,d,e){var f=function(){a.hide_popups(),b.user.show_profile=!1},g=function(){a.hide_popups(),b.user.show_profile=!0,a._get_user_profile_info(c)};angular.isUndefined(b.user.show_profile)||!b.user.show_profile?g():f(),angular.isDefined(d)&&(d.preventDefault(),d.stopPropagation())},a.get_news_feed=function(c){a.expand_left_panel(),b.user.collapsed_column=!1,b.user.collapsed_left_column=!1,a.fetch_new_feed(c)},a.show_friends_list=function(){a.expand_left_panel(),b.user.collapsed_friends=!1,b.user.collapsed_left_column=!1,a._get_friends(20)},a.fetch_new_feed=function(b){var c=!0,d=!1;a.$emit("getNotifications",d,b,c)},a.collapse_left_panel=function(){b.popups.left_panel_width={width:p.LeftPanelMinWidth}},a.expand_left_panel=function(){a.hide_popups(),b.user.interact=!1,b.popups.left_panel_width={width:"34%"}},a.toggle_settings_popup=function(c){var d=function(){a.hide_popups(),b.user.interact=!1,b.popups.settings_popup=!0};angular.isUndefined(b.popups.settings_popup)?d():b.popups.settings_popup?b.popups.settings_popup=!1:d(),c.stopPropagation()},a.logout=function(){k.logout()},a.show_interaction_box=function(c){a.hide_popups(),b.user.interact=!0;var d=!1,e=!0;a.$emit("getNotifications",d,c,e)},a.show_trending_options=function(c){a.hide_popups(),b.user.interact=!0;var d=!0;a.$emit("getNotifications",d,b.user.id),c.stopPropagation()},a.handle_friends_grid_size=function(b,c){var d=angular.isDefined(b);if(d)var e=b.deltaY>0;else var e=c;e&&(a.column_heights={notifications_style:{"max-height":m.NotificationsMinHeight},friends_grid_style:{"max-height":m.FriendsGridMaxHeight,overflow:"auto"},show_filters:!1}),d&&b.stopPropagation()},a.reset=function(){a.panel_selected="",a.bookmark_selected=!1,a.read_selected=!1,_init_recommendations(),_get_recommendations()},a.stopSearching=function(a){b.searching=!1,a.currentTarget.text=""},a.hide_popups=function(){delete b.ticker_popup,b.user.interact||delete b.focused_book,b.user.collapsed_column=!0,b.user.collapsed_filters=!0,b.user.collapsed_friends=!0,b.user.collapsed_trends=!0,b.user.collapsed_lists=!0,b.user.collapsed_left_column=!0,b.popups={},b.popups.left_panel_width={width:p.LeftPanelMinWidth}},_load_icon=function(){a.drop_icon=!0,c(function(){a.drop_icon=!1},1e3)},_add_listeners=function(){r=a.$on("loadRecommendations",function(){var d=function(){b.filters.reset=!1,angular.isUndefined(b.filters.reset_count)?b.filters.reset_count=0:b.filters.reset_count=b.filters.reset_count+1,_get_recommendations()},e=function(){j.get_books_bookmarked(b.user.books.bookmarked.length).then(function(d){var e=500;angular.forEach(d,function(d){var f=[];angular.forEach(b.labels,function(a){if(d[2].indexOf(a.name)>=0)var b={name:a.name,checked:!0};else var b={name:a.name,checked:!1};f.push(b)},f);var g={isbn:d[0],id:d[1],bookmark_status:!0,labels:f};e+=500;var h=c(function(){b.user.books.bookmarked.push(g)},e);a._destroy_event(h)})})},f=function(){j.get_books_read(b.user.books.read.length).then(function(a){angular.forEach(a,function(a){var b={isbn:a[0],id:a[1],status:!0};this.push(b)},b.user.books.read)})};a.read_selected||a.bookmark_selected?a.bookmark_selected?e():a.read_selected&&f():d()}),s=a.$on("reloadRecommendations",function(c){b.filters.reset=!0,b.filters.reset_count=0,a.reset(),c.stopPropagation()})},_init_recommendations=function(){a.recommendations={books:[],readers:[],authors:[]}},_bind_destroy=function(){a.$on("$destroy",function(){c.cancel(q),c.cancel(t)})},a._show_bookmark_tab=function(){a.bookmark_selected=!0,a.panel_selected=m.BookmarkPanel},a._initialize_filters=function(){var c=function(){b.user.collapsed_filters=!0,b.user.collapsed_friends=!0,b.user.collapsed_trends=!0,b.user.collapsed_lists=!0,b.user.collapsed_column=!0,b.user.show_profile=!1,b.user.collapsed_left_column=!0},d=function(){b.filters.filter_id=f.filter_id,b.main_header=f.name,b.user.main_header={color:"white","text-shadow":"none"},b.user.main_header_background={"background-color":"#918fb5"}},e=function(){b.filters.label_id=f.label_id,b.main_header=f.name,c(),b.user.main_header={color:"white","text-shadow":"none"},b.user.main_header_background={"background-color":"#E2B503"}},g=function(){b.filters.filter_id=f.grid_id,b.main_header=f.name,c(),b.user.main_header={color:"white","text-shadow":"none"},b.user.main_header_background={"background-color":"#918fb5"}},h=function(){var a=function(a){return"#user/"+b.user.id+"/trending/books/id/"+a.id+"/name/"+a.name},d=function(c){0==c?(b.prev_link=a(b.trending_feed[b.trending_feed.length-1]),b.next_link=a(b.trending_feed[c+1])):c==b.trending_feed.length-1?(b.prev_link=a(b.trending_feed[c-1]),b.next_link=a(b.trending_feed[0])):(b.prev_link=a(b.trending_feed[c-1]),b.next_link=a(b.trending_feed[c+1]))};b.filters.reset=!0,b.filters.reset_count=0,b.filters.trend_id=f.trend_id,b.main_header=f.name;var e=0;angular.isDefined(b.trending_feed)&&angular.forEach(b.trending_feed,function(a,c){a.id==f.trend_id&&(b.main_topic=a,e=c)}),d(e),c(),b.user.main_header={color:"white","text-shadow":"none"},b.user.main_header_background={"background-color":"#dd4b39"}},i=function(){delete b.user.main_header,delete b.user.main_header_background,delete b.main_header,delete b.main_topic,delete b.filters.filter_id,delete b.filters.trend_id,delete b.filters.label_id},j=function(){b.user.main_header={color:"white","text-shadow":"none"},b.user.main_header_background={"background-color":"#427fed"},a.$routeParams.type="books",b.filters.reset=!0,b.filters.reset_count=0,b.filters.filter_type=m.BookTab,b.main_header="Back to recommendations",b.filters.other_filters.id=a.$routeParams.book_id},k=function(){b.user.main_header={color:"white","text-shadow":"none"},b.user.main_header_background={"background-color":"#427fed"},a.$routeParams.type="books",b.filters.reset=!0,b.filters.filter_type=m.BookTab,b.filters.other_filters.title=a.$routeParams.title,b.main_header=a.$routeParams.title;var c=angular.isDefined(a.$routeParams.status);c&&(b.filters.other_filters.show_all=a.$routeParams.status,b.filters.reset=!0,b.filters.reset_count=0)};if(b.filters={},b.filters.more_filters=[],b.filters.other_filters={},"books"==f.type){b.filters.filter_type=m.BookTab;var l=angular.isDefined(f.filter_id),n=angular.isDefined(f.label_id),o=angular.isDefined(f.grid_id),p=angular.isDefined(f.trend_id);l?d():n?e():p?h():o?g():i()}else"authors"==f.type?b.filters.filter_type=m.AuthorTab:"readers"==f.type?b.filters.filter_type=m.ReaderTab:f.book_id?j():f.title?k():(b.filters.filter_type=m.BookTab,a.show_notifications=!0)},_update_recommendations=function(d){if(b.filters.filter_type==m.BookTab){var e=function(){if(d.recommendations.books.length>1)var e="INFO- "+d.recommendations.books.length+" books found. Scroll to see more books.";else if(d.recommendations.books.length>=0)var e="INFO- "+d.recommendations.books.length+" book found.";var f=notify(b,e,c);a.$on("destroy",function(){c.cancel(f)})},f=function(){var d=m.ZeroBooksFound,e=notify(b,d,c);a.$on("destroy",function(){c.cancel(e)})},g=function(b){a.recommendations.books=[a.recommendations.books[b-2],a.recommendations.books[b-1]];var d=c(function(){i.scrollTo(window_width/4,0,200)},200);a.$on("destroy",function(){c.cancel(d)})},h=function(){a.bookmark_selected=!1,a.read_selected=!1,b.hide_options=!0,a._set_books(d.recommendations.books)};if(e(),b.user.loading){var j=20;if(0==d.recommendations.books.length)f();else{a.hide_popups(),b.user.interact=!1;var k=a.recommendations.books.length>=j,l=angular.isDefined(b.filters.other_filters.id||b.filters.other_filters.title);k&&g(j),l?h():a._set_books(d.recommendations.books)}b.user.loading=!1}}else b.user.loading&&(a._set_books(a.recommendations.books.length>=j?d.recommendations.books:d.recommendations.books),b.user.loading=!1);angular.isDefined(b.user)?b.user.faded_wrapper={opacity:"0.5"}:b.user={faded_wrapper:{opacity:"0.5"}}},a._destroy_event=function(b){a.$on("destroy",function(){c.cancel(b)})},a._set_books=function(d){var e=function(a){return{isbn:a[0],id:a[1],external_thumb:a[2]}},f=function(){b.user.books.bookmarked=[];var f=200;angular.forEach(d,function(d){f+=200;var g=c(function(){b.user.books.bookmarked.push(e(d))},f);a._destroy_event(g)});var g=window_width/b.user.books.bookmarked.length;a.block_style={width:g+"px"}},g=function(a){return angular.isUndefined(a)||null==a||""==a},h=function(){var b=[],e=200;angular.forEach(d,function(d){var f={isbn:d[0],id:d[1],external_thumb:d[2]},h=g(d[0]);if(h){if(f=angular.extend(f,{no_thumb:!0}),3==b.length){e+=200;var i=c(function(){a.recommendations.books.push({book_array:b,is_book_array:!0})},e);a._destroy_event(i),b=[]}b.push(f)}else e+=200,c(function(){a.recommendations.books.push(f)},e),a._destroy_event(i)}),0!=b.length&&a.recommendations.books.push({book_array:b,is_book_array:!0});var f=window_width/(a.recommendations.books.length+6);a.block_style={width:f+"px"}};a.bookmark_selected?f():h()},_get_grids=function(){d.get_grid_books().then(function(b){for(var c=[],d="",e=0;e<b.length;e++){var f=d!=b[e][0];if(f){var g=""!=d;if(g){if(c.length>4){var h={grid_text:d,grid_books:c,is_grid:!0,id:grid_id},i=a.recommendations.books.length-2;a.recommendations.books.splice(i,0,h)}c=[]}d=b[e][0],grid_id=b[e][3]}var j={isbn:b[e][1],id:b[e][2],external_thumb:b[e][4]};c.push(j)}if(c.length>4){var h={grid_text:d,grid_books:c,is_grid:!0,id:grid_id},i=a.recommendations.books.length-2;a.recommendations.books.splice(i,0,h)}})},_push_recommendations=function(){var e=3e3;q=c(function(){d.push_recommendations().then(function(d){var e={grid_text:"Books becoming movies",grid_books:d,is_grid:!0};a.recommendations.books.splice(3,0,e);var f="INFO-Check out Books becoming movies...";notify(b,f,c)})},e)},_init_analytics=function(){b.data=[]},_recordUserBehaviour=function(){var a=6e8;g(function(){b.data;_init_analytics()},a)},_get_recommendations=function(){b.user.loading=!0,d.get_recommendations().then(function(a){_update_recommendations(a)});angular.isUndefined(b.filters.other_filters.title)&&angular.isUndefined(b.filters.other_filters.id),a.recommendations.books.length>=4},a._handle_focused_book=function(){var c=function(a){return{isbn:a[0],id:a[1],external_thumb:a[2]}};angular.isDefined(a.recommendations.books.is_book_array)&&a.recommendations.books.is_book_array?1==a.recommendations.books.book_array.length&&(b.focused_book=c(a.recommendations.books.first)):b.focused_book=c(a.recommendations.books.first)},a.get_notifications=function(c,d){if(b.user.show_profile){var e=!1;a.$emit("getNotifications",e,c)}},a._get_friends=function(a){var c=function(a,b){angular.forEach(b,function(a){null==a[2]?thumb="/assets/profile_pic.jpeg":thumb=a[2];var b={id:a[0],name:a[1],thumb:thumb,init_book_read_count:a[3],total_count:a[4],book_read_count:a[5],bookmark_count:a[6],fav_categories:a[7]};this.push(b)},a)};if(angular.isUndefined(b.reader))k.set_friends();else{var d=angular.isDefined(b.reader.friends)?b.reader.friends.length:0;(angular.isUndefined(b.reader.friends)||!b.reader.all_friends_shown)&&h.get_friends(b.reader.id,a,d).then(function(d){a>d.length&&(b.reader.all_friends_shown=!0),angular.isUndefined(b.reader.friends)&&(b.reader.friends=[]),c(b.reader.friends,d)})}},a._init_user=function(){(angular.isUndefined(b.user)||angular.isUndefined(b.user.id))&&k.is_logged_in(a)},a._init_reader=function(){k.get_user(a.$routeParams.id)},a._basic_init=function(){a.grid_view=!1,b.popups={settings_popup:!1,show_notifications_popup:!1};var d=1e4;a.drop_icon=!1,b.user=angular.extend(b.user,{collapsed_trends:!0,collapsed_friends:!0,collapsed_filters:!0,collapsed_lists:!0,collapsed_column:!0,collapsed_left_column:!0,locked:!1,interact:!1}),t=c(function(){_recordUserBehaviour()},d),a.searching=!1,_add_listeners(),_init_analytics(),_bind_destroy(),a.cover_image={"background-image":'url("'+l.get("coverImage")+'")'},a._init_user()},_init=function(){if(b.user.logged)if(a._basic_init(),a.$routeParams=f,delete b.reader,"profile"==a.$routeParams.type){b.user.show_profile=!1;var c=a.$routeParams.id;b.reader={},b.reader.id=c,a.toggle_profile(c),a._init_reader(),k.set_labels(c),a.placeholder="Write on timeline...",b.user.main_header={color:"white","text-shadow":"none"},b.user.main_header_background={"background-color":"#65b045"}}else _init_recommendations(),k.set_labels(),a._initialize_filters(),a.placeholder=p.Share;else b.user={books:{bookmarked:[],read:[]},authors:{bookmarked:[],follow:[]},readers:{follow:[]},logged:!1}},a.getting_started_tour_options={steps:[{element:"#shelves",intro:o.Shelves,position:"right"},{element:"#friendsList",intro:o.Friends,position:"right"},{element:"#newsFeed",intro:o.NewsFeed,position:"right"},{element:"#listopia",intro:o.Listopia,position:"right"},{element:"#trendingList",intro:o.Trending,position:"right"},{element:"#share",intro:o.Share,position:"bottom"},{element:"#recommendationFooter",intro:o.ShelvesTab,position:"bottom"}],showStepNumbers:!1,exitOnOverlayClick:!0,exitOnEsc:!0,nextLabel:"<strong>Next</strong>",prevLabel:"<span>Previous</span>",skipLabel:"Exit",doneLabel:"<strong>Thanks</strong>"},a.should_auto_start=function(){return!1};var q="",r="",s="",t="";_init()}]);;homeApp.controller("searchController",["$scope","searchService","$location",function(a,b,c){a.show_search_bar=function(){a.visible_search_bar=!a.visible_search_bar},a.query_search=function(c){b.raw(c).then(function(b){if(a.search_results=b,a.did_you_mean=!1,angular.forEach(b,function(b){b.fuzzy&&(a.did_you_mean=!0)}),a.did_you_mean){var d={name:"Did you mean",labels:[]};a.search_results.splice(0,0,d)}var d={name:"Show all results",show_all:!0,labels:[],search_text:c};a.search_results.push(d)})},a.show_all_results=function(c){b.raw(c,30).then(function(b){a.all_results=b})},a.on_select=function(a){if(angular.isDefined(a)){var b=a.labels.indexOf("Book")>=0,c=a.labels.indexOf("Author")>=0,d="";b?d="/book?q="+a.id:c?d="/author?q="+a.id:a.show_all&&(d="/search?q="+a.search_text),""!=d&&(window.location.href=d)}},a.reload_results=function(a){switch(a){case"Book":break;case"Author":break;case"Community":break;case"Blog":break;case"Person":break;case"News":}};!function(){a.search_results=[];var b=/[?&]([^=#]+)=([^&#]*)/g,d=b.exec(c.absUrl());if(angular.isDefined(d)&&null!=d){var e=d[2];a.show_all_results(e),a.display_results_for=e}}()}]);;websiteApp.controller("timelineController",["$scope","$rootScope","$timeout","recommendationService","$route","$routeParams","$interval",function(a,b,c,d,e,f,g){}]);;websiteApp.controller("loginController",["$scope","$rootScope","websiteService","Facebook","stropheService","$timeout","$cookieStore","LoginConstants","WebsiteUIConstants","$location","$routeParams","sharedService",function(a,b,c,d,e,f,g,h,i,j,k,l){a.submit=function(b){var c=b.keyCode==i.Enter;c&&a.authenticate(!0),b.stopPropagation()},a.recover_password=function(){delete b.user.error_message;var d=function(c){a.loading_icon=!1,b.user.error_message=c.message,b.user.password=null},e=function(c){a.$apply(function(){a.loading_icon=!1,b.user.error_message=c.message,b.user.password=null})};b.user.email?(a.loading_icon=!0,c.recover_password("email="+b.user.email).then(d,e)):b.user.error_message=h.EmailNotPresent},a._on_authenticate=function(){l.set_labels(),l.set_friends(),l.get_news_feed(a)},a.authenticate=function(d){d?a.show_sign_up=!1:a.show_sign_up=!0;var e=b.user.email,g=b.user.password,i=new RegExp("^.{8,}$"),j=new RegExp("^(.)\\1{7,16}$"),k=new RegExp("^.{100,}$");delete b.user.error_message;var l={email:e,password:g,old_user:d};a.loading_icon=!1;var m=function(c){b.user.error_message=c.message,b.user.profile_status=c.profile_status,b.user.logged=!0,b.user.id=c.user_id,a.loading_icon=!1;var d="INFO- Welcome back ",e=notify(b,d,f);a.$on("destroy",function(){f.cancel(e)}),a._is_logged_in(),a._redirect(),a._on_authenticate()},n=function(c){a.loading_icon=!1,b.user.error_message=c.data.message,b.user.password=null};b.user.email?b.user.password?i.test(b.user.password)||d?j.test(b.user.password)&&!d?b.user.error_message=h.ChooseAMoreSecurePassword:k.test(b.user.password)&&!d?b.user.error_message=h.MaximumPasswordLengthError:(a.loading_icon=!0,c.authenticate(l).then(m,n)):b.user.error_message=h.PasswordLengthError:b.user.error_message=h.PasswordNotPresent:b.user.error_message=h.EmailNotPresent},_bind_auth_listeners=function(){a.$on("event:google-plus-signin-success",function(b,d){c.handle_google_user(d),a._init_user()}),a.$on("event:google-plus-signin-failure",function(a,b){}),a.$on("Facebook:statusChange",function(b,c){c.status==h.FacebookLoginStatusCheck&&a.$apply(function(){})})},a.intent_login=function(){a.loading_icon=!0,b.user.fb_connect?(b.logged=!0,a.me()):a.login()},a.login=function(){d.login(function(b){b.status==h.FacebookLoginStatusCheck&&a.me()},{scope:"email"})},a.me=function(){d.api("/me",function(e){c.handle_facebook_user(e).then(function(){a._is_logged_in()}),b.user=e,a._init_user(),d.api("me/picture?redirect=false&type=large",function(a){c.save_user_info(a)})})},a._init_user=function(){b.user.profile_status=0,b.user.logged=!0},a._is_logged_in=function(){var d=function(){c.get_personal_notifications().then(function(a){b.user.push_notifications=[],angular.forEach(a,function(a){var b=angular.extend({id:a[1]},a[0].data);this.push(b)},b.user.push_notifications)})};c.get_user().then(function(e){e.logged_in&&(b.user.logged=!0,b.user.id=e.id,c.get_user_details().then(function(a){angular.extend(b.user,a)}),g.put("logged",!0),a._on_authenticate(),d())})},a._redirect=function(){angular.isDefined(k.url)&&j.path("/user/"+b.user.id+k.url)},_init=function(){g.remove("tab"),a._is_logged_in(),_bind_auth_listeners(),b.user.fb_connect=!1,d.getLoginStatus(function(a){a.status===h.FacebookLoginStatusCheck&&(b.user.fb_connect=!0)});var c=0,e=500,i=function(b){a.description=[],a.description.splice(0,0,h.Description[b])};angular.forEach(h.Description,function(){0==c?(i(c),c+=1):f(function(){i(c),c+=1},e),e+=1500})},_init()}]);;websiteApp.controller("websiteAppController",["$scope","$rootScope","$timeout","websiteService","$document","scroller","$window","WebsiteUIConstants","sharedService",function(a,b,c,d,e,f,g,h,i){a.bindHorizontalScroll=function(b,c,d,e){b.preventDefault(),c>0?a.move_left(b):a.move_right(b),b.stopPropagation()},a._hide_popups=function(){b.user.collapsed_column=!0,b.user.collapsed_filters=!0,b.user.collapsed_friends=!0,b.user.collapsed_trends=!0,b.user.collapsed_lists=!0,b.user.collapsed_left_column=!0,b.popups={},delete b.focused_book,delete b.ticker_popup},a.toggle_left_columns=function(){var a=function(){b.user.collapsed_filters=!0,b.user.collapsed_friends=!1,b.user.collapsed_column=!0,b.user.collapsed_lists=!0,b.user.collapsed_trends=!0,b.user.collapsed_left_column=!1},c=function(){b.user.collapsed_filters=!0,b.user.collapsed_friends=!0,b.user.collapsed_column=!1,b.user.collapsed_lists=!0,b.user.collapsed_trends=!0,b.user.collapsed_left_column=!1},d=function(){b.user.collapsed_filters=!0,b.user.collapsed_friends=!0,b.user.collapsed_column=!0,b.user.collapsed_lists=!1,b.user.collapsed_trends=!0,b.user.collapsed_left_column=!1},e=function(){b.user.collapsed_filters=!0,b.user.collapsed_friends=!0,b.user.collapsed_column=!0,b.user.collapsed_lists=!0,b.user.collapsed_trends=!1,b.user.collapsed_left_column=!1},f=function(){b.user.collapsed_filters=!1,b.user.collapsed_friends=!0,b.user.collapsed_column=!0,b.user.collapsed_lists=!0,b.user.collapsed_trends=!0,b.user.collapsed_left_column=!1};b.user.collapsed_filters?b.user.collapsed_friends?b.user.collapsed_column?b.user.collapsed_lists?b.user.collapsed_trends?c():f():e():d():c():a()},a.move_left=function(d){(b.user.collapsed_left_column||!b.user.collapsed_left_column&&!b.user.locked)&&a._hide_popups();var e=1e3,h=(document.body.scrollWidth,g.pageXOffset),i=.4*window_height;if(angular.isDefined(d))if("click"==d.type){angular.isDefined(a.delta_x)?a.delta_x=a.delta_x+i:a.delta_x=i;var j=c(function(){f.scrollTo(h-a.delta_x,0,e),delete a.delta_x,c.cancel(j)},400)}else f.scrollTo(h-i,0,e);else f.scrollTo(h-i,0,e)},a.move_right=function(d){(b.user.collapsed_left_column||!b.user.collapsed_left_column&&!b.user.locked)&&a._hide_popups();var e=1e3,h=document.body.scrollWidth,i=g.pageXOffset,j=.4*window_height,k=i+2.5*window_width>h;if(k&&(b.user.loading||(b.user.loading=!0,b.$broadcast("loadRecommendations"))),angular.isDefined(d))if("click"==d.type){angular.isDefined(a.delta_x)?a.delta_x=a.delta_x+j:a.delta_x=j;var l=c(function(){f.scrollTo(i+a.delta_x,0,e),delete a.delta_x,c.cancel(l)},400)}else f.scrollTo(i+j,0,e);else f.scrollTo(i+j,0,e)},a.scroll_one_page_right=function(a){var c=document.body.scrollWidth;if(a)var d=a.pageX-window_width/2,e=a.pageX+window_width>c;else{var d=g.pageXOffset;-window_width/2;var e=g.pageXOffset;+window_width>c}e&&b.$broadcast("loadRecommendations");var h=window_width;f.scrollTo(d+h,0,2e3)},a.scroll_one_page_left=function(a){if(a)var b=a.pageX-window_width/2;else var b=g.pageXOffset-window_width/2;var c=window_width;f.scrollTo(b-c,0,2e3)},a.showFeebackForm=function(){},a.show_uploader=function(){a.uploader=!0},a.close_notification=function(){b.notification_active=!1},_bind_feedback_form=function(){g.onmouseleave=function(){}},_load_recommendations=function(){var a=document.body.scrollWidth,c=event.pageX+window_width>a;c&&b.$broadcast("loadRecommendations")},_get_book_details=function(c){filter="id="+c,d.get_book_details(filter).then(function(c){a.detailed_book.book=c,b.show_book=!0})},_bind_emit=function(){show_book_event=a.$on("expandBook",function(a,c,d,e,f){b.book_x=d,b.screen_x=e,b.total_x=f,_get_book_details(c),a.stopPropagation()})},a._show_trending_feed=function(){a.show_feed={trending:!0},a.show_trending=!0,i.get_trends()},a._show_reader_feed=function(b,c){if(a.show_feed={readers:!0},angular.isDefined(c)&&c&&(delete a.readers_notifications,a.readers_notifications=[]),angular.isDefined(a.readers_notifications))var e=a.readers_notifications.length;else var e=0;d.get_notifications(e,b).then(function(b){angular.isUndefined(a.readers_notifications)&&(a.readers_notifications=[]),a.readers_notifications=b.notifications.concat(a.readers_notifications)})},a._show_personal_feed=function(b,c){if(a.show_feed={personal:!0},angular.isDefined(c)&&c&&(a.personal_notifications=[]),angular.isDefined(a.personal_notifications))var e=a.personal_notifications.length;else var e=0;d.get_notifications(e,b).then(function(b){angular.isUndefined(a.personal_notifications)&&(a.personal_notifications=[]),a.personal_notifications=b.notifications.concat(a.personal_notifications)})},a._show_news_feed=function(c){a.show_feed={news:!0};var e=function(b){angular.isUndefined(a.news_feed)&&(a.news_feed=[]),a.news_feed=b.notifications.concat(a.news_feed)};if(angular.isDefined(c)&&c&&(a.news_feed=[]),angular.isDefined(a.news_feed))var f=a.news_feed.length;else var f=0;if(angular.isDefined(b.reader)){var g=b.reader.id,h=!0;d.get_notifications(f,g,h).then(function(a){e(a)})}else i.get_news_feed(a)},_add_listeners=function(){k=a.$on("moveRight",function(b){j=c(function(){a.move_right()},1e3)}),add_to_notifications=a.$on("addToNotifications",function(b,c){if(c instanceof Array){var d=!1;angular.forEach(a.notifications,function(a){a.id==c[0].id&&(d=!0)}),d||(a.notifications=a.notifications.concat(c))}else angular.isUndefined(a.notifications)&&(a.notifications=[]),angular.isUndefined(a.personal_notifications)&&(a.personal_notifications=[]),angular.isDefined(c)&&a.notifications.push(c),a.personal_notifications.push(c);b.stopPropagation()}),get_notifications_event=a.$on("getNotifications",function(c,d,e,f){angular.isUndefined(d)||!d?angular.isDefined(e)?angular.isDefined(b.reader)&&e==b.reader.id?a._show_reader_feed(e,f):a._show_personal_feed(e,f):a._show_news_feed(f):a._show_trending_feed()}),l=a.$on("getLatestNotification",function(){d.get_latest_notification().then(function(b){a.notifications.push(b.notification)})})},_initiate_loading_page=function(){a.show_login_form=!1,a.loading=!1},a.toggle_notifications=function(){a.show_notifications?(a.show_notifications=!1,a.notifications_seen=!0):a.show_notifications=!0},a.handle_keyboard_bindings=function(b){b.keyCode==h.KeyRight?(b.preventDefault(),a.move_right(b)):b.keyCode==h.KeyLeft&&(b.preventDefault(),a.move_left(b)),b.stopPropagation()},a.search=function(){var c=event.currentTarget==event.srcElement&&!b.show_book;c&&($("body").css("white-space","normal"),a.website.searching=!0,b.keyCode=event.keyCode)},_handle_socket_error=function(){},_init=function(){_initiate_loading_page(),a.more_filters=[],a.show_notifications=!0,a.notifications_seen=!1,angular.isDefined(b.focused_book)&&(b.focused_book.level2_option=""),a.website={},a.website.searching=!1,a.website.show_search_page=!0,_bind_emit(),_bind_feedback_form(),_add_listeners(),_handle_socket_error(),b.notification_active=!1,b.user={books:{bookmarked:[],read:[]},authors:{bookmarked:[],follow:[]},readers:{follow:[]},logged:!1},a._detect_browser();var d=c(function(){a.show_header=!0},2e3);a.$on("destroy",function(){c.cancel(d)})},a._detect_browser=function(){{var a,b,c,d=(navigator.appVersion,navigator.userAgent),e=navigator.appName,f=""+parseFloat(navigator.appVersion),g=parseInt(navigator.appVersion,10);h.BrowserIncompatible}-1!=(b=d.indexOf("Opera"))?(e="Opera",f=d.substring(b+6),-1!=(b=d.indexOf("Version"))&&(f=d.substring(b+8))):-1!=(b=d.indexOf("MSIE"))?(e="Microsoft Internet Explorer",f=d.substring(b+5)):-1!=(b=d.indexOf("Chrome"))?(e="Chrome",f=d.substring(b+7)):-1!=(b=d.indexOf("Safari"))?(e="Safari",f=d.substring(b+7),-1!=(b=d.indexOf("Version"))&&(f=d.substring(b+8))):-1!=(b=d.indexOf("Firefox"))?(e="Firefox",f=d.substring(b+8)):(a=d.lastIndexOf(" ")+1)<(b=d.lastIndexOf("/"))&&(e=d.substring(a,b),f=d.substring(b+1),e.toLowerCase()==e.toUpperCase()&&(e=navigator.appName)),-1!=(c=f.indexOf(";"))&&(f=f.substring(0,c)),-1!=(c=f.indexOf(" "))&&(f=f.substring(0,c)),g=parseInt(""+f,10),isNaN(g)&&(f=""+parseFloat(navigator.appVersion),g=parseInt(navigator.appVersion,10))};var j="",k="",l="";_init()}]);