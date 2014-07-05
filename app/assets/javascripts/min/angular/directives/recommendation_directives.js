websiteApp.directive("moreFilters",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope","recommendationService","websiteService",function(c,d,e){_init=function(){c.show_menu=!1,c.countryOptions=[],c.$on("filterChange",function(a,b,d){"country"==d?c.countrySelected=b:"timeGroup"==d?c.timeSelected=b:"readingTime"==d&&(c.readTimeSelected=b),c.advance_filter_changed(b,d)}),d.get_countries().then(function(a){c.countryOptions=_reset_json(),c.countryOptions=c.countryOptions.concat(a.countries)}),d.get_time_groups().then(function(a){c.timeOptions=_reset_json();for(var b=0;b<a.times.length;b++){var d=a.times[b][0].data,e=d.name+" ("+d.range+")",f={name:e};c.timeOptions=c.timeOptions.concat([f])}}),d.get_read_times().then(function(a){c.readTimeOptions=_reset_json();for(var b=0;b<a.read_times.length;b++){var d=a.read_times[b][0].data,e=d.name,f={name:e,custom_option:!0,type:"readingTime"};c.readTimeOptions=c.readTimeOptions.concat([f])}}),_init_dropdown_filters(),_collapse_dropdown_menu()},_reset_json=function(){return[{name:"<span class='icon-loop'></span><span>&nbsp;Reset</span>"}]},_collapse_dropdown_menu=function(){c.filter_expanded=!0;b(function(){c.filter_expanded=!1},3e3)},_country_init=function(){return{name:"<span class='icon-earth filter_icon green'></span><span>&nbsp;&nbsp;&nbsp;Filter by Region</span>"}},_time_init=function(){return{name:"<span class='icon-calendar filter_icon magenta'></span><span>&nbsp;&nbsp;&nbsp;Filter by Era</span>"}},_read_time_init=function(){return{name:"<span class='icon-clock filter_icon cyan'></span><span>&nbsp;&nbsp;&nbsp;Filter by Reading Time</span>"}},_init_dropdown_filters=function(){c.countrySelected=_country_init(),c.timeSelected=_time_init(),c.readTimeSelected=_read_time_init()},c.handle_left_columns=function(){c.column_heights={show_filters:!0,notifications_style:{height:"110px"},friends_grid_style:{height:"30px"}}},c.clear_filter=function(d,e){a.filters.other_filters[e]=null;var f="SUCCESS-"+e+" filter removed",g=notify(a,f,b);c.$on("destroy",function(){b.cancel(g)}),c.$emit("reloadRecommendations")},c.advance_filter_changed=function(d,e){if("<span class='icon-loop'></span><span>&nbsp;Reset</span>"==d.name){var f="SUCCESS-"+e+" filter has been reset.";delete a.filters.other_filters[e],"country"==e?c.countrySelected=_country_init():"timeGroup"==e?c.timeSelected=_time_init():"readingTime"==e&&(c.readTimeSelected=_read_time_init())}else{var f="SUCCESS-"+d.name+" added to filters.";a.filters.other_filters[e]=d.name}var g=notify(a,f,b);c.$on("destroy",function(){b.cancel(g)}),c.$emit("reloadRecommendations")},c.reset_filters=function(){_init_dropdown_filters(),c.$broadcast("resetFilter"),a.filters.more_filters=[],a.filters.other_filters={},c.$emit("reloadRecommendations");var d="SUCCESS-All filters removed.<br/> You can add filters to look for particular books.",e=notify(a,d,b);c.$on("destroy",function(){b.cancel(e)})},c.stop_click_propagation=function(a){a.stopPropagation()},_reload_page=function(){},c.show_genre_options=function(a,b){if(b)var e=b+String.fromCharCode(event.keyCode);else var e=String.fromCharCode(event.keyCode);var a="q="+e+"&filter="+a;d.get_genres(a).then(function(a){c.genres=[];for(var b=0;b<a.genres.data.length;b++)c.genres.push(a.genres.data[b][0].data)})},c.on_genre_selection=function(d){c.genre=d,a.filters.other_filters.genre=d;var e="SUCCESS-'"+d+"' added to filters.",f=notify(a,e,b);c.$emit("reloadRecommendations"),c.$on("destroy",function(){b.cancel(f)})},c.show_author_options=function(a,b){if(b)var d=b+String.fromCharCode(event.keyCode);else var d=String.fromCharCode(event.keyCode);e.search(d,"AUTHOR",3).then(function(a){c.authors=[];for(var b=0;b<a.results.data.length;b++){var d={name:a.results.data[b][0]};c.authors.push(d)}})},c.on_author_selection=function(d){c.author=d,a.filters.other_filters.author=d;var e="SUCCESS-'"+d+"' added to filters.",f=notify(a,e,b);c.$emit("reloadRecommendations"),c.$on("destroy",function(){b.cancel(f)})},c.toggle_menu=function(){c.show_menu?(c.show_menu=!1,c.filter_expanded=!1):(c.show_menu=!0,c.filter_expanded=!0)},_init()}],templateUrl:"/assets/angular/widgets/partials/more_filters.html"}}]),websiteApp.directive("notificationLink",function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/partials/notification_link.html"}}),websiteApp.directive("tickerPopup",function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/partials/ticker_popup.html"}}),websiteApp.directive("filter",["$rootScope","$timeout","$routeParams",function(a,b,c){return{restrict:"E",scope:{filter:"=data"},controller:["$scope",function(d){_initialise_filters=function(c){if(d.filter){var e=d.filter.id,f=d.filter.name;if(e==parseInt(d.$routeParams.filter_id)){if(d.active=!0,-1==a.filters[c].indexOf(e)){a.filters[c].push(e);var g="SUCCESS-'"+f+"' added to filters.",h=notify(a,g,b);d.$on("destroy",function(){b.cancel(h)})}}else d.active=!1}},_add_listeners=function(){d.$on("resetFilter",function(){d.active&&(d.active=!1)})},(_init=function(){d.$routeParams=c,_initialise_filters("more_filters"),_add_listeners()})()}],templateUrl:"/assets/angular/widgets/partials/filter.html"}}]),websiteApp.directive("mainHeader",[function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/partials/main_header.html"}}]),websiteApp.directive("recommendationFooter",["scroller",function(a){return{restrict:"E",controller:["$scope",function(b){b.compact_footer=window.innerWidth<1e3?!0:!1,b.handle_notification_ticker_size=function(a){var c=a.deltaY>0;b.column_heights=c?{notifications_style:{height:"225px"},friends_grid_style:{height:"30px"},show_filters:!1}:{notifications_style:{height:"110px"},friends_grid_style:{height:"30px"},show_filters:!1},a.stopPropagation()},b.goto_info_card=function(){a.scrollTo(0,0,2e3)},b.toggle_footer=function(){b.compact_footer=!0}}],templateUrl:"/assets/angular/widgets/partials/recommendation_footer.html"}}]),websiteApp.directive("calendar",function(){return{restrict:"E",scope:{},controller:["$scope",function(a){a.date_check=function(){var b=a.months.indexOf(a.selectedMonth)+1,c=new Date(a.selectedYear,b,0).getDate();a.days=new Array(c).join().split(",").map(function(a,b){return++b})},(_init=function(){a.days=new Array(31).join().split(",").map(function(a,b){return++b}),a.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],a.years=[];for(var b=(new Date).getFullYear(),c=b;c>1904;c--)a.years.push(c)})()}],templateUrl:"/assets/angular/widgets/partials/calendar.html"}});