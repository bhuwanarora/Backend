websiteApp.directive('book', function (widgetService){
  return {
    restrict: 'E',
    scope: { 'book': '=data' },
    controller: function($scope){
      $scope.hover = function() {
        $scope.hovered = true;
      };

      $scope.mouseout = function() {
      	$scope.hovered = false;
      };

      _init = function(){
        $scope.active_book_filter = true;
        // var book_id = $scope.book.id;
        // widgetService.populate_tooltips(book_id).then(function(data){
        //   $scope.book.title = data.title;
        //   $scope.book.author_name = data.author_name;
        //   $scope.book.users = data.users;
        //   $scope.book.summary = data.summary;
        //   $scope.book.users_count = data.users_count;
        // });
        // var tilt_angle = (Math.floor(Math.random() * 10) + 1)/10+"deg";
        // $scope.book_tilt = {"transform":"rotate("+tilt_angle+")",
        //                   "-ms-transform":"rotate("+tilt_angle+")",
        //                   "-webkit-transform":"rotate("+tilt_angle+")";
      }

      _init();

    },
    templateUrl: "/assets/angular/widgets/base/book/book_widget.html"
  };
});

websiteApp.directive('bookNavbar', function ($rootScope, $timeout) {
  return {
    restrict: 'E',
    controller: function($scope){
      $scope.show_book = function(page){
        zoomin_book($scope, $timeout, $rootScope, page);
      }
    },
    templateUrl: "/assets/angular/widgets/base/book/book_navbar.html"
  };
});

websiteApp.directive('bookBookmark', function ($rootScope, $timeout, widgetService) {
  return {
    restrict: 'E',
    controller: function($scope){
      $scope.toggle_bookmarked = function(){
        var bookmark_status = $scope.book.bookmark_status;
        var book_title = $scope.book.title;
        var author_name = $scope.book.author_name;
        if(bookmark_status == 1){
          $scope.book.bookmark_status = 0;
          var message = "SUCCESS-"+book_title+" by "+author_name+" has been removed from your bookmark shelf.";
          $scope.$emit('removeFromBookmarks', "BOOK", $scope.book);
        }
        else{
          $scope.book.bookmark_status = 1;
          var message = "SUCCESS-"+book_title+" by "+author_name+" has been added to your bookmark shelf.";
          $scope.$emit('addToBookmarks', "BOOK", $scope.book);
          $rootScope.$broadcast('glowBookmark');
        }
        var timeout_event = notify($rootScope, message, $timeout);
        $scope.$on('destroy', function(){
          $timeout.cancel(timeout_event);
        });
        widgetService.bookmark("BOOK", $scope.book.id, $scope.book.bookmark_status);
      }
    },
    templateUrl: "/assets/angular/widgets/base/book/bookmark.html"
  };
});

