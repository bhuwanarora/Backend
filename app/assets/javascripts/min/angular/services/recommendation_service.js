websiteApp.service("recommendationService",["$http","$q","$rootScope",function(a,b,c){this.get_recommendations=function(){var a=angular.toJson(c.filters);return _deferred_request("/api/v0/recommendations?count=5&q="+a)},this.push_recommendations=function(){return _deferred_request("/api/v0/push_recommendations")},this.get_filters=function(){return _deferred_request("/api/v0/filters")},this.get_genres=function(a){return _deferred_request("/api/v0/genres?"+a)},this.get_countries=function(a){return _deferred_request("/api/v0/countries?"+a)},this.get_time_groups=function(){return _deferred_request("/api/v0/times")},this.get_read_times=function(){return _deferred_request("/api/v0/read_times")},_deferred_request=function(c){var d=b.defer();return a.get(c).then(function(a){return d.resolve(a.data)}),d.promise}}]);