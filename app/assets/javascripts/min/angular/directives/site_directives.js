homeApp.directive("recommend",["$rootScope","userService","sharedService",function(a,b,c){return{restrict:"E",scope:{user:"=",book:"="},controller:["$scope",function(a){a.recommend_friend=function(){var c=a.user.id,d=a.book.id;a.recommending=!0,b.recommend(c,d).then(function(){a.recommending=!1})}}],templateUrl:"/assets/angular/html/shared/recommend.html"}}]),homeApp.directive("bookInfo",["$rootScope","bookService","$mdDialog","sharedService",function(a,b,c,d){return{restrict:"E",scope:{book:"=",info:"="},controller:["$scope",function(c){c.show_book_dialog=function(b,e){d.show_book_dialog(a,c,b,e)};var e=function(){angular.isUndefined(c.book.description)&&(c.book_loading=!0,b.get_basic_book_details(c.book.id).then(function(a){c.book=angular.extend(c.book,a),c.book_loading=!1}))};e()}],templateUrl:"/assets/angular/html/shared/partials/book_info.html"}}]),homeApp.directive("bookmark",["$rootScope","feedService","$timeout","$mdSidenav",function(a,b,c,d){return{restrict:"E",scope:{bookmarkId:"=",bookmarkType:"=",shelves:"=",custom:"=",count:"="},controller:["$scope",function(c){var e=function(){return""==getCookie("logged")||null==getCookie("logged")};c.show_shelves=function(){e()?d("signup").toggle():(a.bookmark_object={id:c.bookmarkId,type:c.bookmarkType},d("right_bookmark").toggle(),angular.isUndefined(c.shelves)&&b.get_bookmarks(c.bookmarkId).then(function(a){c.shelves=a}))}}],templateUrl:"/assets/angular/html/shared/bookmark.html"}}]),homeApp.directive("communityFeed",["$rootScope","userService","$timeout",function(a,b,c){return{restrict:"E",scope:{communityFeed:"="},controller:["$scope",function(a){a.toggle_expand=function(){a.communityFeed.expand=!a.communityFeed.expand};var c=function(){a.communityFeed.expand=!1};a.goto_news_page=function(a,c){b.news_visited(a),deleteCookie("active_community"),angular.isDefined(c)&&setCookie("active_community",c,1),window.location.href="/news?q="+a},c()}],templateUrl:"/assets/angular/html/home/_community_feed.html"}}]),homeApp.directive("setFocus",["$timeout","$parse","$rootScope",function(a,b,c){return{link:function(d,e,f){var g=b(f.setFocus);d.$watch(g,function(b){1==b&&a(function(){c.keyCode&&(e[0].value=String.fromCharCode(c.keyCode)),e[0].focus()})})}}}]),homeApp.directive("rdSticky",["$timeout","$parse","$rootScope","$document",function(a,b,c,d){return{link:function(a,b,c){var e=b[0];e.scrollTop;d.bind("scroll",function(){})}}}]),homeApp.directive("compile",["$compile",function(a){return["scope","element","attrs",function(b,c,d){var e=b.$watch(function(a){return a.$eval(d.compile)},function(d){c.html(d),a(c.contents())(b),e()})}]}]),homeApp.directive("checkScrollBottom",function(){return{restrict:"A",link:function(a,b,c){var d=b[0];b.bind("scroll",function(){var b=1400;d.scrollTop+d.offsetHeight+b>d.scrollHeight&&a.$apply(c.checkScrollBottom)})}}}),homeApp.directive("checkScrollUp",function(){return{restrict:"A",link:function(a,b,c){var d=b[0],e=d.scrollTop;b.bind("scroll",function(){d.scrollTop<=e&&a.$apply(c.checkScrollUp),e=d.scrollTop})}}}),homeApp.directive("checkScrollDown",function(){return{restrict:"A",link:function(a,b,c){var d=b[0],e=d.scrollTop;b.bind("scroll",function(){d.scrollTop>e&&a.$apply(c.checkScrollDown),e=d.scrollTop})}}}),homeApp.directive("focusOut",function(){return function(a,b,c){b.bind("blur",function(){a.$apply(c.focusOut)})}}),homeApp.directive("calendar",["$rootScope",function(a){return{restrict:"E",scope:{saveDate:"&"},controller:["$scope",function(b){b.date_check=function(){var a=b.months.indexOf(b.selectedMonth)+1,c=new Date(b.selectedYear,a,0).getDate();b.days=new Array(c).join().split(",").map(function(a,b){return++b})},b.save_date=function(c,d,e){a.user.selectedDay=e,a.user.selectedMonth=d,a.user.selectedYear=c,b.saveDate()},_init=function(){b.days=new Array(31).join().split(",").map(function(a,b){return++b}),b.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],b.years=[],b.selectedDay=a.user.selectedDay,b.selectedMonth=a.user.selectedMonth,b.selectedYear=a.user.selectedYear;for(var c=(new Date).getFullYear(),d=c;d>1904;d--)b.years.push(d)},_init()}],templateUrl:"/assets/angular/html/shared/calendar.html"}}]);