websiteApp.directive('bookInteract', function (websiteService) {
  return {
    restrict: 'E',
    controller: function($scope){
      _init = function(){
        $scope.setStatus();
        $('.comment_box').contentEditable='true'; 
      }

    	$scope.setStatus = function(status){
    		if(status == 1){
          $scope.read = true;
    		}
    		else{
    			$scope.read = false;
    		}
    		
    	}

      $scope.handle_selection = function(selected_item){
        var string_array = $('.comment_box').val().split(" ");
        var html_array = $('.comment_box').siblings().html().split(" ");
        var chr = String.fromCharCode(event.keyCode);
        var len = string_array.length;
        if(len == 1){
          var old_string = string_array.slice(0, len-1).join(" ").trim();
          var old_html = html_array.slice(0, len-1).join(" ").trim();
        }
        else{
          var old_string = string_array.slice(0, len-1).join(" ")+" ";
          var old_html = html_array.slice(0, len-1).join(" ")+" ";
        }
        var current_element = string_array.pop();
        var current_html = html_array.pop();
        var is_backspace = event.keyCode == 8;
        var hash_tagging = $scope.hash_tagging;
        $('.comment_box').siblings().html(old_html+" <b>"+selected_item+"</b>");
        $('.comment_box').val(old_string+" "+selected_item);
        $scope.hash_tags = null;
      }

      $scope.set_current = function(index){

      }

      $scope.handle_backspace = function(event){
        var string_array = $(event.currentTarget).val().split(" ");
        var html_array = $(event.currentTarget).siblings().html().split(" ");
        var chr = String.fromCharCode(event.keyCode);
        var len = string_array.length;
        if(len == 1){
          var old_string = string_array.slice(0, len-1).join(" ");
          var old_html = html_array.slice(0, len-1).join(" ");  
        }
        else{
          var old_string = string_array.slice(0, len-1).join(" ")+" ";
          var old_html = html_array.slice(0, len-1).join(" ")+" ";
        }
        var current_element = string_array.pop();
        var current_html = html_array.pop();
        var is_backspace = event.keyCode == 8;
        var hash_tagging = $scope.hash_tagging;
        if(is_backspace){
          if(current_element == "#"){
            $scope.hash_tagging = false;
            $scope.hash_tags = [];
            $(event.currentTarget).siblings().html(old_html);
          }
          else{
            if(hash_tagging){
              $(event.currentTarget).siblings().html(old_html);
              $(event.currentTarget).val(old_string);
              $scope.hash_tagging = false;
              $scope.hash_tags = [];
              event.preventDefault();
            }
            else{
              var inside_a_hashtag = current_html[current_html.length - 1] == ">";
              if(inside_a_hashtag){
                $(event.currentTarget).siblings().html(old_html);
                $(event.currentTarget).val(old_string);
                $scope.hash_tags = [];
                event.preventDefault();
              }
              else{
                var html = $(event.currentTarget).siblings().html();
                $(event.currentTarget).siblings().html(html.substring(0, html.length-1));
              }
            }
          }
          if(!$(event.currentTarget).val() || $(event.currentTarget).val() == ""){
            $(event.currentTarget).siblings().html("");
          }
        }
        event.stopPropagation();
      }

      $scope.handle_hash_tags = function(event){
        var string_array = $(event.currentTarget).val().split(" ");
        var chr = String.fromCharCode(event.keyCode);
        var len = string_array.length;
        var old_string = string_array.slice(0, len-1).join(" ");
        var current_element = string_array.pop();
        var is_new_word_initiation = current_element == "";
        var under_a_tag = $scope.hash_tagging;
        
        if(is_new_word_initiation && chr == "#"){
          var html = "<b>"+chr+"</b>";
          $scope.hash_tagging = true;
          $(event.currentTarget).siblings().append(html);
        }
        else if(is_new_word_initiation && chr == "+"){
          var html = "<b>"+chr+"</b>";
          $scope.hash_tagging = true;
          $(event.currentTarget).siblings().append(html);
          $scope.search_for = "TAGS";
        }
        else if(is_new_word_initiation && chr == "@"){
          var html = "<b>"+chr+"</b>";
          $scope.hash_tagging = true;
          $(event.currentTarget).siblings().append(html);
          $scope.search_for = "[AUTHORS, READERS]";
        }
        else{
          if(chr == " "){
            $scope.hash_tagging = false;
            $(event.currentTarget).siblings().append(chr);
            $scope.search_for = null;
          }
          else{
            if($scope.hash_tagging){
              $(event.currentTarget).siblings().find('b:last').append(chr);
            }
            else{
              $(event.currentTarget).siblings().append(chr);
            }
          }
        }
        if($scope.search_for){
          string_to_be_searched = current_element.slice(1, current_element.length)+""+chr;
          websiteService.search(string_to_be_searched.trim(), $scope.search_for, 3).then(function(result) {
            $scope.hash_tags = result.results;
          });
        }
        event.stopPropagation();
      }

      _init();
    },
    templateUrl: "/assets/angular/widgets/base/book/interact_widget.html"
  };
});

