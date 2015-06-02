homeApp.service('searchService', ["$http", "$q", "$rootScope", "WebsiteUIConstants", function($http, $q, $rootScope, WebsiteUIConstants){

    this.raw = function(params){
    	var q = params.q;
        var type = params.type;
        var skip = params.skip;
        var count = params.count;
        params_string = "q="+q;
        if(angular.isDefined(type)){
            params_string = params_string + "&type=" + type;
        }
        if(skip){
            params_string = params_string + "&skip=" + skip;
        }
        if(count){
            params_string = params_string + "&count=" + count;
        }
    	return _deferred_request("http://readersdoor.com/api/v0/search?" + params_string, $q, $http);
    }

    this.raw_detailed = function(q, type){
    	if(angular.isDefined(type)){
    		return _deferred_request('http://readersdoor.com/api/v0/search_detailed?q='+q+'&type='+type, $q, $http);
    	}
    	else{
    		return _deferred_request('http://readersdoor.com/api/v0/search_detailed?q='+q, $q, $http);
    	}	
    }

	
}]);