homeApp.controller("searchPageController",["$scope","searchService","$location","ColorConstants",function(a,b,c,d){a.show_all_results=function(c,e){if(angular.isUndefined(a.info.loading)||!a.info.loading){var c=c||a.active_q,e=e||a.active_type;a.info.loading=!0,angular.isUndefined(a.all_results)&&(a.all_results=[]);var f={type:e,q:c,skip:a.all_results.length,count:10};b.raw(f).then(function(b){angular.forEach(b,function(a){if(a.labels.indexOf("Book")>=0){var b=Math.floor(Math.random()*d.value.length);a=angular.extend(a,{color:d.value[b]})}this.push(a)},a.all_results),a.info.loading=!1})}},a.reload_results=function(a){switch(a){case"Book":break;case"Author":break;case"Community":break;case"Blog":break;case"Person":break;case"News":}};(function(){var b=function(a){a=a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var b=new RegExp("[\\?&]"+a+"=([^&#]*)"),c=b.exec(location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))};a.search_results=[];var d=/[?&]([^=#]+)=([^&#]*)/g,e=d.exec(c.absUrl()),f=c.$$absUrl.indexOf("search")>=0;if(angular.isDefined(e)&&null!=e&&f){var g=b("q"),h=b("type");a.active_q=g,a.active_type=h,a.show_all_results(),a.display_results_for=g}})()}]);