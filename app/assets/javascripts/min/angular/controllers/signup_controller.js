app.controller("signupController",["$scope","$rootScope","Facebook","$timeout","$cookieStore","LoginConstants","WebsiteUIConstants","$location","$routeParams","websiteService",function(a,b,c,d,e,f,g,h,i,j){a.processAuth=function(b){b.access_token?a.signedIn=!0:"immediate_failed"==b.error&&(gapi.auth.authorize({client_id:"917672049716-pl6i0qbuen1so84tg2b5vijg7qfjhash.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/plus.login email",immediate:!0},function(a){a.status.signed_in}),a.signedIn=!1)},a.signInCallback=function(b){a.$apply(function(){a.processAuth(b)})},a.renderSignInButton=function(){gapi.signin.render("signInButton",{callback:a.signInCallback,clientid:"917672049716-pl6i0qbuen1so84tg2b5vijg7qfjhash.apps.googleusercontent.com",scope:"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",cookiepolicy:"single_host_origin"})},a.submit=function(b){var c=b.keyCode==g.Enter;c&&a.authenticate(!0),b.stopPropagation()},a.recover_password=function(){var c=function(c){a.loading_icon=!1,a.user.error_message=c.message,b.user.password=null},d=function(c){a.$apply(function(){a.loading_icon=!1,a.user.error_message=c.message,b.user.password=null})};b.user.email?(a.loading_icon=!0,j.recover_password("email="+b.user.email).then(c,d)):a.user.error_message=f.EmailNotPresent},a.authenticate=function(c){a.show_sign_up=c?!1:!0;var d=b.user.email,g=b.user.password,h=new RegExp("^.{8,}$"),i=new RegExp("^(.)\\1{7,16}$"),l=new RegExp("^.{100,}$"),m={email:d,password:g,old_user:c},n=function(c){b.user=c.user,e.put("user",c.user),a._init_user(),k()},o=function(c){a.loading_icon=!1,a.user.error_message=c.data.message,b.user.password=null};b.user.email?b.user.password?h.test(b.user.password)||c?i.test(b.user.password)&&!c?a.user.error_message=f.ChooseAMoreSecurePassword:l.test(b.user.password)&&!c?a.user.error_message=f.MaximumPasswordLengthError:(a.loading_icon=!0,j.authenticate(m).then(n,o)):a.user.error_message=f.PasswordLengthError:a.user.error_message=f.PasswordNotPresent:a.user.error_message=f.EmailNotPresent},_bind_auth_listeners=function(){a.$on("event:google-plus-signin-success",function(b,c){j.handle_google_user(c),a._init_user()}),a.$on("event:google-plus-signin-failure",function(a,b){}),a.$on("Facebook:statusChange",function(b,c){c.status==f.FacebookLoginStatusCheck&&a.$apply(function(){})})},a.intent_login=function(){a.loading_icon=!0,b.user.fb_connect?(b.logged=!0,a.me()):a.login()},a.login=function(){c.login(function(b){b.status==f.FacebookLoginStatusCheck&&a.me()},{scope:"email"})},a.me=function(){c.api("/me",function(d){j.handle_facebook_user(d).then(function(){a._init_user(),k()}),b.user=d,c.api("me/picture?redirect=false&type=large",function(a){j.save_user_info(a)})})};var k=function(){var a=getCookie("redirect_url");window.location.href=a&&null!=a?a:"/home"};a._init_user=function(){b.user.logged=!0,setCookie("logged",!0,31)},a._is_logged_in=function(){var a=function(){j.get_personal_notifications().then(function(a){b.user.push_notifications=[],angular.forEach(a,function(a){var b=angular.extend({id:a[1]},a[0].data);this.push(b)},b.user.push_notifications)})};j.get_user().then(function(c){c.logged_in&&(b.user.logged=!0,b.user.id=c.id,j.get_user_details().then(function(a){angular.extend(b.user,a)}),setCookie("logged",!0,31),a())})},a._redirect=function(){angular.isDefined(i.url)&&h.path("/user/"+b.user.id+i.url)};!function(){_bind_auth_listeners(),b.user={books:{bookmarked:[],read:[]},authors:{bookmarked:[],follow:[]},readers:{follow:[]},logged:!1},b.user.fb_connect=!1,c.getLoginStatus(function(a){a.status===f.FacebookLoginStatusCheck&&(b.user.fb_connect=!0)});var e=0,g=500,h=function(b){a.description=[],a.description.splice(0,0,f.Description[b])};angular.forEach(f.Description,function(){0==e?(h(e),e+=1):d(function(){h(e),e+=1},g),g+=1500})}()}]);