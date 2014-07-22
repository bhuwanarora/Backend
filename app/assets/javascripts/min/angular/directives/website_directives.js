websiteApp.directive("siteLogo",[function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/partials/site_logo.html"}}]),websiteApp.directive("userThumb",[function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/partials/user_thumb.html"}}]),websiteApp.directive("infoCard",["$rootScope","$timeout","sharedService",function(a,b,c){return{restrict:"E",controller:["$scope","websiteService",function(d,e){d.mark_as_read=function(a,b){c.mark_as_read(d,a,b)},d.search_books=function(a){var b=38==a.keyCode,c=40==a.keyCode,f=8==a.keyCode,g=13==a.keyCode,h=!(b||c||f||g);if(h){if(d.search_book)var i=d.popular_books.length,j=d.search_book+String.fromCharCode(a.keyCode);else{var i=0;d.popular_books=[];var j=String.fromCharCode(a.keyCode)}d.loading||(d.loading=!0,e.search_books(j,i).then(function(a){a=a.results,0!=a.length&&angular.forEach(a,function(a){var b={isbn:a[0],id:a[1],title:a[2],author_name:a[3],status:!1};this.push(b)},d.popular_books),d.loading=!1}))}},_get_genres=function(){(angular.isUndefined(d.genres)||0==d.genres.length)&&e.get_genres().then(function(a){d.genres=a.genres})},_profile_status_colors=function(){var b=a.user.profile_status;0==b?a.user.profile_status_color="#4374e0":1==b?a.user.profile_status_color="#65b045":2==b?a.user.profile_status_color="#d73d32":3==b?a.user.profile_status_color="#11a9cc":4==b?a.user.profile_status_color="#981b48":5==b?a.user.profile_status_color="#7e3794":6==b?a.user.profile_status_color="#4374e0":7==b?a.user.profile_status_color="#981b48":8==b&&(a.user.profile_status_color="#981b48")},_handle_info_card_bindings=function(b){3==a.user.profile_status?b.get_popular_books():2==a.user.profile_status?_get_genres():4==a.user.profile_status||6==a.user.profile_status&&(navigator.geolocation?navigator.geolocation.getCurrentPosition(function(b){var c=b.coords.latitude,d=b.coords.longitude;a.user.latitude=c,a.user.longitude=d}):x.innerHTML="Geolocation is not supported by this browser.")},_get_info_data=function(){e.get_info_data().then(function(a){d.book_counts=a.reading_count_list,d.user_book_count=d.book_counts[0]})},d.edit_books_read=function(){d.goto_info_card(),a.user.profile_status=3,d.get_popular_books(),d.compressed_info=!1},d.get_popular_books=function(){var a=d.popular_books.length;d.loading||(d.loading=!0,e.get_popular_books(a).then(function(a){angular.forEach(a,function(a){var b={isbn:a[0],id:a[1],title:a[2],author_name:a[3],status:!1};this.push(b)},d.popular_books),d.loading=!1}))},d.prev_profile_state=function(){a.user.profile_status=0!=a.user.profile_status?a.user.profile_status-1:8,_handle_info_card_bindings(d),_profile_status_colors(),_update_user_info()},d.next_profile_state=function(){a.user.profile_status=8!=a.user.profile_status?a.user.profile_status+1:0,_handle_info_card_bindings(d),_profile_status_colors(),_update_user_info()},d.stop_horizontal_scroll=function(a){a.stopPropagation()},d.update_profile=function(){var b=13==event.keyCode;if(b){var c=a.user.profile_status;0==c&&(e.update_profile(a.user),a.user.profile_status=a.user.profile_status+1,_profile_status_colors())}},d.user_profile_changed=function(a){if("Reader"==a.name||"Author"==a.name){d.show_loading_bar=!0;{b(function(){d.show_loading_bar=!1,d.ask_book_count=!0},1e3)}}},d.add_book=function(){},d.add_author=function(){},d.get_search_results=function(a,b,c){c?c+=String.fromCharCode(a.keyCode):c=String.fromCharCode(a.keyCode),e.search(c,b,3).then(function(a){d.search_results=d.search_results.concat(a.results)})},d.set_user_name=function(){},_update_user_info=function(){},(_init=function(){a.user.profile_status=0,_profile_status_colors(),_get_info_data(),d.popular_books=[],d.loading=!1,d.profileOptions=[{name:"Reader"},{name:"Author"},{name:"Publisher"},{name:"Editor"}],d.compressed_info=!1,d.gender="Male",d.profileSelected={name:"Reader"},d.info_card_width=350,d.info_card_ratio=1.34})()}],templateUrl:"/assets/angular/widgets/base/widget/info_card.html"}}]),websiteApp.directive("toggle",function(){return{restrict:"E",scope:{obj:"=data"},controller:["$scope",function(a){a.toggle=function(){a.active=a.active?!1:!0}}],templateUrl:"/assets/angular/widgets/partials/toggle.html"}}),websiteApp.directive("track",["$rootScope",function(a){return{restrict:"A",link:["scope","element","attrs",function(b,c){c.bind("mouseleave",function(a){_record_details(a)}),c.bind("mouseenter",function(a){_record_details(a)}),c.bind("click",function(a){_record_details(a)}),_record_details=function(b){node_name=b.currentTarget.nodeName,time_stamp=b.timeStamp,thousand_milliseconds=1e5,time_stamp=thousand_milliseconds*(time_stamp%thousand_milliseconds/thousand_milliseconds),action_type=b.type,"A"==node_name&&(node_name=b.currentTarget.href),id=b.currentTarget.id,uid=node_name+":"+id,array=id.split("-"),containsCategory=array.length>1,containsCategory?(category=array[0],book_id=array[1]):(category="",book_id=""),data_json=[{time_stamp:time_stamp,action_type:action_type,node_name:node_name,uid:uid,category:category,book_id:book_id}],a.data=a.data.concat(data_json)}}]}}]),websiteApp.directive("horizontalScroller",function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/base/horizontal_scroller.html"}}),websiteApp.directive("setFocus",["$timeout","$parse","$rootScope",function(a,b,c){return{link:function(d,e,f){var g=b(f.setFocus);d.$watch(g,function(b){1==b&&a(function(){c.keyCode&&(e[0].value=String.fromCharCode(c.keyCode)),e[0].focus()})})}}}]),websiteApp.directive("typeAhead",["$timeout","$sce","$document",function(a){return{restrict:"E",scope:{items:"=",prompt:"@",title:"@",id:"@",custom:"@",iconClass:"@",customOptions:"@",focusWhen:"=",subtitle:"@",model:"=",onSelect:"&",autoPopulate:"&",onClear:"&"},link:function(){},controller:["$scope","$sce","recommendationService",function(b,c){b.is_current=function(a,c){return b.current==a&&(b.currentItem=c),b.current==a},b.set_current=function(a){b.current=a},b.navigate_options=function(){var a=13==event.keyCode;a&&b.handle_selection(b.currentItem)},b.key_up=function(){var a=38==event.keyCode,c=40==event.keyCode,d=8==event.keyCode;a?b.set_current(0!=b.current?b.current-1:b.filtered.length-1):c?b.set_current(b.current!=b.filtered.length-1?b.current+1:0):d&&(angular.isUndefined(b.model)||""==b.model)&&b.onClear()},_init=function(){b.current=0,b.selected=!0,b.name=""},b.focus_on_input=function(){},b.auto_populate=function(){b.autoPopulate()},b.highlight=function(a,b){return angular.isDefined(b)&&angular.isDefined(a)?c.trustAsHtml(b.replace(new RegExp(a,"gi"),'<span style="font-weight:bold;">$&</span>')):void 0},b.remove_filter=function(){b.model="",b.onClear()},b.handle_selection=function(c){b.model=c.toUpperCase(),b.current=0,b.selected=!0,a(function(){b.onSelect()},200)},_init()}],templateUrl:"/assets/angular/widgets/partials/type_ahead.html"}}]),websiteApp.directive("message",function(){return{restrict:"E",controller:["$scope",function(a){a.close_message=function(){"Allow your webcam. Swipe Left|Right to look for more books."==a.message?a.message='Just "START TYPING" anytime to search.':a.message_closed=!0},_init_motion_adaption=function(){},(_init=function(){a.message_closed=!0})()}],templateUrl:"/assets/angular/widgets/partials/message.html"}}),websiteApp.directive("notification",["$rootScope","$timeout",function(a,b){return{restrict:"E",scope:{notification:"=data"},controller:["$scope",function(c){c.toggle_ticker_popup=function(d){var e=null==a.ticker_popup;if(e)a.ticker_popup=c.notification.book,a.focused_book=null;else if(a.ticker_popup==c.notification.book)a.ticker_popup=null;else{var f=b(function(){a.ticker_popup=c.notification.book});c.$on("destroy",function(){b.cancel(f)})}d.stopPropagation()},_get_arrow_position=function(a){var b=90,c=17;return a.y>b&&a.y<b+54||(a.y>b+54&&a.y<b+108?c+=54:a.y>b+108&&a.y<b+162?c+=108:a.y>b+162&&a.y<b+216?c+=162:a.y>b+216&&a.y<b+270&&(c+=216)),c},c.show_ticker_popup=function(){a.ticker_popup=c.notification.book}}],templateUrl:"/assets/angular/widgets/partials/notification.html"}}]),websiteApp.directive("compile",["$compile",function(a){return["scope","element","attrs",function(b,c,d){var e=b.$watch(function(a){return a.$eval(d.compile)},function(d){c.html(d),a(c.contents())(b),e()})}]}]),websiteApp.directive("searchBar",function(){return{restrict:"E",templateUrl:"/assets/angular/widgets/partials/search_bar.html"}}),websiteApp.directive("checkScrollBottom",function(){return{restrict:"A",link:function(a,b,c){var d=b[0];b.bind("scroll",function(){d.scrollTop+d.offsetHeight>d.scrollHeight&&a.$apply(c.checkScrollBottom)})}}}),websiteApp.directive("checkScrollUp",function(){return{restrict:"A",link:function(a,b,c){var d=b[0],e=d.scrollTop;b.bind("scroll",function(){d.scrollTop<=e&&a.$apply(c.checkScrollUp),e=d.scrollTop})}}}),websiteApp.directive("checkScrollDown",function(){return{restrict:"A",link:function(a,b,c){var d=b[0],e=d.scrollTop;b.bind("scroll",function(){d.scrollTop>e&&a.$apply(c.checkScrollDown),e=d.scrollTop})}}}),websiteApp.directive("focusOut",function(){return function(a,b,c){b.bind("blur",function(){a.$apply(c.focusOut)})}});