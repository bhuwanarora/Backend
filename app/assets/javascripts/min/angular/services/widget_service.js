websiteApp.service("widgetService",["$http","$q","$rootScope","WebsiteUIConstants",function(a,b,c,d){var e=function(c){var e=b.defer(),f=function(a){return e.resolve(a.data)},g=function(a){500==a.status&&alert(d.ServerError)};return a.get(c).then(f,g),e.promise},f=function(c,e){var f=b.defer(),g=function(a){return f.resolve(a.data)},h=function(a){500==a.status&&alert(d.ServerError)};return a.post(c,e).then(g,h),f.promise};this.get_book_feed=function(a){return e("/api/v0/book_feed?id="+a)},this.save_genre=function(a){return f("/api/v0/save_genre",a)},this.populate_tooltips=function(a){return e("/api/v0/tooltip?id="+a)},this.mark_as_read=function(a,b){return f("/api/v0/mar",{book_id:a,data:b})},this.recommend=function(a){return f("/api/v0/recommend",a)},this.bookmark=function(a){return f("/api/v0/bookmark",a)},this.comment=function(a){return f("/api/v0/comment",a)},this.what_do_you_feel=function(a,b,c){return f("/api/v0/wdyf",{id:a,type:b,data:c})},this.record_time=function(a,b){return f("/api/v0/time",{id:a,data:b})},this.rate_this_book=function(a){return f("/api/v0/rate",a)},this.own_this_book=function(a,b){return f("/api/v0/own",{book_id:a,data:b})},this.like=function(a,b){return f("/api/v0/like",{id:a,type:b})},this.dislike=function(a,b){return f("/api/v0/dislike",{id:a,type:b})},this.post_a_review=function(a,b){return f("/api/v0/post_review",{book_id:id,data:b})},this.get_moments=function(){return e("/api/v0/moments?id=1")},this.get_friends=function(a,b,c){return e("/api/v0/friends?id="+a+"&count="+b+"&skip="+c)},this.get_labels=function(){return e("/api/v0/labels")},this.get_affiliate_links=function(a){return e("/api/v0/affiliate_links?id="+a)},this.add_thumbnail=function(a){return f("/api/v0/add_thumbnail",a)},this.get_author_details=function(a){return e("/api/v0/author_details?book_id="+a)}}]);