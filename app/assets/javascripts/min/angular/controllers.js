homeApp.controller("appController",["$scope","$rootScope","$mdSidenav","$mdBottomSheet","$mdDialog","shelfService",function(a,b,c,d,e,f){a.play_type_key=function(b){a.info.show_share&&(angular.isUndefined(a.current_track)||0==a.current_track?(a.current_track=1,document.getElementById("audiotag1").play()):1==a.current_track?(a.current_track=2,document.getElementById("audiotag2").play()):(a.current_track=0,document.getElementById("audiotag3").play()),b.stopPropagation())},a.stop_propagation=function(a){a.stopPropagation()},a.stopPropagation=function(){a.constant.show_book},a.show_rating=function(a){e.show({templateUrl:"assets/angular/html/shared/share.html",targetEvent:a}),a.stopPropagation()},a.toggle_notifications=function(b){a.show_notifications=a.show_notifications?!1:!0,b.stopPropagation()},a.close_popups=function(){a.show_notifications=!1},a.toggleLeft=function(a){c("left").toggle(),a.stopPropagation()},a.toggleRight=function(a){c("right").toggle(),a.stopPropagation()},a.show_share_bottom_sheet=function(a){d.show({templateUrl:"assets/angular/html/shared/social_bottom_sheet.html",controller:"shelfController",targetEvent:a})},a.stop_propagation=function(a){a.stopPropagation()};!function(){a.visible_search_bar=!0,a.info={},a.info.show_share=!1,a.data={selectedIndex:0},b.user={},f.get_all_shelves().then(function(a){b.labels=a})}()}]);;homeApp.controller("notificationController",["$scope","feedService",function(a,b){!function(){b.get_notifications().then(function(b){a.notifications=b})}();a.stop_propagation=function(a){a.stopPropagation()}}]);;homeApp.controller("searchController",["$scope","searchService","$location",function(a,b,c){a.show_search_bar=function(){a.visible_search_bar=!a.visible_search_bar},a.query_search=function(c){b.raw(c).then(function(b){if(a.search_results=b,a.did_you_mean=!1,angular.forEach(b,function(b){b.fuzzy&&(a.did_you_mean=!0)}),a.did_you_mean){var d={name:"Did you mean",labels:[]};a.search_results.splice(0,0,d)}var d={name:"Show all results",show_all:!0,labels:[],search_text:c};a.search_results.push(d)})},a.show_all_results=function(c,d){b.raw(c,d).then(function(b){a.all_results=b})},a.on_select=function(a){if(angular.isDefined(a)){var b=a.labels.indexOf("Book")>=0,c=a.labels.indexOf("Author")>=0,d="";b?d="/book?q="+a.id:c?d="/author?q="+a.id:a.show_all&&(d="/search?q="+a.search_text),""!=d&&(window.location.href=d)}},a.reload_results=function(a){switch(a){case"Book":break;case"Author":break;case"Community":break;case"Blog":break;case"Person":break;case"News":}};!function(){var b=function(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),c=b.exec(location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))};a.search_results=[];var d=/[?&]([^=#]+)=([^&#]*)/g,e=d.exec(c.absUrl()),f=c.$$absUrl.indexOf("search")>=0;if(angular.isDefined(e)&&null!=e&&f){var g=b("q"),h=b("type");a.show_all_results(g,h),a.display_results_for=g}}()}]);;homeApp.controller("leftController",["$scope","$timeout","$mdSidenav","$log",function(a,b,c){a.close=function(){c("left").close()}}]);;homeApp.controller("rightController",["$scope","$timeout","$mdSidenav","$log",function(a,b,c){a.close=function(){c("right").close()}}]);;homeApp.controller("shelfController",["$scope","$mdBottomSheet","$mdToast","shelfService","locals",function(a,b,c,d,e){a.listItemClick=function(c){var d=a.items[c];b.hide(d)},a.getToastPosition=function(){return Object.keys(a.toast_position).filter(function(b){return a.toast_position[b]}).join(" ")},a.toggle_bookmark=function(b,e){if(angular.isUndefined(e)||!e)var f=!0;else var f=!1;var g="",h="BOOK",i=b.label_key,j={id:g,type:h,shelf:i,status:f};d.bookmark(j),c.show({controller:"toastController",templateUrl:"assets/angular/html/shared/toast/bookmark_action.html",hideDelay:6e3,position:a.getToastPosition()})},a.add_new_label=function(){d.add_new_label(a.new_label)};!function(){a.toast_position={bottom:!1,top:!0,left:!1,right:!0},a.object_id=e}()}]);;homeApp.controller("shareController",["$scope","$rootScope","$timeout","ShareOptions","$routeParams","$mdBottomSheet","statusService","WebsiteUIConstants",function(a,b,c,d,e,f,g,h){a.show_share_options=function(b){f.show({templateUrl:"assets/angular/html/share/_share_options.html",controller:"optionsController",scope:a,preserveScope:!0,targetEvent:b}).then(function(){})},a.back=function(){a.info.show_share=!1,a.info.show_book_share=!1,event.stopPropagation()},a.show_share_page=function(){if(a.info.show_share){var b={};angular.isDefined(a.info.feelings)&&a.info.feelings.length>0&&(b=angular.extend(b,{feelings:a.info.feelings})),angular.isDefined(a.info.reading_status_value)&&(b=angular.extend(b,{reading_status_value:a.info.reading_status_value})),angular.isDefined(a.info.book_id)&&(b=angular.extend(b,{book_id:a.info.book_id})),angular.isDefined(a.info.mentioned_users_ids)&&a.info.mentioned_users_ids.length>0&&(b=angular.extend(b,{mentioned_users_ids:a.info.mentioned_users_ids})),angular.isDefined(a.info.mentioned_authors_ids)&&a.info.mentioned_authors_ids.length>0&&(b=angular.extend(b,{mentioned_authors_ids:a.info.mentioned_authors_ids})),angular.isDefined(a.info.hash_tags)&&a.info.hash_tags.length>0&&(b=angular.extend(b,{hash_tags:a.info.hash_tags})),angular.isDefined(a.info.status)&&a.info.status.length>0&&(b=angular.extend(b,{content:a.info.status})),angular.isDefined(a.info.wrapper_status)&&a.info.wrapper_status.length>0&&(b=angular.extend(b,{wrapper_content:a.info.wrapper_status})),angular.isDefined(a.info.book_exchange_status)&&(b=angular.extend(b,{book_exchange_status:a.info.book_exchange_status})),g.post_status(b),a.info.status="",a.info.wrapper_status="",a.type_icon_pressed={"margin-right":"60vw"},c(function(){a.type_icon_pressed={"margin-right":"0px"}},100)}else a.info.show_share=!0},a.handle_text_input=function(b){var c={},d=function(){c=a._detect_key(b),""==a.info.status.trim()&&(a.is_new_word_initiation=!0);var d={string_array:a.info.status.split(" "),current_character:String.fromCharCode(b.keyCode),split_string_length:a.info.status.split(" ").length,old_string:a.info.status.split(" ").slice(0,a.info.status.split(" ").length-1).join(" "),current_element:a.info.status.split(" ").pop(),is_new_word_initiation:a.is_new_word_initiation,under_a_tag:a.hash_tagging,html_array:a.info.wrapper_status.split(" "),old_html:a.info.wrapper_status.split(" ").slice(0,a.info.status.split(" ").length-1).join(" "),current_html:a.info.wrapper_status.split(" ").pop(),hash_tagging:a.hash_tagging};return{backspace:function(){if(a.show_interaction_links=!0,1!=d.split_string_length&&(old_string=d.old_string+" ",old_html=d.old_html+" "),"#"==d.current_element)a.hash_tagging=!1,a.info.wrapper_status=d.old_html;else{var c=d.old_html.split("<a>").length!=d.old_html.split("</a>").length,e=">"==d.current_html[d.current_html.length-1],f=d.current_html.indexOf("<br/>")>=0,g=function(){d.html_array=d.old_html.split("<br/>"),d.split_string_length=d.html_array.length,d.old_html=d.html_array.slice(0,d.split_string_length-1).join("<br/>"),old_string=d.old_html.replace(/<br\/>/,"")},h=function(){d.html_array=d.old_html.split("<a>"),d.split_string_length=d.html_array.length,d.old_html=d.html_array.slice(0,d.split_string_length-1).join("<a>"),old_string=d.old_html.replace(/<a>/,"").replace(/<\/a>/,"")},i=function(){a.info.wrapper_status=d.old_html,a.info.status=d.old_string,a.is_new_word_initiation=!0,a.hash_tagging=!1,b.preventDefault()};if(f&&g(),c&&h(),d.hash_tagging||e)i();else{var j=a.info.wrapper_status;a.info.wrapper_status=j.substring(0,j.length-1)}a.info.status&&""!=a.info.status||(a.info.wrapper_status="")}b.stopPropagation()},enter:function(){a.info.hash_tags?(b.preventDefault(),a.handle_selection(a.currentItem)):(a.hash_tagging=!1,a.is_new_word_initiation=!0,a.info.wrapper_status=a.info.wrapper_status+"<br/>")},left:function(){},right:function(){},special_character:function(){var c={hash:3==String.fromCharCode(b.keyCode),plus:"="==String.fromCharCode(b.keyCode),at_the_rate:2==String.fromCharCode(b.keyCode)};if(d.is_new_word_initiation&&c.hash){var e="<a>#</a>";a.hash_tagging=!0,a.info.wrapper_status=a.info.wrapper_status+e}},alphabet:function(){if(" "==d.current_character)d.hash_tagging&&(d.current_element=d.current_element.slice(1),a.info.hash_tags.push(d.current_element)),a.hash_tagging=!1,a.info.wrapper_status=a.info.wrapper_status+d.current_character,delete a.search_for;else if(a.hash_tagging){var b=a.info.wrapper_status.split("</a>"),c=b.length;if(c>2){var e=b[c-2]+d.current_character+"</a>"+b[c-1];a.info.wrapper_status=b.slice(0,c-2).join("</a>")+"</a>"+e}else{var e=b[c-2]+d.current_character+"</a>"+b[c-1];a.info.wrapper_status=e}}else a.info.wrapper_status=a.info.wrapper_status+d.current_character;a.search_for,a.is_new_word_initiation=" "==d.current_character?!0:!1}}}();c.enter?d.enter():c.backspace_or_delete?d.backspace():c.left||c.right||c.up||c.down||(c.shift?d.special_character():c.command||d.alphabet()),b.stopPropagation()},a._detect_key=function(a){var b=a.keyCode==h.Backspace||a.keyCode==h.Delete,c=a.keyCode==h.KeyUp,d=a.keyCode==h.KeyDown,e=a.keyCode==h.KeyLeft,f=a.keyCode==h.KeyRight,g=a.keyCode==h.Enter,i=a.keyCode==h.LeftShift||a.keyCode==h.RightShift,j=a.keyCode==h.LeftCommand||a.keyCode==h.RightCommand;return{backspace_or_delete:b,up:c,down:d,left:e,right:f,enter:g,shift:i,command:j}},a.handle_selection=function(b){a.current=0;var c=a.info.status.split(" "),d=a.info.wrapper_status.split(" "),e=(String.fromCharCode(event.keyCode),c.length);if(1==e)var f=c.slice(0,e-1).join(" ").trim(),g=d.slice(0,e-1).join(" ").trim();else var f=c.slice(0,e-1).join(" ")+" ",g=d.slice(0,e-1).join(" ")+" ";c.pop(),d.pop(),a.hash_tagging;a.info.wrapper_status=g+"<a>"+b+"</a>",a.info.status=f+b,event.stopPropagation()},a.share_post=function(){var c=a.info.wrapper_status.replace(/<a>/,"<a>").replace(/<\/a>/,"</a>"),d={message:c,user:{name:b.user.name,thumb:b.user.thumb}};d=_add_labels_to_tweet(d);var e=a.selected_interact_book;d=_add_comment(d,e),angular.isDefined(b.focused_book)&&(0==b.focused_book.tweets.length?b.focused_book.tweets=b.focused_book.tweets.concat([d]):b.focused_book.tweets.push(d))};!function(){a.info.status="",a.info.hash_tags=[],a.info.wrapper_status=""}()}]);;homeApp.controller("optionsController",["$scope","$rootScope","$timeout","ShareOptions","$routeParams","$mdBottomSheet",function(a,b,c,d){var e=function(){a.share_options=d,a.data={selectedIndex:0}};a.show_level1_options=function(b,e){a.first_option=b,delete a.second_option,delete a.level2_nested_options,delete a.info.book_exchange_status,delete a.info.feelings,a.add_books=!1,a.data.selectedIndex=Math.min(a.data.selectedIndex+1,2),a.info.reading_status_value=e,a.loading=!0,angular.forEach(d.ReadingStage,function(d){if(angular.equals(d,b)){var e=c(function(){a.loading=!1,a.nested_options=b.nested_options},1e3);a.$on("destroy",function(){c.cancel(e)})}})},a.show_level2_options=function(b,d){if(delete a.info.feelings,a.second_option=b,a.data.selectedIndex=Math.min(a.data.selectedIndex+1,2),a.info.book_exchange_status=d,a.level2_loading=!0,angular.isDefined(a.second_option.search_book))a.add_books=!0,delete a.level2_nested_options;else{c(function(){a.add_books=!1,a.level2_loading=!1,a.level2_nested_options=a.second_option.value},1e3)}},a.post_status=function(b){a.info.feelings=[b.name]},a.previous=function(){a.data.selectedIndex=Math.max(a.data.selectedIndex-1,0)},e()}]);;homeApp.controller("profileController",["$scope","userService","$rootScope","WebsiteUIConstants","ColorConstants","$location","bookService",function(a,b,c,d,e,f,g){var h=function(){b.get_detailed_info().then(function(a){a=a[0];var b=[];angular.forEach(a.categories_id,function(b,c){var e=d.GenreAWS+a.categories_aws_key[c],f={root_category_id:b,root_category_name:a.categories_name[c],url:e,status:!0};this.push(f)},b);var f=[];angular.forEach(a.books_id,function(b,c){var d=Math.floor(Math.random()*e.value.length),f=e.value[d],g={color:f,book_id:b,title:a.books_title[c],author_name:a.books_author_name[c],isbn:a.books_isbn[c],random_style:{"background-color":f}};this.push(g)},f),c.user=angular.extend(c.user,a),c.user=angular.extend(c.user,{favourite_categories:b}),c.user=angular.extend(c.user,{influential_books:f})})},i=function(){var a=function(a){var b="";switch(a.label){case"BookmarkNode":b="Added to "+a.node.key;break;case"Listopia":break;case"CommunityNode":break;case"BlogNode":break;case"StatusNode":b=a.node.wrapper_content;break;case"EndorseNode":b="Endorsed this book.";break;case"RatingNode":b="Gave "+a.node.content+" rating on 10."}return b},d=function(){var a=[],b=function(a,b){var c=!1,d=0;return a.length>0&&angular.forEach(a,function(a,e){angular.isDefined(a.book)&&a.book.id==b&&(c=!0,d=e)}),{status:c,index:d}};angular.forEach(c.user.feed,function(c){if(angular.isDefined(c.book)){var d=b(a,c.book.id);d.status?(delete c.book,a[d.index].data.push(c)):(angular.isDefined(c.book)&&(d={book:c.book},delete c.book,c=angular.extend(d,{data:[c]})),this.push(c))}else this.push(c)},a),c.user.feed=a};b.get_personal_feed().then(function(b){c.user.feed=[],angular.forEach(b,function(a){var b=Math.floor(Math.random()*e.value.length);angular.isDefined(a.book)&&(a.book=angular.extend(a.book,{color:e.value[b]})),this.push(a)},c.user.feed),d(),angular.forEach(c.user.feed,function(b){if(angular.isDefined(b.book))g.get_basic_book_details(b.book.id).then(function(c){b.book=angular.extend(b.book,c),angular.forEach(b.data,function(b){var c=a(b);b=angular.extend(b,{message:c})})});else{var c=a(b),d=angular.extend(b,{message:c});b.data=[d]}})})};a.write_reading_journey=function(){a.info.show_share=!0,a.info.show_book_share=!0},a.search_book=function(){},a.follow_user=function(){};!function(){var b=/[?&]([^=#]+)=([^&#]*)/g,d=b.exec(f.absUrl());if(angular.isDefined(d)&&null!=d){var e=d[2];a.info.my_profile=!1}else{var e=c.user.id;a.info.my_profile=!0}h(e),i(e)}()}]);;homeApp.controller("toastController",["$scope","$mdToast",function(a,b){a.closeToast=function(){b.hide()}}]);