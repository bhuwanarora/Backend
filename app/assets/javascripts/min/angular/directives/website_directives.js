websiteApp.directive("infoCard",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope","websiteService",function(c,d){_get_genres=function(){d.get_genres().then(function(a){c.genres=a.genres})},_profile_status_colors=function(){var b=a.user.profile_status;0==b?a.user.profile_status_color="#4374e0":1==b?a.user.profile_status_color="#65b045":2==b?a.user.profile_status_color="#d73d32":3==b?a.user.profile_status_color="#11a9cc":4==b?a.user.profile_status_color="#981b48":5==b?a.user.profile_status_color="#7e3794":6==b?a.user.profile_status_color="#4374e0":7==b?a.user.profile_status_color="#981b48":8==b&&(a.user.profile_status_color="#981b48")},_handle_info_card_bindings=function(){6==a.user.profile_status?navigator.geolocation?navigator.geolocation.getCurrentPosition(function(b){var c=b.coords.latitude,d=b.coords.longitude;a.user.latitude=c,a.user.longitude=d}):x.innerHTML="Geolocation is not supported by this browser.":4==a.user.profile_status||2==a.user.profile_status&&_get_genres()},_get_info_data=function(){d.get_info_data().then(function(a){c.book_counts=a.reading_count_list,c.user_book_count=c.book_counts[0]})},_init=function(){a.user.profile_status=0,_profile_status_colors(),_get_info_data(),c.profileOptions=[{name:"Reader"},{name:"Author"},{name:"Publisher"},{name:"Editor"}],c.gender="Male",c.profileSelected={name:"Reader"}},c.prev_profile_state=function(){a.user.profile_status=0!=a.user.profile_status?a.user.profile_status-1:8,_handle_info_card_bindings(c),_profile_status_colors()},c.next_profile_state=function(){a.user.profile_status=8!=a.user.profile_status?a.user.profile_status+1:0,_handle_info_card_bindings(c),_profile_status_colors()},c.stop_horizontal_scroll=function(a){a.stopPropagation()},c.update_profile=function(){var b=13==event.keyCode;if(b){var c=a.user.profile_status;0==c&&(d.update_profile(a.user),a.user.profile_status=a.user.profile_status+1,_profile_status_colors())}},c.user_profile_changed=function(a){if("Reader"==a.name||"Author"==a.name){c.show_loading_bar=!0;{b(function(){c.show_loading_bar=!1,c.ask_book_count=!0},1e3)}}},c.add_book=function(){},c.add_author=function(){},c.get_search_results=function(a,b,e){e?e+=String.fromCharCode(a.keyCode):e=String.fromCharCode(a.keyCode),d.search(e,b,3).then(function(a){c.search_results=c.search_results.concat(a.results)})},_init()}],templateUrl:"/assets/angular/widgets/base/widget/info_card.html"}}]),websiteApp.directive("toggle",function(){return{restrict:"E",scope:{obj:"=data"},controller:["$scope",function(a){a.toggle=function(){a.active=a.active?!1:!0}}],templateUrl:"/assets/angular/widgets/partials/toggle.html"}}),websiteApp.directive("track",["$rootScope",function(a){return{restrict:"A",link:["scope","element","attrs",function(b,c){c.bind("mouseleave",function(a){_record_details(a)}),c.bind("mouseenter",function(a){_record_details(a)}),c.bind("click",function(a){_record_details(a)}),_record_details=function(b){node_name=b.currentTarget.nodeName,time_stamp=b.timeStamp,thousand_milliseconds=1e5,time_stamp=thousand_milliseconds*(time_stamp%thousand_milliseconds/thousand_milliseconds),action_type=b.type,"A"==node_name&&(node_name=b.currentTarget.href),id=b.currentTarget.id,uid=node_name+":"+id,array=id.split("-"),containsCategory=array.length>1,containsCategory?(category=array[0],book_id=array[1]):(category="",book_id=""),data_json=[{time_stamp:time_stamp,action_type:action_type,node_name:node_name,uid:uid,category:category,book_id:book_id}],a.data=a.data.concat(data_json)}}]}}]),websiteApp.directive("horizontalScroller",function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/base/horizontal_scroller.html"}}),websiteApp.directive("setFocus",["$timeout","$parse","$rootScope",function(a,b,c){return{link:["scope","element","attrs",function(d,e,f){var g=b(f.setFocus);d.$watch(g,function(b){b===!0&&a(function(){e[0].value=String.fromCharCode(c.keyCode),e[0].focus()})})}]}}]),websiteApp.directive("typeAhead",["$timeout","$sce",function(a,b){return{restrict:"E",scope:{items:"=",prompt:"@",title:"@",id:"@",custom:"@",customOptions:"@",subtitle:"@",model:"=",onSelect:"&"},link:["scope","elem","attrs",function(a,c){a.handle_selection=function(b){a.model=b.toUpperCase(),a.current=0,a.selected=!0,a.onSelect()},a.is_current=function(b,c){return a.current==b&&(a.currentItem=c),a.current==b},a.set_current=function(b){a.current=b},a.navigate_options=function(){var b=13==event.keyCode;b&&a.handle_selection(a.currentItem)},a.key_up=function(){var b=38==event.keyCode,c=40==event.keyCode;b&&0!=a.current&&a.set_current(a.current-1),c&&a.current!=a.filtered.length-1&&a.set_current(a.current+1)},a.highlight=function(a,c){return b.trustAsHtml(c.replace(new RegExp(a,"gi"),'<span style="font-weight:bold;">$&</span>'))},_init=function(){a.current=0,a.selected=!0},a.focus_on_input=function(){c.find("input")[0].focus()},_init()}],controller:["$scope","recommendationService",function(a){(_init=function(){a.name=""})()}],templateUrl:"assets/angular/widgets/partials/type_ahead.html"}}]),websiteApp.directive("message",["$motion",function(a){return{restrict:"E",controller:["$scope",function(b){b.close_message=function(){"Allow your webcam. Swipe Left|Right to look for more books."==b.message?b.message='Just "START TYPING" anytime to search.':b.message_closed=!0},_init_motion_adaption=function(){a.start(),a.onSwipeLeft(function(){b.scroll_one_page_right()}),a.onSwipeRight(function(){b.scroll_one_page_left()})},(_init=function(){b.message_closed=!0,_init_motion_adaption()})()}],templateUrl:"assets/angular/widgets/partials/message.html"}}]),websiteApp.directive("notification",function(){return{restrict:"E",scope:{notification:"=data"},templateUrl:"assets/angular/widgets/partials/notification.html"}}),websiteApp.directive("compile",["$compile",function(a){return["scope","element","attrs",function(b,c,d){var e=b.$watch(function(a){return a.$eval(d.compile)},function(d){c.html(d),a(c.contents())(b),e()})}]}]),websiteApp.directive("searchBar",function(){return{restrict:"E",templateUrl:"assets/angular/widgets/partials/search_bar.html"}});