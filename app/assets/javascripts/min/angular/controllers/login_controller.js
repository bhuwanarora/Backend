websiteApp.controller("loginController",["$scope","$rootScope","websiteService","Facebook","stropheService",function(a,b,c,d,e){a.authenticate=function(d){var f=b.user.email,g=b.user.password,h=new RegExp("^.{8,}$"),i=new RegExp("^(.)\\1{7,16}$"),j=new RegExp("^.{100,}$");a.error_message="";var k={email:f,password:g,old_user:d};a.loading_icon=!1;var l=function(c){a.error_message=c.message,b.user.profile_status=c.profile_status,b.user.logged=!0,b.user.id=c.user_id,a.loading_icon=!1,a.$emit("getNotifications")},m=function(c){a.loading_icon=!1,a.error_message=c.data.message,b.user.password=null};b.user.email?b.user.password?h.test(b.user.password)||d?i.test(b.user.password)&&!d?a.error_message="Choose a more secure password":j.test(b.user.password)&&!d?a.error_message="Maximum password length is 100":(a.loading_icon=!0,c.authenticate(k).then(l,m),e.start_connection()):a.error_message="Minimum password length is 8":a.error_message="Enter your password":a.error_message="Enter your email address"},_bind_auth_listeners=function(){a.$on("event:google-plus-signin-success",function(){}),a.$on("event:google-plus-signin-failure",function(){}),a.$on("Facebook:statusChange",function(b,c){"connected"==c.status&&a.$apply(function(){})}),a.$watch(function(){return d.isReady()},function(b){b&&(a.facebookReady=!0)})},a.intent_login=function(){d.getLoginStatus(function(c){"connected"==c.status?(b.logged=!0,a.me()):a.login()})},a.login=function(){d.login(function(c){"connected"==c.status&&(b.logged=!0,a.me())})},a.me=function(){d.api("/me",function(c){a.$apply(function(){b.user=c,b.user.profile_status=0,b.user.thumb="https://scontent-b-kul.xx.fbcdn.net/hphotos-ash3/t1.0-9/66784_415130785223231_1615890777_n.jpg",b.user.logged=!0})})},a.logout=function(){d.logout(function(){a.$apply(function(){b.user={},b.logged=!1})})},(_init=function(){_bind_auth_listeners(),a.authenticate(!0)})()}]);