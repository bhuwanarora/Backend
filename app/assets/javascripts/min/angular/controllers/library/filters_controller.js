homeApp.controller("filtersController",["$scope","$rootScope","$timeout","genreService","authorService","WebsiteUIConstants","SearchUIConstants","timeGroupService","readingTimeService","infinityService","ColorConstants","sharedService","$mdBottomSheet",function(a,b,c,d,e,f,g,h,i,j,k,l,m){a._get_genres=function(){(angular.isUndefined(a.info.genres)||0==a.info.genres.length)&&(a.info.genres=[],d.get_genres().then(function(b){angular.forEach(b,function(a){var b=null!=a.status,c=angular.extend(a,{status:b});this.push(c)},a.info.genres)}))},a.close_filters=function(){m.hide()},a._get_authors=function(){a.info.authors=[];var b=0;e.get_popular_authors(b).then(function(b){angular.forEach(b,function(a){this.push(a)},a.info.authors)})},a.reset_filter=function(){delete a.info.selected_genre,delete a.info.selected_author,delete a.info.selected_year,delete a.info.selected_duration,delete a.search_tag.genre,delete a.search_tag.time_group,delete a.search_tag.author,delete a.search_tag.read_time,b.filters={},n()};var n=function(){a.info.infinity=!0,0==Object.keys(b.filters).length?(a.info.books=[],l.get_popular_books(a)):(a.info.books=[],l.filtered_books(a))},o=function(){b.filters.skip_count;delete b.filters.skip_count,delete a.info.other_info,a.info.books=[],Object.keys(b.filters).length>0?n():l.get_popular_books(a)};a.select_genre=function(a){angular.isUndefined(a)?(delete b.filters.category_id,o()):(b.filters.category_id=a.id,n())},a.select_author=function(a){a&&(angular.isUndefined(a)?(delete b.filters.author_id,o()):(b.filters.author_id=a.id,n()))},a.select_reading_time=function(a){angular.isUndefined(a)?(delete b.filters.reading_time_id,o()):(b.filters.reading_time_id=a.id,n())},a.select_publishing_year=function(a){angular.isUndefined(a)?(delete b.filters.era_id,o()):(b.filters.era_id=a.id,n())},a.search_genres=function(b){b?a.info.loading||(a.info.loading=!0,d.search_genres(b).then(function(b){a.info.loading=!1,b.length>0&&(a.info.genres=[],angular.forEach(b,function(a){var b={type:g.Genre,custom_option:!0,icon2:"icon-tag",name:a.category_name,id:a.category_id};this.push(b)},a.info.genres))})):(a.info.loading=!0,(angular.isUndefined(a.info.genres)||0==a.info.genres.length)&&d.get_genres().then(function(b){a.info.genres=[],angular.forEach(b,function(a){var b={name:a.root_category_name,id:a.root_category_id};this.push(b)},a.info.genres),a.info.loading=!1}))},a.search_reading_time=function(){a.info.loading=!0,a.search_tag.read_time=""},a.search_publishing_year=function(){},a.search_authors=function(b){a.info.loading||(a.info.loading=!0,e.search_authors(b).then(function(b){a.info.loading=!1,b.length>0&&(a.info.authors=[],angular.forEach(b,function(a){var b={icon2:"icon-pen",type:g.AuthorSearch,custom_option:!0};b=angular.extend(b,a),this.push(b)},a.info.authors))}))},a._get_time_groups=function(){h.get_time_groups().then(function(b){a.info.time_groups=[],angular.forEach(b,function(a){var b={icon2:"icon-calendar",type:g.Year,custom_option:!0};b=angular.extend(b,a),this.push(b)},a.info.time_groups)})},a._get_reading_times=function(){i.get_read_times().then(function(b){a.info.read_times=[],angular.forEach(b,function(a){var b={icon2:"icon-clock",type:g.Time,custom_option:!0};b=angular.extend(b,a),this.push(b)},a.info.read_times)})},a._detect_key=function(a){var b=a.keyCode==f.Backspace||a.keyCode==f.Delete,c=a.keyCode==f.KeyUp,d=a.keyCode==f.KeyDown,e=a.keyCode==f.KeyLeft,g=a.keyCode==f.KeyRight,h=a.keyCode==f.Enter;return{backspace_or_delete:b,keyUp:c,keyDown:d,keyLeft:e,keyRight:g,keyEnter:h}};(function(){a.search_tag={},a.info.genres=[],a.info.authors=[],a.info.time_groups=[],a.info.read_times=[];var d=c(function(){a._get_time_groups(),a._get_reading_times()},100);c.cancel(d),angular.isUndefined(b.filters)&&(b.filters={})})()}]);