websiteApp.directive('interactionBox', function($rootScope, $timeout, widgetService){
  return{
    restrict: 'E',
    controller: function($scope){
      $scope.close_interaction_box = function(){
        $scope.interact = false;
        $scope.hash_tags = [];
      }

      $scope.own_this_book = function(){
        if($scope.have_this_book){
          $scope.have_this_book = false;
        }
        else{
          $scope.have_this_book = true;
        }
        var id = $scope.book.id;
        widgetService.own_this_book(id, $scope.have_this_book);
      }
      
      _init = function(){
      }

      $scope.toggle = function(index){
        $scope.mark_as_rated();
      }

      $scope.mark_as_rated = function(){
        $scope.book.rating = parseInt(event.srcElement.innerText);
        var timeout_event = notify($rootScope, "THANKS-This will help us to recommend you better books.", $timeout);

        $scope.$on('destroy', function(){
          $timeout.cancel(timeout_event)
        });

        widgetService.rate_this_book($scope.book.id, $scope.book.rating);
      }

      $scope.is_active = function(index){
        var rating = parseInt(index) + 1;
        var is_active = false;
        if(rating <= $scope.book.rating){
          is_active = true;
        }
        return is_active;
      }

      $scope.record_read_time = function(read_timer){
        $scope.book.read_timer = read_timer;
        widgetService.record_time($scope.book.id, read_timer);
      }

      $scope.is_timer = function(read_timer){
        var is_timer = false;
        if($scope.book.read_timer == read_timer){
          is_timer = true;
        }
        return is_timer;
      }

      _init();
    },
    templateUrl: "assets/angular/widgets/base/book/interaction_box.html"
  }
});

websiteApp.directive('bookTags', function($rootScope, $timeout) {
  return {
    restrict: 'E',
    controller: function($scope){
      $scope.show_book = function(page){
        zoomin_book($scope, $timeout, $rootScope, page);
      }
    },
    templateUrl: "/assets/angular/widgets/base/book/book_tags.html"
  };
});

websiteApp.directive('recommend', function($rootScope, $timeout, widgetService){
  return{
    restrict: 'E',
    controller: function($scope){
      $scope.recommend = function(){
        var book_title = $scope.book.title;
        var author_name = $scope.book.author_name;
        if($scope.recommended){
          $scope.recommended = false;
          var message = "SUCCESS-"+book_title+" by "+author_name+" will not be recommended to your friends.";
        }
        else{
          $scope.recommended = true;
          var message = "SUCCESS-"+book_title+" by "+author_name+" has been recommended to all your friends.";
        }
        var timeout_event = notify($rootScope, message, $timeout);
        $scope.$on('destroy', function(){
          $timeout.cancel(timeout_event);
        });
        widgetService.recommend("BOOK", $scope.book.id, $scope.recommended);
      }
    },
    templateUrl: "/assets/angular/widgets/base/book/recommend.html"
  }
});

websiteApp.directive('markAsRead', function($rootScope, $timeout, widgetService){
	return {
		restrict: 'E',
		controller: function($scope){
      $scope.markAsRead = function(){
        if($scope.read){
          $scope.read = false;
          $scope.book.status = 0;
          $scope.interact = false;
          $scope.$emit('removeFromShelf', "BOOK", $scope.book);
        }
        else{
          $scope.read = true;
          $scope.book.status = 1;
          $scope.$emit('addToShelf', "BOOK", $scope.book);
          $rootScope.$broadcast('glowShelf');
          var book_title = $scope.book.title;
          var author_name = $scope.book.author_name;
          var message = "ADVISE-Also please rate "+book_title+" by "+author_name+". This will help us to recommend better books."
          var timeout_event = notify($rootScope, message, $timeout);
          $scope.interact = true;

          $scope.$on('destroy', function(){
            $timeout.cancel(timeout_event);
            $timeout.cancel(glow_event);
          });
        }
        widgetService.mark_as_read($scope.book.id, $scope.read);
      }
    },
    templateUrl: "/assets/angular/widgets/base/book/mark_as_read.html"
  }
});

function zoomin_book($scope, $timeout, $rootScope, page){
  $rootScope.initPage = page;
  $scope.zoomin_book = true;
  var posX = event.currentTarget.offsetParent.offsetLeft + event.currentTarget.offsetWidth;
  var screenX = event.screenX;
  var scrollWidth = event.currentTarget.offsetParent.offsetParent.scrollWidth;
  $scope.$emit('expandBook', $scope.book.id, posX, screenX, scrollWidth);
  var zoomout_event = $timeout(function(){
    $scope.zoomin_book = false;
  }, 3000);

  $scope.$on('destroy', function(){
    $timeout.cancel(zoomout_event);
  });
}

var global_display_timer = 0;