homeApp.service("searchService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){this.raw=function(c){var d=c.q,e=c.type,f=c.skip,g=c.count;return params_string="q="+d,angular.isDefined(e)&&(params_string=params_string+"&type="+e),f&&(params_string=params_string+"&skip="+f),g&&(params_string=params_string+"&count="+g),_deferred_request("http://readersdoor.com/api/v0/search?"+params_string,b,a)},this.raw_detailed=function(c,d){return angular.isDefined(d)?_deferred_request("http://readersdoor.com/api/v0/search_detailed?q="+c+"&type="+d,b,a):_deferred_request("http://readersdoor.com/api/v0/search_detailed?q="+c,b,a)}}]);