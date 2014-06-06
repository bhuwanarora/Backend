function zoomin_book(a,b,c,d){c.initPage=d,a.zoomin_book=!0;var e=event.currentTarget.offsetParent.offsetLeft+event.currentTarget.offsetWidth,f=event.screenX,g=event.currentTarget.offsetParent.offsetParent.scrollWidth;a.$emit("expandBook",a.book.id,e,f,g);var h=b(function(){a.zoomin_book=!1},3e3);a.$on("destroy",function(){b.cancel(h)})}function add_custom_bookmark(a,b,c){var d=a.book.custom_bookmark;if(d){for(var e=a.book.labels,f=!1,g=0;g<e.length;g++){var h=e[g];if(h.name==d){f=!0;var i="ALERT- Bookmark with the name "+d+" is already added in the list";break}}if(!f){a.book.bookmark_status=1,a.book.labels.push({name:d,checked:!0}),a.book.custom_bookmark="";var i="SUCCESS-Custom Bookmark "+d+" added to book "+a.book.title}var j=notify(b,i,c);a.on("destroy",function(){c.cancel(j)})}}websiteApp.directive("book",["widgetService","$rootScope",function(a,b){return{restrict:"E",scope:{book:"=data"},controller:["$scope",function(a){a.show_focused_tooltip=function(c){if(b.focused_book!=a.book){b.focused_book=a.book;var d=c.currentTarget.offsetParent.offsetParent.offsetLeft-c.pageX+c.clientX,e=screen.width-(d+c.currentTarget.offsetParent.scrollWidth),f=d;e>f?e>400?(d=d+c.currentTarget.offsetParent.scrollWidth-c.currentTarget.offsetLeft,b.focused_book.reposition_tooltip={left:d+"px"}):b.focused_book.reposition_tooltip={right:"0px"}:f>400?(d=screen.width-d,b.focused_book.reposition_tooltip={right:d+"px"}):b.focused_book.reposition_tooltip={left:"0px"}}else b.focused_book=null;c.stopPropagation()},(_init=function(){a.book.id;a.book.labels=b.labels,a.book.show_labels=!1;var c=Math.floor(20*Math.random())+1+"px",d=Math.floor(50*Math.random())+1+"px",e=Math.random()<.5,f=Math.random()<.5;f&&(d="-"+d),e&&(c="-"+c)})()}],templateUrl:"/assets/angular/widgets/base/book/book_widget.html"}}]),websiteApp.directive("labelDropdown",function(){return{restrict:"E",controller:["$scope",function(a){a.stop_propagation=function(a){a.stopPropagation()},a.select_label=function(){for(var b=!1,c=a.book.labels,d=0;d<c.length;d++)if(c[d].checked){b=!0;break}a.book.bookmark_status=b?1:0},a.stop_horizontal_scroll=function(a){a.stopPropagation()}}],templateUrl:"assets/angular/widgets/base/book/label_dropdown.html"}}),websiteApp.directive("bookNavbar",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/widgets/base/book/book_navbar.html"}}]),websiteApp.directive("listDropdown",function(){return{restrict:"E",controller:function(){},templateUrl:"app/assets/javascripts/angular/widgets/base/book/list_dropdown.html"}}),websiteApp.directive("bookBookmark",["$rootScope","$timeout","widgetService",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.toggle_bookmarked=function(d){if(c.book.show_labels){{c.book.bookmark_status,c.book.title,c.book.author_name}c.book.custom_bookmark?add_custom_bookmark(c,a,b):c.book.show_labels=!1}else c.book.show_labels=!0;d.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/bookmark.html"}}]),websiteApp.directive("bookInteract",["websiteService","$rootScope","$timeout",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){_init=function(){d.setStatus()},d.handle_enter=function(a){var e=13==a.keyCode;e&&add_custom_bookmark(d,b,c)},d.setStatus=function(a){d.read=1==a?!0:!1},d.show_bookmark_options=function(a){d.book.show_labels?(d.book.blur_input=!0,d.book.show_labels=!1):(d.book.blur_input=!1,d.book.show_labels=!0),a.stopPropagation()},d.handle_selection=function(a){var b=$(".comment_box").val().split(" "),c=$(".comment_box").siblings().html().split(" "),e=(String.fromCharCode(event.keyCode),b.length);if(1==e)var f=b.slice(0,e-1).join(" ").trim(),g=c.slice(0,e-1).join(" ").trim();else var f=b.slice(0,e-1).join(" ")+" ",g=c.slice(0,e-1).join(" ")+" ";b.pop(),c.pop(),8==event.keyCode,d.hash_tagging;$(".comment_box").siblings().html(g+" <b>"+a+"</b>"),$(".comment_box").val(f+" "+a),d.hash_tags=null},d.set_current=function(){},d.handle_backspace=function(a){var b=$(a.currentTarget).val().split(" "),c=$(a.currentTarget).siblings().html().split(" "),e=(String.fromCharCode(a.keyCode),b.length);if(1==e)var f=b.slice(0,e-1).join(" "),g=c.slice(0,e-1).join(" ");else var f=b.slice(0,e-1).join(" ")+" ",g=c.slice(0,e-1).join(" ")+" ";var h=b.pop(),i=c.pop(),j=8==a.keyCode,k=d.hash_tagging;if(j){if("#"==h)d.hash_tagging=!1,d.hash_tags=[],$(a.currentTarget).siblings().html(g);else if(k)$(a.currentTarget).siblings().html(g),$(a.currentTarget).val(f),d.hash_tagging=!1,d.hash_tags=[],a.preventDefault();else{var l=">"==i[i.length-1];if(l)$(a.currentTarget).siblings().html(g),$(a.currentTarget).val(f),d.hash_tags=[],a.preventDefault();else{var m=$(a.currentTarget).siblings().html();$(a.currentTarget).siblings().html(m.substring(0,m.length-1))}}$(a.currentTarget).val()&&""!=$(a.currentTarget).val()||$(a.currentTarget).siblings().html("")}a.stopPropagation()},d.handle_hash_tags=function(b){{var c=$(b.currentTarget).val().split(" "),e=String.fromCharCode(b.keyCode),f=c.length,g=(c.slice(0,f-1).join(" "),c.pop()),h=""==g;d.hash_tagging}if(h&&"#"==e){var i="<b>"+e+"</b>";d.hash_tagging=!0,$(b.currentTarget).siblings().append(i)}else if(h&&"+"==e){var i="<b>"+e+"</b>";d.hash_tagging=!0,$(b.currentTarget).siblings().append(i),d.search_for="TAGS"}else if(h&&"@"==e){var i="<b>"+e+"</b>";d.hash_tagging=!0,$(b.currentTarget).siblings().append(i),d.search_for="[AUTHORS, READERS]"}else" "==e?(d.hash_tagging=!1,$(b.currentTarget).siblings().append(e),d.search_for=null):d.hash_tagging?$(b.currentTarget).siblings().find("b:last").append(e):$(b.currentTarget).siblings().append(e);d.search_for&&(string_to_be_searched=g.slice(1,g.length)+""+e,a.search(string_to_be_searched.trim(),d.search_for,3).then(function(a){d.hash_tags=a.results})),b.stopPropagation()},_init()}],templateUrl:"/assets/angular/widgets/base/book/interact_widget.html"}}]),websiteApp.directive("rate",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",scope:{rate_object:"=data"},controller:["$scope",function(d){d.show_if_rated=function(a){d.temp_rating=d.rate_object.user_rating,d.rate_object.user_rating=parseInt(a)+1,d.ready_to_rate=!0},d.reset_rating=function(){d.ready_to_rate=!1,d.rate_object.user_rating=d.temp_rating},d.mark_as_rated=function(e,f){d.rate_object.rated=!0,d.rate_object.user_rating=parseInt(e)+1,d.temp_rating=parseInt(e)+1;var g=notify(a,"SUCCESS-Thanks, This will help us to recommend you better books.",b);d.$on("destroy",function(){b.cancel(g)}),c.rate_this_book(d.rate_object.id,d.rate_object.user_rating),f.stopPropagation()},d.is_active=function(a){var b=!1;if(d.rate_object){var c=parseInt(a)+1;c<=d.rate_object.user_rating&&(b=!0)}return b}}],templateUrl:"/assets/angular/widgets/base/book/rate.html"}}]),websiteApp.directive("focusedBook",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.stop_propagation=function(a){a.stopPropagation()},d.close_focused_tooltip=function(){a.focused_book=null},d.own_this_book=function(){if(d.have_this_book){d.have_this_book=!1;var e="SUCCESS-Are you sure, you don't have a copy of "+d.focused_book.title+"? <br/>Your friends might be looking for this book."}else{d.have_this_book=!0;var e="SUCCESS-Thanks, Your friends will now know that you own a copy of "+d.focused_book.title}var f=d.focused_book.id,g=notify(a,e,b);c.own_this_book(f,d.have_this_book),d.$on("destroy",function(){b.cancel(g)})},d.record_read_time=function(e){d.focused_book.read_timer=e;{var f="SUCCESS-Thanks we have recorded your approximate time to read "+d.focused_book.title+". <br/> This will help us to recommend you books according to your reading skills.";notify(a,f,b)}c.record_time(d.focused_book.id,e),d.$on("destroy",function(){b.cancel("timeout_event")})},d.is_timer=function(a){var b=!1;return d.focused_book.read_timer==a&&(b=!0),b},d.close_interaction_box=function(){a.focused_book.interact=!1,d.hash_tags=[]},d.stop_horizontal_scroll=function(a){a.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/focused_book.html"}}]),websiteApp.directive("interactionBox",["$rootScope","$timeout","widgetService",function(){return{restrict:"E",controller:["$scope",function(a){a.stop_propagation=function(a){a.stopPropagation()},_init()}],templateUrl:"assets/angular/widgets/base/book/interaction_box.html"}}]),websiteApp.directive("bookTags",["$rootScope","$timeout",function(a,b){return{restrict:"E",controller:["$scope",function(c){c.show_book=function(d){zoomin_book(c,b,a,d)}}],templateUrl:"/assets/angular/widgets/base/book/book_tags.html"}}]),websiteApp.directive("recommend",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",scope:{recommend_object:"=data"},controller:["$scope",function(d){d.select_thumb=function(a){var b="true"==a.currentTarget.dataset.selected;b?(a.currentTarget.dataset.selected=!1,a.currentTarget.style.border="2px solid transparent"):(a.currentTarget.dataset.selected=!0,a.currentTarget.style.border="2px solid")},d.recommend=function(){var e=d.recommend_object.title,f=d.recommend_object.author_name;if(d.recommend_object.recommended){d.recommend_object.recommended=!1;var g="SUCCESS-"+e+" by "+f+" has been recommended to selected friends.",h=notify(a,g,b);d.$on("destroy",function(){b.cancel(h)}),c.recommend("BOOK",d.recommend_object.id,d.recommend_object.recommended)}else d.recommend_object.recommended=!0},(_init=function(){d.user={},d.user.friends=a.user.friends})()}],templateUrl:"/assets/angular/widgets/base/book/recommend.html"}}]),websiteApp.directive("markAsRead",["$rootScope","$timeout","widgetService",function(a,b,c){return{restrict:"E",controller:["$scope",function(d){d.markAsRead=function(e){d.book.title,d.book.author_name;if(d.book.status){d.book.status=0,d.$emit("removeFromShelf","BOOK",d.book);var f="SUCCESS-Removed from <span class='icon-books'></span> Books Read. "}else{d.book.status=1,d.$emit("addToShelf","BOOK",d.book),a.$broadcast("glowShelf");var f="SUCCESS-Added to <span class='icon-books'></span> Books Read. ";d.$on("destroy",function(){b.cancel(g),b.cancel(glow_event)})}var g=notify(a,f,b);c.mark_as_read(d.book.id,d.read),e.stopPropagation()}}],templateUrl:"/assets/angular/widgets/base/book/mark_as_read.html"}}]);var global_display_timer=0;