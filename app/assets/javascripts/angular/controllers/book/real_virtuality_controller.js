homeApp.controller('realVirtualityController', ["$scope", "$rootScope", "bookService", "$location", function($scope, $rootScope, bookService, $location){

    var _init = (function(){
        if(angular.isDefined($rootScope.active_book)){
            var book_id = $rootScope.active_book.book_id;
            bookService.get_real_news(book_id).then(function(data){
                if(data != null){
                    $scope.communities = data.communities;
                    $scope.active_community = $scope.communities[0];
                    $scope.active_community.news = data.news;
                }
            });
        }
        else{
            $location.path( "/book/timeline" );
        }

    }());

    $scope.load_news = function(){
        var id = $scope.active_community.id;
        if(angular.isUndefined($scope.active_community.news)){
            $scope.active_community.news = [];
            var skip = 0;
        }
        var skip = $scope.active_community.news.length;
        $scope.book_loading = true;
        $scope.info.loading = true;
        bookService.get_community_news(id, skip).then(function(data){
            $scope.book_loading = false;
            $scope.info.loading = false;
            $scope.active_community.news = $scope.active_community.news.concat(data);
        });
    }
}]);