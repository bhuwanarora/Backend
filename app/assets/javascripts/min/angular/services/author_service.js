homeApp.service("authorService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c){this.search_authors=function(c){return _deferred_request("/api/v0/search?q="+c+"&type=Author",b,a)},this.get_popular_authors=function(c){return _deferred_request("/api/v0/popular_authors?skip_count="+c,b,a)},this.get_details=function(c,d){return _deferred_request("/api/v0/author_details?id="+c+"&skip="+d,b,a)},this.follow=function(c,d){return _deferred_request("/api/v0/follow_author?id="+c+"&status="+d,b,a)}}]);