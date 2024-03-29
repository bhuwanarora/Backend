angular.module('ngDropdowns', []).directive('dropdownSelect', ["$document", function($document) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        dropdownSelect: '=',
        dropdownModel: '=',
        dropdownOnchange: '&'
      },
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
          var body;
          $scope.labelField = $attrs.dropdownItemLabel != null ? $attrs.dropdownItemLabel : 'text';
          this.select = function(selected) {
            if (selected !== $scope.dropdownModel) {
              angular.copy(selected, $scope.dropdownModel);
            }
            $scope.dropdownOnchange({
              selected: selected
            });
          };
          body = $document.find("body");
          body.bind("click", function() {
            $element.removeClass('active');
          });
          $element.bind('click', function(event) {
            event.stopPropagation();
            $element.toggleClass('active');
          });
          $scope.stop_horizontal_scroll = function(event){
          	event.stopPropagation();
          }
        }
      ],
      template: "<div class='wrap-dd-select'>\n    <span class='selected' ng-bind-html='dropdownModel[labelField]'></span>\n    <ul msd-wheel='stop_horizontal_scroll($event)' class='scrollbar dropdown'>\n        <li ng-repeat='item in dropdownSelect'\n            class='dropdown-item'\n            dropdown-select-item='item'\n            dropdown-item-label='labelField'>\n        </li>\n    </ul>\n</div>"
    };
  }
]).directive('dropdownSelectItem', function() {
    return {
      require: '^dropdownSelect',
      replace: true,
      scope: {
        dropdownItemLabel: '=',
        dropdownSelectItem: '='
      },
      link: function(scope, element, attrs, dropdownSelectCtrl) {
        scope.selectItem = function() {
          if (scope.dropdownSelectItem.href) {
            return;
          }
          dropdownSelectCtrl.select(scope.dropdownSelectItem);
        };
      },
      template: "<li ng-class='{divider: dropdownSelectItem.divider}'>\n    <a href='' class='dropdown-item'\n        ng-if='!dropdownSelectItem.divider'\n        ng-href='{{dropdownSelectItem.href}}'\n        ng-click='selectItem()' ng-bind-html='dropdownSelectItem[dropdownItemLabel]'>\n    </a>\n</li>"
    };
  }).directive('dropdownMenu', ["$parse", "$compile", "$document", function($parse, $compile, $document) {
    var template;
    template = "<ul class='dropdown'>\n    <li ng-repeat='item in dropdownMenu'\n        class='dropdown-item'\n        dropdown-item-label='labelField'\n        dropdown-menu-item='item'>\n    </li>\n</ul>";
    return {
      restrict: 'A',
      replace: false,
      scope: {
        dropdownMenu: '=',
        dropdownModel: '=',
        dropdownOnchange: '&'
      },
      controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
          var $template, $wrap, body, tpl;
          $scope.labelField = $attrs.dropdownItemLabel != null ? $attrs.dropdownItemLabel : 'text';
          $template = angular.element(template);
          $template.data('$dropdownMenuController', this);
          tpl = $compile($template)($scope);
          $wrap = angular.element("<div class='wrap-dd-menu'></div>");
          $element.replaceWith($wrap);
          $wrap.append($element);
          $wrap.append(tpl);
          this.select = function(selected) {
            if (selected !== $scope.dropdownModel) {
              angular.copy(selected, $scope.dropdownModel);
            }
            $scope.dropdownOnchange({
              selected: selected
            });
          };
          body = $document.find("body");
          body.bind("click", function() {
            tpl.removeClass('active');
          });
          $element.bind("click", function(event) {
            event.stopPropagation();
            tpl.toggleClass('active');
          });
        }
      ]
    };
  }
]).directive('dropdownMenuItem', function() {
    return {
      require: '^dropdownMenu',
      replace: true,
      scope: {
        dropdownMenuItem: '=',
        dropdownItemLabel: '='
      },
      link: function(scope, element, attrs, dropdownMenuCtrl) {
        scope.selectItem = function() {
          if (scope.dropdownMenuItem.href) {
            return;
          }
          dropdownMenuCtrl.select(scope.dropdownMenuItem);
        };
      },
      template: "<li ng-class='{divider: dropdownMenuItem.divider}'>\n    <a href='' class='dropdown-item'\n        ng-if='!dropdownMenuItem.divider'\n        ng-href='{{dropdownMenuItem.href}}'\n        ng-click='selectItem()'>\n        {{dropdownMenuItem[dropdownItemLabel]}}\n    </a>\n</li>"
    };
  });