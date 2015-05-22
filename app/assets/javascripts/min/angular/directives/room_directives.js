homeApp.directive("bookShelf",["$rootScope","roomService","ColorConstants","$mdDialog",function(a,b,c,d){return{restrict:"E",scope:{shelf:"=",info:"="},controller:["$scope",function(b){b.toggle=function(){b.show_shelf=!b.show_shelf},b.show_book_dialog=function(c,e){a.active_book=c,a.active_book.show_info_only=!0,d.show({templateUrl:"/assets/angular/html/community/book.html",scope:b,preserveScope:!0,clickOutsideToClose:!0})},b.add_books_to_shelf=function(c,d){a.active_shelf=c,b.info.show_book_share=!0};var c=function(){1==b.shelf.books.length&&null==b.shelf.books[0].title?b.show_shelf=!1:b.shelf.books.length>0?b.show_shelf=!0:b.show_shelf=!1};c()}],templateUrl:"/assets/angular/html/room/partials/book_shelf.html"}}]),homeApp.directive("articleShelf",["$rootScope","roomService","ColorConstants",function(a,b,c){return{restrict:"E",scope:{shelf:"="},controller:["$scope",function(a){a.toggle=function(){a.show_shelf=!a.show_shelf};var b=function(){1==a.shelf.articles.length&&null==a.shelf.articles[0].title?a.show_shelf=!1:a.shelf.articles.length>0?a.show_shelf=!0:a.show_shelf=!1};b()}],templateUrl:"/assets/angular/html/room/partials/article_shelf.html"}}]),homeApp.directive("articles",["$rootScope","roomService","ColorConstants",function(a,b,c){return{restrict:"E",controller:["$scope",function(a){var d=function(){b.get_visited_articles().then(function(b){angular.isUndefined(a.visited_articles)&&(a.visited_articles=[]),e(b,a.visited_articles),a.shelf_loading=!1})},e=function(a,b){return angular.forEach(a,function(a){var b=Math.floor(Math.random()*c.value.length),d=f(70,100),e=f(40,60),g=f(1,10),h={width:d+"%",height:e+"px","background-color":c.value[b],"margin-left":g+"px"},i=angular.extend(a,{random_style:h,color:c.value[b]});this.push(i)},b),b},f=function(a,b){return Math.floor(Math.random()*(b-a+1))+a},g=function(){a.shelf_loading=!0,d()};g()}],templateUrl:"/assets/angular/html/room/show.html"}}]),homeApp.directive("articleShelves",["$rootScope","roomService","ColorConstants",function(a,b,c){return{restrict:"E",controller:["$scope",function(a){var c=function(){b.get_articles_grouped_by_shelves().then(function(b){a.articles_grouped_by_shelves=b,a.shelf_loading=!1})},d=function(){a.shelf_loading=!0,c()};d()}],templateUrl:"/assets/angular/html/room/_right_panel.html"}}]),homeApp.directive("bookShelves",["$rootScope","roomService","ColorConstants",function(a,b,c){return{restrict:"E",controller:["$scope",function(a){var d=function(){b.get_books_grouped_by_shelves().then(function(b){angular.isUndefined(a.book_shelves)&&(a.book_shelves=[]),a.book_shelves=[],angular.forEach(b,function(a){var b=[];a.books=f(a.books,b),this.push(a)},a.book_shelves),g(),a.shelf_loading=!1})},e=function(a,b){return Math.floor(Math.random()*(b-a+1))+a},f=function(a,b){return angular.forEach(a,function(a){var b=Math.floor(Math.random()*c.value.length),d=e(70,100),f=e(40,60),g=e(1,10),h={width:d+"%",height:f+"px","background-color":c.value[b],"margin-left":g+"px"},i=angular.extend(a,{random_style:h,color:c.value[b]});this.push(i)},b),b},g=function(){var b=function(a,b){var c=!1,d=0;return angular.forEach(b,function(b,e){a==b.shelf&&(c=!0,d=e)}),{status:c,index:d}},c=[];angular.forEach(a.book_shelves,function(a){var d=b(a.shelf,c);d.status?c[d.index].books.push(a.books[0]):c.push(a)}),a.book_shelves=c},h=function(){a.shelf_loading=!0,d()};h()}],templateUrl:"/assets/angular/html/room/_left_panel.html"}}]);