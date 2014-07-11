function zoomin_book(a,b,c,d){c.initPage=d,a.zoomin_book=!0;var e=event.currentTarget.offsetParent.offsetLeft+event.currentTarget.offsetWidth,f=event.screenX,g=event.currentTarget.offsetParent.offsetParent.scrollWidth;a.$emit("expandBook",a.book.id,e,f,g);var h=b(function(){a.zoomin_book=!1},3e3);a.$on("destroy",function(){b.cancel(h)})}function add_custom_bookmark(a,b,c){var d=a.book.custom_bookmark;if(d){for(var e=a.book.labels,f=!1,g=0;g<e.length;g++){var h=e[g];if(h.name==d){f=!0;var i="ALERT- Bookmark with the name "+d+" is already added in the list";break}}if(!f){a.book.bookmark_status=1,b.labels=b.labels.concat([{name:d}]),a.book.labels=a.book.labels.concat([{name:d,checked:!0}]),a.book.custom_bookmark="";var i="SUCCESS-Custom Bookmark "+d+" added to book "+a.book.title}var j=notify(b,i,c);a.$on("destroy",function(){c.cancel(j)})}}websiteApp.directive("book",["widgetService","$rootScope",function(a,b){return{restrict:"E",scope:{book:"=data"},controller:["$scope",function(a){a.show_focused_tooltip=function(c){if(b.focused_book!=a.book){b.ticker_popup=null,b.focused_book=a.book;var d=c.currentTarget.offsetParent.offsetParent.offsetLeft-c.pageX+c.clientX,e=screen.width-(d+c.currentTarget.offsetParent.scrollWidth),f=d;e>f?(e>400?(d=d+c.currentTarget.offsetParent.scrollWidth-c.currentTarget.offsetLeft,b.focused_book.reposition_tooltip={left:d+"px"}):b.focused_book.reposition_tooltip={right:"0px"},b.on_left=!0):(f>400?(d=screen.width-d,b.focused_book.reposition_tooltip={right:d+"px"}):b.focused_book.reposition_tooltip={left:"0px"},b.on_left=!1)}else b.focused_book=null;c.stopPropagation()},(_init=function(){a.book.tweets=[];b.labels.length;a.book.labels=[],angular.forEach(b.labels,function(a){this.push({name:a.name})},a.book.labels),a.book.show_labels=!1;var c=Math.floor(20*Math.random())+1+"px",d=Math.floor(50*Math.random())+1+"px",e=Math.random()<.5,f=Math.random()<.5;f&&(d="-"+d),e&&(c="-"+c)})()}],templateUrl:"/assets/angular/widgets/base/book/book_widget.html"}}]),websiteApp.directive("labelDropdown",function(){return{restrict:"E",controller:["$scope",function(a){a.stop_propagation=function(a){a.stopPropagation()},a.select_label=function(b){var c=!1,d=a.book.labels;a.book.labels[b].checked=!a.book.labels[b].checked;for(var e=0;e<d.length;e++)if(d[e].checked){c=!0;break}a.book.bookmark_status=c?1:0},a.stop_horizontal_scroll=function(a){a.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/label_dropdown.html"}}),websiteApp.directive("bookNavbar",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/widgets/base/book/book_navbar.html"}}]),websiteApp.directive("listDropdown",function(){return{restrict:"E",controller:function(){},templateUrl:"app/assets/javascripts/angular/widgets/base/book/list_dropdown.html"}}),websiteApp.directive("bookBookmark",["$rootScope","$timeout","widgetService",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.toggle_bookmarked=function(d){for(var e=c.book.labels.length,f=a.labels.length,g=e;f>g;g++)c.book.labels.push({name:a.labels[g].name});if(c.book.show_labels){{c.book.bookmark_status,c.book.title,c.book.author_name}c.book.custom_bookmark?add_custom_bookmark(c,a,b):c.book.show_labels=!1}else c.book.show_labels=!0;d.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/bookmark.html"}}]),websiteApp.directive("bookInteract",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){_init=function(){c.setStatus()},c.show_bookmark_options=function(b){if(c.book.show_labels)c.book.blur_input=!0,c.book.show_labels=!1;else{for(var d=c.book.labels.length,e=a.labels.length,f=d;e>f;f++)c.book.labels.push({name:a.labels[f].name});c.book.blur_input=!1,c.book.show_labels=!0}b.stopPropagation()},c.handle_enter=function(d){var e=13==d.keyCode;e&&add_custom_bookmark(c,a,b)},c.setStatus=function(a){c.read=1==a?!0:!1},_init()}],templateUrl:"/assets/angular/widgets/base/book/interact_widget.html"}}]),websiteApp.directive("rate",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",scope:{rate_object:"=data"},controller:["$scope",function(d){d.show_if_rated=function(a){d.temp_rating=d.rate_object.user_rating,d.rate_object.user_rating=parseInt(a)+1,d.ready_to_rate=!0},d.reset_rating=function(){d.ready_to_rate=!1,d.rate_object.user_rating=d.temp_rating},d.mark_as_rated=function(e,f){d.rate_object.rated=!0,d.rate_object.user_rating=parseInt(e)+1,d.temp_rating=parseInt(e)+1;var g=notify(a,"SUCCESS-Thanks, This will help us to recommend you better books.",b);d.$on("destroy",function(){b.cancel(g)}),c.rate_this_book(d.rate_object.id,d.rate_object.user_rating),f.stopPropagation()},d.is_active=function(a){var b=!1;if(d.rate_object){var c=parseInt(a)+1;c<=d.rate_object.user_rating&&(b=!0)}return b}}],templateUrl:"/assets/angular/widgets/base/book/rate.html"}}]),websiteApp.directive("focusedBook",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.handle_enter=function(b,e){var f=13==b.keyCode;if(f){d.add_thumb=!1;var g=a.focused_book.title,h=a.focused_book.author_name,i="/#/user/1/book/"+g+"/author/"+h,j={thumb_url:e,title:g,book_url:i,username:a.user.name,user_thumb:a.user.thumb,user_link:""};c.add_thumbnail(j).then(function(){})}},d.show_feedback_popup=function(){a.focused_book.show_feedback_popup=a.focused_book.show_feedback_popup?!1:!0},d.stop_propagation=function(a){a.stopPropagation()},d.close_focused_tooltip=function(){a.focused_book=null},d.own_this_book=function(){if(d.have_this_book){d.have_this_book=!1;var e="SUCCESS-Are you sure, you don't have a copy of "+a.focused_book.title+"? <br/>Your friends might be looking for this book."}else{d.have_this_book=!0;var e="SUCCESS-Thanks, Your friends will now know that you own a copy of "+a.focused_book.title}var f=a.focused_book.id,g=notify(a,e,b);c.own_this_book(f,d.have_this_book),d.$on("destroy",function(){b.cancel(g)})},d.record_read_time=function(e){a.focused_book.read_timer=e;{var f="SUCCESS-Thanks we have recorded your approximate time to read "+a.focused_book.title+". <br/> This will help us to recommend you books according to your reading skills.";notify(a,f,b)}c.record_time(a.focused_book.id,e),d.$on("destroy",function(){b.cancel("timeout_event")})},d.is_timer=function(b){var c=!1;return a.focused_book.read_timer==b&&(c=!0),c},d.close_interaction_box=function(){a.focused_book.interact=!1,d.hash_tags=[]},d.stop_horizontal_scroll=function(a){a.stopPropagation()},_display_tweet=function(c){if(0!=a.focused_book.tweets.length){var e=a.focused_book.tweets,f=b(function(){c<e.length?(a.focused_book.display_tweet=a.focused_book.tweets[c].tweet,a.focused_book.display_profile=a.focused_book.tweets[c].tweet?a.focused_book.tweets[c].thumb:"/assets/profile_pic.jpeg",c++,_display_tweet(c)):_display_tweet(0)},2e3);d.$on("destroy",function(){b.cancel(f)})}else a.focused_book.display_profile=null,a.focused_book.display_tweet="What do you feel about this book?"},_open_tab=function(){d.show_info=!0},(_init=function(){var b=a.focused_book.title,e=a.focused_book.author_name;c.get_affiliate_links(b,e).then(function(a){d.bnn_links=a.bnn.links}),_display_tweet(0),_open_tab(),d.add_thumb=!1})()}],templateUrl:"/assets/angular/widgets/base/book/focused_book.html"}}]),websiteApp.directive("interactionBox",["$rootScope","$timeout","websiteService",function(a,b,c){return{restrict:"E",controller:["$scope",function(b){b.update_hashtagged_comment=function(){},b.stop_propagation=function(a){a.stopPropagation()},b.close_interaction_box=function(){a.focused_book.interact=!1,b.hash_tags=[]},b.stop_horizontal_scroll=function(a){a.stopPropagation()},b.handle_selection=function(c){b.current=0;var d=a.focused_book.current_comment.split(" "),e=a.focused_book.hash_tagged_comment.split(" "),f=(String.fromCharCode(event.keyCode),d.length);if(1==f)var g=d.slice(0,f-1).join(" ").trim(),h=e.slice(0,f-1).join(" ").trim();else var g=d.slice(0,f-1).join(" ")+" ",h=e.slice(0,f-1).join(" ")+" ";d.pop(),e.pop(),8==event.keyCode,b.hash_tagging;a.focused_book.hash_tagged_comment=h+"<b>"+c+"</b>",a.focused_book.current_comment=g+c,b.hash_tags=null,event.stopPropagation()},b.handle_backspace=function(c){var d=a.focused_book.current_comment.split(" "),e=a.focused_book.hash_tagged_comment.split(" "),f=(String.fromCharCode(c.keyCode),d.length);if(1==f)var g=d.slice(0,f-1).join(" "),h=e.slice(0,f-1).join(" ");else var g=d.slice(0,f-1).join(" ")+" ",h=e.slice(0,f-1).join(" ")+" ";var i=d.pop(),j=e.pop(),k=8==c.keyCode,l=b.hash_tagging;if(k){if("#"==i)b.hash_tagging=!1,b.hash_tags=[],a.focused_book.hash_tagged_comment=h;else{var m=h.split("<b>").length!=h.split("</b>").length,n=">"==j[j.length-1];if(m&&(e=h.split("<b>"),f=e.length,h=e.slice(0,f-1).join("<b>"),g=h.replace(/<b>/,"").replace(/<\/b>/,"")),l||n)a.focused_book.hash_tagged_comment=h,a.focused_book.current_comment=g,b.is_new_word_initiation=!0,b.hash_tagging=!1,b.hash_tags=[],c.preventDefault();else{var o=a.focused_book.hash_tagged_comment;a.focused_book.hash_tagged_comment=o.substring(0,o.length-1)}}a.focused_book.current_comment&&""!=a.focused_book.current_comment||(a.focused_book.hash_tagged_comment="")}c.stopPropagation()},b.handle_hash_tags=function(d){""==a.focused_book.current_comment.trim()&&(b.is_new_word_initiation=!0);var e=a.focused_book.current_comment.split(" "),f=String.fromCharCode(d.keyCode),g=e.length,h=(e.slice(0,g-1).join(" "),e.pop()),i=b.is_new_word_initiation,j=(b.hash_tagging,13==d.keyCode);if(j&&b.hash_tags)d.preventDefault(),b.handle_selection(b.currentItem);else if(j&&!b.hash_tags){var k=a.focused_book.hash_tagged_comment.replace(/<b>/,"<a>").replace(/<\/b>/,"</a>");if(a.user.thumb)var l=a.user.thumb,m={tweet:k,thumb:l};else var m={tweet:k};a.focused_book.current_comment="",a.focused_book.hash_tagged_comment="",a.focused_book.tweets.push(m),d.preventDefault()}else{if(i&&"#"==f){var n="<b>"+f+"</b>";b.hash_tagging=!0,a.focused_book.hash_tagged_comment=a.focused_book.hash_tagged_comment+n}else if(i&&"+"==f){var n="<b>"+f+"</b>";b.hash_tagging=!0,a.focused_book.hash_tagged_comment=a.focused_book.hash_tagged_comment+n,b.search_for="TAGS"}else if(i&&"@"==f){var n="<b>"+f+"</b>";b.hash_tagging=!0,a.focused_book.hash_tagged_comment=a.focused_book.hash_tagged_comment+n,b.search_for="[AUTHORS, READERS]"}else if(" "==f)b.hash_tagging=!1,a.focused_book.hash_tagged_comment=a.focused_book.hash_tagged_comment+f,b.search_for=null;else if(b.hash_tagging){var o=a.focused_book.hash_tagged_comment.split("</b>"),p=o.length;if(p>2){var q=o[p-2]+f+"</b>"+o[p-1];a.focused_book.hash_tagged_comment=o.slice(0,p-2).join("</b>")+"</b>"+q}else{var q=o[p-2]+f+"</b>"+o[p-1];a.focused_book.hash_tagged_comment=q}}else a.focused_book.hash_tagged_comment=a.focused_book.hash_tagged_comment+f;b.search_for&&h.length>2&&(string_to_be_searched=h.slice(1,h.length)+""+f,c.search(string_to_be_searched.trim(),b.search_for,3).then(function(a){b.hash_tags=[];for(var c=a.results.data,d=0;d<c.length;d++){var e={name:c[d][0]};b.hash_tags.push(e)}})),b.is_new_word_initiation=" "==f?!0:!1}d.stopPropagation()},b.is_current=function(a,c){return b.current==a&&(b.currentItem=c),b.current==a},b.set_current=function(a){b.current=a},b.key_up=function(){var a=38==event.keyCode,c=40==event.keyCode;a?b.set_current(0!=b.current?b.current-1:b.hash_tags.length-1):c&&b.set_current(b.current!=b.hash_tags.length-1?b.current+1:0)},(_init=function(){b.is_new_word_initiation=!0,a.focused_book.current_comment="",a.focused_book.hash_tagged_comment="",b.current=0})()}],templateUrl:"/assets/angular/widgets/base/book/interaction_box.html"}}]),websiteApp.directive("bookTags",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/widgets/base/book/book_tags.html"}}]),websiteApp.directive("recommend",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",scope:{recommend_object:"=data"},controller:["$scope",function(d){d.select_thumb=function(a){var b="true"==a.currentTarget.dataset.selected;b?(a.currentTarget.dataset.selected=!1,a.currentTarget.style.border="2px solid transparent"):(a.currentTarget.dataset.selected=!0,a.currentTarget.style.border="2px solid")},d.stop_horizontal_scroll=function(a){a.stopPropagation()},d.recommend=function(){var e=d.recommend_object.title,f=d.recommend_object.author_name;if(d.recommend_object.recommended){d.recommend_object.recommended=!1;var g="SUCCESS-"+e+" by "+f+" has been recommended to selected friends.",h=notify(a,g,b);d.$on("destroy",function(){b.cancel(h)}),c.recommend("BOOK",d.recommend_object.id,d.recommend_object.recommended)}else d.recommend_object.recommended=!0},(_init=function(){d.user={},d.user.friends=a.user.friends})()}],templateUrl:"/assets/angular/widgets/base/book/recommend.html"}}]),websiteApp.directive("markAsRead",["$rootScope","$timeout","widgetService","sharedService","stropheService",function(a,b,c,d,e){return{restrict:"E",controller:["$scope",function(b){b.markAsRead=function(c){var f=a.user.name,g=f+"added "+b.book.title+" to Books Read.";d.markAsRead(b,b.book,c),e.send_notification(g)}}],templateUrl:"/assets/angular/widgets/base/book/mark_as_read.html"}}]);var global_display_timer=0;