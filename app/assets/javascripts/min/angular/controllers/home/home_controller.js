homeApp.controller("homeController",["$scope","$rootScope","userService","$mdBottomSheet","shelfService","$timeout","$location","userService",function(a,b,c,d,e,f,g,c){a.goto_community_page=function(a){c.news_visited(a),window.location.href="/community?q="+a},a.show_shelf_bottom_sheet=function(a,c){b.bookmark_object={type:c,id:a},d.show({templateUrl:"assets/angular/html/shared/shelf_bottom_sheet.html",controller:"shelfController",targetEvent:event}),event.stopPropagation()},a.change_feed=function(){a.feed=[],a.get_community_feed()},a.get_community_feed=function(){if(!a.info.loading){a.info.loading=!0;var b=a.active_region;c.get_feed(b).then(function(b){a.info.loading=!1,angular.forEach(b,function(a){var b={label:"news"};a=angular.extend(a,b),this.push(a)},a.feed)})}},a.get_blog_feed=function(){if(!a.info.loading){a.info.loading=!0,angular.isUndefined(a.feed)&&(a.feed=[]);var b=a.feed.length,d=!0;c.get_blog_feed(b,d).then(function(b){angular.forEach(b,function(a){a.label="blog",this.push(a)},a.feed),a.info.loading=!1})}};!function(){a.feed=[];var b=function(){c.get_last_blog().then(function(b){b[0].label="blog",a.feed.push(b[0])})},d=g.absUrl();a.$on("destroy",function(){f.cancel(i)}),c.get_regions().then(function(b){a.regions=b[0].regions});var e=d.indexOf("communities")>0,h=d.indexOf("blogs")>0;if(e)a.get_community_feed();else if(h)a.get_blog_feed();else{a.get_community_feed();var i=f(function(){b()},6e3);a.$on("destroy",function(){f.cancel(i)})}}()}]);