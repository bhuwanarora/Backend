websiteApp.service('websiteService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	
    this.get_book_details = function(filter){
        return _deferred_request('/api/v0/book?'+filter);
    }

    this.authenticate = function(data){
        return _deferred_post_request('/api/v0/authenticate', data);
    }

    this.update_profile = function(data){
        return _deferred_post_request('/api/v0/profile', data);
    }
    
    this.get_user_details = function(filter){
        //filter user_id=USER_ID
        return _deferred_request('/api/v0/user_details?'+filter);
    }

    this.get_genres = function(){
        return _deferred_request('/api/v0/genres');
    }

    this.get_background_image = function(){
        return _deferred_request('/api/v0/image');
    }

    this.get_notifications = function(data){
        return _deferred_request('/api/v0/notifications?id='+data.id);
    }

    this.search = function(filter, type, count){
        return _deferred_request('/api/v0/search?count='+count+'&q='+filter+'&t='+type);
    }

    this.get_info_data = function(){
        return _deferred_request('/api/v0/info_data');
    }

    this.get_popular_books = function(skip_count){
        return _deferred_request('/api/v0/popular_books?skip_count='+skip_count);   
    }

    _deferred_request = function(url){
        var deferred = $q.defer();
        var success_callback = function(result){
            return deferred.resolve(result.data); 
        }
        var error_callback = function(reason){
            if(reason.status == 500){
                alert("internal server error");
            }
        }
        $http.get(url).then(success_callback, error_callback);
        return deferred.promise;   
    }

    _deferred_post_request = function(url, params){
        var deferred = $q.defer();
        var success_callback = function(result){
            return deferred.resolve(result.data); 
        }
        var error_callback = function(reason){
            if(reason.status == 500){
                alert("internal server error");
            }
            else if(reason.status == 403){
                return deferred.reject(reason);
            }
        }
        $http.post(url, params).then(success_callback, error_callback);
        return deferred.promise;
    }

}]);