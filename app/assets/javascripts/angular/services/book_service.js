homeApp.service('bookService', ["$http", "$q", "$rootScope", "WebsiteUIConstants", "search_service_url", "price_service_url", function ($http, $q, $rootScope, WebsiteUIConstants, search_service_url, price_service_url){
	
    var _user_id = function(){
        if(angular.isDefined($rootScope.reader)){
            var user_id = $rootScope.reader.id;
        }
        else{
            var user_id = $rootScope.user.id;   
        }
        return user_id;
    }

    this.get_basic_book_details = function(id){
        return _deferred_request('/api/v0/basic_book?id='+id, $q, $http);
    }

    this.handle_facebook_books = function(params){
        return _deferred_post_request('/api/v0/fb_books', params, $q, $http);
    }

    this.get_book_details = function(filter){
        return _deferred_request('/api/v0/book?'+filter, $q, $http);
    }

    this.handle_influential_books = function(id, status){
        return _deferred_request('/api/v0/influential_books?id='+id+"&status="+status, $q, $http);
    }

    this.get_books_bookmarked = function(skip_count){
        return _deferred_request('/api/v0/books_bookmarked?skip_count='+skip_count+'&id='+_user_id(), $q, $http);
    }

    this.get_books_read = function(skip_count){
        return _deferred_request('/api/v0/books_read?skip_count='+skip_count+'&id='+_user_id(), $q, $http);
    }

    this.search_books = function(data, skip_count){
        return _deferred_request('/api/v0/search?q='+data+"&skip="+skip_count+"&type=Book", $q, $http, search_service_url);
    }

    this.get_popular_books = function(params){
        return _deferred_request('/api/v0/popular_books?q='+params, $q, $http);
    }

    this.books_on_signup = function(params){
        return _deferred_request('/api/v0/books_on_signup?q='+params, $q, $http);
    }

    this.endorse_book = function(id, status){
        return _deferred_request('/api/v0/endorse_book?id='+id+'&status='+status, $q, $http);
    }

    this.update_visited = function(id){
        return _deferred_request('/api/v0/update_visited?id='+id, $q, $http);
    }

    this.get_feed = function(id, skip_count){
        return _deferred_request('/api/v0/book_feed?id='+id+"&skip_count="+skip_count, $q, $http);
    }

    this.rate_book = function(id, data){
        return _deferred_request('/api/v0/rate?id='+id+"&data="+data, $q, $http);
    }

    this.get_real_news = function(id){
        return _deferred_request('/api/v0/book_news?id='+id, $q, $http);
    }

    this.get_borrow_users = function(id){
        return _deferred_request('/api/v0/borrow_users?id='+id, $q, $http)
    }

    this.get_interesting_info = function(id){
        return _deferred_request('/api/v0/get_interesting_info?id='+id, $q, $http);
    }

    this.get_top_searches = function(){
        return _deferred_request('/api/v0/top_searches', $q, $http, search_service_url);
    }

    this.get_community_news = function(id, skip){
        return _deferred_request('/api/v0/community_news?id='+id+'&skip='+skip, $q, $http);
    }

    this.get_primary_info = function(id){
        return _deferred_request('/api/v0/book_primary_info?id='+id, $q, $http);
    }

    this.send_borrow_notification = function(id){
        return _deferred_request('/api/v0/notify_borrow?id='+id, $q, $http);
    }

    this.all_prices = function(isbn){
        return _deferred_request('/api/v0/all_prices?isbn='+isbn, $q, $http, price_service_url);
    }

    this.more_prices = function(isbn){
        return _deferred_request('/api/v0/more_prices?isbn='+isbn, $q, $http, price_service_url);
    }

}]);