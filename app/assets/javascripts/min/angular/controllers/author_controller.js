homeApp.controller("authorController",["$scope","$location","$mdSidenav","authorService","$mdDialog","scroller","ColorConstants","$filter","$sce","$rootScope","scroller",function(a,b,c,d,e,f,g,h,i,j,f){a.show_buy_dialog=function(a,b){j.active_book=b,e.show({templateUrl:"assets/angular/html/author/buy.html",targetEvent:a}),a.stopPropagation()},a.next_block=function(b){var c=a.author.books.length;b==c-1&&(b=-1),b+=1,a.scroll_to_element(b)},a.scroll_to_element=function(b){var c=0,d=2e3,e=a.author.books[b].id,g=angular.element(document.getElementById(e));f.scrollToElement(g,c,d)},a.previous_block=function(b){var c=a.author.books.length;0==b&&(b=c),b-=1,a.scroll_to_element(b)},a.scroll_wiki=function(){},a.toggle_wiki=function(){a.show_author_wiki=!a.show_author_wiki},a.show_authors_nav=function(a){c("authors_detail_sidenav").toggle(),a.stopPropagation()};!function(){var c=/[?&]([^=#]+)=([^&#]*)/g,e=c.exec(b.absUrl())[2],f=function(b){a.author.wiki_url=b.substring(b.lastIndexOf("?q=")+3,b.lastIndexOf("&sa"))};a.active_index=0,a.info.loading=!0,d.get_details(e).then(function(b){a.author=b,null!=b.wiki_url&&(f(b.wiki_url),a.author.wiki_url=i.trustAsResourceUrl(a.author.wiki_url+"?action=render")),angular.forEach(a.author.books,function(b,c){var d=Math.floor(Math.random()*g.value.length),e=h("large_thumb")(b),f=g.value[d];if(""!=e)var i={color:f,custom_style:{"background-image":"url('"+e+"')"}};else var i={color:f,custom_style:{"background-color":f}};a.author.books[c]=angular.extend(a.author.books[c],i)}),a.custom_color={"background-color":a.author.books[0].color},a.info.loading=!1})}()}]);