!function(){"use strict";var a={},b=100,c=0,d=!1,e=null,f=null,g=function(a){return Object.freeze?Object.freeze(a):a},h=function(){return window.location.href.split("#")},i=function(){e||(e=setInterval(function(){c>0&&f!=window.location.href&&(f=window.location.href,window.Hash.check())},b))};window.Hash=g({pushState:function(a){return window.history&&window.history.pushState&&(d=a),this},fragment:function(){var a=h();return d?window.location.pathname+(a[1]?"#"+a[1]:""):a[1]||""},get:function(a,b){var c,e=[];for(c in b)Object.prototype.hasOwnProperty(c)&&e.push(encodeURIComponent(c)+"="+encodeURIComponent(b[c]));return e.length>0&&(e="?"+e.join("&")),d?a+e:h()[0]+"#"+a+e},go:function(a,b){if(this.fragment()!=a){var c=this.get(a,b);d?window.history.pushState(null,document.title,c):window.location.href=c}return this},update:function(){return f=window.location.href,this},on:function(b,d,e){return a[b]||(a[b]={title:e,listeners:[]}),a[b].listeners.push(d),c++,i(),this},check:function(){var b,c,d,e=this.fragment();for(c in a)if(Object.prototype.hasOwnProperty.call(a,c))if(a[c].regexp=a[c].regexp||new RegExp(c),d=a[c].regexp.exec(e))for(a[c].title&&(document.title=a[c].title),b=0;b<a[c].listeners.length;b++)a[c].listeners[b].yep&&a[c].listeners[b].yep(e,d);else for(b=0;b<a[c].listeners.length;b++)a[c].listeners[b].nop&&a[c].listeners[b].nop(e);return this}})}();