homeApp.directive("bookInfo",["$rootScope","bookService","$mdDialog",function(a,b,c){return{restrict:"E",scope:{book:"=",info:"="},controller:["$scope",function(d){d.show_book_dialog=function(b,e){a.active_book=b,a.active_book.show_info_only=!0,c.show({templateUrl:"/assets/angular/html/community/book.html",scope:d,preserveScope:!0,targetEvent:e,clickOutsideToClose:!0}),e.stopPropagation()};var e=function(){d.book_loading=!0,b.get_basic_book_details(d.book.id).then(function(a){d.book=angular.extend(d.book,a),d.book_loading=!1})};e()}],templateUrl:"/assets/angular/html/shared/partials/book_info.html"}}]),homeApp.directive("communityInfo",["$rootScope","communityService","ColorConstants","$mdDialog",function(a,b,c,d){return{restrict:"E",scope:{community:"=",info:"="},controller:["$scope",function(e){e.show_book_dialog=function(b,c){a.active_book=b,a.active_book.show_info_only=!0,d.show({templateUrl:"/assets/angular/html/community/book.html",scope:e,preserveScope:!0,clickOutsideToClose:!0,targetEvent:c}),c.stopPropagation()};var f=function(){e.community_loading=!0,b.get_feed_info(e.community.id).then(function(a){e.community=angular.extend(e.community,a),angular.forEach(e.community.books,function(a){var b=Math.floor(Math.random()*c.value.length),d=c.value[b];a.color=d}),e.community_loading=!1})};f()}],templateUrl:"/assets/angular/html/shared/partials/community_info.html"}}]);