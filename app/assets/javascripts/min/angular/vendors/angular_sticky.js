!function(a){angular.module(a,[]).directive(a,function(){return{link:function(b,c,d){function e(){if(!j.matches)return void(q=p=!1);var a=getComputedStyle(l),b=q?"top:"+k:"bottom:"+i;n.append(c.replaceWith(n)),n.attr("style","display:"+a.display+";height:"+l.offsetHeight+"px;margin:"+a.margin+";width:"+l.offsetWidth+"px"),c.attr("style","left:"+r.left+"px;margin:0;position:fixed;transition:none;"+b+"px;width:"+a.width)}function f(){void 0===o?c.removeAttr("style"):c.attr("style",o),n.removeAttr("style"),n.replaceWith(c),q=p=!1}function g(){q||p?(r=m.getBoundingClientRect(),p=!isNaN(i)&&r.top>window.innerHeight-i-m.offsetHeight,q=!isNaN(k)&&r.top<k,q||p||f()):(r=l.getBoundingClientRect(),p=!isNaN(i)&&r.top>window.innerHeight-i-l.offsetHeight,q=!isNaN(k)&&r.top<k,(q||p)&&e())}function h(){(q||p)&&f(),g()}var i=parseFloat(d[a+"Bottom"]),j=window.matchMedia(d[a+"Media"]||"all"),k=parseFloat(d[a+"Top"]),l=c[0],m=document.createElement("span"),n=angular.element(m),o=c.attr("style"),p=!1,q=!1,r={};window.addEventListener("scroll",g),window.addEventListener("resize",h),g()}}})}("sticky");