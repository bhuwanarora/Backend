reduced_titleangular.module("filtersApp",[]).filter("integer",function(){return function(a){var b=a;return angular.isDefined(a)?a>=1e6?b=(a/1e6).toFixed(0)+"m":a>=1e3&&(b=(a/1e3).toFixed(0)+"k"):b=0,b}}).filter("trending_name",function(){return function(a){return angular.isDefined(a)&&(a="#"+a.replace(" ","")),a}}).filter("first_name",function(){return function(a){return angular.isDefined(a)&&(a=a.split(" ")[0]),a}}).filter("reduced_title",function(){return function(a){return angular.isDefined(a)&&null!=a&&a.length>45&&(a=a.slice(0,42)+"..."),a}}).filter("reduced_summary",function(){return function(a){return angular.isDefined(a)&&null!=a&&a.length>85&&(a=a.slice(0,80)+"..."),a}}).filter("compressed_filter",function(){return function(a){return angular.isDefined(a)&&null!=a&&a.length>7&&(a=a.slice(0,7)+".."),a}}).filter("choose_medium_thumb",function(){return function(a){var b="";if(angular.isDefined(a)){var c=angular.isDefined(a.external_thumb)&&null!=a.external_thumb;if(c)b=a.external_thumb;else if(a.isbn){var d=a.isbn.split(",");b="http://covers.openlibrary.org/b/isbn/"+d[0]+"-M.jpg"}}return b}}).filter("summary",function(){return function(a){var b=a;return angular.isDefined(a)&&""!=a&&null!=a&&(b="<span><b>"+a[0]+"</b></span><span class='light_grey_color'>"+a.substring(1,80)+"</span><span>"+a.substring(80,a.length)+"</span>"),b}}).filter("header_title",function(){return function(a){return output=a,(angular.isUndefined(a)||""==a)&&(output="Recommendations"),output}}).filter("heading",function(){return function(a){var b=a;if(angular.isDefined(a)){a.length>40&&(a=a.slice(0,37)+"..."),a=a.split(" "),b="";for(var c=0;c<a.length;c++){var d=a[c];b=b+"<span><b>"+d[0]+"</b><span>"+d.substring(1,d.length)+"</span> "}}return b}}).filter("rating",function(){return function(a){if(angular.isDefined(a))var b=a.toFixed(1);return b}}).filter("book_title",function(){return function(a){return angular.isDefined(a)&&a.length>50&&(a=a.slice(0,47)+"..."),a}}).filter("book_tag",function(){return function(a){return angular.isDefined(a)&&a.length>28&&(a=a.slice(0,25)+"..."),a}}).filter("published_year",function(){return function(a){var b=a.split(" "),a=b[b.length-1];a=parseInt(a);var c=a>658&&1100>a,d=a>1100&&1500>a,e=a>1500&&1660>a,f=a>1660&&1798>a,g=a>1798&&1837>a,h=a>1837&&1901>a,i=a>1901&&1939>a,j=a>1939&&2e3>a,k=a>2e3&&2014>a;return output=c?"Old English Literature":d?"Middle English Literature":e?"English Renaissance":f?"Neo Classical Period":g?"Romanticism":h?"Victorian Literature":i?"Modernism":j?"Post Modern Literature":k?"20th Century Literature":"Invalid"}}).filter("page_count",function(){return function(a){var b="-"+a+" pages";return(angular.isUndefined(a)||0==a)&&(b=""),b}}).filter("message",function(){return function(a){return a.length>55,a}}).filter("reverse",function(){return function(a){var b=a;return angular.isDefined(a)&&(b=a.slice().reverse()),b}}).filter("display_tweet",function(){return function(a){return a&&a.length>100&&(a=a.slice(0,97)+"..."),a}}).filter("thumb",function(){return function(a){if(a){var b=a.split(","),c="http://covers.openlibrary.org/b/isbn/"+b[0]+"-L.jpg";return c}}}).filter("medium_thumb",function(){return function(a){var b="";if(a){var c=a.split(",");return angular.forEach(c,function(a){b="http://covers.openlibrary.org/b/isbn/"+a+"-M.jpg"}),b}}}).filter("small_thumb",function(){return function(a){var b="";if(a){var c=a.split(",");return angular.forEach(c,function(a){var c=new Image;c.src="http://covers.openlibrary.org/b/isbn/"+a+"-S.jpg",c.height>20&&""==b&&(b=c.src)}),b}}}).filter("thumb_backup",function(){return function(a){var b=a;return(angular.isUndefined(a)||""==a||null==a)&&(b="assets/profile_pic.jpeg"),b}}).filter("blob_backup",function(){return function(a){var b=a.thumb;return(angular.isUndefined(b)||""==b||null==b)&&(b=a.thumb_blob,angular.isUndefined(b)&&(b="assets/profile_pic.jpeg")),b}}).filter("is_present",function(){return function(a){var b=!1;return a&&""!=a&&(b=!0),b}});