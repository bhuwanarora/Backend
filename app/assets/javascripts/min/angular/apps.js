function notify(a,b,c){var d=b.split("-"),e=d[0];"SUCCESS"==e?(a.message_type=0,a.message_style={"background-color":"#f9edbe"}):"ALERT"==e?(a.message_type=1,a.message_style={"background-color":"#d73d32"}):(a.message_type=2,a.message_style={"background-color":"#427fed"}),a.message=d.slice(1,d.length).join("-"),a.notification_active=!0;var f=c(function(){a.notification_active=!1,a.message=""},7e3);return f}var websiteApp=angular.module("websiteApp",["ngRoute","ngAnimate","monospaced.mousewheel","facebook","directive.g+signin","ngMap","cropme","duScroll","ngDropdowns","sticky","filtersApp"]);websiteApp.config(["$routeProvider","$locationProvider",function(a){a.when("/search",{templateUrl:"/assets/angular/widgets/partials/search.html"}).when("/user/:id",{templateUrl:"/assets/angular/widgets/partials/search.html"}).when("/user/:id/recommendations/:type",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/recommendations/:type/filter/:filter_id",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/book/:title/author/:author",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/book/:title/all/:status",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/book/:title/author/:author/id/:book_id",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/",{templateUrl:"/assets/angular/widgets/partials/search.html"}).otherwise({templateUrl:"/assets/angular/widgets/partials/search.html"})}]),websiteApp.run(["$rootScope","$location",function(a,b){a.$on("$routeChangeStart",function(c,d){a.user.logged||"/assets/angular/widgets/partials/search.html"==d.templateUrl||b.path("/search")})}]),angular.element(document).ready(function(){angular.bootstrap(document,["websiteApp"])}),websiteApp.config(["FacebookProvider",function(a){var b="609609685818282";a.init(b)}]);;angular.module("filtersApp",[]).filter("integer",function(){return function(a){var b=a;return a>=1e6?b=(a/1e6).toFixed(0)+"m":a>=1e3&&(b=(a/1e3).toFixed(0)+"k"),b}}).filter("rating",function(){return function(a){if(angular.isDefined(a))var b=a.toFixed(1);return b}}).filter("book_title",function(){return function(a){return angular.isDefined(a)&&a.length>55&&(a=a.slice(0,53)+"..."),a}}).filter("published_year",function(){return function(a){var b=a.split(" "),a=b[b.length-1];a=parseInt(a);var c=a>658&&1100>a,d=a>1100&&1500>a,e=a>1500&&1660>a,f=a>1660&&1798>a,g=a>1798&&1837>a,h=a>1837&&1901>a,i=a>1901&&1939>a,j=a>1939&&2e3>a,k=a>2e3&&2014>a;return output=c?"Old English Literature":d?"Middle English Literature":e?"English Renaissance":f?"Neo Classical Period":g?"Romanticism":h?"Victorian Literature":i?"Modernism":j?"Post Modern Literature":k?"20th Century Literature":"Invalid"}}).filter("page_count",function(){return function(a){var b="-"+a+" pages";return b}}).filter("message",function(){return function(a){return a.length>55,a}}).filter("reverse",function(){return function(a){return a.slice().reverse()}}).filter("display_tweet",function(){return function(a){return a&&a.length>55&&(a=a.slice(0,55)+"..."),a}}).filter("thumb",function(){return function(a){if(a){var b=a.split(","),c="http://covers.openlibrary.org/b/isbn/"+b[0]+"-L.jpg";return c}}}).filter("small_thumb",function(){return function(a){if(a){var b=a.split(","),c="http://covers.openlibrary.org/b/isbn/"+b[0]+"-S.jpg";return c}}}).filter("is_present",function(){return function(a){var b=!1;return a&&""!=a&&(b=!0),b}});