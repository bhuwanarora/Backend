websiteApp.controller("buyController",["$scope","$rootScope","$timeout","bookService","$route","$routeParams","$interval",function(a,b,c,d){!function(){var c=b.active_book.id;d.get_borrow_users(c).then(function(b){a.borrow_users=b})}()}]);