homeApp.directive("guestInterview",["$rootScope","authorService","$timeout",function(a,b,c){return{restrict:"E",scope:{author:"=",info:"="},controller:["$scope",function(a){var c=function(){a.info.loading=!0,b.get_interview_details(a.author.id).then(function(b){a.info.loading=!1,a.data=b})};c()}],templateUrl:"/assets/angular/html/author/guest_interview.html"}}]);