websiteApp.directive("category",function(){return{restrict:"E",scope:{widget:"@"},controller:["$scope",function(a){a.initVerticalText=function(){var b="book"==a.widget,c="reader"==a.widget,d="author"==a.widget;if(b)var e=a.$parent.book;else if(c)var e=a.$parent.reader;else if(d)var e=a.$parent.author;if(e){var f=e.category.name;f&&(a.nameArray=f.split("")),a.rating=e.rating}}}],templateUrl:"/assets/angular/widgets/views/unused/category.html"}}),websiteApp.directive("messageApp",["websiteService",function(){return{restrict:"E",controller:["$scope",function(a){a.send_message=function(){}}],templateUrl:"/assets/angular/views/unused/message_app.html"}}]),websiteApp.directive("widgetThumb",["$timeout","$rootScope","$filter","ColorConstants",function(a,b,c,d){return{restrict:"E",controller:["$scope",function(b){b.show_images=function(){if(angular.isDefined(b.book)){var c=b.book;if(angular.isDefined(c.isbn)){var d=_get_thumb(c);angular.isDefined(d)&&(b.thumb_style={background:"url('"+d+"')"})}}else if(angular.isDefined(b.author))var c=b.author;else if(angular.isDefined(b.reader))var c=b.reader;b.$on("destroy",function(){a.cancel(timeout_event)})},_get_obj=function(){if(b.book)var a=b.book;else if(b.author)var a=b.author;else if(b.reader)var a=b.reader;return a},_get_thumb=function(a){var b=angular.isDefined(a.external_thumb)&&null!=a.external_thumb;if(b)var d=a.external_thumb;else var d=c("thumb")(a.isbn);return d},(_init=function(){var a=_get_obj();if(a&&a.isbn){var c=_get_thumb(a);angular.isDefined(c)&&(b.thumb_style={background:"url('"+c+"')"})}var e=d.value[Math.floor(Math.random()*d.value.length)];b.random_background={"background-color":e},b.show_images()})()}],templateUrl:"/assets/angular/views/book_widget/thumb.html"}}]);