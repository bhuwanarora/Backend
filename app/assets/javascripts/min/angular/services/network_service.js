homeApp.service("networkService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){this.get_followers=function(){return _deferred_request("/api/v0/followers",b,a)},this.get_users_followed=function(){return _deferred_request("/api/v0/users_followed",b,a)}}]);