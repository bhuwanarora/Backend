angular.module("ngDropdowns",[]).directive("dropdownSelect",["$document",function(a){return{restrict:"A",replace:!0,scope:{dropdownSelect:"=",dropdownModel:"=",dropdownOnchange:"&"},controller:["$scope","$element","$attrs",function(b,c,d){var e;b.labelField=null!=d.dropdownItemLabel?d.dropdownItemLabel:"text",this.select=function(a){angular.copy(a,b.dropdownModel),b.dropdownOnchange({selected:a})},e=a.find("body"),e.bind("click",function(){c.removeClass("active")}),c.bind("click",function(a){a.stopPropagation(),c.toggleClass("active")})}],template:"<div class='wrap-dd-select'>\n    <span class='selected'>{{dropdownModel[labelField]}}</span>\n    <ul class='dropdown'>\n        <li ng-repeat='item in dropdownSelect'\n            class='dropdown-item'\n            dropdown-select-item='item'\n            dropdown-item-label='labelField'>\n        </li>\n    </ul>\n</div>"}}]).directive("dropdownSelectItem",[function(){return{require:"^dropdownSelect",replace:!0,scope:{dropdownItemLabel:"=",dropdownSelectItem:"="},link:function(a,b,c,d){a.selectItem=function(){a.dropdownSelectItem.href||d.select(a.dropdownSelectItem)}},template:"<li ng-class='{divider: dropdownSelectItem.divider}'>\n    <a href='' class='dropdown-item'\n        ng-if='!dropdownSelectItem.divider'\n        ng-href='{{dropdownSelectItem.href}}'\n        ng-click='selectItem()'>\n        {{dropdownSelectItem[dropdownItemLabel]}}\n    </a>\n</li>"}}]).directive("dropdownMenu",["$parse","$compile","$document",function(a,b,c){var d;return d="<ul class='dropdown'>\n    <li ng-repeat='item in dropdownMenu'\n        class='dropdown-item'\n        dropdown-item-label='labelField'\n        dropdown-menu-item='item'>\n    </li>\n</ul>",{restrict:"A",replace:!1,scope:{dropdownMenu:"=",dropdownModel:"=",dropdownOnchange:"&"},controller:["$scope","$element","$attrs",function(a,e,f){var g,h,i,j;a.labelField=null!=f.dropdownItemLabel?f.dropdownItemLabel:"text",g=angular.element(d),g.data("$dropdownMenuController",this),j=b(g)(a),h=angular.element("<div class='wrap-dd-menu'></div>"),e.replaceWith(h),h.append(e),h.append(j),this.select=function(b){angular.copy(b,a.dropdownModel),a.dropdownOnchange({selected:b})},i=c.find("body"),i.bind("click",function(){j.removeClass("active")}),e.bind("click",function(a){a.stopPropagation(),j.toggleClass("active")})}]}}]).directive("dropdownMenuItem",[function(){return{require:"^dropdownMenu",replace:!0,scope:{dropdownMenuItem:"=",dropdownItemLabel:"="},link:function(a,b,c,d){a.selectItem=function(){a.dropdownMenuItem.href||d.select(a.dropdownMenuItem)}},template:"<li ng-class='{divider: dropdownMenuItem.divider}'>\n    <a href='' class='dropdown-item'\n        ng-if='!dropdownMenuItem.divider'\n        ng-href='{{dropdownMenuItem.href}}'\n        ng-click='selectItem()'>\n        {{dropdownMenuItem[dropdownItemLabel]}}\n    </a>\n</li>"}}]);