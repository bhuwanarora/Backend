homeApp.controller("timelineController",["$scope","$rootScope","bookService","$location","userService","$mdDialog",function(a,b,c,d,e,f){a.write_reading_journey_for=function(){a.info.book=b.active_book,a.info.show_share=!0,a.info.show_book_share=!0,f.hide()},a.get_feed=function(){a.book_loading=!0,a.info.loading=!0,angular.isUndefined(a.book_feed)&&(a.book_feed=[]);var b=a.book_feed.length,d=function(a){var b="";switch(a.label){case"BookmarkNode":b="Added to "+a.node.key;break;case"Listopia":break;case"CommunityNode":break;case"BlogNode":break;case"StatusNode":b=a.node.wrapper_content;break;case"EndorseNode":b="Endorsed this book.";break;case"RatingNode":b="Gave "+a.node.content+" rating on 10."}return b},f=function(){var b=[],c=function(a,b){var c=!1,d=0;return a.length>0&&angular.forEach(a,function(a,e){angular.isDefined(a.user)&&a.user.id==b&&(c=!0,d=e)}),{status:c,index:d}};angular.forEach(a.book_feed,function(a){if(angular.isDefined(a.user)){var d=c(b,a.user.id);d.status?(delete a.user,b[d.index].data.push(a)):(angular.isDefined(a.user)&&(d={user:a.user},delete a.user,a=angular.extend(d,{data:[a]})),this.push(a))}else this.push(a)},b),a.book_feed=b};c.get_feed(a.book_id,b).then(function(b){a.book_feed=b,f(),angular.forEach(a.book_feed,function(a){if(angular.isDefined(a.user))e.get_user_details(a.user.id).then(function(b){a.user=angular.extend(a.user,b),angular.forEach(a.data,function(a){var b=d(a);a=angular.extend(a,{message:b})})});else{var b=d(a),c=angular.extend(a,{message:b});a.data=[c]}}),a.book_loading=!1,a.info.loading=!1})};(function(){var c=/[?&]([^=#]+)=([^&#]*)/g,e=c.exec(d.absUrl());if(null!=e)var f=e[2];if(angular.isDefined(f))var g=f;else var g=b.active_book.book_id;a.book_id=g,a.get_feed()})()}]);