homeApp.controller("customiseController",["$scope","$rootScope","$timeout","userService",function(a,b,c,d){a.close_edit_profile=function(c){b.user.compressed_info=!0,a.popular_books=[],c.stopPropagation()},a.stop_propagation=function(a){a.stopPropagation()},a.goto_info_card=function(a){angular.isDefined(a)&&(b.user.profile_status=a),b.user.compressed_info=!1},a.stop_horizontal_scroll=function(a){a.stopPropagation()},a.user_profile_changed=function(a){var b={profile:a.name};d.save_user_info(b)},a.add_book=function(){},a.add_author=function(){},a.set_location=function(){if(b.user.latitude){var a={latitude:b.user.latitude,longitude:b.user.longitude};d.save_user_info(a)}},a.next=function(){var b=function(a){var b=0,c=3,d=!1;return angular.forEach(a,function(a){a.status&&(b+=1)}),b>=c&&(d=!0),d},c=function(){b(a.info.genres)};angular.isDefined(a.data.selectedIndex)?2==a.data.selectedIndex?window.location.href="/profile":(0==a.data.selectedIndex||(1==a.data.selectedIndex?c():2==a.data.selectedIndex),a.data.selectedIndex=a.data.selectedIndex+1):a.data.selectedIndex=0},a.previous=function(){angular.isDefined(a.data.selectedIndex)?0==a.data.selectedIndex?a.data.selectedIndex=2:a.data.selectedIndex=a.data.selectedIndex-1:a.data.selectedIndex=0};(function(){a.info.loading=!1,d.get_user_details().then(function(a){b.user=a}),a.info.my_profile=!0})()}]);