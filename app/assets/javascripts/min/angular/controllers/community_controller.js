homeApp.controller("communityController",["$scope","newsService","$rootScope","ColorConstants","$timeout","$location","$mdDialog","userService","$mdSidenav",function(a,b,c,d,e,f,g,h,i){a.get_detailed_community_info=function(){b.get_detailed_community_info(a.active_tag.id).then(function(b){a.active_tag=angular.extend(a.active_tag,b);var c=a.active_tag.follow_node;angular.isDefined(c)&&null!=c&&(a.active_tag.status=!0)})},a.goto_news_page=function(a,b){h.news_visited(a),deleteCookie("active_community"),angular.isDefined(b)&&setCookie("active_community",b,1),window.location.href="/news?q="+a},a.show_book_dialog=function(b,d){c.active_book=b,c.active_book.show_info_only=!0,g.show({templateUrl:"/assets/angular/html/news/book.html",scope:a,preserveScope:!0,clickOutsideToClose:!0,targetEvent:d}),d.stopPropagation()},a.toggle_follow=function(){angular.isDefined(a.active_tag)?(a.active_tag.status=!a.active_tag.status,b.follow(a.active_tag.id,a.active_tag.status)):i("signup").toggle()},a.refresh_data=function(){b.get_community_details(a.active_tag.id).then(function(b){a.active_tag=angular.extend(a.active_tag,b[0].most_important_tag[0]),angular.forEach(a.active_tag.books,function(b){var c=Math.floor(Math.random()*d.value.length),e=d.value[c];b.color=e,a.info.loading=!1})})};(function(){var b=/[?&]([^=#]+)=([^&#]*)/g,c=b.exec(f.absUrl());if(null!=c){a.info.loading=!0;var d=c[2];a.active_tag={id:d},a.get_detailed_community_info(),e(function(){a.refresh_data()},2e3)}else alert("Bad url")})()}]);