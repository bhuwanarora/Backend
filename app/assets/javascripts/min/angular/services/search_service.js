homeApp.service("searchService",["$http","$q","$rootScope","WebsiteUIConstants","search_service_url",function(a,b,c,d,e){this.raw=function(c){var d=c.q,f=c.type,g=c.skip,h=c.count;return params_string="q="+d,angular.isDefined(f)&&(params_string=params_string+"&type="+f),g&&(params_string=params_string+"&skip="+g),h&&(params_string=params_string+"&count="+h),_deferred_request("/api/v0/search?"+params_string,b,a,e)},this.raw_detailed=function(c,d){return angular.isDefined(d)?_deferred_request("/api/v0/search_detailed?q="+c+"&type="+d,b,a,e):_deferred_request("/api/v0/search_detailed?q="+c,b,a,e)},this.get_top_searches=function(){return _deferred_request("/api/v0/top_searches",b,a,e)},this.get_top_results=function(){return _deferred_request("/api/v0/top_results",b,a,e)}}]);