function setCookie(a,b,c){var d=new Date;d.setTime(d.getTime()+24*c*60*60*1e3);var e="expires="+d.toUTCString();document.cookie=a+"="+b+"; "+e}function getCookie(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1);if(0==e.indexOf(b))return e.substring(b.length,e.length)}return""}var homeApp=angular.module("homeApp",["ngAnimate","ngMaterial","ngMessages","duScroll","ngRoute","monospaced.mousewheel","appConstants","timer","duScroll","filtersApp","angular.filter","d3","angular-parallax","ngSanitize","ngCookies"]);homeApp.config(["$routeProvider",function(a){a.when("/discover",{templateUrl:"assets/angular/views/landing_page/discover.html"}).otherwise({templateUrl:"assets/angular/views/landing_page/main.html"})}]),homeApp.run(["$rootScope","$location","$cookieStore","$cookies","$http",function(a,b){var c=""==getCookie("logged");c&&b.$$absUrl.indexOf("signup")<0&&(setCookie("redirect_url",b.$$absUrl),window.location.href="/signup")}]);