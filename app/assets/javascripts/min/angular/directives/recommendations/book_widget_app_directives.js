function zoomin_book(a,b,c,d){c.initPage=d,a.zoomin_book=!0;var e=event.currentTarget.offsetParent.offsetLeft+event.currentTarget.offsetWidth,f=event.screenX,g=event.currentTarget.offsetParent.offsetParent.scrollWidth;a.$emit("expandBook",a.book.id,e,f,g);var h=b(function(){a.zoomin_book=!1},3e3);a.$on("destroy",function(){b.cancel(h)})}function add_custom_bookmark(a,b,c){var d=a.book.custom_bookmark;if(d){d=d.trim().toUpperCase();for(var e=a.book.labels,f=!1,g=0;g<e.length;g++){var h=e[g];if(h.name==d){f=!0;var i="ALERT- Tag with the name '"+d+"' is already added in the list";break}}if(!f){a.book.bookmark_status=1,b.labels=b.labels.concat([{name:d}]),a.book.labels=a.book.labels.concat([{name:d,checked:!0}]),b.user.bookmark_count=b.user.bookmark_count+1,a.$emit("gamifyCount",10,!0);var i="SUCCESS-Custom Bookmark "+d+" added to book "+a.book.title}var j=notify(b,i,c);return a.$on("destroy",function(){c.cancel(j)}),f}}websiteApp.directive("book",["websiteService","$rootScope","widgetService",function(a,b){return{restrict:"E",scope:{book:"=data"},controller:["$scope",function(c){c.show_interaction_box=function(){b.user.interact=!0},c.stop_propagation=function(a){a.stopPropagation()},c.show_focused_tooltip=function(a){if(b.focused_book!=c.book){var d=function(){delete b.ticker_popup,b.popups={},b.user.collapsed_friends=!0,b.user.collapsed_left_column=!0,b.user.collapsed_column=!0,b.user.collapsed_lists=!0,b.user.collapsed_filters=!0,b.user.collapsed_trends=!0};d(),b.focused_book=c.book;var e=a.currentTarget.offsetParent.offsetParent.offsetLeft-a.pageX+a.clientX,f=window_width-(e+a.currentTarget.offsetParent.scrollWidth),g=e,h=.8*window_height;f>g?(f>h?(e=e+a.currentTarget.offsetParent.scrollWidth-a.currentTarget.offsetLeft,b.focused_book.reposition_tooltip={left:e+"px"}):b.focused_book.reposition_tooltip={right:"0px"},b.on_left=!0):(g>h?(e=window_width-e,b.focused_book.reposition_tooltip={right:e+"px"}):b.focused_book.reposition_tooltip={left:"0px"},b.on_left=!1)}else delete b.focused_book,b.popups.left_panel_width={},b.style={};a.stopPropagation()},(_init=function(){var b=c.book.id;c.book.show_labels=!1,angular.isUndefined(c.book.title)&&a.get_book_details("id="+b).then(function(a){angular.extend(c.book,a),angular.forEach(c.book.labels,function(a){a.checked&&(c.book.bookmark_status=1)}),c.book.data_fetched=!0})})()}],templateUrl:"/assets/angular/views/book_widget/show.html"}}]),websiteApp.directive("labelPopup",["$rootScope","$timeout","widgetService","RecommendationUIConstants","sharedService",function(a,b,c,d,e){return{restrict:"E",controller:["$scope",function(a){a.stop_propagation=function(a){a.stopPropagation()},a.select_label=function(b){e.bookmark_book(a,b,event)},a.stop_horizontal_scroll=function(a){a.stopPropagation()}}],templateUrl:"/assets/angular/views/book_widget/partials/label_popup.html"}}]),websiteApp.directive("bookNavbar",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/views/unused/book_navbar.html"}}]),websiteApp.directive("listDropdown",function(){return{restrict:"E",controller:function(){},templateUrl:"app/assets/javascripts/angular/widgets/base/book/list_dropdown.html"}}),websiteApp.directive("bookBookmark",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.toggle_bookmarked=function(e){for(var f=d.book.labels.length,g=a.labels.length,h=f;g>h;h++)d.book.labels.push({name:a.labels[h].name});if(d.book.show_labels){{d.book.bookmark_status,d.book.title,d.book.author_name}if(d.book.custom_bookmark){var i=add_custom_bookmark(d,a,b);if(!i){var j={id:d.book.id,type:"BOOK",name:d.book.custom_bookmark,data:!0};c.bookmark(j)}}else d.book.show_labels=!1}else d.book.show_labels=!0;e.stopPropagation()}}],templateUrl:"/assets/angular/views/book_widget/partials/bookmark.html"}}]),websiteApp.directive("bookInteract",["$rootScope","$timeout","widgetService","WebsiteUIConstants",function(a,b,c,d){return{restrict:"E",scope:{book:"=data"},controller:["$scope",function(e){_init=function(){e.setStatus(),e.label_placeholder="Add to my library"},e.show_bookmark_options=function(b){if(e.book.show_labels)e.book.blur_input=!0,e.book.show_labels=!1;else{for(var c=e.book.labels.length,d=a.labels.length,f=c;d>f;f++)e.book.labels.push({name:a.labels[f].name});e.book.blur_input=!1,e.book.show_labels=!0,e.label_placeholder="Add a new shelf..."}b.stopPropagation()},e.handle_enter=function(f){var g=f.keyCode==d.Enter;if(g){var h=add_custom_bookmark(e,a,b);if(!h){var i={id:e.book.id,type:"BOOK",name:e.book.custom_bookmark,data:!0};c.bookmark(i),e.book.custom_bookmark=""}}},e.stop_propagation=function(a){a.stopPropagation()},e.setStatus=function(a){e.read=1==a?!0:!1},_init()}],templateUrl:"/assets/angular/views/book_widget/footer.html"}}]),websiteApp.directive("bookInfo",["$rootScope","$timeout","widgetService","sharedService","WebsiteUIConstants","$cookieStore",function(a,b,c,d,e,f){return{restrict:"E",controller:["$scope",function(g){g.stop_keyboard_navigation=function(a){var b=a.keyCode==e.KeyLeft,c=a.keyCode==e.KeyUp,d=a.keyCode==e.KeyRight,f=a.keyCode==e.KeyDown;(b||d||c||f)&&a.stopPropagation()},g.handle_enter=function(b,d){var f=b.keyCode==e.Enter;if(f){a.focused_book.add_thumb=!1;var g=a.focused_book.id,h={thumb_url:d,book_id:g};c.add_thumbnail(h)}},g.show_feedback_popup=function(){a.focused_book.show_feedback_popup=a.focused_book.show_feedback_popup?!1:!0},g.get_author_details=function(){g.show_author=!0,g.show_buy=!1,f.put("show_author",!0),f.put("show_buy",!1),angular.isUndefined(a.focused_book.author_details)&&c.get_author_details(a.focused_book.id).then(function(b){angular.isDefined(a.focused_book)&&(a.focused_book.author_details={about:b[0],image_url:b[1],signature_pic:b[2],id:b[3],book_ids:b[4],book_isbns:b[5]})})},g.get_book_from_author=function(){var b={name:a.focused_book.author_name,id:a.focused_book.author_details.id};a.$broadcast("updateFilters","AUTHOR",b)},g.get_buy_links=function(){g.show_author=!1,g.show_buy=!0,f.put("show_author",!1),f.put("show_buy",!0),angular.isUndefined(a.focused_book.bnn_links)&&c.get_affiliate_links(a.focused_book.id).then(function(b){a.focused_book.bnn_links=b.bnn.links})},g.get_book_overview=function(){g.show_buy=!1,g.show_author=!1,f.put("show_author",!1),f.put("show_buy",!1)},g.stop_propagation=function(a){a.stopPropagation()},g.close_focused_tooltip=function(){delete a.focused_book,a.popups.left_panel_width={},a.style={}},g.own_this_book=function(){if(g.have_this_book){g.have_this_book=!1;var d="SUCCESS-Are you sure, you don't have a copy of "+a.focused_book.title+"? <br/>Your friends might be looking for this book."}else{g.have_this_book=!0;var d="SUCCESS-Thanks, Your friends will now know that you own a copy of "+a.focused_book.title}var e=a.focused_book.id,f=notify(a,d,b);c.own_this_book(e,g.have_this_book),g.$on("destroy",function(){b.cancel(f)})},g.record_read_time=function(e,f){var h=angular.isUndefined(a.focused_book.time_index)||null==a.focused_book.time_index;h&&g.$emit("gamifyCount",10,!0),a.focused_book.time_index=e;{var i="SUCCESS-Recorded approximate time to read <br/>.";notify(a,i,b)}switch(a.focused_book.status||d.mark_as_read(a,a.focused_book,f),a.focused_book.time_index){case 0:var j="Tiny Read";break;case 1:var j="Small Read";break;case 2:var j="Normal Read";break;case 3:var j="Long Read"}var k=a.user.email;angular.isDefined(a.user.name)&&(k=a.user.name);var i="<span>described reading length of <span class='site_color'>"+a.focused_book.title+"</span><span>&nbsp; as a&nbsp;'"+j+"'</span>",l={thumb:a.user.thumb,message:i,timestamp:(new Date).getTime(),book:{id:a.focused_book.id,title:a.focused_book.title,author_name:a.focused_book.author_name,isbn:a.focused_book.isbn},user:{id:a.user.id,name:k}};g.$emit("addToNotifications",l),c.record_time(a.focused_book.id,e),g.$on("destroy",function(){b.cancel("timeout_event")})},g.is_timer=function(b){var c=!1;return a.focused_book.time_index==b&&(c=!0),c},g.close_interaction_box=function(){a.focused_book.interact=!1,g.hash_tags=[]},g.stop_horizontal_scroll=function(a){a.stopPropagation()},_display_tweet=function(){a.focused_book.display_profile=a.user.thumb,a.focused_book.display_tweet="Comment on this book..."},_open_tab=function(){g.show_author=angular.isDefined(f.get("show_author"))?f.get("show_author"):!1,g.show_buy=angular.isDefined(f.get("show_buy"))?f.get("show_buy"):!1},g._get_book_feed=function(){angular.isUndefined(a.focused_book.tweets)&&(a.focused_book.tweets=[],c.get_book_feed(a.focused_book.id).then(function(b){null!=a.focused_book&&(a.focused_book.tweets=b,_display_tweet())}))},(_init=function(){_open_tab(),angular.isDefined(a.focused_book)&&(g._get_book_feed(),g.show_author?g.get_author_details():g.show_buy?g.get_buy_links():g.get_book_overview())})()}],templateUrl:"/assets/angular/views/home/shared/book_info.html"}}]),websiteApp.directive("bookTags",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/views/unused/book_tags.html"}}]),websiteApp.directive("recommend",["$rootScope","$timeout","widgetService","websiteService",function(a,b,c,d){return{restrict:"E",scope:{recommend_object:"=data"},controller:["$scope",function(e){e.select_thumb=function(a,b){var c="true"==a.currentTarget.dataset.selected;c?(e.user.selected_followers.splice(e.user.selected_followers.indexOf(b),1),a.currentTarget.dataset.selected=!1,a.currentTarget.style.border="5px solid transparent"):(e.user.selected_followers.push(b),a.currentTarget.dataset.selected=!0,a.currentTarget.style.border="5px solid #FEBF00")},e.stop_propagation=function(a){a.stopPropagation()},e.recommend=function(){e.recommend_object.title,e.recommend_object.author_name;if(e.recommend_object.recommended){e.recommend_object.recommended=!1;var d="SUCCESS-Recommended to selected friends.",f=notify(a,d,b);e.$on("destroy",function(){b.cancel(f)});var g={friend_ids:e.user.selected_followers,book_id:e.recommend_object.id};c.recommend(g),e.$emit("gamifyCount",10,!0)}else e.recommend_object.recommended=!0},e._init=function(){angular.isUndefined(a.user.followers)?(a.user.selected_followers=[],d.get_followed_by().then(function(b){a.user.followers=[],angular.forEach(b,function(a){var b={name:a[1],id:a[0],thumb:a[2]};this.push(b)},a.user.followers),e.user={},e.user.followers=a.user.followers,e.user.selected_followers=a.user.selected_followers})):(e.user={},e.user.followers=a.user.followers,e.user.selected_followers=a.user.selected_followers)},e._init()}],templateUrl:"/assets/angular/views/home/shared/recommend.html"}}]),websiteApp.directive("markAsRead",["$rootScope","$timeout","widgetService","sharedService","stropheService",function(a,b,c,d,e){return{restrict:"E",controller:["$scope",function(b){b.mark_as_read=function(c){var f=a.user.name,g=f+"added "+b.book.title+" to Books Read.";d.mark_as_read(b,b.book,c),e.send_notification(g)}}],templateUrl:"/assets/angular/views/unused/mark_as_read.html"}}]);var global_display_timer=0;