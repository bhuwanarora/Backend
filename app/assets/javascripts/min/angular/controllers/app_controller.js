homeApp.controller("appController",["$scope","$rootScope","$mdSidenav","$mdBottomSheet","$mdDialog","shelfService","userService","$cookieStore",function(a,b,c,d,e,f,g,h){a.stop_propagation=function(a){a.stopPropagation()},a.stopPropagation=function(){a.constant.show_book},a.show_search_bar=function(){a.info.mobile_search=!a.info.mobile_search},a.show_rating=function(a){e.show({templateUrl:"assets/angular/html/shared/share.html",targetEvent:a}),a.stopPropagation()},a.toggle_notifications=function(b){a.show_notifications=a.show_notifications?!1:!0,b.stopPropagation()},a.close_popups=function(){a.show_notifications=!1},a.toggleLeft=function(a){c("left").toggle(),a.stopPropagation()},a.toggleRight=function(a){c("right").toggle(),a.stopPropagation()},a.show_share_bottom_sheet=function(a){d.show({templateUrl:"assets/angular/html/shared/social_bottom_sheet.html",controller:"shelfController",targetEvent:a})},a.stop_propagation=function(a){a.stopPropagation()};!function(){a.visible_search_bar=!0,a.info={},a.info.show_share=!1,a.data={selectedIndex:0};var c=function(){angular.isUndefined(h.get("labels"))?f.get_all_shelves().then(function(a){b.labels=a,h.put("labels",a)}):b.labels=h.get("labels")},d=function(){angular.isUndefined(h.get("user"))||null==h.get("user")?g.get_user_details().then(function(a){b.user=a,h.put("user",a)}):b.user=h.get("user")};c(),d()}()}]);