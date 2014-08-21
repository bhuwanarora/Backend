function zoomin_book(a,b,c,d){c.initPage=d,a.zoomin_book=!0;var e=event.currentTarget.offsetParent.offsetLeft+event.currentTarget.offsetWidth,f=event.screenX,g=event.currentTarget.offsetParent.offsetParent.scrollWidth;a.$emit("expandBook",a.book.id,e,f,g);var h=b(function(){a.zoomin_book=!1},3e3);a.$on("destroy",function(){b.cancel(h)})}function add_custom_bookmark(a,b,c){var d=a.book.custom_bookmark;if(d){d=d.trim().toUpperCase();for(var e=a.book.labels,f=!1,g=0;g<e.length;g++){var h=e[g];if(h.name==d){f=!0;var i="ALERT- Tag with the name '"+d+"' is already added in the list";break}}if(!f){a.book.bookmark_status=1,b.labels=b.labels.concat([{name:d}]),a.book.labels=a.book.labels.concat([{name:d,checked:!0}]),b.user.bookmark_count=b.user.bookmark_count+1,a.$emit("gamifyCount",10,!0);var i="SUCCESS-Custom Bookmark "+d+" added to book "+a.book.title}var j=notify(b,i,c);return a.$on("destroy",function(){c.cancel(j)}),f}}websiteApp.directive("book",["websiteService","$rootScope","widgetService",function(a,b){return{restrict:"E",scope:{book:"=data"},controller:["$scope",function(c){c.show_focused_tooltip=function(a){if(b.focused_book!=c.book){delete b.ticker_popup,b.focused_book=c.book;var d=a.currentTarget.offsetParent.offsetParent.offsetLeft-a.pageX+a.clientX,e=screen.width-(d+a.currentTarget.offsetParent.scrollWidth),f=d;e>f?(e>410?(d=d+a.currentTarget.offsetParent.scrollWidth-a.currentTarget.offsetLeft,b.focused_book.reposition_tooltip={left:d+"px"}):b.focused_book.reposition_tooltip={right:"0px"},b.on_left=!0):(f>410?(d=screen.width-d,b.focused_book.reposition_tooltip={right:d+"px"}):b.focused_book.reposition_tooltip={left:"0px"},b.on_left=!1)}else delete b.focused_book;a.stopPropagation()},(_init=function(){var b=c.book.id;c.book.tweets=[],c.book.show_labels=!1,a.get_book_details("id="+b).then(function(a){angular.extend(c.book,a),angular.forEach(c.book.labels,function(a){a.checked&&(c.book.bookmark_status=1)})})})()}],templateUrl:"/assets/angular/widgets/base/book/book_widget.html"}}]),websiteApp.directive("labelDropdown",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.stop_propagation=function(a){a.stopPropagation()},d.select_label=function(e){var f=!1,g=d.book.labels;if(d.book.labels[e].checked=!d.book.labels[e].checked,d.book.labels[e].checked){var h=a.user.email;angular.isDefined(a.user.name)&&(h=a.user.name);var i="<span>tagged&nbsp;</span><span class='site_color'>"+d.book.title+"</span><span> to '"+d.book.labels[e].name+"'</span>",j={thumb:a.user.thumb,message:i,timestamp:(new Date).getTime(),book:{id:d.book.id,title:d.book.title,author_name:d.book.author_name,isbn:d.book.isbn},user:{id:a.user.id,name:h}};a.user.bookmark_count=a.user.bookmark_count+1,d.$emit("gamifyCount",10,!0),d.$emit("addToNotifications",j);var i="SUCCESS-Added to "+d.book.labels[e].name+" <span class='icon-tags'></span>."}else{a.user.bookmark_count=a.user.bookmark_count-1,d.$emit("gamifyCount",10,!1);var i="SUCCESS-Removed from "+d.book.labels[e].name+" <span class='icon-tags'></span>."}var k=notify(a,i,b),l={id:d.book.id,type:"BOOK",name:d.book.labels[e].name,data:d.book.labels[e].checked};c.bookmark(l),d.$on("destroy",function(){b.cancel(k)});for(var m=0;m<g.length;m++)if(g[m].checked){f=!0;break}d.book.bookmark_status=f?1:0},d.stop_horizontal_scroll=function(a){a.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/label_dropdown.html"}}]),websiteApp.directive("bookNavbar",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/widgets/base/book/book_navbar.html"}}]),websiteApp.directive("listDropdown",function(){return{restrict:"E",controller:function(){},templateUrl:"app/assets/javascripts/angular/widgets/base/book/list_dropdown.html"}}),websiteApp.directive("bookBookmark",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.toggle_bookmarked=function(e){for(var f=d.book.labels.length,g=a.labels.length,h=f;g>h;h++)d.book.labels.push({name:a.labels[h].name});if(d.book.show_labels){{d.book.bookmark_status,d.book.title,d.book.author_name}if(d.book.custom_bookmark){var i=add_custom_bookmark(d,a,b);if(!i){var j={id:d.book.id,type:"BOOK",name:d.book.custom_bookmark,data:!0};c.bookmark(j)}}else d.book.show_labels=!1}else d.book.show_labels=!0;e.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/bookmark.html"}}]),websiteApp.directive("bookInteract",["$rootScope","$timeout","widgetService","WebsiteUIConstants",function(a,b,c,d){return{restrict:"E",scope:{book:"=data"},controller:["$scope",function(e){_init=function(){e.setStatus()},e.show_bookmark_options=function(b){if(e.book.show_labels)e.book.blur_input=!0,e.book.show_labels=!1;else{for(var c=e.book.labels.length,d=a.labels.length,f=c;d>f;f++)e.book.labels.push({name:a.labels[f].name});e.book.blur_input=!1,e.book.show_labels=!0}b.stopPropagation()},e.handle_enter=function(f){var g=f.keyCode==d.Enter;if(g){var h=add_custom_bookmark(e,a,b);if(!h){var i={id:e.book.id,type:"BOOK",name:e.book.custom_bookmark,data:!0};c.bookmark(i),e.book.custom_bookmark=""}}},e.setStatus=function(a){e.read=1==a?!0:!1},_init()}],templateUrl:"/assets/angular/widgets/base/book/interact_widget.html"}}]),websiteApp.directive("rate",["$rootScope","$timeout","widgetService","sharedService",function(a,b,c,d){return{restrict:"E",scope:{rate_object:"=data"},controller:["$scope",function(e){e.show_if_rated=function(a){e.temp_rating=e.rate_object.user_rating,e.rate_object.user_rating=parseInt(a)+1,e.ready_to_rate=!0},e.reset_rating=function(){e.ready_to_rate=!1,e.rate_object.user_rating=e.temp_rating},_add_notification=function(){var b=a.user.email;angular.isDefined(a.user.name)&&(b=a.user.name);var c="<span>gave "+e.rate_object.user_rating+"/10 stars to&nbsp;</span><span class='site_color'>"+e.rate_object.title+"</span>",d={thumb:a.user.thumb,message:c,timestamp:(new Date).getTime(),book:{id:e.rate_object.id,title:e.rate_object.title,author_name:e.rate_object.author_name,isbn:e.rate_object.isbn},user:{id:a.user.id,name:b}};e.$emit("addToNotifications",d)},_gamify=function(){e.rate_object.rated||e.$emit("gamifyCount",10,!0)},e.mark_as_rated=function(f,g){_gamify(),e.rate_object.rated=!0,e.rate_object.user_rating=parseInt(f)+1,e.temp_rating=parseInt(f)+1;var h=notify(a,"SUCCESS-Thanks, This will help us to recommend you better books.",b);e.$on("destroy",function(){b.cancel(h)});var i={id:e.rate_object.id,data:e.rate_object.user_rating};(angular.isUndefined(e.rate_object.status)||!e.rate_object.status)&&d.mark_as_read(e,e.rate_object,g),c.rate_this_book(i),_add_notification(),g.stopPropagation()},e.is_active=function(a){var b=!1;if(e.rate_object){var c=parseInt(a)+1;c<=e.rate_object.user_rating&&(b=!0)}return b}}],templateUrl:"/assets/angular/widgets/base/book/rate.html"}}]),websiteApp.directive("focusedBook",["$rootScope","$timeout","widgetService","sharedService","WebsiteUIConstants",function(a,b,c,d,e){return{restrict:"E",controller:["$scope",function(f){f.stop_keyboard_navigation=function(a){var b=a.keyCode==e.KeyLeft,c=a.keyCode==e.KeyUp,d=a.keyCode==e.KeyRight,f=a.keyCode==e.KeyDown;(b||d||c||f)&&a.stopPropagation()},f.handle_enter=function(b,d){var f=b.keyCode==e.Enter;if(f){a.focused_book.add_thumb=!1;var g=a.focused_book.id,h={thumb_url:d,book_id:g};c.add_thumbnail(h)}},f.show_feedback_popup=function(){a.focused_book.show_feedback_popup=a.focused_book.show_feedback_popup?!1:!0},f.get_author_details=function(){f.show_author=!0,f.show_buy=!1,angular.isUndefined(a.focused_book.author_details)&&c.get_author_details(a.focused_book.id).then(function(b){a.focused_book.author_details={about:b[0],image_url:b[1],signature_pic:b[2],id:b[3]}})},f.get_buy_links=function(){f.show_author=!1,f.show_buy=!0,angular.isUndefined(a.focused_book.bnn_links)&&c.get_affiliate_links(a.focused_book.id).then(function(b){a.focused_book.bnn_links=b.bnn.links})},f.stop_propagation=function(a){a.stopPropagation()},f.close_focused_tooltip=function(){delete a.focused_book},f.own_this_book=function(){if(f.have_this_book){f.have_this_book=!1;var d="SUCCESS-Are you sure, you don't have a copy of "+a.focused_book.title+"? <br/>Your friends might be looking for this book."}else{f.have_this_book=!0;var d="SUCCESS-Thanks, Your friends will now know that you own a copy of "+a.focused_book.title}var e=a.focused_book.id,g=notify(a,d,b);c.own_this_book(e,f.have_this_book),f.$on("destroy",function(){b.cancel(g)})},f.record_read_time=function(e,g){var h=angular.isUndefined(a.focused_book.time_index)||null==a.focused_book.time_index;h&&f.$emit("gamifyCount",10,!0),a.focused_book.time_index=e;{var i="SUCCESS-Thanks we have recorded your approximate time to read "+a.focused_book.title+". <br/> This will help us to recommend you books according to your reading skills.";notify(a,i,b)}switch(a.focused_book.status||d.mark_as_read(a,a.focused_book,g),a.focused_book.time_index){case 0:var j="Tiny Read";break;case 1:var j="Small Read";break;case 2:var j="Normal Read";break;case 3:var j="Long Read"}var k=a.user.email;angular.isDefined(a.user.name)&&(k=a.user.name);var i="<span>described reading length of <span class='site_color'>"+a.focused_book.title+"</span><span>&nbsp; as a&nbsp;'"+j+"'</span>",l={thumb:a.user.thumb,message:i,timestamp:(new Date).getTime(),book:{id:a.focused_book.id,title:a.focused_book.title,author_name:a.focused_book.author_name,isbn:a.focused_book.isbn},user:{id:a.user.id,name:k}};f.$emit("addToNotifications",l),c.record_time(a.focused_book.id,e),f.$on("destroy",function(){b.cancel("timeout_event")})},f.is_timer=function(b){var c=!1;return a.focused_book.time_index==b&&(c=!0),c},f.close_interaction_box=function(){a.focused_book.interact=!1,f.hash_tags=[]},f.stop_horizontal_scroll=function(a){a.stopPropagation()},_display_tweet=function(c){var d=null!=a.focused_book&&angular.isDefined(a.focused_book.tweets)&&a.focused_book.tweets.length>0;if(d){var e=a.focused_book.tweets,g=b(function(){c<e.length?(a.focused_book.display_tweet=a.focused_book.tweets[c].message,a.focused_book.display_profile=a.focused_book.tweets[c].message?a.focused_book.tweets[c].thumb:"/assets/profile_pic.jpeg",c++,_display_tweet(c)):_display_tweet(0)},2e3);f.$on("destroy",function(){b.cancel(g)})}else delete a.focused_book.display_profile,a.focused_book.display_tweet="Comment on this book..."},_open_tab=function(){f.show_author=!1,f.show_buy=!1},(_init=function(){var b=a.focused_book.id;(angular.isUndefined(a.focused_book.tweets)||0==a.focused_book.tweets.length)&&c.get_book_feed(b).then(function(b){null!=a.focused_book&&(a.focused_book.tweets=b)}),_display_tweet(0),_open_tab()})()}],templateUrl:"/assets/angular/widgets/base/book/focused_book.html"}}]),websiteApp.directive("bookTags",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/widgets/base/book/book_tags.html"}}]),websiteApp.directive("recommend",["$rootScope","$timeout","widgetService","websiteService",function(a,b,c,d){return{restrict:"E",scope:{recommend_object:"=data"},controller:["$scope",function(e){e.select_thumb=function(a,b){var c="true"==a.currentTarget.dataset.selected;c?(e.user.selected_friends.slice(e.user.selected_friends.indexOf(b),1),a.currentTarget.dataset.selected=!1,a.currentTarget.style.border="5px solid transparent"):(e.user.selected_friends.push(b),a.currentTarget.dataset.selected=!0,a.currentTarget.style.border="5px solid #427fed")},e.stop_propagation=function(a){a.stopPropagation()},e.recommend=function(){e.recommend_object.title,e.recommend_object.author_name;if(e.recommend_object.recommended){e.recommend_object.recommended=!1;var d="SUCCESS-Recommended to selected friends.",f=notify(a,d,b);e.$on("destroy",function(){b.cancel(f)});var g={friend_ids:e.user.selected_friends,book_id:e.recommend_object.id};c.recommend(g),e.$emit("gamifyCount",10,!0)}else e.recommend_object.recommended=!0},(_init=function(){e.user={},d.get_followed_by().then(function(a){e.user.friends=[],angular.forEach(a,function(a){var b={name:a[1],id:a[0],thumb:a[2]};this.push(b)},e.user.friends)}),e.user.selected_friends=[]})()}],templateUrl:"/assets/angular/widgets/base/book/recommend.html"}}]),websiteApp.directive("markAsRead",["$rootScope","$timeout","widgetService","sharedService","stropheService",function(a,b,c,d,e){return{restrict:"E",controller:["$scope",function(b){b.mark_as_read=function(c){var f=a.user.name,g=f+"added "+b.book.title+" to Books Read.";d.mark_as_read(b,b.book,c),e.send_notification(g)}}],templateUrl:"/assets/angular/widgets/base/book/mark_as_read.html"}}]);var global_display_timer=0;