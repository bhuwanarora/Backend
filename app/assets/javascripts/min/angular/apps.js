function notify(a,b,c){var d=b.split("-"),e=d[0];"SUCCESS"==e?(a.message_type=0,a.message_style={"background-color":"#f9edbe"}):"ALERT"==e?(a.message_type=1,a.message_style={"background-color":"#d73d32"}):(a.message_type=2,a.message_style={"background-color":"#427fed"}),a.message=d.slice(1,d.length).join("-"),a.notification_active=!0;var f=c(function(){a.notification_active=!1,a.message=""},7e3);return f}var websiteApp=angular.module("websiteApp",["ngRoute","ngAnimate","monospaced.mousewheel","facebook","directive.g+signin","ngMap","cropme","duScroll","ngDropdowns","sticky","filtersApp","ngCookies","appConstants"]);websiteApp.config(["$routeProvider","$locationProvider",function(a){a.when("/search",{templateUrl:"/assets/angular/widgets/partials/search.html"}).when("/user/:id",{templateUrl:"/assets/angular/widgets/partials/search.html"}).when("/user/:id/recommendations/:type",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/recommendations/:type/filter/:filter_id",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/grid/:type/id/:grid_id/name/:name",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/trending/:type/id/:trend_id/name/:name",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/book/:title/author/:author",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/book/:title/all/:status",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/user/:id/book/:title/author/:author/id/:book_id",{templateUrl:"/assets/angular/widgets/partials/recommendations.html"}).when("/",{templateUrl:"/assets/angular/widgets/partials/search.html"}).otherwise({templateUrl:"/assets/angular/widgets/partials/search.html"})}]),websiteApp.constant("facebookAppId",609609685818282),websiteApp.run(["$rootScope","$location","$cookieStore",function(a,b,c){a.$on("$routeChangeStart",function(d,e){var f=!a.user.logged&&!c.get("logged");f&&("/assets/angular/widgets/partials/search.html"==e.templateUrl||b.path("/search"))})}]),angular.element(document).ready(function(){angular.bootstrap(document,["websiteApp"])}),websiteApp.config(["FacebookProvider","facebookAppId",function(a,b){var c=b;a.init(c)}]);;angular.module("filtersApp",[]).filter("integer",function(){return function(a){var b=a;return angular.isDefined(a)?a>=1e6?b=(a/1e6).toFixed(0)+"m":a>=1e3&&(b=(a/1e3).toFixed(0)+"k"):b=0,b}}).filter("choose_medium_thumb",function(){return function(a){var b=angular.isDefined(a.external_thumb)&&null!=a.external_thumb;if(b)output=a.external_thumb;else if(a.isbn){var c=a.isbn.split(",");output="http://covers.openlibrary.org/b/isbn/"+c[0]+"-M.jpg"}return output}}).filter("summary",function(){return function(a){var b=a;return angular.isDefined(a)&&""!=a&&null!=a&&(b="<span><b>"+a[0]+"</b></span><span>"+a.substring(1,a.length)+"</span>"),b}}).filter("heading",function(){return function(a){var b=a;if(angular.isDefined(a)){a=a.split(" "),b="";for(var c=0;c<a.length;c++){var d=a[c];b=b+"<span><b>"+d[0]+"</b><span>"+d.substring(1,d.length)+"</span> "}}return b}}).filter("rating",function(){return function(a){if(angular.isDefined(a))var b=a.toFixed(1);return b}}).filter("book_title",function(){return function(a){return angular.isDefined(a)&&a.length>55&&(a=a.slice(0,53)+"..."),a}}).filter("published_year",function(){return function(a){var b=a.split(" "),a=b[b.length-1];a=parseInt(a);var c=a>658&&1100>a,d=a>1100&&1500>a,e=a>1500&&1660>a,f=a>1660&&1798>a,g=a>1798&&1837>a,h=a>1837&&1901>a,i=a>1901&&1939>a,j=a>1939&&2e3>a,k=a>2e3&&2014>a;return output=c?"Old English Literature":d?"Middle English Literature":e?"English Renaissance":f?"Neo Classical Period":g?"Romanticism":h?"Victorian Literature":i?"Modernism":j?"Post Modern Literature":k?"20th Century Literature":"Invalid"}}).filter("page_count",function(){return function(a){var b="-"+a+" pages";return(angular.isUndefined(a)||0==a)&&(b=""),b}}).filter("message",function(){return function(a){return a.length>55,a}}).filter("reverse",function(){return function(a){var b=a;return angular.isDefined(a)&&(b=a.slice().reverse()),b}}).filter("display_tweet",function(){return function(a){return a&&a.length>70&&(a=a.slice(0,70)+"..."),a}}).filter("thumb",function(){return function(a){if(a){var b=a.split(","),c="http://covers.openlibrary.org/b/isbn/"+b[0]+"-L.jpg";return c}}}).filter("medium_thumb",function(){return function(a){if(a){var b=a.split(","),c="http://covers.openlibrary.org/b/isbn/"+b[0]+"-M.jpg";return c}}}).filter("small_thumb",function(){return function(a){if(a){var b=a.split(","),c="http://covers.openlibrary.org/b/isbn/"+b[0]+"-S.jpg";return c}}}).filter("is_present",function(){return function(a){var b=!1;return a&&""!=a&&(b=!0),b}});;var appConstants=angular.module("appConstants",[]),constants={LoginConstants:{EmailNotPresent:"Enter your email address",PasswordNotPresent:"Enter your password",PasswordLengthError:"Minimum password length is 8",ChooseAMoreSecurePassword:"Choose a more secure password",MaximumPasswordLengthError:"Maximum password length is 100",FacebookLoginStatusCheck:"connected"},RecommendationUIConstants:{TickerPopupMaxHeight:"62vh",FriendsGridMaxHeight:"250px",NotificationsMinHeight:"110px",BookmarkPanel:"BOOKMARK",BookTab:"BOOK",AuthorTab:"AUTHOR",ReaderTab:"READER",ZeroBooksFound:"ALERT- Reset the filters couldn't find more books."},SearchUIConstants:{BookSearch:"BOOK",BookSearchPlaceholder:"Search Books...",SearchingBooks:"Searching Books...",AuthorSearch:"AUTHOR",AuthorSearchPlaceholder:"Search Authors...",AuthorPlaceholder:"by author...",SearchingAuthors:"Searching Authors...",ReaderSearch:"READER",ReaderSearchPlaceholder:"Search Readers...",SearchingReaders:"Searching Readers...",Year:"YEAR",YearPlaceholder:"by year...",List:"LIST",ListPlaceholder:"by list...",Country:"COUNTRY",CountryPlaceholder:"by country...",Genre:"GENRE",GenrePlaceholder:"by genre...",Time:"TIME",TimePlaceholder:"by time...",Gender:"GENDER",GenderPlaceholder:"by gender...",MaleGender:"Male",FemaleGender:"Female",DontCareGender:"I don't care",Awards:"AWARDS",AwardsPlaceholder:"by awards...",LevelTwoPlaceHolder:"Select a category",BookSearchLink:"Search a Book",AuthorSearchLink:"Search an Author",ReaderSearchLink:"Search a Reader",SearchPlaceholder:"Search...",BookByYearLink:"Find Books by Era",BookByReadingTimeLink:"Find Books by Reading Time",BookByRegionLink:"Find Books by Author's Region",BookByGenreLink:"Find Books by Genre",BookListsLink:"Get popular lists of Books",BookByAuthorLink:"Get Books by Author",AuthorByYearLink:"Find Authors by Era",AuthorByRegionLink:"Find Authors by Region",AuthorByAwardsLink:"Find Authors by Awards",AuthorsByGenreLink:"Find Authors by Genre",AuthorListsLink:"Get popular lists of Authors",ReaderByRegionLink:"Find Readers by Region",ReaderByTasteLink:"Find Readers by their Taste",ReaderByGenderLink:"Find Readers by Gender",ReaderListsLink:"Get popular lists of Readers",SearchingWebsite:"Searching reader's door...",SearchAll:"ALL",Hash:"#",Plus:"+",AtTheRate:"@",SearchingAuthorsAndReaders:"Searching authors and readers...",SearchingTags:"Searching books categories...",TagSearch:"TAG"},WebsiteUIConstants:{BrowserIncompatible:"Please use latest version of Chrome for now...",Enter:13,BackSpace:8,KeyUp:38,KeyDown:40,KeyLeft:37,KeyRight:39,Delete:46,Escape:27},StatusUIConstants:{EmotionConstants:{icon:"icon-happy",name:"Emotion",value:[{FeelingConstants:{name:"Feeling",icon:"",label:"Feeling",value:[{name:"Nostalgic while reading",icon:"",label:"Nostalgic"},{name:"Enlightened while reading",icon:"",label:"Enlightened"},{name:"Insane while reading",icon:"",label:"Insane"},{name:"Happy while reading",icon:"",label:"Happy"},{name:"Sad while reading",icon:"",label:"Sad"},{name:"Frustrated while reading",icon:"",label:"Frustrated"},{name:"Bored while reading",icon:"",label:"Bored"},{name:"Scared while reading",icon:"",label:"Scared"},{name:"Excited while reading",icon:"",label:"Excited"}]}},{ThinkingConstants:{name:"Thinking",icon:"",label:"Thinking"}},{SmellingConstants:{name:"Smelling pages of",icon:"",label:"Smelling"}},{CountingConstants:{name:"Counting pages of",icon:"",label:"Counting"}},{ReadingConstants:{name:"Reading",icon:"",label:"Reading",value:[{SearchBook:!0},{name:"On Mountains",icon:""},{name:"On Bed",icon:""},{name:"On Train",icon:""},{name:"About Author",icon:"",value:[{SearchAuthor:!0}]}]}}]},OwnershipConstants:{icon:"icon-feed",name:"Shout",value:[{BuyConstants:{name:"Wants to buy",icon:"",value:[{SearchBook:!0}]}},{BorrowConstants:{name:"Wants to borrow",icon:"",value:[{SearchBook:!0}]}},{GiveConstants:{name:"Wants to give",icon:"",value:[{SearchBook:!0}]}}]},QuoteConstants:{icon:"icon-quote-right",name:"Quote"}}};angular.forEach(constants,function(a,b){appConstants.constant(b,a)});