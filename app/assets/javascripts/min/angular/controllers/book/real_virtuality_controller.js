homeApp.controller("realVirtualityController",["$scope","$rootScope","bookService",function(a,b,c){a.change_news=function(){};!function(){var d=b.active_book.book_id;c.get_real_news(d).then(function(b){a.communities=b,a.active_community=b[0]})}()}]);