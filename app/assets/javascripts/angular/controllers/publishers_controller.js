homeApp.controller('publishersController', ["$scope", '$rootScope', "publishersService", "$location", function($scope, $rootScope, publishersService, $location){

	var _get_books = function(id){
		publishersService.get_books(id).then(function(data){
			$scope.publisher_books = data;
		});
	}
	
	var _init = (function(){
		var regex = /[?&]([^=#]+)=([^&#]*)/g;
        var url_parsed = regex.exec($location.absUrl());

        if(url_parsed != null){
            var id = url_parsed[2];
            $scope.info.loading = true;
			publishersService.get_info(id).then(function(data){
				$scope.publisher = data;
				$scope.info.loading = false;
			});
			_get_books(id);
		}
	}());
}]);