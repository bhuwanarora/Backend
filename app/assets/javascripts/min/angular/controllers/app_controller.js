homeApp.controller("appController",["$scope","$rootScope","$mdSidenav","$mdBottomSheet","$mdDialog","shelfService","userService","$cookieStore","$timeout","$location",function(a,b,c,d,e,f,g,h,i,j){a.stop_propagation=function(a){a.stopPropagation()},a.show_signin_options=function(a){c("signup").toggle(),a.stopPropagation()},a.show_search_bar=function(){a.info.mobile_search=!a.info.mobile_search},a.show_rating=function(a){e.show({templateUrl:"assets/angular/html/shared/share.html",targetEvent:a}),a.stopPropagation()},a.toggle_notifications=function(b){a.show_notifications=!a.show_notifications,a.navigation_options=!1,b.stopPropagation()},a.close_popups=function(){a.show_notifications=!1,b.shelves_visible=!1,a.navigation_options=!1},a.toggleLeft=function(b){a.info.hide_signin?(c("left").toggle(),b.stopPropagation()):a.show_signin_options(b)},a.toggleRight=function(a){c("right").toggle(),a.stopPropagation()},a.show_share_bottom_sheet=function(a){d.show({templateUrl:"assets/angular/html/shared/social_bottom_sheet.html",controller:"shelfController",targetEvent:a})},a.stop_propagation=function(a){a.stopPropagation()},a.toggle_navigation_options=function(b){a.navigation_options=!a.navigation_options,a.show_notifications=!1,b.stopPropagation()};(function(){a.visible_search_bar=!0,a.info={},a.info.show_share=!1;var b=j.absUrl(),c=b.indexOf("communities")>0,d=b.indexOf("personalised_suggestions")>0,e=b.indexOf("infinity")>0;c?a.active_page=1:d?a.active_page=0:e?a.active_page=2:a.active_page=-1,a.random_set=-1,a.data={selectedIndex:0};a.search_results=[],""!=getCookie("logged")&&(a.info.hide_signin=!0)})()}]);