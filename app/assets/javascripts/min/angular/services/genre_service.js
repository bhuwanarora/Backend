homeApp.service("genreService",["$http","$q","$rootScope","WebsiteUIConstants","search_service_url",function(a,b,c,d){this.search_genres=function(c){return _deferred_request("/api/v0/search?q="+c+"&type=Genre",b,a)},this.search_star_genres=function(c){return _deferred_request("/api/v0/search_star_genre?q="+c,b,a)},this.get_genres=function(){return _deferred_request("/api/v0/genres",b,a)}}]);