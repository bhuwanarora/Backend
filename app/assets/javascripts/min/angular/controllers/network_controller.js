homeApp.controller("networkController",["$scope","$rootScope","networkService","$location","$mdToast","userService",function(a,b,c,d,e,f){a.get_followers=function(){a.selectedIndex=0,a.load_followers()},a.load_followers=function(){if(!a.info.loading){a.info.loading=!0;var b=a.users_list.length;c.get_followers(b).then(function(b){a.users_list=a.users_list.concat(b),a.info.loading=!1})}},a.load_users_followed=function(){if(!a.info.loading){a.info.loading=!0;var b=a.users_list.length;c.get_users_followed(b).then(function(b){a.users_list=a.users_list.concat(b),a.info.loading=!1})}},a.get_users_followed=function(){a.selectedIndex=1,a.load_users_followed()},a.load_users=function(){angular.isUndefined(a.users_list)&&(a.users_list=[]),0==a.follow_state?a.get_followers():1==a.follow_state&&a.get_users_followed()},a.say_thanks=function(){e.show({controller:"toastController",templateUrl:"assets/angular/html/shared/toast/invite_success.html",hideDelay:6e3,position:a.getToastPosition()})},a.getToastPosition=function(){return Object.keys(a.toast_position).filter(function(b){return a.toast_position[b]}).join(" ")},a.facebook_invite=function(){navigator.userAgent.indexOf("Mobi")>-1?FB.ui({method:"send",title:"Hey! Check this awesome book discovery website..",message:"Spread the love for books",link:"http://www.readersdoor.com/"},a.say_thanks()):window.location.replace("https://www.facebook.com/dialog/send?app_id=667868653261167&link=http://www.readersdoor.com&redirect_uri=http://readersdoor.com/network?q=0")};!function(){var c=/[?&]([^=#]+)=([^&#]*)/g,e=c.exec(d.absUrl());if(angular.isDefined(e)&&null!=e){var g=e[2];a.follow_state=g,a.load_users()}a.info.my_profile=!0,angular.isUndefined(b.user)?f.get_user_details().then(function(c){b.user=c,a.profile_user=b.user,a.active_user_id=a.profile_user.id}):(a.profile_user=b.user,a.active_user_id=a.profile_user.id),a.hide_follow=!0,a.toast_position={bottom:!1,top:!0,left:!1,right:!0}}()}]);