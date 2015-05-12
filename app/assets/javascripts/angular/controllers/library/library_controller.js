homeApp.controller('libraryController', ["$scope", "$rootScope", "$timeout", 'WebsiteUIConstants', 'SearchUIConstants', 'bookService', '$routeParams', '$location', 'ColorConstants', '$mdToast', 'infinityService', '$mdBottomSheet', '$mdSidenav', 'sharedService', '$cookieStore', function($scope, $rootScope, $timeout, WebsiteUIConstants, SearchUIConstants, bookService, $routeParams, $location, ColorConstants, $mdToast, infinityService, $mdBottomSheet, $mdSidenav, sharedService, $cookieStore){

    $scope.get_popular_books = function(){
        if(Object.keys($rootScope.filters).length > 0){
            sharedService.filtered_books($scope);
        }
        else{
            sharedService.get_popular_books($scope);
        }
    }

    $scope.init_book = function(index){
        var book_id = $scope.info.books[index];
        bookService.get_basic_details(book_id).then(function(data){
            $scope.info.books[index] = angular.extend($scope.info.books[index], data);
        });
    }

    $scope.ungroup = function(){
        $scope.info.author_filter = false;
        $scope.info.group_by_alphabet = false;
        $scope.info.reading_time_filter = false;
        $scope.info.published_era_filter = false;
        $scope.info.subject_filter = false;
    }

    $scope.group_by_author = function(){
        $scope.info.author_filter = true;
        $scope.info.group_by_alphabet = false;
        $scope.info.reading_time_filter = false;
        $scope.info.published_era_filter = false;
        $scope.info.subject_filter = false;
    }

    $scope.group_by_alphabet = function(){
        $scope.info.author_filter = false;
        $scope.info.group_by_alphabet = true;
        $scope.info.reading_time_filter = false;
        $scope.info.published_era_filter = false;   
        $scope.info.subject_filter = false;
    }

    $scope.group_by_reading_time = function(){
        $scope.info.author_filter = false;
        $scope.info.group_by_alphabet = false;
        $scope.info.reading_time_filter = true;
        $scope.info.published_era_filter = false;   
        $scope.info.subject_filter = false;
    }

    $scope.group_by_published_era = function(){
        $scope.info.author_filter = false;
        $scope.info.group_by_alphabet = false;
        $scope.info.reading_time_filter = false;
        $scope.info.published_era_filter = true;   
        $scope.info.subject_filter = false;   
    }

    $scope.group_by_subject = function(){
        $scope.info.author_filter = false;
        $scope.info.group_by_alphabet = false;
        $scope.info.reading_time_filter = false;
        $scope.info.published_era_filter = false;
        $scope.info.subject_filter = true;
    }

    $scope.select_read_time = function(event){
        delete $scope.info.books;
        $scope.info.custom_loading = true;   
    }

    $scope.select_genre = function(selected_genre, event){
        delete $scope.info.books;
        $scope.info.custom_loading = true;
        $scope.filters.other  = angular.extend($scope.filters.other, {"genre" : selected_genre.id});
        $scope._get_popular_books();
    }

    $scope.select_author = function(event){
        delete $scope.info.books;
        $scope.info.custom_loading = true;
    }

    $scope.select_time_group = function(event){
        delete $scope.info.books;
        $scope.info.custom_loading = true;
    }

    $scope._get_popular_books = function(){
        sharedService.load_popular_books($scope);
    }

    $scope.show_grid = function(event){
        if($scope.constant.show_book){
            $scope.grid_style = {"height": "initial", "padding-bottom": "100px"};
            $scope.constant = {"show_book": false};
        }
    }

    $scope.show_book = function(event, book){
        $scope.grid_style = {"height": "35px", "overflow-y": "hidden", "padding-bottom": "0px"};
        $scope.constant = {"show_book": true};
        $rootScope.active_book = book;
        event.stopPropagation();
    }

    $scope.toggle_infinity_content = function(){
        $cookieStore.put('infinity', $scope.info.infinity);
        if(angular.isDefined($scope.info.infinity) && $scope.info.infinity){
            $scope.show_small_reads();
        }
        else{
            $scope._get_popular_books();
        }
    }

    var _set_data = function(data, array){
        angular.forEach(data, function(value){
            var random_int = Math.floor(Math.random()*ColorConstants.value.length);
            var json = {"colspan": 1,
                        "color": ColorConstants.value[random_int],
                        "rowspan": 1};
            value = angular.extend(value, json);
            this.push(value);
        }, array);
    }

    $scope.show_unexplored_subject_books = function(){
        if(angular.isUndefined($scope.books_from_unexplored_subjects)){
            $scope.info.loading = true;
            infinityService.get_books_from_unexplored_subjects().then(function(data){
                $scope.books_from_unexplored_subjects = data.books;
                $scope.unexplored_subject = data.info;
                $scope.info.loading = false;
            });
        }
    }

    $scope.show_books_on_friend_shelves = function(){
        if(angular.isUndefined($scope.friends)){
            $scope.info.loading = true;
            infinityService.get_books_on_friends_shelves().then(function(data){
                $scope.friends = data;
                angular.forEach($scope.friends, function(friend){
                    _set_data(friend.books, friend.books);
                });
                $scope.info.loading = false;
            });
        }
    }

    $scope.show_books_for_era = function(){
        if(angular.isUndefined($scope.books_from_favourite_era)){
            $scope.info.loading = true;
            infinityService.get_books_from_favourite_era().then(function(data){
                data = data[0];
                $scope.books_from_favourite_era = [];
                _set_data(data.books, $scope.books_from_favourite_era);
                $scope.likeable_era = data.info;
                $scope.info.loading = false;
            });
        }
    }

    $scope.show_books_for_category = function(){
        if(angular.isUndefined($scope.books_from_favourite_category)){
            $scope.info.loading = true;
            infinityService.get_books_from_favourite_category().then(function(data){
                $scope.books_from_favourite_category = [];
                _set_data(data.books, $scope.books_from_favourite_category);
                $scope.likeable_category = data.info;
                $scope.info.loading = false;
            });
        }
    }

    $scope.show_books_for_author = function(){
        if(angular.isUndefined($scope.books_from_favourite_author)){
            $scope.info.loading = true;
            infinityService.get_books_from_favourite_author().then(function(data){
                data = data[0];
                $scope.books_from_favourite_author = [];
                _set_data(data.books, $scope.books_from_favourite_author);
                delete data.books;
                $scope.likeable_author = data;
                $scope.info.loading = false;
            });
        }
    }

    $scope.show_small_reads = function(){
        if(angular.isUndefined($scope.small_reads)){
            $scope.info.loading = true;
            $scope.info.active_tab = "small_read";
            infinityService.get_small_reads().then(function(data){
                $scope.small_reads = [];
                _set_data(data, $scope.small_reads);
                $scope.info.loading = false;
            });
        }
    }


    var _init = (function(){
        // $scope.info.author_filter = true;
        $scope.$routeParams = $routeParams;
        $scope.filters = {"other": {}};
        $scope.grid = {};

        // var genre = (/genre=(\d+)/.exec($location.absUrl())[1]);
        // var year = (/year=(\d+)/.exec($location.absUrl())[1]);
        // var author = (/author=(\d+)/.exec($location.absUrl())[1]);
        // var duration = (/duration=(\d+)/.exec($location.absUrl())[1]);

        $scope.active_endorse = false;
        $scope.active_bookmark = true;
        $scope.active_share = true;
        if($cookieStore.get('infinity')){
            $scope.info.infinity = false;
            $scope.show_small_reads();
            // $scope._get_personalised_suggestions();
        }
        else{
            $scope.info.infinity = true;
            $scope._get_popular_books();
        }

        $scope.constant = {"show_book": false};
        $scope.info.books = [];
        $scope.search_tag = {};
        $scope.active_tab = {};
        $scope.info.categories = [];
        
        // $scope.info.infinity = true;
    }());

    $scope.show_right_nav = function(event){
        $mdSidenav('alphabets_sidenav').toggle();
        event.stopPropagation();
    }    

    $scope.show_left_nav = function(event){
        $mdSidenav('sort_by_sidenav').toggle();
        event.stopPropagation();
    }    

    $scope.show_bottom_filters = function(event){
        $mdBottomSheet.show({
            templateUrl: '/assets/angular/html/library/bottom_sheet_filters.html',
            targetEvent: event ,
            scope : $scope ,
            preserveScope: true,
            controller: "filtersController" 
        });
    };

}]);