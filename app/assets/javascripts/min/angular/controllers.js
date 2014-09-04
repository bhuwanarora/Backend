websiteApp.controller("bookTimelineController",["$scope","$rootScope","$timeout","widgetService","$route","$routeParams","$interval",function(a,b,c,d){(_init=function(){d.get_moments().then(function(b){a.moments=b.moments})})()}]);;websiteApp.controller("recommendationsController",["$scope","$rootScope","$timeout","recommendationService","$route","$routeParams","$interval","widgetService","scroller","websiteService","sharedService","$cookieStore","RecommendationUIConstants","$location",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){a.handle_height_of_popup=function(b,c){var d=angular.isDefined(b);if(d)var e=b.deltaY>0;else var e=c;e&&(a.ticker_popup_style={height:m.TickerPopupMaxHeight}),d&&b.stopPropagation()},a.show_settings_popup=function(a){b.user.settings_popup=angular.isUndefined(b.user.settings_popup)?!0:!b.user.settings_popup,a.stopPropagation()},a.logout=function(){k.logout()},a.show_interaction_box=function(){b.user.interact=!0,delete b.focused_book},a.handle_friends_grid_size=function(b,c){var d=angular.isDefined(b);if(d)var e=b.deltaY>0;else var e=c;e&&(a.column_heights={notifications_style:{"max-height":m.NotificationsMinHeight},friends_grid_style:{"max-height":m.FriendsGridMaxHeight,overflow:"auto"},show_filters:!1}),d&&b.stopPropagation()},a.reset=function(){a.panel_selected="",a.bookmark_selected=!1,a.read_selected=!1,_init_recommendations(),_get_recommendations()},a.stopSearching=function(a){b.searching=!1,a.currentTarget.text=""},a.hide_popups=function(){delete b.focused_book,delete b.ticker_popup},a.get_notifications=function(){a.$emit("getNotifications")},_load_icon=function(){a.drop_icon=!0,c(function(){a.drop_icon=!1},1e3)},_add_listeners=function(){p=a.$on("loadRecommendations",function(){a.read_selected||a.bookmark_selected?a.bookmark_selected?j.get_books_bookmarked(b.user.books.bookmarked.length).then(function(a){angular.forEach(a,function(a){var c=[];angular.forEach(b.labels,function(b){if(a[2].indexOf(b.name)>=0)var d={name:b.name,checked:!0};else var d={name:b.name,checked:!1};c.push(d)},c);var d={isbn:a[0],id:a[1],bookmark_status:!0,labels:c};this.push(d)},b.user.books.bookmarked)}):a.read_selected&&j.get_books_read(b.user.books.read.length).then(function(a){angular.forEach(a,function(a){var b={isbn:a[0],id:a[1],status:!0};this.push(b)},b.user.books.read)}):(b.filters.reset=!1,b.filters.reset_count=angular.isUndefined(b.filters.reset_count)?0:b.filters.reset_count+1,_get_recommendations())}),q=a.$on("reloadRecommendations",function(){b.filters.reset=!0,b.filters.reset_count=0,a.reset()})},_init_recommendations=function(){a.recommendations={books:[],readers:[],authors:[]}},_bind_destroy=function(){a.$on("$destroy",function(){c.cancel(o),c.cancel(r)})},_show_bookmark_tab=function(){a.bookmark_selected=!0,a.panel_selected=m.BookmarkPanel},_initialize_filters=function(){if(b.filters={},b.filters.more_filters=[],b.filters.other_filters={},"books"==f.type){b.filters.filter_type=m.BookTab;var c=angular.isDefined(f.filter_id),d=angular.isDefined(f.grid_id),e=angular.isDefined(f.trend_id);c?l.get("tab")==m.BookmarkPanel?(_show_bookmark_tab(),b.filters.label_id=f.filter_id,b.main_header=f.name):(b.filters.filter_id=f.filter_id,b.main_header=f.name):e?(b.filters.reset=!0,b.filters.reset_count=0,b.filters.trend_id=f.trend_id,b.main_header=f.name):d?(b.filters.filter_id=f.grid_id,b.main_header=f.name):delete b.main_header}else if("authors"==f.type)b.filters.filter_type=m.AuthorTab;else if("readers"==f.type)b.filters.filter_type=m.ReaderTab;else if(f.book_id)a.$routeParams.type="books",b.filters.reset=!0,b.filters.filter_type=m.BookTab,b.filters.other_filters.id=a.$routeParams.book_id;else if(f.title){a.$routeParams.type="books",b.filters.reset=!0,b.filters.filter_type=m.BookTab,b.filters.other_filters.title=a.$routeParams.title,b.main_header=a.$routeParams.title;var g=angular.isDefined(a.$routeParams.status);g&&(b.filters.other_filters.show_all=a.$routeParams.status,b.filters.reset=!0,b.filters.reset_count=0)}else b.filters.filter_type=m.BookTab,a.show_notifications=!0},_update_recommendations=function(d){if(b.filters.filter_type==m.BookTab){if(d.recommendations.books.length>0)var e="INFO- "+d.recommendations.books.length+" books found.";else if(0==d.recommendations.books.length)var e="INFO- "+d.recommendations.books.length+" book found.";var f=notify(b,e,c);if(a.$on("destroy",function(){c.cancel(f)}),b.loading){var g=10;if(0==d.recommendations.books.length){var e=m.ZeroBooksFound,f=notify(b,e,c);a.$on("destroy",function(){c.cancel(f)})}else{if(delete b.focused_book,a.recommendations.books.length>=g){a.recommendations.books=[a.recommendations.books[g-2],a.recommendations.books[g-1]];var f=c(function(){i.scrollTo(window_width/4,0,2e3)},200);a.$on("destroy",function(){c.cancel(f)})}b.filters.other_filters.title?(a.bookmark_selected=!1,a.read_selected=!1,b.hide_options=!0,_set_books(d.recommendations.books)):_set_books(d.recommendations.books)}b.loading=!1}}else b.filters.filter_type==m.AuthorTab?a.recommendations.authors=a.recommendations.authors.length>=g?d.recommendations.authors:a.recommendations.authors.concat(d.recommendations.authors):b.filters.filter_type==m.ReaderTab?a.recommendations.readers=a.recommendations.readers.length>=g?d.recommendations.readers:a.recommendations.readers.concat(d.recommendations.readers):_set_books(a.recommendations.books.length>=g?d.recommendations.books:d.recommendations.books)},_set_books=function(c){if(a.bookmark_selected){b.user.books.bookmarked=[],angular.forEach(c,function(a){var b={isbn:a[0],id:a[1],external_thumb:a[2]};this.push(b)},b.user.books.bookmarked);var d=window_width/b.user.books.bookmarked.length;a.block_style={width:d+"px"}}else{angular.forEach(c,function(a){var b={isbn:a[0],id:a[1],external_thumb:a[2]};this.push(b)},a.recommendations.books);var d=window_width/(a.recommendations.books.length+6);a.block_style={width:d+"px"}}},_get_grids=function(){d.get_grid_books().then(function(b){for(var c=[],d="",e=0;e<b.length;e++){var f=d!=b[e][0];if(f){var g=""!=d;if(g){if(c.length>4){var h={grid_text:d,grid_books:c,is_grid:!0,id:grid_id},i=a.recommendations.books.length-2;a.recommendations.books.splice(i,0,h)}c=[]}d=b[e][0],grid_id=b[e][3]}var j={isbn:b[e][1],id:b[e][2],external_thumb:b[e][4]};c.push(j)}if(c.length>4){var h={grid_text:d,grid_books:c,is_grid:!0,id:grid_id},i=a.recommendations.books.length-2;a.recommendations.books.splice(i,0,h)}})},_push_recommendations=function(){var e=3e3;o=c(function(){d.push_recommendations().then(function(d){var e={grid_text:"Books becoming movies",grid_books:d,is_grid:!0};a.recommendations.books.splice(3,0,e);var f="INFO-Checkout Books becoming movies...";notify(b,f,c)})},e)},_init_analytics=function(){b.data=[]},_recordUserBehaviour=function(){var a=6e8;g(function(){b.data;_init_analytics()},a)},_get_recommendations=function(){b.loading=!0,d.get_recommendations().then(function(a){_update_recommendations(a)});var c=angular.isUndefined(b.filters.other_filters.title)&&angular.isUndefined(b.filters.other_filters.id),e=a.recommendations.books.length>4;c&&e&&_get_grids()},_handle_focused_book=function(){b.focused_book=a.recommendations.books.first},_get_friends=function(){h.get_friends(a.$routeParams.id).then(function(a){b.user.friends=[],angular.forEach(a,function(a){thumb=null==a[2]?"/assets/profile_pic.jpeg":a[2];var b={id:a[0],name:a[1],thumb:thumb,init_book_read_count:a[3],total_count:a[4],book_read_count:a[5],bookmark_count:a[6],fav_categories:a[7].join(", ")};this.push(b)},b.user.friends)})},_get_labels=function(){b.labels=[],d.get_labels().then(function(a){angular.isArray(a)&&a.length>0&&angular.forEach(a,function(a){null!=a[0]&&this.push({name:a[0].replace('"',""),id:a[1]})},b.labels)})},_init_user=function(){(angular.isUndefined(b.user)||angular.isUndefined(b.user.id))&&k.is_logged_in(a)},_init=function(){if(b.user.logged){a.grid_view=!1,a.$routeParams=f,b.user.settings_popup=!1;var d=1e4;a.drop_icon=!1,b.user.interact=!1,r=c(function(){_recordUserBehaviour()},d),a.searching=!1,_get_labels(),_initialize_filters(),_init_recommendations(),_add_listeners(),_init_analytics();var e=c(function(){_get_recommendations()},1e3);a.$on("destroy",function(){c.cancel(e)}),_bind_destroy(),_init_user(),_get_friends(),a.$emit("getNotifications")}else b.user={books:{bookmarked:[],read:[]},authors:{bookmarked:[],follow:[]},readers:{follow:[]},logged:!1},n.path("/search")};var o="",p="",q="",r="";_init()}]);;websiteApp.controller("searchController",["$scope","$rootScope","websiteService","$timeout","$sce","recommendationService","$routeParams","$location","SearchUIConstants","WebsiteUIConstants","$cookieStore",function(a,b,c,d,e,f,g,h,i,j,k){a._update_filters=function(b,c){var d={type:b,custom_option:!0};switch(b){case i.Genre:var e={icon2:"icon-tag"};break;case i.AuthorSearch:var e=angular.extend(c,{icon2:"icon-pen"});break;case i.Time:var e={icon2:"icon-clock"};break;case i.Year:var e={icon2:"icon-calendar"};break;case i.Country:var e={icon2:"icon-earth"}}d=angular.extend(d,e),angular.isUndefined(a.filters_added)&&(a.filters_added=[]),a.add_filters(d)},a.stop_horizontal_scroll=function(a){a.stopPropagation()},a.is_active_nest=function(b){var c=!1;return a.active_nest==b.name&&(c=!0),c},a.search_custom=function(b){var d=(a.custom_search==i.Genre||a.custom_search==i.AuthorSearch,b.keyCode==j.Enter);if(d)a.handle_selection_option(a.search_tag.currentItem,b);else{var e=b.keyCode==j.Backspace||b.keyCode==j.Delete;if(e)var f=a.search_tag.custom_input;else var f=a.search_tag.custom_input+String.fromCharCode(b.keyCode);var g="q="+f+"&count=10";a.search_results=[],a.custom_search==i.Genre?(a.search_display=i.SearchingGenres,c.search_genres(g).then(function(b){b.length>0?(a.search_results=[],delete a.search_display,angular.forEach(b,function(a){var b={name:a[0],id:a[1],icon2:"icon-tag",custom_option:!0,type:i.Genre};this.push(b)},a.search_results)):a.search_display=i.NoResultsFound})):a.custom_search==i.AuthorSearch&&(a.search_display=i.SearchingAuthor,c.search_authors("q="+f).then(function(b){b.length>0?(a.search_results=[],delete a.search_display,angular.forEach(b,function(a){var b={name:a[0],id:a[1],icon2:"icon-pen",custom_option:!0,type:i.AuthorSearch};this.push(b)},a.search_results)):a.search_display=i.NoResultsFound}))}},a.reset_secondary_input_focus=function(){var b=d(function(){a.website.searching_custom=!1},200);a.$on("destroy",function(){d.cancel(b)})},a.select_next_option=function(b){if(a.active_base==i.BookSearch){var c=!1,d=!1,e=[];if(angular.forEach(a.filters_added,function(a){e.push(a.type)},e),angular.forEach(a.base_book_options,function(f){filter_already_selected=!1,c&&e.indexOf(f.type)<0?(m&&a.base_book_options.length==a.filters_added.length&&a.show_books(),a.handle_selection_option(f,event),d=!0,c=!1):f.type!=b||d||(c=!0)}),m){if(!d){var f=a.base_book_options.length>a.filters_added.length;if(f){var g="";angular.forEach(a.base_book_options,function(a){e.indexOf(a.type)<0&&""==g&&(g=a)}),a.handle_selection_option(g,event)}else a.show_books()}}else if(!d){var h=a.base_book_options[0];a.handle_selection_option(h,event)}}},a.handle_search_request=function(b){m?a.show_books():a.handle_options(b)},a.show_books=function(){h.path("/user/"+b.user.id+"/recommendations/books")},a.handle_selection_option=function(e,g){if(a.search_tag.result_count=10,e.level1_option){if(a.active_base==i.BookSearch){a.show_compressed_base=!0,a.active_nest=e.name,a.hide_input_field=!0,a.show_secondary_input=!0,a.search_tag.custom_input="",a.website.searching_custom=!0;var h=angular.isDefined(a.filters_added)&&a.filters_added.length>0;switch(delete a.custom_search,delete a.search_display,delete a.search_tag.current,e.type){case i.Year:a.custom_input_placeholder=i.YearPlaceholder,b.time_groups?(a.search_results=[],h?a.search_results=b.time_groups:a._add_years()):f.get_time_groups().then(function(c){a.search_results=[],b.time_groups=[],angular.forEach(c.times,function(a){var b=a[0].data,c=b.name,d={name:c,type:i.Year,label:b.range,icon2:"icon-calendar",custom_option:!0};this.push(d)},b.time_groups),a._add_years()});break;case i.List:if(b.book_lists)if(a.search_results=[],h)a.search_results=b.book_lists;else{var j=d(function(){a.search_results=b.book_lists},200);a.$on("destroy",function(){d.cancel(j)})}else f.get_book_lists().then(function(c){a.search_results=[],angular.forEach(c,function(a){var b={name:a[1],id:a[0],type:i.List,icon2:"icon-list",custom_option:!0};this.push(b)},a.search_results),b.book_lists=a.search_results});break;case i.Country:a.custom_input_placeholder=i.CountryPlaceholder,b.regions?(a.search_results=[],h?a.search_results=b.regions:a._add_countries()):f.get_countries().then(function(c){a.search_results=[],b.regions=[],angular.forEach(c.countries,function(a){var b=angular.extend(a,{type:i.Country,icon2:"icon-earth",custom_option:!0});this.push(b)},b.regions),a._add_countries()});break;case i.Genre:if(a.custom_input_placeholder=i.GenrePlaceholder,a.custom_search=i.Genre,a.search_tag.result_count=50,angular.isDefined(b.genres))a.search_results=[],h?a.search_results=b.genres:a._add_genres();else{var l="q=''&count=10";c.search_genres(l).then(function(c){a.search_results=[],b.genres=[],angular.forEach(c,function(a){var b=k.get(i.Genre),c=angular.isDefined(b)&&b.id!=a[1]||angular.isUndefined(b);if(c){var d={name:a[0],id:a[1],icon2:"icon-tag",custom_option:!0,type:i.Genre,icon:a[2]};this.push(d)}},b.genres),a._add_genres()})}break;case i.AuthorSearch:a.custom_input_placeholder=i.AuthorPlaceholder,a.custom_search=i.AuthorSearch;var m=0;angular.isDefined(a.filters_added)&&angular.forEach(a.filters_added,function(a){a.type==i.Genre&&(m=a.id)}),angular.isUndefined(b.authors)&&(b.authors={});var n=0==m&&angular.isDefined(b.authors.genre_filter_id)||0!=m&&(angular.isUndefined(b.authors.genre_filter_id)||b.authors.genre_filter_id!=m),o=angular.isDefined(b.authors.data)&&!n;o?(a.search_results=[],h?a.search_results=b.authors.data:a._add_authors()):c.search_authors("genre_id="+m).then(function(c){0!=m&&(b.authors.genre_filter_id=m),a.search_results=[],b.authors.data=[],angular.forEach(c,function(a){var b=k.get(i.AuthorSearch),c=angular.isDefined(b)&&b.id!=a[1]||angular.isUndefined(b);if(c){var d={name:a[0],id:a[1],icon2:"icon-pen",custom_option:!0,type:i.AuthorSearch};this.push(d)}},b.authors.data),a._add_authors()});break;case i.Time:a.custom_input_placeholder=i.TimePlaceholder,b.read_times?(a.search_results=[],h?a.search_results=b.read_times:a._add_read_times()):f.get_read_times().then(function(c){a.search_results=[],b.read_times=[],angular.forEach(c.read_times,function(a){var b=a[0].data,c=b.name,d=b.type,e={name:c,type:i.Time,icon2:"icon-clock",tag:d,custom_option:!0};this.push(e)},b.read_times),a._add_read_times()});break;case i.Gender:a.search_results=[{name:i.MaleGender,icon:"icon-male"},{name:i.FemaleGender,icon:"icon-female"},{name:i.DontCareGender}];break;case i.Awards:break;case i.ComingSoon:a.coming_soon=!0}a.reset_secondary_input_focus()}}else angular.isUndefined(a.filters_added)&&(a.filters_added=[]),a.filters_added.indexOf(e)<0&&a.add_filters(e);g.stopPropagation()},a._add_authors=function(){var c=d(function(){a.search_results=b.authors.data},200);a.$on("destroy",function(){d.cancel(c)})},a._add_genres=function(){var c=d(function(){a.search_results=b.genres},200);a.$on("destroy",function(){d.cancel(c)})},a._add_read_times=function(){var c=d(function(){a.search_results=b.read_times},200);a.$on("destroy",function(){d.cancel(c)})},a._add_countries=function(){var c=d(function(){a.search_results=b.regions},200);a.$on("destroy",function(){d.cancel(c)})},a._add_years=function(){var c=d(function(){a.search_results=b.time_groups},200);a.$on("destroy",function(){d.cancel(c)})},a._set_active_type=function(b){angular.forEach(a.base_book_options,function(a){a.type==b&&(a.active=!0)})},a._remove_active_type=function(b){angular.forEach(a.base_book_options,function(a){a.type==b&&delete a.active})},a.add_filters=function(c){switch(angular.forEach(a.filters_added,function(b){b.type==c.type&&(a.filters_added.splice(a.filters_added.indexOf(b),1),a.search_results.splice(0,0,b))}),m||angular.isUndefined(b.filters)&&(b.filters={other_filters:{}}),a._set_active_type(c.type),c.type){case i.Genre:var d=c.id;break;case i.AuthorSearch:var d=c.id;break;case i.Time:var d=c.tag;break;case i.Year:var d=c.name;break;case i.Country:var d=c.name;break;case i.BookSearch:if(m){var e=b.user.id;h.path(angular.isDefined(c.show_all)&&c.show_all?"/user/"+e+"/book/"+c.name+"/all/"+!0:"/user/"+e+"/book/"+c.id)}else angular.isDefined(c.show_all)&&c.show_all?(b.filters.other_filters.show_all=!0,b.filters.other_filters.title=c.name):b.filters.other_filters.id=c.id,b.hide_options=!0}var f=!(c.type==i.BookSearch);m?k.put(c.type,c):p||o||n?(k.put(c.type,c),a.show_books()):(f&&(b.filters.other_filters[c.type]=d,k.put(c.type,c)),b.filters.reset_count=0,b.filters.reset=!0,a.$emit("reloadRecommendations")),f&&(a.filters_added.splice(0,0,c),a.search_results.splice(a.search_results.indexOf(c),1),a.select_next_option(c.type))},a._reset_filter=function(c){switch(c.type){case i.Time:angular.isDefined(b.read_times)&&b.read_times.splice(0,0,c);break;case i.Year:angular.isDefined(b.time_groups)&&b.time_groups.splice(0,0,c);break;case i.List:angular.isDefined(b.book_lists)&&b.book_lists.splice(0,0,c);break;case i.AuthorSearch:angular.isDefined(b.authors)&&angular.isDefined(b.authors.data)&&b.authors.data.splice(0,0,c);break;case i.Genre:angular.isDefined(b.genres)&&(angular.isDefined(b.authors)&&angular.isDefined(b.authors.genre_filter_id)&&delete b.authors.genre_filter_id,b.genres.splice(0,0,c));break;case i.Country:angular.isDefined(b.regions)&&b.regions.splice(0,0,c)}k.remove(c.type),m||(delete b.filters.other_filters[c.type],a.$emit("reloadRecommendations"))},a.remove_filter=function(b,c){a._reset_filter(b),a.filters_added.splice(a.filters_added.indexOf(b),1),0==a.filters_added.length&&(a.handle_options(c),a.set_focus(200)),angular.forEach(a.base_book_options,function(d){d.type==b.type&&(a.handle_selection_option(d,c),delete d.active)}),c.stopPropagation()},a.reset_filters=function(){angular.isDefined(a.filters_added)&&(angular.forEach(a.filters_added,function(b){a._reset_filter(b)}),a.filters_added=[])},a.set_base_search=function(){switch(a.active_base){case i.BookSearch:_init_book_search();break;case i.AuthorSearch:_init_author_search();break;case i.ReaderSearch:_init_reader_search()}},a.handle_base_selection=function(b){if(a.hide_input_field=!1,a.show_secondary_input=!1,a.reset_filters(),a.search_tag.input="",delete a.search_display,angular.isUndefined(b))a.set_base_search();else if(angular.isDefined(a.active_base)&&a.active_base==b.type)a.search_tag.placeholder=i.SearchPlaceholder,a.search_results=[],delete a.active_base,k.remove("base_search");else{switch(b.name){case i.BookSearchLink:_init_book_search();break;case i.AuthorSearchLink:_init_author_search();break;case i.ReaderSearchLink:_init_reader_search()}a.active_base=b.type}a.website.searching=!0;d(function(){a.website.searching=!1},200);a.$on("destroy",function(){d.cancel(timeout_event)}),delete a.active_nest,delete a.search_tag.custom_input},a.is_active=function(b){var c=!1;return b.type==a.active_base&&(c=!0),c},a.is_current=function(b,c){return a.search_tag.current==b&&(a.search_tag.currentItem=c,c.show_all?a.search_tag.input=c.value:c.type==i.ComingSoon||c.level1_option||c.custom_option||(a.search_tag.input=c.name)),a.search_tag.current==b},a.set_current=function(b){a.search_tag.current=b},a.key_down=function(c){var d=c.keyCode==j.Backspace||c.keyCode==j.Delete,e=c.keyCode==j.KeyUp,f=c.keyCode==j.KeyDown,g=c.keyCode==j.KeyLeft,h=c.keyCode==j.KeyRight;if(e)angular.isUndefined(a.search_tag.current)?a.search_tag.current=0:a.set_current(0!=a.search_tag.current?a.search_tag.current-1:a.search_results.length-1);else if(f)angular.isUndefined(a.search_tag.current)?a.search_tag.current=0:a.set_current(a.search_tag.current!=a.search_results.length-1?a.search_tag.current+1:0);else if(d){var k=angular.isDefined(a.search_tag.custom_input);if(k)var l=a.search_tag.custom_input.trim();else var l=a.search_tag.input.trim();if(delete a.search_display,delete a.search_tag.current,k)l.length<=1?a.custom_search==i.Genre?a.search_results=b.genres:a.custom_search==i.AuthorSearch&&(a.search_results=b.authors.data):a.search_custom(c);else if(l.length<=1){a.search_tag.input="",a.search_ready=!1,a.set_base_search(),angular.isUndefined(a.active_base)&&(a.search_type=i.All);var n=angular.isDefined(b.filters.other_filters)&&(angular.isDefined(b.filters.other_filters.title)||angular.isDefined(b.filters.other_filters.id))&&!m;n&&(delete b.filters.other_filters.title,delete b.filters.other_filters.show_all,delete b.filters.other_filters.id,a.$emit("reloadRecommendations"))}else a.get_search_results(c)}else(g||h)&&c.stopPropagation()},a.close_login_box=function(){a.show_login_form=!1},a.highlight=function(a,b){var c="<span><i><b>$&</b></i></span>";return e.trustAsHtml(b.replace(new RegExp(a,"gi"),c))},_init_graph_search=function(){a.base_search_options=[{name:i.BookSearchLink,icon:"icon-book",type:i.BookSearch},{name:i.AuthorSearchLink,icon:"icon-pen",type:i.AuthorSearch},{name:i.ReaderSearchLink,icon:"icon-users",type:i.ReaderSearch}]},_init_book_search=function(){a.base_book_options=[{name:i.BookByGenreLink,level1_option:!0,type:i.Genre,icon:"icon-tag",icon2:"icon-book"},{name:i.BookByAuthorLink,level1_option:!0,type:i.AuthorSearch,icon:"icon-pen",icon2:"icon-book"},{name:i.BookByReadingTimeLink,level1_option:!0,type:i.Time,icon:"icon-clock",icon2:"icon-book"},{name:i.BookByYearLink,level1_option:!0,type:i.Year,icon:"icon-calendar",icon2:"icon-book"},{name:i.BookByRegionLink,level1_option:!0,type:i.Country,icon:"icon-earth",icon2:"icon-book"}],a.search_results=a.base_book_options,a.search_tag.placeholder=i.BookSearchPlaceholder,m&&k.put("base_search",i.BookSearchLink)},_init_author_search=function(){a.search_results=[{name:i.ComingSoon,level1_option:!0,type:i.ComingSoon,icon2:"icon-pen"}],a.search_tag.placeholder=i.AuthorSearchPlaceholder,m&&k.put("base_search",i.AuthorSearchLink)},_init_reader_search=function(){a.search_results=[{name:i.ComingSoon,level1_option:!0,type:i.ComingSoon,icon2:"icon-user22"}],a.search_tag.placeholder=i.ReaderSearchPlaceholder,m&&k.put("base_search",i.ReaderSearchLink)},_handle_search_input=function(){var b=a.search_tag.input.trim();if(a.search_ready=!0,angular.isUndefined(a.active_base)){var d=b.slice(0,1),e=d==i.Hash,f=d==i.AtTheRate,g=d==i.Plus,h=f||e||g;b.length>0&&_set_custom_search(f,e,g)}else b.length>0&&_set_custom_search();h&&(1==b.length&&(a.search_ready=!1),b=b.substring(1,b.length)),a.search_ready&&""!=b?b.length<3?a.search_display=i.TypeMore:c.search(b,a.search_type,a.search_tag.result_count).then(function(b){if(a.search_ready){a.search_results=[];var c=b.results.data;if(a.active_base==i.BookSearch?angular.forEach(c,function(a){var b={name:a[0],author_name:a[1],id:a[2],type:i.BookSearch,icon2:"icon-book"};this.push(b)},a.search_results):a.active_base==i.AuthorSearch?angular.forEach(c,function(a){var b={name:a[0],id:a[2],type:i.AuthorSearch,icon2:"icon-pen"};this.push(b)},a.search_results):a.active_base==i.ReaderSearch?angular.forEach(c,function(a){var b={name:a[0],id:a[2],type:i.ReaderSearch,icon2:"icon-users"};this.push(b)},a.search_results):angular.forEach(c,function(a){if(a[3].indexOf(i.BookLabel)>=0)var b={name:a[0],author_name:a[1],id:a[2],type:i.BookSearch,label:i.BookSearch};else if(a[3].indexOf(i.AuthorLabel)>=0)var b={name:a[0],id:a[2],type:i.AuthorSearch,label:i.AuthorSearch};else if(a[3].indexOf(i.ReaderLabel)>=0)var b={name:a[0],id:a[2],type:i.ReaderSearch,label:i.ReaderSearch};this.push(b)},a.search_results),a.search_results.length==a.search_tag.result_count){var d={name:"<span class='icon-list'></span><span>&nbsp;&nbsp;Show all results for '<em>"+a.search_tag.input+"</em>'</span>",show_all:!0,value:a.search_tag.input};a.search_results.push(d),delete a.search_display}else 0!=a.search_results.length?delete a.search_display:a.search_display=i.NoResultsFound;a.search_initiated=!1}}):(a.search_initiated=!1,a.set_base_search())},_set_custom_search=function(b,c,d,e){a.search_results=[],angular.isUndefined(b)&&(a.active_base==i.AuthorSearch?b=!0:a.active_base==i.BookSearch?c=!0:a.active_base==i.ReaderSearch&&(d=!0)),b?(a.search_type=i.AuthorSearch,a.search_display=i.SearchingAuthorsAndReaders):c?(a.search_type=i.BookSearch,a.search_display=i.SearchingBooks):d?(a.search_type=i.ReaderSearch,a.search_display=i.SearchingUsers):e?(a.search_type=i.TagSearch,a.search_display=i.SearchingTags):(a.search_type=i.SearchAll,a.search_display=i.SearchingWebsite)},a.get_search_results=function(b){var c=350;if(a.search_results=[],a.search_initiated)d.cancel(l),l=d(function(){_handle_search_input(b)},c);else{var e=b.keyCode==j.Enter;if(e)a.handle_selection_option(a.search_tag.currentItem,b);else{var f=String.fromCharCode(b.keyCode),g=a.search_tag.input.trim();if(g&&g.length>1){0==g.indexOf(i.Hash),0==g.indexOf(i.AtTheRate),0==g.indexOf(i.Plus)}else{f==i.Hash,f==i.AtTheRate,f==i.Plus}a.search_initiated=!0,l=d(function(){_handle_search_input(b)},c)}}},a.toggle_login_panel=function(){a.show_login_form=a.show_login_form?!1:!0},a.handle_options=function(c){g.type&&(b.hide_options&&((angular.isUndefined(a.search_tag.input)||0==a.search_tag.input.length)&&(a.hide_input_field=!1,_init_book_search()),a.show_secondary_input=!1,b.hide_options=!1,b.user.collapsed_column=!0,delete b.focused_book,delete a.active_nest,delete a.active_base,delete a.search_tag.custom_input,a.active_base=i.BookSearch),c.stopPropagation())},a.reset_search_bar=function(c){b.hide_options=!0,a.hide_input_field=!1,c.stopPropagation()},_handle_search_page=function(){a.search_initiated=!1,a.search_type=i.All,a.show_login_form=!0,a.search_tag={},a.search_tag.search_placeholder=i.SearchPlaceholder;var d=angular.isDefined(b.filters)&&angular.isDefined(b.filters.other_filters)&&angular.isDefined(b.filters.other_filters.title);a.search_tag.input=d?b.filters.other_filters.title:"",a.search_tag.result_count=10,c.get_background_image().then(function(b){var c="http://rd-images.readersdoor.netdna-cdn.com/cp/"+b+".jpg";a.search_style={"background-image":'url("'+c+'")'}}),_init_graph_search(),b.hide_options=g.type?!0:!1},_get_trends=function(){m?(a.trends=[],c.get_trending_topics().then(function(b){angular.forEach(b,function(a){var b={name:a[0],id:a[1],thumb:a[6],keywords:a[8],large_image:a[5]};this.push(b)},a.trends)})):c.get_trending_topics().then(function(b){var c=[];angular.forEach(b,function(a){var b={name:a[0],id:a[1],message:a[2],url:a[3],title:a[4],thumb:a[7],large_image:a[5],keywords:a[8]};this.push(b)},c),a.$emit("addToNotifications",c)})},a.set_focus=function(b){var c=d(function(){a.website.searching=!0;d(function(){a.website.searching=!1},200)},b);a.$on("destroy",function(){d.cancel(c),d.cancel(reset_focus_param_timeout)})},_add_init_filters=function(){if(angular.isUndefined(a.filters_added)&&(a.filters_added=[]),angular.isDefined(k.get(i.Genre))){var c=k.get(i.Genre);m||(b.filters.other_filters[i.Genre]=c.id),a._set_active_type(c.type),a.filters_added.push(c)}if(angular.isDefined(k.get(i.AuthorSearch))){var c=k.get(i.AuthorSearch);m||(b.filters.other_filters[i.AuthorSearch]=c.id),a._set_active_type(c.type),a.filters_added.push(c)}if(angular.isDefined(k.get(i.Time))){var c=k.get(i.Time);m||(b.filters.other_filters[i.Time]=c.tag),a._set_active_type(c.type),a.filters_added.push(c)}if(angular.isDefined(k.get(i.Year))){var c=k.get(i.Year);m||(b.filters.other_filters[i.Year]=c.name),a._set_active_type(c.type),a.filters_added.push(c)}if(angular.isDefined(k.get(i.Country))){var c=k.get(i.Country);m||(b.filters.other_filters[i.Country]=c.name),a._set_active_type(c.type),a.filters_added.push(c)}!m&&a.filters_added.length>0&&a.$emit("reloadRecommendations")},_clear_filter_cookies=function(){k.remove(i.Genre),k.remove(i.AuthorSearch),k.remove(i.Time),k.remove(i.Year),k.remove(i.Country)},_get_ten_random_books=function(){f.get_random_books().then(function(b){a.random_books=[],angular.forEach(b,function(a){var b={id:a[0],isbn:a[1]};this.push(b)},a.random_books);for(var c=window_width/(b.length+2),d=window_width/(b.length-2),e=0,f=0;f<b.length;f++){var g=Math.random()*(d-c)+c;g>window_width-e&&(g=window_width-e),a.random_books[f]=angular.extend(a.random_books[f],{width:g,left:e}),e=e+g+5}})},a.set_book_width=function(a){return{width:a.width+"px",left:a.left+"px"}},_init=function(){if(a.website.searching=!1,a.filters_added=[],_handle_search_page(),m)switch(b.user.logged&&a.set_focus(3e3),k.get("base_search")){case i.BookSearchLink:_init_book_search(),a.active_base=i.BookSearch;break;case i.AuthorSearchLink:_init_author_search(),a.active_base=i.AuthorSearch;break;case i.ReaderSearchLink:_init_reader_search(),a.active_base=i.ReaderSearch;break;default:a.search_tag.placeholder=i.SearchPlaceholder}else _init_book_search(),a.active_base=i.BookSearch;_get_trends(),a.$on("updateFilters",function(b,c,d){a._update_filters(c,d),b.preventDefault()}),q||m?_add_init_filters():_clear_filter_cookies()};var l="",m=angular.isUndefined(g.type),n=angular.isDefined(g.filter_id),o=angular.isDefined(g.grid_id),p=angular.isDefined(g.trend_id),q=!(m||n||o||p);_init()}]);;websiteApp.controller("timelineController",["$scope","$rootScope","$timeout","recommendationService","$route","$routeParams","$interval",function(){}]);;websiteApp.controller("loginController",["$scope","$rootScope","websiteService","Facebook","stropheService","$timeout","$cookieStore","LoginConstants","WebsiteUIConstants",function(a,b,c,d,e,f,g,h,i){a.submit=function(b){var c=b.keyCode==i;c&&a.authenticate(!0),b.stopPropagation()},a.recover_password=function(){delete a.error_message;var d=function(c){a.loading_icon=!1,a.error_message=c.message,b.user.password=null},e=function(c){a.loading_icon=!1,a.error_message=c.message,b.user.password=null};b.user.email?(a.loading_icon=!0,c.recover_password("email="+b.user.email).then(d,e)):a.error_message=h.EmailNotPresent},a.authenticate=function(d){var e=b.user.email,g=b.user.password,i=new RegExp("^.{8,}$"),j=new RegExp("^(.)\\1{7,16}$"),k=new RegExp("^.{100,}$");delete a.error_message;var l={email:e,password:g,old_user:d};a.loading_icon=!1;var m=function(c){a.error_message=c.message,b.user.profile_status=c.profile_status,b.user.logged=!0,b.user.id=c.user_id,a.loading_icon=!1;var d="INFO- Welcome back ",e=notify(b,d,f);a.$on("destroy",function(){f.cancel(e)}),_is_logged_in()},n=function(c){a.loading_icon=!1,a.error_message=c.data.message,b.user.password=null};b.user.email?b.user.password?i.test(b.user.password)||d?j.test(b.user.password)&&!d?a.error_message=h.ChooseAMoreSecurePassword:k.test(b.user.password)&&!d?a.error_message=h.MaximumPasswordLengthError:(a.loading_icon=!0,c.authenticate(l).then(m,n)):a.error_message=h.PasswordLengthError:a.error_message=h.PasswordNotPresent:a.error_message=h.EmailNotPresent},_bind_auth_listeners=function(){a.$on("event:google-plus-signin-success",function(){}),a.$on("event:google-plus-signin-failure",function(){}),a.$on("Facebook:statusChange",function(b,c){c.status==h.FacebookLoginStatusCheck&&a.$apply(function(){})}),a.$watch(function(){return d.isReady()},function(b){b&&(a.facebookReady=!0)})},a.intent_login=function(){d.getLoginStatus(function(c){c.status==h.FacebookLoginStatusCheck?(b.logged=!0,a.me()):a.login()})},a.login=function(){d.login(function(c){c.status==h.FacebookLoginStatusCheck&&(b.logged=!0,a.me())})},a.me=function(){d.api("/me",function(d){c.handle_facebook_user(d),a.$apply(function(){b.user=d,b.user.profile_status=0,b.user.thumb=d.thumb,b.user.logged=!0})})},a.logout=function(){d.logout(function(){a.$apply(function(){b.user={},b.logged=!1})})},_is_logged_in=function(){c.get_user().then(function(a){a.logged_in&&(b.user.logged=!0,b.user.id=a.id,c.get_user_details().then(function(a){angular.extend(b.user,a)}),g.put("logged",!0))})},(_init=function(){g.remove("tab"),_is_logged_in(),_bind_auth_listeners()})()}]);;websiteApp.controller("websiteAppController",["$scope","$rootScope","$timeout","websiteService","$document","scroller","$window","WebsiteUIConstants",function(a,b,c,d,e,f,g,h){a.bindHorizontalScroll=function(b,c){b.preventDefault(),c>0?a.move_left(b):a.move_right(b),b.stopPropagation()},a._hide_popups=function(){b.user.collapsed_column=!0,b.user.settings_popup=!1,delete b.focused_book,delete b.ticker_popup},a.move_left=function(b){a._hide_popups();var d=2e3,e=(document.body.scrollWidth,g.pageXOffset),h=.56*window_height;if(angular.isDefined(b))if("click"==b.type){a.delta_x=angular.isDefined(a.delta_x)?a.delta_x+h:h;var i=c(function(){f.scrollTo(e-a.delta_x,0,d),delete a.delta_x,c.cancel(i)},400)}else f.scrollTo(e-h,0,d);else f.scrollTo(e-h,0,d)},a.move_right=function(d){a._hide_popups();var e=2e3,h=document.body.scrollWidth,i=g.pageXOffset,j=.56*window_height,k=i+2.5*window_width>h;if(k&&(b.loading||(b.loading=!0,b.$broadcast("loadRecommendations"))),angular.isDefined(d))if("click"==d.type){a.delta_x=angular.isDefined(a.delta_x)?a.delta_x+j:j;var l=c(function(){f.scrollTo(i+a.delta_x,0,e),delete a.delta_x,c.cancel(l)},400)}else f.scrollTo(i+j,0,e);else f.scrollTo(i+j,0,e)},a.scroll_one_page_right=function(a){var c=document.body.scrollWidth;if(a)var d=a.pageX-window_width/2,e=a.pageX+window_width>c;else var d=g.pageXOffset,e=g.pageXOffset;e&&b.$broadcast("loadRecommendations");var h=window_width;f.scrollTo(d+h,0,2e3)},a.scroll_one_page_left=function(a){if(a)var b=a.pageX-window_width/2;else var b=g.pageXOffset-window_width/2;var c=window_width;f.scrollTo(b-c,0,2e3)},a.showFeebackForm=function(){},a.show_uploader=function(){a.uploader=!0},_bind_feedback_form=function(){g.onmouseleave=function(){}},_load_recommendations=function(){var a=document.body.scrollWidth,c=event.pageX+window_width>a;c&&b.$broadcast("loadRecommendations")},_get_book_details=function(c){filter="id="+c,d.get_book_details(filter).then(function(c){a.detailed_book.book=c,b.show_book=!0})},_bind_emit=function(){show_book_event=a.$on("expandBook",function(a,c,d,e,f){b.book_x=d,b.screen_x=e,b.total_x=f,_get_book_details(c),a.stopPropagation()})},_add_listeners=function(){j=a.$on("moveRight",function(){i=c(function(){a.move_right()},1e3)}),add_to_notifications=a.$on("addToNotifications",function(b,c){if(_intro_notifications(),c instanceof Array){var d=!1;angular.forEach(a.notifications,function(a){a.id==c[0].id&&(d=!0)}),d||(a.notifications=a.notifications.concat(c))}else a.notifications.push(c);b.stopPropagation()}),get_notifications_event=a.$on("getNotifications",function(){if(angular.isDefined(a.notifications))var b=a.notifications.length;else var b=0;d.get_notifications(b).then(function(b){_intro_notifications(),a.notifications=b.notifications.concat(a.notifications)})}),k=a.$on("getLatestNotification",function(){d.get_latest_notification().then(function(b){a.notifications.push(b.notification)})})},_intro_notifications=function(){angular.isUndefined(a.notifications)&&(a.notifications=[])},a.toggle_login_panel=function(){a.show_login_form=a.show_login_form?!1:!0},_initiate_loading_page=function(){a.loading=!0,a.drop_icon=!1,a.show_login_form=!1,c(function(){a.loading=!1},3e3),c(function(){a.drop_icon=!0},1e3)},a.toggle_notifications=function(){a.show_notifications?(a.show_notifications=!1,a.notifications_seen=!0):a.show_notifications=!0},a.handle_keyboard_bindings=function(b){b.keyCode==h.KeyRight?(b.preventDefault(),a.move_right(b)):b.keyCode==h.KeyLeft&&(b.preventDefault(),a.move_left(b)),b.stopPropagation()},a.search=function(){var c=event.currentTarget==event.srcElement&&!b.show_book;c&&($("body").css("white-space","normal"),a.website.searching=!0,b.keyCode=event.keyCode)},_handle_socket_error=function(){},_init_notifications=function(){b.notification_active=!1},_init=function(){_initiate_loading_page(),a.more_filters=[],a.show_notifications=!0,a.notifications_seen=!1,angular.isDefined(b.focused_book)&&(b.focused_book.level2_option=""),a.website={},a.website.searching=!1,a.website.show_search_page=!0,_bind_emit(),_bind_feedback_form(),_add_listeners(),_handle_socket_error(),_init_notifications(),b.user={books:{bookmarked:[],read:[]},authors:{bookmarked:[],follow:[]},readers:{follow:[]},logged:!1};var d=c(function(){b.user.collapsed_column=!0},6e3);a.$on("destroy",function(){c.cancel(d)}),_detect_browser()},_detect_browser=function(){var a,b,c,d=(navigator.appVersion,navigator.userAgent),e=navigator.appName,f=""+parseFloat(navigator.appVersion),g=parseInt(navigator.appVersion,10),i=h.BrowserIncompatible;-1!=(b=d.indexOf("Opera"))?(alert(i),e="Opera",f=d.substring(b+6),-1!=(b=d.indexOf("Version"))&&(f=d.substring(b+8))):-1!=(b=d.indexOf("MSIE"))?(alert(i),e="Microsoft Internet Explorer",f=d.substring(b+5)):-1!=(b=d.indexOf("Chrome"))?(e="Chrome",f=d.substring(b+7)):-1!=(b=d.indexOf("Safari"))?(alert(i),e="Safari",f=d.substring(b+7),-1!=(b=d.indexOf("Version"))&&(f=d.substring(b+8))):-1!=(b=d.indexOf("Firefox"))?(alert(i),e="Firefox",f=d.substring(b+8)):(a=d.lastIndexOf(" ")+1)<(b=d.lastIndexOf("/"))&&(alert(i),e=d.substring(a,b),f=d.substring(b+1),e.toLowerCase()==e.toUpperCase()&&(e=navigator.appName)),-1!=(c=f.indexOf(";"))&&(f=f.substring(0,c)),-1!=(c=f.indexOf(" "))&&(f=f.substring(0,c)),g=parseInt(""+f,10),isNaN(g)&&(f=""+parseFloat(navigator.appVersion),g=parseInt(navigator.appVersion,10))};var i="",j="",k="";_init()}]);