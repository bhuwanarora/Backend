homeApp.controller("libraryController",["$scope","$rootScope","$timeout","WebsiteUIConstants","SearchUIConstants","bookService","$routeParams","$location","ColorConstants","$mdToast","infinityService","$mdBottomSheet","$mdSidenav","sharedService","$cookieStore","$mdDialog",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){a.get_popular_books=function(){Object.keys(b.filters).length>0?n.filtered_books(a):n.get_popular_books(a)},a.init_book=function(b){var c=a.info.books[b];f.get_basic_details(c).then(function(c){a.info.books[b]=angular.extend(a.info.books[b],c)})},a.ungroup=function(){a.info.author_filter=!1,a.info.group_by_alphabet=!1,a.info.reading_time_filter=!1,a.info.published_era_filter=!1,a.info.subject_filter=!1},a.group_by_author=function(){a.info.author_filter=!0,a.info.group_by_alphabet=!1,a.info.reading_time_filter=!1,a.info.published_era_filter=!1,a.info.subject_filter=!1},a.group_by_alphabet=function(){a.info.author_filter=!1,a.info.group_by_alphabet=!0,a.info.reading_time_filter=!1,a.info.published_era_filter=!1,a.info.subject_filter=!1},a.group_by_reading_time=function(){a.info.author_filter=!1,a.info.group_by_alphabet=!1,a.info.reading_time_filter=!0,a.info.published_era_filter=!1,a.info.subject_filter=!1},a.group_by_published_era=function(){a.info.author_filter=!1,a.info.group_by_alphabet=!1,a.info.reading_time_filter=!1,a.info.published_era_filter=!0,a.info.subject_filter=!1},a.group_by_subject=function(){a.info.author_filter=!1,a.info.group_by_alphabet=!1,a.info.reading_time_filter=!1,a.info.published_era_filter=!1,a.info.subject_filter=!0},a.select_read_time=function(b){delete a.info.books,a.info.custom_loading=!0},a.select_genre=function(b,c){delete a.info.books,a.info.custom_loading=!0,a.filters.other=angular.extend(a.filters.other,{genre:b.id}),a._get_popular_books()},a.select_author=function(b){delete a.info.books,a.info.custom_loading=!0},a.select_time_group=function(b){delete a.info.books,a.info.custom_loading=!0},a._get_popular_books=function(){n.load_popular_books(a)},a.show_grid=function(b){a.constant.show_book&&(a.grid_style={height:"initial","padding-bottom":"100px"},a.constant={show_book:!1})},a.show_book=function(c,d){a.grid_style={height:"35px","overflow-y":"hidden","padding-bottom":"0px"},a.constant={show_book:!0},b.active_book=d,c.stopPropagation()},a.toggle_infinity_content=function(){o.put("infinity",a.info.infinity),angular.isDefined(a.info.infinity)&&a.info.infinity?a.show_books_for_author():a._get_popular_books()};var q=function(a,b){return angular.forEach(a,function(a){var b=Math.floor(Math.random()*i.value.length),c={colspan:1,color:i.value[b],rowspan:1};a=angular.extend(a,c),this.push(a)},b),b};a.show_unexplored_subject_books=function(){angular.isUndefined(a.books_from_unexplored_subjects)&&(a.info.loading=!0,k.get_books_from_unexplored_subjects().then(function(b){a.books_from_unexplored_subjects=b.books,a.unexplored_subject=b.info,a.info.loading=!1}))},a.goto_user_profile=function(){window.location.href="/profile?id="+a.info.active_tag.id},a.goto_author_profile=function(){window.location.href="/author?id="+a.info.active_tag.id},a.show_books_on_friend_shelves=function(){if(angular.isUndefined(a.friends)||0==a.friends.length)a.info.active_tab="friend_shelves",a.info.loading=!0,k.get_books_on_friends_shelves().then(function(b){angular.forEach(b,function(a){if(null==a.info[0].image_url||""==a.info[0].image_url)var b="http://www.sessionlogs.com/media/icons/defaultIcon.png";else var b=a.info[0].image_url;var c={image_url:b,view_count:100,name:a.info[0].first_name,id:a.info[0].id};a=angular.extend(a,c),a.books=q(a.books,[]),null!=a.name&&this.push(a)},a.friends),a.info.active_tag=a.friends[0],a.info.loading=!1});else{var b=a.friends;a.friends=[],a.info.loading=!0;var d=c(function(){a.info.loading=!1,a.friends=b,a.info.active_tag=a.friends[0]},1e3);a.$on("destroy",function(){c.cancel(d)})}},a.show_book_dialog=function(c,d){b.active_book=c,b.active_book.show_info_only=!0,p.show({templateUrl:"/assets/angular/html/news/book.html",scope:a,preserveScope:!0,clickOutsideToClose:!0,targetEvent:d}),d.stopPropagation()},a.show_books_for_era=function(){angular.isUndefined(a.books_from_favourite_era)&&(a.info.loading=!0,delete a.info.active_tag,k.get_books_from_favourite_era().then(function(b){b=b[0],a.books_from_favourite_era=[],q(b.books,a.books_from_favourite_era),a.likeable_era=b.info,a.info.loading=!1}))},a.show_books_for_category=function(){angular.isUndefined(a.books_from_favourite_category)&&(a.info.loading=!0,delete a.info.active_tag,k.get_books_from_favourite_category().then(function(b){a.books_from_favourite_category=[],q(b.books,a.books_from_favourite_category),a.likeable_category=b.info,a.info.loading=!1}))},a.show_books_for_author=function(){angular.isUndefined(a.books_from_favourite_author)?(a.books_from_favourite_author=[],a.info.active_tab="favourite_author",a.info.loading=!0,k.get_books_from_favourite_author().then(function(b){angular.forEach(b,function(a){var b={image_url:"http://rd-authors.readersdoor.netdna-cdn.com/"+a.id+"/M.png",view_count:100};a=angular.extend(a,b),a.books=q(a.books,[]),this.push(a)},a.books_from_favourite_author),a.info.active_tag=a.books_from_favourite_author[0],a.info.loading=!1})):a.info.active_tag=a.books_from_favourite_author[0]},a.refresh_data=function(b){a.info.active_tag=b},a.show_small_reads=function(){angular.isUndefined(a.small_reads)&&(a.info.loading=!0,a.info.active_tab="small_read",delete a.info.active_tag,k.get_small_reads().then(function(b){a.small_reads=[],q(b,a.small_reads),a.info.loading=!1}))},a.show_right_nav=function(a){m("alphabets_sidenav").toggle(),a.stopPropagation()},a.show_left_nav=function(a){m("sort_by_sidenav").toggle(),a.stopPropagation()},a.show_bottom_filters=function(b){l.show({templateUrl:"/assets/angular/html/library/bottom_sheet_filters.html",targetEvent:b,scope:a,preserveScope:!0,controller:"filtersController"})};(function(){a.$routeParams=g,a.filters={other:{}},a.grid={},a.info.books=[],a.search_tag={},a.active_tab={},a.info.categories=[],a.friends=[],a.active_endorse=!1,a.active_bookmark=!0,a.active_share=!0,o.get("infinity")?(a.info.infinity=!1,a.show_books_for_author()):(a.info.infinity=!0,a._get_popular_books()),a.constant={show_book:!1}})()}]);