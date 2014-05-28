function zoomin_book(a,b,c,d){c.initPage=d,a.zoomin_book=!0;var e=event.currentTarget.offsetParent.offsetLeft+event.currentTarget.offsetWidth,f=event.screenX,g=event.currentTarget.offsetParent.offsetParent.scrollWidth;a.$emit("expandBook",a.book.id,e,f,g);var h=b(function(){a.zoomin_book=!1},3e3);a.$on("destroy",function(){b.cancel(h)})}websiteApp.directive("book",["widgetService","$rootScope",function(a,b){return{restrict:"E",scope:{book:"=data"},controller:["$scope",function(c){c.hover=function(){c.hovered=!0},c.mouseout=function(){c.hovered=!1},c.show_focused_tooltip=function(a){if(b.focused_book!=c.book){b.focused_book=c.book;var d=a.currentTarget.offsetParent.offsetParent.offsetLeft-a.pageX+a.clientX,e=screen.width-(d+a.currentTarget.offsetParent.scrollWidth),f=d;e>f?e>400?(d=d+a.currentTarget.offsetParent.scrollWidth-a.currentTarget.offsetLeft,b.focused_book.reposition_tooltip={left:d+"px",top:"60px"}):b.focused_book.reposition_tooltip={right:"0px",top:"60px"}:f>400?(d=screen.width-d,b.focused_book.reposition_tooltip={right:d+"px",top:"60px"}):b.focused_book.reposition_tooltip={left:"0px",top:"60px"}}else b.focused_book=null;a.stopPropagation()},(_init=function(){var b=c.book.id;a.populate_tooltips(b).then(function(a){c.book.title=a.title,c.book.author_name=a.author_name,c.book.users=a.users,c.book.summary=a.summary,c.book.users_count=a.users_count});var d=Math.floor(20*Math.random())+1+"px",e=Math.floor(50*Math.random())+1+"px",f=Math.random()<.5,g=Math.random()<.5;g&&(e="-"+e),f&&(d="-"+d)})()}],templateUrl:"/assets/angular/widgets/base/book/book_widget.html"}}]),websiteApp.directive("bookNavbar",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/widgets/base/book/book_navbar.html"}}]),websiteApp.directive("bookBookmark",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.toggle_bookmarked=function(e){var f=d.book.bookmark_status,g=d.book.title,h=d.book.author_name;if(1==f){d.book.bookmark_status=0;var i="SUCCESS-"+g+" by "+h+" has been removed from your bookmark shelf.";d.$emit("removeFromBookmarks","BOOK",d.book)}else{d.book.bookmark_status=1;var i="SUCCESS-"+g+" by "+h+" has been added to your bookmark shelf.";d.$emit("addToBookmarks","BOOK",d.book),a.$broadcast("glowBookmark")}var j=notify(a,i,b);d.$on("destroy",function(){b.cancel(j)}),c.bookmark("BOOK",d.book.id,d.book.bookmark_status),e.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/bookmark.html"}}]),websiteApp.directive("bookInteract",["websiteService",function(a){return{restrict:"E",controller:["$scope",function(b){_init=function(){b.setStatus()},b.setStatus=function(a){b.read=1==a?!0:!1},b.handle_selection=function(a){var c=$(".comment_box").val().split(" "),d=$(".comment_box").siblings().html().split(" "),e=(String.fromCharCode(event.keyCode),c.length);if(1==e)var f=c.slice(0,e-1).join(" ").trim(),g=d.slice(0,e-1).join(" ").trim();else var f=c.slice(0,e-1).join(" ")+" ",g=d.slice(0,e-1).join(" ")+" ";c.pop(),d.pop(),8==event.keyCode,b.hash_tagging;$(".comment_box").siblings().html(g+" <b>"+a+"</b>"),$(".comment_box").val(f+" "+a),b.hash_tags=null},b.set_current=function(){},b.handle_backspace=function(a){var c=$(a.currentTarget).val().split(" "),d=$(a.currentTarget).siblings().html().split(" "),e=(String.fromCharCode(a.keyCode),c.length);if(1==e)var f=c.slice(0,e-1).join(" "),g=d.slice(0,e-1).join(" ");else var f=c.slice(0,e-1).join(" ")+" ",g=d.slice(0,e-1).join(" ")+" ";var h=c.pop(),i=d.pop(),j=8==a.keyCode,k=b.hash_tagging;if(j){if("#"==h)b.hash_tagging=!1,b.hash_tags=[],$(a.currentTarget).siblings().html(g);else if(k)$(a.currentTarget).siblings().html(g),$(a.currentTarget).val(f),b.hash_tagging=!1,b.hash_tags=[],a.preventDefault();else{var l=">"==i[i.length-1];if(l)$(a.currentTarget).siblings().html(g),$(a.currentTarget).val(f),b.hash_tags=[],a.preventDefault();else{var m=$(a.currentTarget).siblings().html();$(a.currentTarget).siblings().html(m.substring(0,m.length-1))}}$(a.currentTarget).val()&&""!=$(a.currentTarget).val()||$(a.currentTarget).siblings().html("")}a.stopPropagation()},b.handle_hash_tags=function(c){{var d=$(c.currentTarget).val().split(" "),e=String.fromCharCode(c.keyCode),f=d.length,g=(d.slice(0,f-1).join(" "),d.pop()),h=""==g;b.hash_tagging}if(h&&"#"==e){var i="<b>"+e+"</b>";b.hash_tagging=!0,$(c.currentTarget).siblings().append(i)}else if(h&&"+"==e){var i="<b>"+e+"</b>";b.hash_tagging=!0,$(c.currentTarget).siblings().append(i),b.search_for="TAGS"}else if(h&&"@"==e){var i="<b>"+e+"</b>";b.hash_tagging=!0,$(c.currentTarget).siblings().append(i),b.search_for="[AUTHORS, READERS]"}else" "==e?(b.hash_tagging=!1,$(c.currentTarget).siblings().append(e),b.search_for=null):b.hash_tagging?$(c.currentTarget).siblings().find("b:last").append(e):$(c.currentTarget).siblings().append(e);b.search_for&&(string_to_be_searched=g.slice(1,g.length)+""+e,a.search(string_to_be_searched.trim(),b.search_for,3).then(function(a){b.hash_tags=a.results})),c.stopPropagation()},_init()}],templateUrl:"/assets/angular/widgets/base/book/interact_widget.html"}}]),websiteApp.directive("rate",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",scope:{rate_object:"=data"},controller:["$scope",function(d){d.show_if_rated=function(a){d.temp_rating=d.rate_object.user_rating,d.rate_object.user_rating=parseInt(a)+1,d.ready_to_rate=!0},d.reset_rating=function(){d.ready_to_rate=!1,d.rate_object.user_rating=d.temp_rating},d.mark_as_rated=function(e,f){d.rate_object.rated=!0,d.rate_object.user_rating=parseInt(e)+1,d.temp_rating=parseInt(e)+1;var g=notify(a,"SUCCESS-Thanks, This will help us to recommend you better books.",b);d.$on("destroy",function(){b.cancel(g)}),c.rate_this_book(d.rate_object.id,d.rate_object.user_rating),f.stopPropagation()},d.is_active=function(a){var b=!1;if(d.rate_object){var c=parseInt(a)+1;c<=d.rate_object.user_rating&&(b=!0)}return b}}],templateUrl:"/assets/angular/widgets/base/book/rate.html"}}]),websiteApp.directive("focusedBook",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.stop_propagation=function(a){a.stopPropagation()},d.close_focused_tooltip=function(){a.focused_book=null},d.own_this_book=function(){if(d.have_this_book){d.have_this_book=!1;var e="SUCCESS-Are you sure, you don't have a copy of "+d.focused_book.title+"? <br/>Your friends might be looking for this book."}else{d.have_this_book=!0;var e="SUCCESS-Thanks, Your friends will now know that you own a copy of "+d.focused_book.title}var f=d.focused_book.id,g=notify(a,e,b);c.own_this_book(f,d.have_this_book),d.$on("destroy",function(){b.cancel(g)})},d.record_read_time=function(e){d.focused_book.read_timer=e;{var f="SUCCESS-Thanks we have recorded your approximate time to read "+d.focused_book.title+". <br/> This will help us to recommend you books according to your reading skills.";notify(a,f,b)}c.record_time(d.focused_book.id,e),d.$on("destroy",function(){b.cancel("timeout_event")})},d.is_timer=function(a){var b=!1;return d.focused_book.read_timer==a&&(b=!0),b},d.close_interaction_box=function(){a.focused_book.interact=!1,d.hash_tags=[]},d.stop_horizontal_scroll=function(a){a.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/focused_book.html"}}]),websiteApp.directive("interactionBox",["$rootScope","$timeout","widgetService",function(){return{restrict:"E",controller:["$scope",function(a){a.stop_propagation=function(a){a.stopPropagation()},_init()}],templateUrl:"assets/angular/widgets/base/book/interaction_box.html"}}]),websiteApp.directive("bookTags",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/widgets/base/book/book_tags.html"}}]),websiteApp.directive("recommend",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",scope:{recommend_object:"=data"},controller:["$scope",function(d){d.select_thumb=function(a){var b="true"==a.currentTarget.dataset.selected;b?(a.currentTarget.dataset.selected=!1,a.currentTarget.style.border="2px solid transparent"):(a.currentTarget.dataset.selected=!0,a.currentTarget.style.border="2px solid")},d.recommend=function(){var e=d.recommend_object.title,f=d.recommend_object.author_name;if(d.recommend_object.recommended){d.recommend_object.recommended=!1;var g="SUCCESS-"+e+" by "+f+" has been recommended to selected friends.",h=notify(a,g,b);d.$on("destroy",function(){b.cancel(h)}),c.recommend("BOOK",d.recommend_object.id,d.recommend_object.recommended)}else d.recommend_object.recommended=!0},(_init=function(){d.user={},d.user.friends=a.user.friends})()}],templateUrl:"/assets/angular/widgets/base/book/recommend.html"}}]),websiteApp.directive("markAsRead",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.markAsRead=function(e){var f=d.book.title,g=d.book.author_name;if(d.book.status){d.book.status=0,d.$emit("removeFromShelf","BOOK",d.book);var h="ADVISE-Book "+f+" by "+g+" has been removed from your Read Shelf.<br/> You can mark as read again."}else{d.book.status=1,d.$emit("addToShelf","BOOK",d.book),a.$broadcast("glowShelf");var h="ADVISE-Book "+f+" by "+g+" has been added to your Read Shelf.<br/> Also please rate this book.";d.$on("destroy",function(){b.cancel(i),b.cancel(glow_event)})}var i=notify(a,h,b);c.mark_as_read(d.book.id,d.read),e.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/mark_as_read.html"}}]);var global_display_timer=0;