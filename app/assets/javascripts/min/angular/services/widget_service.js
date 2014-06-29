websiteApp.service("widgetService",["$http","$q","$rootScope",function(a,b){this.populate_tooltips=function(a){return _deferred_request("/api/v0/tooltip?id="+a)},this.mark_as_read=function(a,b){return _deferred_post_request("/api/v0/mar",{book_id:a,data:b})},this.recommend=function(a,b,c){return _deferred_post_request("/api/v0/recommend",{id:b,type:a,data:c})},this.bookmark=function(a,b,c){return _deferred_post_request("/api/v0/bookmark",{id:b,type:a,data:c})},this.comment=function(a,b,c){return _deferred_post_request("/api/v0/comment",{id:a,type:b,data:c})},this.what_do_you_feel=function(a,b,c){return _deferred_post_request("/api/v0/wdyf",{id:a,type:b,data:c})},this.record_time=function(a,b){return _deferred_post_request("/api/v0/time",{id:a,data:b})},this.rate_this_book=function(a,b){return _deferred_post_request("/api/v0/rate",{id:a,data:b})},this.own_this_book=function(a,b){return _deferred_post_request("/api/v0/own",{book_id:a,data:b})},this.like=function(a,b){return _deferred_post_request("/api/v0/like",{id:a,type:b})},this.dislike=function(a,b){return _deferred_post_request("/api/v0/dislike",{id:a,type:b})},this.post_a_review=function(a,b){return _deferred_post_request("/api/v0/post_review",{book_id:id,data:b})},this.follow=function(a,b,c){return _deferred_post_request("/api/v0/follow",{id:a,type:b,data:c})},this.get_moments=function(){return _deferred_request("/api/v0/moments?id=1")},this.get_friends=function(a){return _deferred_request("/api/v0/friends?id="+a)},this.get_labels=function(){return _deferred_request("/api/v0/labels")},this.get_affiliate_links=function(a,b){return _deferred_request("/api/v0/affiliate_links?title="+a+"&author_name="+b)},_deferred_request=function(c){var d=b.defer(),e=function(a){return d.resolve(a.data)},f=function(a){500==a.status&&alert("internal server error")};return a.get(c).then(e,f),d.promise},_deferred_post_request=function(c,d){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert("internal server error")};return a.post(c,d).then(f,g),e.promise}}]);