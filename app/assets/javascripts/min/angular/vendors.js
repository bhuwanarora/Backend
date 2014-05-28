
//ANIMATE JS
/*
 AngularJS v1.2.13
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(z,f,T){'use strict';f.module("ngAnimate",["ng"]).factory("$$animateReflow",["$window","$timeout","$document",function(f,h,d){var n=f.requestAnimationFrame||f.webkitRequestAnimationFrame||function(d){return h(d,10,!1)},w=f.cancelAnimationFrame||f.webkitCancelAnimationFrame||function(d){return h.cancel(d)};return function(d){var f=n(function(){d()});return function(){w(f)}}}]).factory("$$asyncQueueBuffer",["$timeout",function(f){var h,d=[];return function(n){f.cancel(h);d.push(n);h=f(function(){for(var f=
0;f<d.length;f++)d[f]();d=[]},0,!1)}}]).config(["$provide","$animateProvider",function($,h){function d(d){for(var f=0;f<d.length;f++){var l=d[f];if(l.nodeType==da)return l}}function n(l){return f.element(d(l))}var w=f.noop,D=f.forEach,ia=h.$$selectors,da=1,l="$$ngAnimateState",U="ng-animate",s={running:!0};$.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$$asyncQueueBuffer","$rootScope","$document",function(x,z,ca,F,J,B,T){function V(a){if(a){var c=[],e={};a=a.substr(1).split(".");
(ca.transitions||ca.animations)&&a.push("");for(var A=0;A<a.length;A++){var d=a[A],f=ia[d];f&&!e[d]&&(c.push(z.get(f)),e[d]=!0)}return c}}function t(a,c,e,d,k,C,s){function t(b){var g=e.data(l);b=b||!g||!g.active[c]||m&&g.active[c].event!=a;K();!0===b?G():(g.active[c].done=G,n(L,"after",G))}function n(b,g,ja){"after"==g?H():x();var fa=g+"End";D(b,function(d,f){var A=function(){a:{var a=g+"Complete",c=b[f];c[a]=!0;(c[fa]||w)();for(c=0;c<b.length;c++)if(!b[c][a])break a;ja()}};"before"!=g||"enter"!=
a&&"move"!=a?d[g]?d[fa]=F?d[g](e,E,z,A):m?d[g](e,c,A):d[g](e,A):A():A()})}function h(b){var g="$animate:"+b;u&&(u[g]&&0<u[g].length)&&J(function(){e.triggerHandler(g,{event:a,className:c})})}function x(){h("before")}function H(){h("after")}function B(){h("close");s&&J(function(){s()})}function K(){K.hasBeenRun||(K.hasBeenRun=!0,C())}function G(){if(!G.hasBeenRun){G.hasBeenRun=!0;var b=e.data(l);b&&(m?M(e,c):(J(function(){var b=e.data(l)||{};Q==b.index&&M(e,c,a)}),e.data(l,b)));B()}}var E,z,F="setClass"==
a;F&&(E=c[0],z=c[1],c=E+" "+z);var v,y=e[0];y&&(v=y.className,v=v+" "+c);if(y&&W(v)){var u=f.element._data(y),u=u&&u.events,y=(" "+v).replace(/\s+/g,".");d||(d=k?k.parent():e.parent());var q=V(y),m="addClass"==a||"removeClass"==a||F,I=e.data(l)||{};k=I.active||{};y=I.totalActive||0;v=I.last;if(R(e,d)||0===q.length)K(),x(),H(),G();else{var L=[];m&&(I.disabled||v&&!v.classBased)||D(q,function(b){if(!b.allowCancel||b.allowCancel(e,a,c)){var g=b[a];"leave"==a?(b=g,g=null):b=b["before"+a.charAt(0).toUpperCase()+
a.substr(1)];L.push({before:b,after:g})}});if(0===L.length)K(),x(),H(),B();else{d=!1;if(0<y){q=[];if(m)"setClass"==v.event?(q.push(v),M(e,c)):k[c]&&(N=k[c],N.event==a?d=!0:(q.push(N),M(e,c)));else if("leave"==a&&k["ng-leave"])d=!0;else{for(var N in k)q.push(k[N]),M(e,N);k={};y=0}0<q.length&&f.forEach(q,function(b){(b.done||w)(!0);X(b.animations)})}!m||(F||d)||(d="addClass"==a==e.hasClass(c));if(d)x(),H(),B();else{e.addClass(U);var Q=S++;v={classBased:m,event:a,animations:L,done:t};y++;k[c]=v;e.data(l,
{last:v,active:k,index:Q,totalActive:y});n(L,"before",t)}}}}else K(),x(),H(),B()}function Y(a){a=d(a);D(a.querySelectorAll("."+U),function(a){a=f.element(a);(a=a.data(l))&&a.active&&f.forEach(a.active,function(a){(a.done||w)(!0);X(a.animations)})})}function X(a){D(a,function(a){a.beforeComplete||(a.beforeEnd||w)(!0);a.afterComplete||(a.afterEnd||w)(!0)})}function M(a,c){if(d(a)==d(F))s.disabled||(s.running=!1,s.structural=!1);else if(c){var e=a.data(l)||{},f=!0===c;!f&&(e.active&&e.active[c])&&(e.totalActive--,
delete e.active[c]);if(f||!e.totalActive)a.removeClass(U),a.removeData(l)}}function R(a,c){if(s.disabled)return!0;if(d(a)==d(F))return s.disabled||s.running;do{if(0===c.length)break;var e=d(c)==d(F),f=e?s:c.data(l),f=f&&(!!f.disabled||f.running||0<f.totalActive);if(e||f)return f;if(e)break}while(c=c.parent());return!0}var S=0;F.data(l,s);B.$$postDigest(function(){B.$$postDigest(function(){s.running=!1})});var Z=h.classNameFilter(),W=Z?function(a){return Z.test(a)}:function(){return!0};return{enter:function(a,
c,e,d){this.enabled(!1,a);x.enter(a,c,e);B.$$postDigest(function(){a=n(a);t("enter","ng-enter",a,c,e,w,d)})},leave:function(a,c){Y(a);this.enabled(!1,a);B.$$postDigest(function(){a=n(a);t("leave","ng-leave",a,null,null,function(){x.leave(a)},c)})},move:function(a,c,e,d){Y(a);this.enabled(!1,a);x.move(a,c,e);B.$$postDigest(function(){a=n(a);t("move","ng-move",a,c,e,w,d)})},addClass:function(a,c,d){a=n(a);t("addClass",c,a,null,null,function(){x.addClass(a,c)},d)},removeClass:function(a,c,d){a=n(a);
t("removeClass",c,a,null,null,function(){x.removeClass(a,c)},d)},setClass:function(a,c,d,f){a=n(a);t("setClass",[c,d],a,null,null,function(){x.setClass(a,c,d)},f)},enabled:function(a,c){switch(arguments.length){case 2:if(a)M(c);else{var d=c.data(l)||{};d.disabled=!0;c.data(l,d)}break;case 1:s.disabled=!a;break;default:a=!s.disabled}return!!a}}}]);h.register("",["$window","$sniffer","$timeout","$$animateReflow",function(l,s,h,n){function J(b,g){I&&I();m.push(g);I=n(function(){D(m,function(b){b()});
m=[];I=null;u={}})}function B(b,g){var a=Date.now()+1E3*g;if(!(a<=N)){h.cancel(L);var c=d(b);b=f.element(c);Q.push(b);N=a;L=h(function(){U(Q);Q=[]},g,!1)}}function U(b){D(b,function(b){(b=b.data(E))&&(b.closeAnimationFn||w)()})}function V(b,g){var a=g?u[g]:null;if(!a){var c=0,d=0,f=0,e=0,k,p,r,h;D(b,function(b){if(b.nodeType==da){b=l.getComputedStyle(b)||{};r=b[O+ea];c=Math.max(t(r),c);h=b[O+H];k=b[O+ha];d=Math.max(t(k),d);p=b[P+ha];e=Math.max(t(p),e);var g=t(b[P+ea]);0<g&&(g*=parseInt(b[P+K],10)||
1);f=Math.max(g,f)}});a={total:0,transitionPropertyStyle:h,transitionDurationStyle:r,transitionDelayStyle:k,transitionDelay:d,transitionDuration:c,animationDelayStyle:p,animationDelay:e,animationDuration:f};g&&(u[g]=a)}return a}function t(b){var g=0;b=f.isString(b)?b.split(/\s*,\s*/):[];D(b,function(b){g=Math.max(parseFloat(b)||0,g)});return g}function Y(b){var g=b.parent(),a=g.data(G);a||(g.data(G,++q),a=q);return a+"-"+d(b).className}function X(b,g,a,c){var e=Y(g),k=e+" "+a,l=u[k]?++u[k].total:
0,h={};if(0<l){var p=a+"-stagger",h=e+" "+p;(e=!u[h])&&g.addClass(p);h=V(g,h);e&&g.removeClass(p)}c=c||function(b){return b()};g.addClass(a);var p=g.data(E)||{},r=c(function(){return V(g,k)});c=r.transitionDuration;e=r.animationDuration;if(0===c&&0===e)return g.removeClass(a),!1;g.data(E,{running:p.running||0,itemIndex:l,stagger:h,timings:r,closeAnimationFn:f.noop});b=0<p.running||"setClass"==b;0<c&&M(g,a,b);0<e&&(d(g).style[P]="none 0s");return!0}function M(b,a,c){"ng-enter"!=a&&("ng-move"!=a&&"ng-leave"!=
a)&&c?b.addClass(ga):d(b).style[O+H]="none"}function R(b,a){var c=O+H,e=d(b);e.style[c]&&0<e.style[c].length&&(e.style[c]="");b.removeClass(ga)}function S(b){var a=P;b=d(b);b.style[a]&&0<b.style[a].length&&(b.style[a]="")}function Z(b,a,c,e){function f(b){a.off(w,k);a.removeClass(l);A(a,c);b=d(a);for(var e in q)b.style.removeProperty(q[e])}function k(b){b.stopPropagation();var a=b.originalEvent||b;b=a.$manualTimeStamp||a.timeStamp||Date.now();a=parseFloat(a.elapsedTime.toFixed($));Math.max(b-x,0)>=
u&&a>=s&&e()}var h=d(a);b=a.data(E);if(-1!=h.className.indexOf(c)&&b){var l="";D(c.split(" "),function(b,a){l+=(0<a?" ":"")+b+"-active"});var p=b.stagger,r=b.timings,n=b.itemIndex,s=Math.max(r.transitionDuration,r.animationDuration),t=Math.max(r.transitionDelay,r.animationDelay),u=t*y,x=Date.now(),w=ba+" "+aa,m="",q=[];if(0<r.transitionDuration){var z=r.transitionPropertyStyle;-1==z.indexOf("all")&&(m+=C+"transition-property: "+z+";",m+=C+"transition-duration: "+r.transitionDurationStyle+";",q.push(C+
"transition-property"),q.push(C+"transition-duration"))}0<n&&(0<p.transitionDelay&&0===p.transitionDuration&&(m+=C+"transition-delay: "+W(r.transitionDelayStyle,p.transitionDelay,n)+"; ",q.push(C+"transition-delay")),0<p.animationDelay&&0===p.animationDuration&&(m+=C+"animation-delay: "+W(r.animationDelayStyle,p.animationDelay,n)+"; ",q.push(C+"animation-delay")));0<q.length&&(r=h.getAttribute("style")||"",h.setAttribute("style",r+" "+m));a.on(w,k);a.addClass(l);b.closeAnimationFn=function(){f();
e()};h=(n*(Math.max(p.animationDelay,p.transitionDelay)||0)+(t+s)*v)*y;b.running++;B(a,h);return f}e()}function W(b,a,c){var d="";D(b.split(","),function(b,e){d+=(0<e?",":"")+(c*a+parseInt(b,10))+"s"});return d}function a(b,a,c,d){if(X(b,a,c,d))return function(b){b&&A(a,c)}}function c(b,a,c,d){if(a.data(E))return Z(b,a,c,d);A(a,c);d()}function e(b,g,d,e){var f=a(b,g,d);if(f){var h=f;J(g,function(){R(g,d);S(g);h=c(b,g,d,e)});return function(b){(h||w)(b)}}e()}function A(b,a){b.removeClass(a);var c=
b.data(E);c&&(c.running&&c.running--,c.running&&0!==c.running||b.removeData(E))}function k(b,a){var c="";b=f.isArray(b)?b:b.split(/\s+/);D(b,function(b,d){b&&0<b.length&&(c+=(0<d?" ":"")+b+a)});return c}var C="",O,aa,P,ba;z.ontransitionend===T&&z.onwebkittransitionend!==T?(C="-webkit-",O="WebkitTransition",aa="webkitTransitionEnd transitionend"):(O="transition",aa="transitionend");z.onanimationend===T&&z.onwebkitanimationend!==T?(C="-webkit-",P="WebkitAnimation",ba="webkitAnimationEnd animationend"):
(P="animation",ba="animationend");var ea="Duration",H="Property",ha="Delay",K="IterationCount",G="$$ngAnimateKey",E="$$ngAnimateCSS3Data",ga="ng-animate-block-transitions",$=3,v=1.5,y=1E3,u={},q=0,m=[],I,L=null,N=0,Q=[];return{enter:function(b,a){return e("enter",b,"ng-enter",a)},leave:function(b,a){return e("leave",b,"ng-leave",a)},move:function(a,c){return e("move",a,"ng-move",c)},beforeSetClass:function(b,c,d,e){var f=k(d,"-remove")+" "+k(c,"-add"),h=a("setClass",b,f,function(a){var e=b.attr("class");
b.removeClass(d);b.addClass(c);a=a();b.attr("class",e);return a});if(h)return J(b,function(){R(b,f);S(b);e()}),h;e()},beforeAddClass:function(b,c,d){var e=a("addClass",b,k(c,"-add"),function(a){b.addClass(c);a=a();b.removeClass(c);return a});if(e)return J(b,function(){R(b,c);S(b);d()}),e;d()},setClass:function(a,d,e,f){e=k(e,"-remove");d=k(d,"-add");return c("setClass",a,e+" "+d,f)},addClass:function(a,d,e){return c("addClass",a,k(d,"-add"),e)},beforeRemoveClass:function(b,c,d){var e=a("removeClass",
b,k(c,"-remove"),function(a){var d=b.attr("class");b.removeClass(c);a=a();b.attr("class",d);return a});if(e)return J(b,function(){R(b,c);S(b);d()}),e;d()},removeClass:function(a,d,e){return c("removeClass",a,k(d,"-remove"),e)}}}])}])})(window,window.angular);

;
(function () {
'use strict';

/**
 * @ngdoc overview
 * @name adaptive.motion
 *
 * @description
 * The main module which holds everything together.
 */
var adaptive = angular.module('adaptive.motion', []);

// RequestAnimationFrame fallback
(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };
  }

  if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
  }
}());

/**
 * Converts rgb into hsv
 * @param  {Integer} r
 * @param  {Integer} g
 * @param  {Integer} b
 * @return {Array}
 */
var rgb2Hsv = function(r, g, b){

  r = r/255;
  g = g/255;
  b = b/255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);

  var h, s, v = max;

  var d = max - min;

  s = max === 0 ? 0 : d / max;

  if (max === min){
      h = 0; // achromatic
  }
  else{
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, v];
};

/**
 * @ngdoc object
 * @name adaptive.motion.$motionProvider
 *
 * @description
 * Use the `$motionProvider` to configure `$motion` service. You are able to configure
 * things like custom treshold options as well as a custom hsv filter.
 */
adaptive.provider('$motion', [function() {

  var requestId;
  var video = document.createElement('video');
  video.setAttribute('autoplay', 'true');
  video.setAttribute('width', '300');
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  this.treshold = {
    'rgb': 150,
    'move': 2,
    'bright': 300
  };

  this.hsvFilter = {
    'huemin': 0.0,
    'huemax': 0.1,
    'satmin': 0.0,
    'satmax': 1.0,
    'valmin': 0.4,
    'valmax': 1.0
  };

  /**
   * @ngdoc function
   * @name adaptive.motion.$motionProvider#setTreshold
   * @methodOf adaptive.motion.$motionProvider
   *
   * @description
   * Sets custom treshold options by given options object. The following options are
   * available:
   *
   * - rgb
   * - move
   * - bright
   *
   * <pre>
   * var app = angular.module('myApp', ['adaptive.motion']);
   *
   * app.config(['$motionProvider', function ($motionProvider) {
   *   // sets custom treshold options
   *   $motionProvider.setTreshold({
   *     'rgb': 150,
   *     'move': 3,
   *     'bright': 300
   *   });
   * }]);
   * </pre>
   *
   * @param {object} options Options object
   */
  this.setTreshold = function(treshold) {
    angular.extend(this.treshold, treshold);
  };

  /**
   * @ngdoc function
   * @name adaptive.motion.$motionProvider#setHsvFilter
   * @methodOf adaptive.motion.$motionProvider
   *
   * @description
   * You can use `$motionProvider.setHsvFilter()` to set a custom hsv filter. To
   * configure such filter you have to set hue, saturation and intensity values. Just
   * take a look at the following example:
   *
   * <pre>
   * var app = angular.module('myApp', ['adaptive.motion']);
   *
   * app.config(['$motionProvider', funciton ($motionProvider) {
   *   $motionProvider.setHsvFilter({
   *     'huemin': 0.0,
   *     'huemax': 0.1,
   *     'satmin': 0.0,
   *     'satmax': 1.0,
   *     'valmin': 0.4,
   *     'valmax': 1.0
   *   });
   * }]);
   * </pre>
   *
   * @param {object} options Options object
   */
  this.setHsvFilter = function(hsvFilter) {
    angular.extend(this.hsvFilter, hsvFilter);
  };

  /**
   * @ngdoc object
   * @name adaptive.motion.$motion
   * @requires $rootScope
   *
   * @description
   * `$motion` service provides methods to access motion API's.
   */
  this.$get = function($rootScope) {

    var treshold = this.treshold;
    var hsvFilter = this.hsvFilter;

    var compression = 5;
    var width = 0;
    var height = 0;

    var draw;
    var localMediaStream;

    var lastDraw;
    var lastDown = {
      x: 0,
      y: 0,
      d: 0
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#start
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * Starts gesture recognition.
     */
    var start = function(){

      window.URL = window.URL || window.webkitURL;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: false, video: true},
          function(stream){
            $rootScope.$broadcast('adaptive.motion:onStart');
            localMediaStream = stream;
            video.src = window.URL.createObjectURL(stream);
            video.addEventListener('play', function() {
              requestId = window.requestAnimationFrame(redraw);
            });
          },
          function(){
            $rootScope.$broadcast('adaptive.motion:onError', 'Access denied!');
            // throw new Error('Access denied!');
          }
        );
      }
      else {
        $rootScope.$broadcast('adaptive.motion:onError', 'getUserMedia() is not supported in your browser');
        // throw new Error('getUserMedia() is not supported in your browser');
      }
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#stop
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * Stops gesture recognition.
     */
    var stop = function(){
      window.cancelAnimationFrame(requestId);
      if (localMediaStream) {
        localMediaStream.stop();
      }
      localMediaStream = undefined;
      $rootScope.$broadcast('adaptive.motion:onStop');
    };

    var redraw = function() {
      if (canvas.width !== video.videoWidth){
        width = Math.floor(video.videoWidth / compression);
        height = Math.floor(video.videoHeight / compression);
        canvas.width = width;
        canvas.height = height;
      }

      try {
        context.drawImage(video,0,0,width,height);
        draw = context.getImageData(0, 0, width, height);
        $rootScope.$broadcast('adaptive.motion:videoData', draw);
        var skinFilter = filterSkin(draw);
        lastDraw = getMovements(skinFilter);

        requestId = window.requestAnimationFrame(redraw);
      }
      catch (e) {
        if (e.name === 'NScontextERRORcontextNOTcontextAVAILABLE') {
          requestId = window.requestAnimationFrame(redraw);
        }
        else {
          throw e;
        }
      }
    };

    /**
     * Filters skin from video image data
     * @param  {ImageData} video
     * @return {ImageData}
     */
    var filterSkin = function(video){

      var skinFilter = context.getImageData(0,0,width,height);
      var totalPixels = skinFilter.width * skinFilter.height;
      var index = totalPixels * 4;

      var pix = 0;
      for (var y=0; y<height; y++)
      {
        for (var x=0; x<width; x++)
        {
          index = x+y*width;
          var r = video.data[pix];
          var g = video.data[pix+1];
          var b = video.data[pix+2];
          var a = video.data[pix+3];

          var hsv = rgb2Hsv(r,g,b);
          //When the hand is too lose (hsv[0] > 0.59 && hsv[0] < 1.0)
          //Skin Range on HSV values
          if(((hsv[0] > hsvFilter.huemin && hsv[0] < hsvFilter.huemax)||(hsv[0] > 0.59 && hsv[0] < 1.0))&&(hsv[1] > hsvFilter.satmin && hsv[1] < hsvFilter.satmax)&&(hsv[2] > hsvFilter.valmin && hsv[2] < hsvFilter.valmax)){
            skinFilter[pix] = r;
            skinFilter[pix+1] = g;
            skinFilter[pix+2] = b;
            skinFilter[pix+3] = a;
          }
          else{
            skinFilter.data[pix] = 255;
            skinFilter.data[pix+1] = 255;
            skinFilter.data[pix+2] = 255;
            skinFilter.data[pix+3] = 255;
          }

          pix = index * 4;
        }
      }
      $rootScope.$broadcast('adaptive.motion:skinData', skinFilter);
      return skinFilter;
    };

    /**
     * Gets movement data
     * @param  {ImageData} draw
     * @return {ImageData}
     */
    var getMovements = function(draw){
      var edge = context.createImageData(width, height);
      var totalx = 0;
      var totaly = 0;
      var changed = 0;
      var pix = edge.width * edge.height * 4;

      if (lastDraw){

        while ((pix -= 4) > 0) {
          var rgbaDelta = Math.abs(draw.data[pix] - lastDraw.data[pix]) +
                  Math.abs(draw.data[pix+1] - lastDraw.data[pix+1]) +
                  Math.abs(draw.data[pix+2] - lastDraw.data[pix+2]);

          if (rgbaDelta > treshold.rgb){
            edge.data[pix] = 0;
            edge.data[pix+1] = 0;
            edge.data[pix+2] = 0;
            edge.data[pix+3] = 255;
            changed += 1;
            totalx += (pix/4) % width;
            totaly += Math.floor((pix/4) / edge.height);
          }
          else {
            edge.data[pix] = 255;
            edge.data[pix+1] = 255;
            edge.data[pix+2] = 255;
            edge.data[pix+3] = 255;
          }
        }
      }

      if (changed){
        $rootScope.$broadcast('adaptive.motion:edgeData', edge);

        var down = {
          x: totalx / changed,
          y: totaly / changed,
          d: changed
        };
        recognizeGesture(down);
      }

      return draw;
    };

    /**
     * Sets last down
     * @param {Object} down
     */
    var setLastDown = function(down){
      lastDown = {
        x: down.x,
        y: down.y,
        d: down.d
      };
    };

    var avg = 0;
    var state = 0; //States: 0 waiting for gesture, 1 waiting for next move after gesture, 2 waiting for gesture to end

    /**
     * Recognizes gesture
     * @param  {Object} down
     */
    var recognizeGesture = function(down){
      avg = 0.9 * avg + 0.1 * down.d;
      var davg = down.d - avg;
      var foundGesture = davg > treshold.bright;

      switch (state){
        case 0:
          if (foundGesture){ //Found a gesture, waiting for next move
            state = 1;
            setLastDown(down);
          }
          break;
        case 2: //Wait for gesture to end
          if (!foundGesture){ //Gesture ended
            state = 0;
          }
          break;
        case 1: //Got next move, do something based on direction
          var dx = down.x - lastDown.x;
          var dy = down.y - lastDown.y;
          var dirx = Math.abs(dy) < Math.abs(dx) - treshold.move;
          var diry = Math.abs(dx) < Math.abs(dy) - treshold.move;
          // console.log(dx, dy, dirx);

          if (dirx) {
            if (dx < - treshold.move){
              $rootScope.$broadcast('adaptive.motion:onSwipeRight');
            }
            else if (dx > treshold.move){
              $rootScope.$broadcast('adaptive.motion:onSwipeLeft');
            }
          }
          else if (diry) {
            if (dy > treshold.move){
              $rootScope.$broadcast('adaptive.motion:onSwipeDown');
            }
            else if (dy < - treshold.move){
              $rootScope.$broadcast('adaptive.motion:onSwipeUp');
            }
          }

          state = 2;
          break;
      }
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#onStart
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * On start callback.
     */
    var onStart = function(cb){
      $rootScope.$on('adaptive.motion:onStart', function(e, data){
        cb(data);
      });
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#onStop
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * On stop callback.
     */
    var onStop = function(cb){
      $rootScope.$on('adaptive.motion:onStop', function(e, data){
        cb(data);
      });
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#onError
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * On error callback.
     */
    var onError = function(cb){
      $rootScope.$on('adaptive.motion:onError', function(e, data){
        cb(data);
      });
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#onSwipeLeft
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * On swipe left gesture.
     */
    var onSwipeLeft = function(cb){
      $rootScope.$on('adaptive.motion:onSwipeLeft', function(e, data){
        cb(data);
      });
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#onSwipeRight
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * On swipe right gesture.
     */
    var onSwipeRight = function(cb){
      $rootScope.$on('adaptive.motion:onSwipeRight', function(e, data){
        cb(data);
      });
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#onSwipeUp
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * On swipe up gesture.
     */
    var onSwipeUp = function(cb){
      $rootScope.$on('adaptive.motion:onSwipeUp', function(e, data){
        cb(data);
      });
    };

    /**
     * @ngdoc function
     * @name adaptive.motion.$motion#onSwipeDown
     * @methodOf adaptive.motion.$motion
     *
     * @description
     * On swipe down gesture.
     */
    var onSwipeDown = function(cb){
      $rootScope.$on('adaptive.motion:onSwipeDown', function(e, data){
        cb(data);
      });
    };

    return {
      start: function(){
        start();
      },
      stop: function(){
        stop();
      },
      onStart: function(cb){
        onStart(cb);
      },
      onStop: function(cb){
        onStop(cb);
      },
      onError: function(cb){
        onError(cb);
      },
      onSwipeLeft: function(cb){
        onSwipeLeft(cb);
      },
      onSwipeRight: function(cb){
        onSwipeRight(cb);
      },
      onSwipeUp: function(cb){
        onSwipeUp(cb);
      },
      onSwipeDown: function(cb){
        onSwipeDown(cb);
      }
    };
  };
}]);

/**
 * @ngdoc directive
 * @name adaptive.motion.directive:adaptiveMotion
 * @requires $rootScope
 * @restrict A
 *
 * @description
 * Use `adaptive-motion` directive to visualize motions on canvas elements.
 * There are three different visualization types supported.
 *
 * - video
 * - skin
 * - edge
 *
 * @example
   <example module="ngView">
     <file name="index.html">
      <canvas adaptive-motion="video"></canvas>
     </file>
     <file name="script.js">
       angular.module('ngView', ['adaptive.motion']);
     </file>
   </example>
 */
adaptive.directive('adaptiveMotion', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var canvas = element[0];
      var context = canvas.getContext('2d');

      if (attrs['adaptiveMotion'] === 'video'){
        $rootScope.$on('adaptive.motion:videoData', function(e, data){
          context.putImageData(data, 0, 0);
        });
      }
      else if (attrs['adaptiveMotion'] === 'skin'){
        $rootScope.$on('adaptive.motion:skinData', function(e, data){
          context.putImageData(data, 0, 0);
        });
      }
      else {
        $rootScope.$on('adaptive.motion:edgeData', function(e, data){
          context.putImageData(data, 0, 0);
        });
      }
    }
  };
}]);

})();;angular.module("ngDropdowns",[]).directive("dropdownSelect",["$document",function(e){return{restrict:"A",replace:true,scope:{dropdownSelect:"=",dropdownModel:"=",dropdownOnchange:"&"},controller:["$scope","$element","$attrs",function(t,n,r){var i;t.labelField=r.dropdownItemLabel!=null?r.dropdownItemLabel:"text";this.select=function(e){angular.copy(e,t.dropdownModel);t.dropdownOnchange({selected:e})};i=e.find("body");i.bind("click",function(){n.removeClass("active")});n.bind("click",function(e){e.stopPropagation();n.toggleClass("active")})}],template:"<div class='wrap-dd-select'>\n    <span class='selected'>{{dropdownModel[labelField]}}</span>\n    <ul class='dropdown'>\n        <li ng-repeat='item in dropdownSelect'\n            class='dropdown-item'\n            dropdown-select-item='item'\n            dropdown-item-label='labelField'>\n        </li>\n    </ul>\n</div>"}}]).directive("dropdownSelectItem",[function(){return{require:"^dropdownSelect",replace:true,scope:{dropdownItemLabel:"=",dropdownSelectItem:"="},link:function(e,t,n,r){e.selectItem=function(){if(e.dropdownSelectItem.href){return}r.select(e.dropdownSelectItem)}},template:"<li ng-class='{divider: dropdownSelectItem.divider}'>\n    <a href='' class='dropdown-item'\n        ng-if='!dropdownSelectItem.divider'\n        ng-href='{{dropdownSelectItem.href}}'\n        ng-click='selectItem()'>\n        {{dropdownSelectItem[dropdownItemLabel]}}\n    </a>\n</li>"}}]).directive("dropdownMenu",["$parse","$compile","$document",function(e,t,n){var r;r="<ul class='dropdown'>\n    <li ng-repeat='item in dropdownMenu'\n        class='dropdown-item'\n        dropdown-item-label='labelField'\n        dropdown-menu-item='item'>\n    </li>\n</ul>";return{restrict:"A",replace:false,scope:{dropdownMenu:"=",dropdownModel:"=",dropdownOnchange:"&"},controller:["$scope","$element","$attrs",function(e,i,s){var o,u,a,f;e.labelField=s.dropdownItemLabel!=null?s.dropdownItemLabel:"text";o=angular.element(r);o.data("$dropdownMenuController",this);f=t(o)(e);u=angular.element("<div class='wrap-dd-menu'></div>");i.replaceWith(u);u.append(i);u.append(f);this.select=function(t){angular.copy(t,e.dropdownModel);e.dropdownOnchange({selected:t})};a=n.find("body");a.bind("click",function(){f.removeClass("active")});i.bind("click",function(e){e.stopPropagation();f.toggleClass("active")})}]}}]).directive("dropdownMenuItem",[function(){return{require:"^dropdownMenu",replace:true,scope:{dropdownMenuItem:"=",dropdownItemLabel:"="},link:function(e,t,n,r){e.selectItem=function(){if(e.dropdownMenuItem.href){return}r.select(e.dropdownMenuItem)}},template:"<li ng-class='{divider: dropdownMenuItem.divider}'>\n    <a href='' class='dropdown-item'\n        ng-if='!dropdownMenuItem.divider'\n        ng-href='{{dropdownMenuItem.href}}'\n        ng-click='selectItem()'>\n        {{dropdownMenuItem[dropdownItemLabel]}}\n    </a>\n</li>"}}]);//google-map
var ngMap=angular.module("ngMap",[]);ngMap.directive("infoWindow",["Attr2Options",function(Attr2Options){var parser=new Attr2Options;return{restrict:"E",require:"^map",link:function(scope,element,attrs,mapController){var filtered=new parser.filter(attrs),options=parser.getOptions(filtered);options.pixelOffset&&(options.pixelOffset=google.maps.Size.apply(this,options.pixelOffset)),infoWindow=new google.maps.InfoWindow(options),infoWindow.contents=element.html();var events=parser.getEvents(scope,filtered);for(var eventName in events)google.maps.event.addListener(infoWindow,eventName,events[eventname]);mapController.infoWindows.push(infoWindow),element.css({display:"none"}),scope.showInfoWindow=function(event,id,options){var infoWindow=scope.infoWindows[id],contents=infoWindow.contents,matches=contents.match(/\[\[[^\]]+\]\]/g);if(matches)for(var i=0,length=matches.length;length>i;i++){var expression=matches[i].replace(/\[\[/,"").replace(/\]\]/,"");try{contents=contents.replace(matches[i],eval(expression))}catch(e){expression="options."+expression,contents=contents.replace(matches[i],eval(expression))}}infoWindow.setContent(contents),infoWindow.open(scope.map,this)}}}}]),ngMap.directive("map",["Attr2Options","$parse","NavigatorGeolocation","GeoCoder","$compile",function(a,b,c,d){var e=new a;return{restrict:"AE",controller:["$scope",function(a){this.map=null,this.controls={},this.markers=[],this.shapes=[],this.infoWindows=[],this.initializeMap=function(a,b,f){var g=e.filter(f),h=e.getOptions(g),i=e.getControlOptions(g);for(key in i)h[key]=i[key];var j=this;if(h.zoom||(h.zoom=15),h.center instanceof Array){var k=h.center[0],l=h.center[1];h.center=new google.maps.LatLng(k,l)}else{var m=h.center;delete h.center}for(var n in this.controls)h[n+"Control"]="false"===this.controls[n].enabled?0:1,delete this.controls[n].enabled,h[n+"ControlOptions"]=this.controls[n];console.log("mapOptions",h);var o=document.createElement("div");o.style.width="100%",o.style.height="100%",b.prepend(o),j.map=new google.maps.Map(o,h),"string"==typeof m?d.geocode({address:m}).then(function(a){j.map.setCenter(a[0].geometry.location)}):h.center||c.getCurrentPosition().then(function(a){var b=a.coords.latitude,c=a.coords.longitude;j.map.setCenter(new google.maps.LatLng(b,c))});var p=e.getEvents(a,g);console.log("mapEvents",p);for(var q in p)google.maps.event.addListener(j.map,q,p[q]);return a.map=j.map,j.map},this.addMarker=function(b){b.setMap(this.map),b.centered&&this.map.setCenter(b.position);var c=Object.keys(a.markers).length;a.markers[b.id||c]=b},this.initializeMarkers=function(){a.markers={};for(var b=0;b<this.markers.length;b++){var c=this.markers[b];this.addMarker(c)}},this.initializeShapes=function(){a.shapes={};for(var b=0;b<this.shapes.length;b++){var c=this.shapes[b];c.setMap(this.map),a.shapes[c.id||b+1]=c}},this.initializeInfoWindows=function(){a.infoWindows={};for(var b=0;b<this.infoWindows.length;b++){var c=this.infoWindows[b];a.infoWindows[c.id||b+1]=c}}}],link:function(a,b,c,d){d.initializeMap(a,b,c),d.initializeMarkers(),d.initializeShapes(),d.initializeInfoWindows()}}}]),ngMap.directive("marker",["Attr2Options","GeoCoder","NavigatorGeolocation",function(a,b,c){var d=new a;return{restrict:"E",require:"^map",link:function(a,e,f,g){var h=new d.filter(f),i=d.getOptions(h),j=d.getEvents(a,h),k=function(){var a=new google.maps.Marker(i);Object.keys(j).length>0&&console.log("markerEvents",j);for(var b in j)google.maps.event.addListener(a,b,j[b]);return a};if(i.position instanceof Array){var l=i.position[0],m=i.position[1];i.position=new google.maps.LatLng(l,m),console.log("adding marker with options, ",i);var n=k();i.ngRepeat?g.addMarker(n):g.markers.push(n)}else if("string"==typeof i.position){var o=i.position;o.match(/^current/i)?c.getCurrentPosition().then(function(a){var b=a.coords.latitude,c=a.coords.longitude;i.position=new google.maps.LatLng(b,c);var d=k();g.addMarker(d)}):b.geocode({address:i.position}).then(function(a){var b=a[0].geometry.location;i.position=b;var c=k();g.addMarker(c)})}else console.error("invalid marker position",i.position)}}}]),ngMap.directive("shape",["Attr2Options",function(a){var b=new a,c=function(a){return a[0]&&a[0]instanceof Array?a.map(function(a){return new google.maps.LatLng(a[0],a[1])}):new google.maps.LatLng(a[0],a[1])},d=function(a){var b=c(a);return new google.maps.LatLngBounds(b[0],b[1])},e=function(a,b){switch(a){case"circle":return b.center=c(b.center),new google.maps.Circle(b);case"polygon":return b.paths=c(b.paths),new google.maps.Polygon(b);case"polyline":return b.path=c(b.path),new google.maps.Polyline(b);case"rectangle":return b.bounds=d(b.bounds),new google.maps.Rectangle(b);case"groundOverlay":case"image":var e=b.url,f=d(b.bounds),g={opacity:b.opacity,clickable:b.clickable};return new google.maps.GroundOverlay(e,f,g)}return null};return{restrict:"E",require:"^map",link:function(a,c,d,f){var g=b.filter(d),h=g.name;delete g.name;var i=b.getOptions(g);console.log("shape",h,"options",i);var j=e(h,i);j?f.shapes.push(j):console.error("shape",h,"is not defined");var k=b.getEvents(a,g);console.log("shape",h,"events",k);for(var l in k)k[l]&&(console.log(l,k[l]),google.maps.event.addListener(j,l,k[l]))}}}]),ngMap.provider("Attr2Options",function(){this.$get=function(){return function(){this.filter=function(a){var b={};for(var c in a)c.match(/^\$/)||(b[c]=a[c]);return b},this.getOptions=function(attrs){var options={};for(var key in attrs)if(attrs[key]){if(key.match(/^on[A-Z]/))continue;if(key.match(/ControlOptions$/))continue;var val=attrs[key];try{var num=Number(val);if(isNaN(num))throw"Not a number";options[key]=num}catch(err){try{options[key]=JSON.parse(val)}catch(err2){if(val.match(/^[A-Z][a-zA-Z0-9]+\(.*\)$/))try{var exp="new google.maps."+val;options[key]=eval(exp)}catch(e){options[key]=val}else if(val.match(/^[A-Z][a-zA-Z0-9]+\.[A-Z]+$/))try{options[key]=eval("google.maps."+val)}catch(e){options[key]=val}else options[key]=val}}}return options},this.getEvents=function(a,b){var c={},d=function(a){return"_"+a.toLowerCase()},e=function(b){var c=b.match(/([^\(]+)\(([^\)]*)\)/),d=c[1],e=c[2].replace(/event[ ,]*/,""),f=a.$eval("["+e+"]");return function(b){a[d].apply(this,[b].concat(f))}};for(var f in b)if(b[f]){if(!f.match(/^on[A-Z]/))continue;var g=f.replace(/^on/,"");g=g.charAt(0).toLowerCase()+g.slice(1),g=g.replace(/([A-Z])/g,d);var h=b[f];c[g]=new e(h)}return c},this.getControlOptions=function(a){var b={};for(var c in a)if(a[c]){if(!c.match(/(.*)ControlOptions$/))continue;var d=a[c],e=d.replace(/'/g,'"');e=e.replace(/([^"]+)|("[^"]+")/g,function(a,b,c){return b?b.replace(/([a-zA-Z0-9]+?):/g,'"$1":'):c});try{var f=JSON.parse(e);for(var g in f)if(f[g]){var h=f[g];if("string"==typeof h?h=h.toUpperCase():"mapTypeIds"===g&&(h=h.map(function(a){return google.maps.MapTypeId[a.toUpperCase()]})),"style"===g){var i=c.charAt(0).toUpperCase()+c.slice(1),j=i.replace(/Options$/,"")+"Style";f[g]=google.maps[j][h]}else f[g]="position"===g?google.maps.ControlPosition[h]:h}b[c]=f}catch(k){console.error("invald option for",c,e,k,k.stack)}}return b}}}}),ngMap.service("GeoCoder",["$q",function(a){return{geocode:function(b){var c=a.defer(),d=new google.maps.Geocoder;return d.geocode(b,function(a,b){b==google.maps.GeocoderStatus.OK?c.resolve(a):c.reject("Geocoder failed due to: "+b)}),c.promise}}}]),ngMap.service("NavigatorGeolocation",["$q",function(a){return{getCurrentPosition:function(){var b=a.defer();return navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){b.resolve(a)},function(a){console.error(a),b.reject(a)}):b.reject("Browser Geolocation service failed."),b.promise},watchPosition:function(){return"TODO"},clearWatch:function(){return"TODO"}}}]);;/*
---
name: Facebook Angularjs

description: Provides an easier way to make use of Facebook API with Angularjs

license: MIT-style license

authors:
  - Ciul

requires: [angular]
provides: [facebook]

...
*/
(function(window, angular, undefined) {
  'use strict';

  // Module global settings.
  var settings = {};

  // Module global flags.
  var flags = {
    sdk: false,
    ready: false
  };

  // Module global loadDeferred
  var loadDeferred;

  /**
   * Facebook module
   */
  angular.module('facebook', []).

    // Declare module settings value
    value('settings', settings).

    // Declare module flags value
    value('flags', flags).

    /**
     * Facebook provider
     */
    provider('Facebook', [
      function() {

        /**
         * Facebook appId
         * @type {Number}
         */
        settings.appId = null;

        this.setAppId = function(appId) {
          settings.appId = appId;
        };

        this.getAppId = function() {
          return settings.appId;
        };

        /**
         * Locale language, english by default
         * @type {String}
         */
        settings.locale = 'en_US';

        this.setLocale = function(locale) {
          settings.locale = locale;
        };

        this.getLocale = function() {
          return settings.locale;
        };

        /**
         * Set if you want to check the authentication status
         * at the start up of the app
         * @type {Boolean}
         */
        settings.status = true;

        this.setStatus = function(status) {
          settings.status = status;
        };

        this.getStatus = function() {
          return settings.status;
        };

        /**
         * Adding a Channel File improves the performance of the javascript SDK,
         * by addressing issues with cross-domain communication in certain browsers.
         * @type {String}
         */
        settings.channelUrl = null;

        this.setChannel = function(channel) {
          settings.channelUrl = channel;
        };

        this.getChannel = function() {
          return settings.channelUrl;
        };

        /**
         * Enable cookies to allow the server to access the session
         * @type {Boolean}
         */
        settings.cookie = true;

        this.setCookie = function(cookie) {
          settings.cookie = cookie;
        };

        this.getCookie = function() {
          return settings.cookie;
        };

        /**
         * Parse XFBML
         * @type {Boolean}
         */
        settings.xfbml = true;

        this.setXfbml = function(enable) {
          settings.xfbml = enable;
        };

        this.getXfbml = function() {
          return settings.xfbml;
        };

        /**
         * Auth Response
         * @type {Object}
         */
        settings.authResponse = true;

        this.setAuthResponse = function(obj) {
          settings.authResponse = obj || true;
        };

        this.getAuthResponse = function() {
          return settings.authResponse;
        };

        /**
         * Frictionless Requests
         * @type {Boolean}
         */
        settings.frictionlessRequests = false;

        this.setFrictionlessRequests = function(enable) {
          settings.frictionlessRequests = enable;
        };

        this.getFrictionlessRequests = function() {
          return settings.frictionlessRequests;
        };

        /**
         * HideFlashCallback
         * @type {Object}
         */
        settings.hideFlashCallback = null;

        this.setHideFlashCallback = function(obj) {
          settings.hideFlashCallback = obj || null;
        };

        this.getHideFlashCallback = function() {
          return settings.hideFlashCallback;
        };

        /**
         * Custom option setting
         * key @type {String}
         * value @type {*}
         * @return {*}
         */
        this.setInitCustomOption = function(key, value) {
          if (!angular.isString(key)) {
            return false;
          }

          settings[key] = value;
          return settings[key];
        };

        /**
         * get init option
         * @param  {String} key
         * @return {*}
         */
        this.getInitOption = function(key) {
          // If key is not String or If non existing key return null
          if (!angular.isString(key) || !settings.hasOwnProperty(key)) {
            return false;
          }

          return settings[key];
        };

        /**
         * load SDK
         */
        settings.loadSDK = true;

        this.setLoadSDK = function(a) {
          settings.loadSDK = !!a;
        };

        this.getLoadSDK = function() {
          return settings.loadSDK;
        };

        /**
         * Init Facebook API required stuff
         * This will prepare the app earlier (on settingsuration)
         * @arg {Object/String} initSettings
         * @arg {Boolean} _loadSDK (optional, true by default)
         */
        this.init = function(initSettings, _loadSDK) {
          // If string is passed, set it as appId
          if (angular.isString(initSettings)) {
            settings.appId = initSettings || settings.appId;
          }

          // If object is passed, merge it with app settings
          if (angular.isObject(initSettings)) {
            angular.extend(settings, initSettings);
          }

          // Set if Facebook SDK should be loaded automatically or not.
          if (angular.isDefined(_loadSDK)) {
            settings.loadSDK = !!_loadSDK;
          }
        };

        /**
         * This defined the Facebook service
         */
        this.$get = [
          '$q',
          '$rootScope',
          '$timeout',
          '$window',
          function($q, $rootScope, $timeout, $window) {
            /**
             * This is the NgFacebook class to be retrieved on Facebook Service request.
             */
            function NgFacebook() {
              this.appId = settings.appId;
            }

            /**
             * Ready state method
             * @return {Boolean}
             */
            NgFacebook.prototype.isReady = function() {
              return flags.ready;
            };

            /**
             * Map some asynchronous Facebook sdk methods to NgFacebook
             */
            angular.forEach([
              'login',
              'logout',
              'api',
              'ui',
              'getLoginStatus'
            ], function(name) {
              NgFacebook.prototype[name] = function() {

                var d = $q.defer(),
                    args = Array.prototype.slice.call(arguments), // Converts arguments passed into an array
                    userFn,
                    userFnIndex;

                // Get user function and it's index in the arguments array, to replace it with custom function, allowing the usage of promises
                angular.forEach(args, function(arg, index) {
                  if (angular.isFunction(arg)) {
                    userFn = arg;
                    userFnIndex = index;
                  }
                });

                // Replace user function intended to be passed to the Facebook API with a custom one
                // for being able to use promises.
                if (angular.isFunction(userFn) && angular.isNumber(userFnIndex)) {
                  args.splice(userFnIndex, 1, function(response) {
                    $timeout(function() {
                      if (angular.isUndefined(response.error)) {
                        d.resolve(response);
                      } else {
                        d.reject(response);
                      }

                      if (angular.isFunction(userFn)) {
                        userFn(response);
                      }
                    });
                  });
                }

                $timeout(function() {
                  // Call when loadDeferred be resolved, meaning Service is ready to be used.
                  loadDeferred.promise.then(function() {
                    $window.FB[name].apply(FB, args);
                  }, function() {
                    throw 'Facebook API could not be initialized properly';
                  });
                });

                return d.promise;
              };
            });

            /**
             * Map Facebook sdk XFBML.parse() to NgFacebook.
             */
            NgFacebook.prototype.parseXFBML = function() {

              var d = $q.defer();

              $timeout(function() {
                // Call when loadDeferred be resolved, meaning Service is ready to be used
                loadDeferred.promise.then(function() {
                  $window.FB.parse();
                  d.resolve();
                }, function() {
                  throw 'Facebook API could not be initialized properly';
                });
              });

              return d.promise;
            };

            /**
             * Map Facebook sdk subscribe method to NgFacebook. Renamed as subscribe
             * Thus, use it as Facebook.subscribe in the service.
             */
            NgFacebook.prototype.subscribe = function() {

              var d = $q.defer(),
                  args = Array.prototype.slice.call(arguments), // Get arguments passed into an array
                  userFn,
                  userFnIndex;

              // Get user function and it's index in the arguments array, to replace it with custom function, allowing the usage of promises
              angular.forEach(args, function(arg, index) {
                if (angular.isFunction(arg)) {
                  userFn = arg;
                  userFnIndex = index;
                }
              });

              // Replace user function intended to be passed to the Facebook API with a custom one
              // for being able to use promises.
              if (angular.isFunction(userFn) && angular.isNumber(userFnIndex)) {
                args.splice(userFnIndex, 1, function(response) {
                  $timeout(function() {
                    if (angular.isUndefined(response.error)) {
                      d.resolve(response);
                    } else {
                      d.reject(response);
                    }

                    if (angular.isFunction(userFn)) {
                      userFn(response);
                    }
                  });
                });
              }

              $timeout(function() {
                // Call when loadDeferred be resolved, meaning Service is ready to be used
                loadDeferred.promise.then(function() {
                  $window.FB.Event.subscribe.apply(FB, args);
                }, function() {
                  throw 'Facebook API could not be initialized properly';
                });
              });

              return d.promise;
            };

            /**
             * Map Facebook sdk unsubscribe method to NgFacebook. Renamed as unsubscribe
             * Thus, use it as Facebook.unsubscribe in the service.
             */
            NgFacebook.prototype.unsubscribe = function() {

              var d = $q.defer(),
                  args = Array.prototype.slice.call(arguments), // Get arguments passed into an array
                  userFn,
                  userFnIndex;

              // Get user function and it's index in the arguments array, to replace it with custom function, allowing the usage of promises
              angular.forEach(args, function(arg, index) {
                if (angular.isFunction(arg)) {
                  userFn = arg;
                  userFnIndex = index;
                }
              });

              // Replace user function intended to be passed to the Facebook API with a custom one
              // for being able to use promises.
              if (angular.isFunction(userFn) && angular.isNumber(userFnIndex)) {
                args.splice(userFnIndex, 1, function(response) {
                  $timeout(function() {
                    if (angular.isUndefined(response.error)) {
                      d.resolve(response);
                    } else {
                      d.reject(response);
                    }

                    if (angular.isFunction(userFn)) {
                      userFn(response);
                    }
                  });
                });
              }

              $timeout(function() {
                // Call when loadDeferred be resolved, meaning Service is ready to be used
                loadDeferred.promise.then(
                  function() {
                    $window.FB.Event.unsubscribe.apply(FB, args);
                  },
                  function() {
                    throw 'Facebook API could not be initialized properly';
                  }
                );
              });

              return d.promise;
            };

            return new NgFacebook(); // Singleton
          }
        ];

      }
    ]).

    /**
     * Module initialization
     */
    run([
      '$rootScope',
      '$q',
      '$window',
      '$timeout',
      function($rootScope, $q, $window, $timeout) {
        // Define global loadDeffered to notify when Service callbacks are safe to use
        loadDeferred = $q.defer();

        var loadSDK = settings.loadSDK;
        delete(settings['loadSDK']); // Remove loadSDK from settings since this isn't part from Facebook API.

        /**
         * Define fbAsyncInit required by Facebook API
         */
        $window.fbAsyncInit = function() {
          // Initialize our Facebook app
          $timeout(function() {
            if (!settings.appId) {
              throw 'Missing appId setting.';
            }

            FB.init(settings);

            // Set ready global flag
            flags.ready = true;


            /**
             * Subscribe to Facebook API events and broadcast through app.
             */
            angular.forEach({
              'auth.login': 'login',
              'auth.logout': 'logout',
              'auth.prompt': 'prompt',
              'auth.sessionChange': 'sessionChange',
              'auth.statusChange': 'statusChange',
              'auth.authResponseChange': 'authResponseChange',
              'xfbml.render': 'xfbmlRender',
              'edge.create': 'like',
              'edge.remove': 'unlike',
              'comment.create': 'comment',
              'comment.remove': 'uncomment'
            }, function(mapped, name) {
              FB.Event.subscribe(name, function(response) {
                $timeout(function() {
                  $rootScope.$broadcast('Facebook:' + mapped, response);
                });
              });
            });

            // Broadcast Facebook:load event
            $rootScope.$broadcast('Facebook:load');

            loadDeferred.resolve(FB);

          });
        };

        /**
         * Inject Facebook root element in DOM
         */
        (function addFBRoot() {
          var fbroot = document.getElementById('fb-root');

          if (!fbroot) {
            fbroot = document.createElement('div');
            fbroot.id = 'fb-root';
            document.body.insertBefore(fbroot, document.body.childNodes[0]);
          }

          return fbroot;
        })();

        /**
         * SDK script injecting
         */
         if(loadSDK) {
          (function injectScript() {
            var src           = '//connect.facebook.net/' + settings.locale + '/all.js',
                script        = document.createElement('script');
                script.id     = 'facebook-jssdk';
                script.async  = true;

            // Prefix protocol
            if ($window.location.protocol === 'file') {
              src = 'https:' + src;
            }

            script.src = src;
            script.onload = function() {
              flags.sdk = true; // Set sdk global flag
            };

            document.getElementsByTagName('head')[0].appendChild(script); // // Fix for IE < 9, and yet supported by lattest browsers
          })();
        }
      }
    ]);

})(window, angular);;

window.google = window.google || {};
google.maps = google.maps || {};
(function() {
  
  function getScript(src) {
    document.write('<' + 'script src="' + src + '"' +
                   ' type="text/javascript"><' + '/script>');
  }
  
  var modules = google.maps.modules = {};
  google.maps.__gjsload__ = function(name, text) {
    modules[name] = text;
  };
  
  google.maps.Load = function(apiLoad) {
    delete google.maps.Load;
    apiLoad([0.009999999776482582,[[["http://mt0.googleapis.com/vt?lyrs=m@257000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=m@257000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"m@257000000",["https://mts0.google.com/vt?lyrs=m@257000000\u0026src=api\u0026hl=en-US\u0026","https://mts1.google.com/vt?lyrs=m@257000000\u0026src=api\u0026hl=en-US\u0026"]],[["http://khm0.googleapis.com/kh?v=146\u0026hl=en-US\u0026","http://khm1.googleapis.com/kh?v=146\u0026hl=en-US\u0026"],null,null,null,1,"146",["https://khms0.google.com/kh?v=146\u0026hl=en-US\u0026","https://khms1.google.com/kh?v=146\u0026hl=en-US\u0026"]],[["http://mt0.googleapis.com/vt?lyrs=h@257000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=h@257000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"h@257000000",["https://mts0.google.com/vt?lyrs=h@257000000\u0026src=api\u0026hl=en-US\u0026","https://mts1.google.com/vt?lyrs=h@257000000\u0026src=api\u0026hl=en-US\u0026"]],[["http://mt0.googleapis.com/vt?lyrs=t@132,r@257000000\u0026src=api\u0026hl=en-US\u0026","http://mt1.googleapis.com/vt?lyrs=t@132,r@257000000\u0026src=api\u0026hl=en-US\u0026"],null,null,null,null,"t@132,r@257000000",["https://mts0.google.com/vt?lyrs=t@132,r@257000000\u0026src=api\u0026hl=en-US\u0026","https://mts1.google.com/vt?lyrs=t@132,r@257000000\u0026src=api\u0026hl=en-US\u0026"]],null,null,[["http://cbk0.googleapis.com/cbk?","http://cbk1.googleapis.com/cbk?"]],[["http://khm0.googleapis.com/kh?v=84\u0026hl=en-US\u0026","http://khm1.googleapis.com/kh?v=84\u0026hl=en-US\u0026"],null,null,null,null,"84",["https://khms0.google.com/kh?v=84\u0026hl=en-US\u0026","https://khms1.google.com/kh?v=84\u0026hl=en-US\u0026"]],[["http://mt0.googleapis.com/mapslt?hl=en-US\u0026","http://mt1.googleapis.com/mapslt?hl=en-US\u0026"]],[["http://mt0.googleapis.com/mapslt/ft?hl=en-US\u0026","http://mt1.googleapis.com/mapslt/ft?hl=en-US\u0026"]],[["http://mt0.googleapis.com/vt?hl=en-US\u0026","http://mt1.googleapis.com/vt?hl=en-US\u0026"]],[["http://mt0.googleapis.com/mapslt/loom?hl=en-US\u0026","http://mt1.googleapis.com/mapslt/loom?hl=en-US\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=en-US\u0026","https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026","https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]],[["https://mts0.googleapis.com/mapslt/loom?hl=en-US\u0026","https://mts1.googleapis.com/mapslt/loom?hl=en-US\u0026"]]],["en-US","US",null,0,null,null,"http://maps.gstatic.com/mapfiles/","http://csi.gstatic.com","https://maps.googleapis.com","http://maps.googleapis.com"],["http://maps.gstatic.com/intl/en_us/mapfiles/api-3/16/6","3.16.6"],[4097950789],1,null,null,null,null,0,"",null,null,0,"http://khm.googleapis.com/mz?v=146\u0026",null,"https://earthbuilder.googleapis.com","https://earthbuilder.googleapis.com",null,"http://mt.googleapis.com/vt/icon",[["http://mt0.googleapis.com/vt","http://mt1.googleapis.com/vt"],["https://mts0.googleapis.com/vt","https://mts1.googleapis.com/vt"],[null,[[0,"m",257000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[47],[37,[["smartmaps"]]]]],0],[null,[[0,"m",257000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[47],[37,[["smartmaps"]]]]],3],[null,[[0,"m",257000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[50],[37,[["smartmaps"]]]]],0],[null,[[0,"m",257000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[50],[37,[["smartmaps"]]]]],3],[null,[[4,"t",132],[0,"r",132000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[5],[37,[["smartmaps"]]]]],0],[null,[[4,"t",132],[0,"r",132000000]],[null,"en-US","US",null,18,null,null,null,null,null,null,[[5],[37,[["smartmaps"]]]]],3],[null,null,[null,"en-US","US",null,18],0],[null,null,[null,"en-US","US",null,18],3],[null,null,[null,"en-US","US",null,18],6],[null,null,[null,"en-US","US",null,18],0],["https://mts0.google.com/vt","https://mts1.google.com/vt"],"/maps/vt"],2,500], loadScriptTime);
  };
  var loadScriptTime = (new Date).getTime();
  getScript("http://maps.gstatic.com/intl/en_us/mapfiles/api-3/16/6/main.js");
})();;
//MOUSEWHEEL JS
angular.module("monospaced.mousewheel",[]).directive("msdWheel",["$parse",function(e){return{restrict:"A, C",link:function(t,n,r){var i=e(r["msdWheel"]),s=function(e,n,r,s){t.$apply(function(){i(t,{$event:e,$delta:n,$deltaX:r,$deltaY:s})})},o;if(typeof Hamster==="undefined"){n.bind("wheel",function(e){t.$apply(function(){i(t,{$event:e})})});return}if(!(o=n.data("hamster"))){o=Hamster(n[0]);n.data("hamster",o)}o.wheel(s);t.$on("$destroy",function(){o.unwheel(s)})}}}]);

//ROUTEJS
/*
 AngularJS v1.2.13
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(h,e,A){'use strict';function u(w,q,k){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,c,b,f,n){function y(){l&&(l.$destroy(),l=null);g&&(k.leave(g),g=null)}function v(){var b=w.current&&w.current.locals;if(e.isDefined(b&&b.$template)){var b=a.$new(),f=w.current;g=n(b,function(d){k.enter(d,null,g||c,function(){!e.isDefined(t)||t&&!a.$eval(t)||q()});y()});l=f.scope=b;l.$emit("$viewContentLoaded");l.$eval(h)}else y()}var l,g,t=b.autoscroll,h=b.onload||"";
a.$on("$routeChangeSuccess",v);v()}}}function z(e,h,k){return{restrict:"ECA",priority:-400,link:function(a,c){var b=k.current,f=b.locals;c.html(f.$template);var n=e(c.contents());b.controller&&(f.$scope=a,f=h(b.controller,f),b.controllerAs&&(a[b.controllerAs]=f),c.data("$ngControllerController",f),c.children().data("$ngControllerController",f));n(a)}}}h=e.module("ngRoute",["ng"]).provider("$route",function(){function h(a,c){return e.extend(new (e.extend(function(){},{prototype:a})),c)}function q(a,
e){var b=e.caseInsensitiveMatch,f={originalPath:a,regexp:a},h=f.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,e,b,c){a="?"===c?c:null;c="*"===c?c:null;h.push({name:b,optional:!!a});e=e||"";return""+(a?"":e)+"(?:"+(a?e:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");f.regexp=RegExp("^"+a+"$",b?"i":"");return f}var k={};this.when=function(a,c){k[a]=e.extend({reloadOnSearch:!0},c,a&&q(a,c));if(a){var b="/"==a[a.length-1]?a.substr(0,a.length-
1):a+"/";k[b]=e.extend({redirectTo:a},q(b,c))}return this};this.otherwise=function(a){this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(a,c,b,f,n,q,v,l){function g(){var d=t(),m=r.current;if(d&&m&&d.$$route===m.$$route&&e.equals(d.pathParams,m.pathParams)&&!d.reloadOnSearch&&!x)m.params=d.params,e.copy(m.params,b),a.$broadcast("$routeUpdate",m);else if(d||m)x=!1,a.$broadcast("$routeChangeStart",d,m),(r.current=
d)&&d.redirectTo&&(e.isString(d.redirectTo)?c.path(u(d.redirectTo,d.params)).search(d.params).replace():c.url(d.redirectTo(d.pathParams,c.path(),c.search())).replace()),f.when(d).then(function(){if(d){var a=e.extend({},d.resolve),c,b;e.forEach(a,function(d,c){a[c]=e.isString(d)?n.get(d):n.invoke(d)});e.isDefined(c=d.template)?e.isFunction(c)&&(c=c(d.params)):e.isDefined(b=d.templateUrl)&&(e.isFunction(b)&&(b=b(d.params)),b=l.getTrustedResourceUrl(b),e.isDefined(b)&&(d.loadedTemplateUrl=b,c=q.get(b,
{cache:v}).then(function(a){return a.data})));e.isDefined(c)&&(a.$template=c);return f.all(a)}}).then(function(c){d==r.current&&(d&&(d.locals=c,e.copy(d.params,b)),a.$broadcast("$routeChangeSuccess",d,m))},function(c){d==r.current&&a.$broadcast("$routeChangeError",d,m,c)})}function t(){var a,b;e.forEach(k,function(f,k){var p;if(p=!b){var s=c.path();p=f.keys;var l={};if(f.regexp)if(s=f.regexp.exec(s)){for(var g=1,q=s.length;g<q;++g){var n=p[g-1],r="string"==typeof s[g]?decodeURIComponent(s[g]):s[g];
n&&r&&(l[n.name]=r)}p=l}else p=null;else p=null;p=a=p}p&&(b=h(f,{params:e.extend({},c.search(),a),pathParams:a}),b.$$route=f)});return b||k[null]&&h(k[null],{params:{},pathParams:{}})}function u(a,c){var b=[];e.forEach((a||"").split(":"),function(a,d){if(0===d)b.push(a);else{var e=a.match(/(\w+)(.*)/),f=e[1];b.push(c[f]);b.push(e[2]||"");delete c[f]}});return b.join("")}var x=!1,r={routes:k,reload:function(){x=!0;a.$evalAsync(g)}};a.$on("$locationChangeSuccess",g);return r}]});h.provider("$routeParams",
function(){this.$get=function(){return{}}});h.directive("ngView",u);h.directive("ngView",z);u.$inject=["$route","$anchorScroll","$animate"];z.$inject=["$compile","$controller","$route"]})(window,window.angular);
;(function() {
  angular.module("cropme", ["ngSanitize"]).directive("cropme", [
    "$window", "$timeout", "$rootScope", function($window, $timeout, $rootScope) {
      var borderSensitivity, checkScopeVariables, minHeight, offset;
      minHeight = 100;
      borderSensitivity = 8;
      checkScopeVariables = function(scope) {
        if (scope.destinationHeight) {
          if (scope.ratio) {
            throw "You can't specify both destinationHeight and ratio, destinationHeight = destinationWidth * ratio";
          } else {
            scope.ratio = destinationHeight / destinationWidth;
          }
        } else if (scope.ratio) {
          scope.destinationHeight = scope.destinationWidth * scope.ratio;
        }
        if (scope.ratio && scope.height && scope.destinationHeight > scope.height) {
          throw "Can't initialize cropme: destinationWidth x ratio needs to be lower than height";
        }
        if (scope.destinationWidth > scope.width) {
          throw "Can't initialize cropme: destinationWidth needs to be lower than width";
        }
        if (scope.ratio && !scope.height) {
          scope.height = scope.destinationHeight;
        }
        return scope.type || (scope.type = "png");
      };
      offset = function(el) {
        var offsetLeft, offsetTop;
        offsetTop = 0;
        offsetLeft = 0;
        while (el) {
          offsetTop += el.offsetTop;
          offsetLeft += el.offsetLeft;
          el = el.offsetParent;
        }
        return {
          top: offsetTop,
          left: offsetLeft
        };
      };
      return {
        template: "<div\n   class=\"step-1\"\n  ng-show=\"state == 'step-1'\"\n ng-style=\"{'width': width + 'px', 'height': height + 'px'}\">\n    <dropbox ng-class=\"dropClass\"></dropbox>\n    <div class=\"cropme-error\" ng-bind-html=\"dropError\"></div>\n <div class=\"cropme-file-input\">\n     <input type=\"file\"/>\n        <div\n          class=\"cropme-button\"\n           ng-click=\"browseFiles()\">\n               Browse picture\n        </div>\n        <div class=\"cropme-or\">or</div>\n     <div class=\"cropme-label\" ng-class=\"iconClass\">{{dropText}}</div>\n </div>\n</div>\n<div\n  class=\"step-2\"\n  ng-show=\"state == 'step-2'\"\n ng-style=\"{'width': width + 'px'}\"\n  ng-mousemove=\"mousemove($event)\"\n    ng-mousedown=\"mousedown($event)\"\n    ng-mouseup=\"mouseup($event)\"\n    ng-mouseleave=\"deselect()\"\n  ng-class=\"{'col-resize': colResizePointer}\">\n    <img ng-src=\"{{imgSrc}}\" ng-style=\"{'width': width + 'px'}\"/>\n <div class=\"overlay-tile\" ng-style=\"{'top': 0, 'left': 0, 'width': xCropZone + 'px', 'height': yCropZone + 'px'}\"></div>\n  <div class=\"overlay-tile\" ng-style=\"{'top': 0, 'left': xCropZone + 'px', 'width': widthCropZone + 'px', 'height': yCropZone + 'px'}\"></div>\n   <div class=\"overlay-tile\" ng-style=\"{'top': 0, 'left': xCropZone + widthCropZone + 'px', 'right': 0, 'height': yCropZone + 'px'}\"></div>\n  <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + 'px', 'left': xCropZone + widthCropZone + 'px', 'right': 0, 'height': heightCropZone + 'px'}\"></div>\n  <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + heightCropZone + 'px', 'left': xCropZone + widthCropZone + 'px', 'right': 0, 'bottom': 0}\"></div>\n <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + heightCropZone + 'px', 'left': xCropZone + 'px', 'width': widthCropZone + 'px', 'bottom': 0}\"></div>\n  <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + heightCropZone + 'px', 'left': 0, 'width': xCropZone + 'px', 'bottom': 0}\"></div>\n <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + 'px', 'left': 0, 'width': xCropZone + 'px', 'height': heightCropZone + 'px'}\"></div>\n  <div class=\"overlay-border\" ng-style=\"{'top': (yCropZone - 2) + 'px', 'left': (xCropZone - 2) + 'px', 'width': widthCropZone + 'px', 'height': heightCropZone + 'px'}\"></div>\n</div>\n<div class=\"cropme-actions\" ng-show=\"state == 'step-2'\">\n   <button id=\"cropme-cancel\" ng-click=\"cancel()\">Cancel</button>\n    <button id=\"cropme-ok\" ng-click=\"ok()\">Ok</button>\n</div>\n<canvas\n   width=\"{{destinationWidth}}\"\n    height=\"{{destinationHeight}}\"\n  ng-style=\"{'width': destinationWidth + 'px', 'height': destinationHeight + 'px'}\">\n</canvas>",
        restrict: "E",
        scope: {
          width: "=",
          destinationWidth: "=",
          height: "=?",
          destinationHeight: "=?",
          iconClass: "=?",
          ratio: "=?",
          type: "=?"
        },
        link: function(scope, element, attributes) {
          var $input, canvasEl, checkBounds, checkHRatio, checkVRatio, ctx, draggingFn, elOffset, grabbedBorder, heightWithImage, imageAreaEl, imageEl, isNearBorders, moveBorders, moveCropZone, nearHSegment, nearVSegment, startCropping, zoom;
          scope.dropText = "Drop picture here";
          scope.state = "step-1";
          draggingFn = null;
          grabbedBorder = null;
          heightWithImage = null;
          zoom = null;
          elOffset = null;
          imageEl = element.find('img')[0];
          canvasEl = element.find("canvas")[0];
          ctx = canvasEl.getContext("2d");
          startCropping = function(imageWidth, imageHeight) {
            zoom = scope.width / imageWidth;
            heightWithImage = imageHeight * zoom;
            scope.widthCropZone = Math.round(scope.destinationWidth * zoom);
            scope.heightCropZone = Math.round((scope.destinationHeight || minHeight) * zoom);
            scope.xCropZone = Math.round((scope.width - scope.widthCropZone) / 2);
            scope.yCropZone = Math.round((scope.height - scope.heightCropZone) / 2);
            return $timeout(function() {
              return elOffset = offset(imageAreaEl);
            });
          };
          imageAreaEl = element[0].getElementsByClassName("step-2")[0];
          checkScopeVariables(scope);
          $input = element.find("input");
          $input.bind("change", function() {
            var file;
            file = this.files[0];
            return scope.$apply(function() {
              return scope.setFiles(file);
            });
          });
          $input.bind("click", function(e) {
            e.stopPropagation();
            return $input.val("");
          });
          scope.browseFiles = function() {
            return $input[0].click();
          };
          scope.setFiles = function(file) {
            var reader;
            if (!file.type.match(/^image\//)) {
              return scope.dropError = "Wrong file type, please select an image.";
            }
            scope.dropError = "";
            reader = new FileReader;
            reader.onload = function(e) {
              imageEl.onload = function() {
                var errors, height, width;
                width = imageEl.naturalWidth;
                height = imageEl.naturalHeight;
                errors = [];
                if (width < scope.width) {
                  errors.push("The image you dropped has a width of " + width + ", but the minimum is " + scope.width + ".");
                }
                if (scope.height && height < scope.height) {
                  errors.push("The image you dropped has a height of " + height + ", but the minimum is " + scope.height + ".");
                }
                if (scope.ratio && scope.destinationHeight > height) {
                  errors.push("The image you dropped has a height of " + height + ", but the minimum is " + scope.destinationHeight + ".");
                }
                return scope.$apply(function() {
                  if (errors.length) {
                    return scope.dropError = errors.join("<br/>");
                  } else {
                    $rootScope.$broadcast("cropme:loaded", width, height);
                    scope.state = "step-2";
                    return startCropping(width, height);
                  }
                });
              };
              return scope.$apply(function() {
                return scope.imgSrc = e.target.result;
              });
            };
            return reader.readAsDataURL(file);
          };
          moveCropZone = function(ev) {
            scope.xCropZone = ev.pageX - elOffset.left - scope.widthCropZone / 2;
            scope.yCropZone = ev.pageY - elOffset.top - scope.heightCropZone / 2;
            return checkBounds();
          };
          moveBorders = {
            top: function(ev) {
              var y;
              y = ev.pageY - elOffset.top;
              scope.heightCropZone += scope.yCropZone - y;
              scope.yCropZone = y;
              checkVRatio();
              return checkBounds();
            },
            right: function(ev) {
              var x;
              x = ev.pageX - elOffset.left;
              scope.widthCropZone = x - scope.xCropZone;
              checkHRatio();
              return checkBounds();
            },
            bottom: function(ev) {
              var y;
              y = ev.pageY - elOffset.top;
              scope.heightCropZone = y - scope.yCropZone;
              checkVRatio();
              return checkBounds();
            },
            left: function(ev) {
              var x;
              x = ev.pageX - elOffset.left;
              scope.widthCropZone += scope.xCropZone - x;
              scope.xCropZone = x;
              checkHRatio();
              return checkBounds();
            }
          };
          checkHRatio = function() {
            if (scope.ratio) {
              return scope.heightCropZone = scope.widthCropZone * scope.ratio;
            }
          };
          checkVRatio = function() {
            if (scope.ratio) {
              return scope.widthCropZone = scope.heightCropZone / scope.ratio;
            }
          };
          checkBounds = function() {
            if (scope.xCropZone < 0) {
              scope.xCropZone = 0;
            }
            if (scope.yCropZone < 0) {
              scope.yCropZone = 0;
            }
            if (scope.widthCropZone < scope.destinationWidth * zoom) {
              scope.widthCropZone = scope.destinationWidth * zoom;
              checkHRatio();
            } else if (scope.destinationHeight && scope.heightCropZone < scope.destinationHeight * zoom) {
              scope.heightCropZone = scope.destinationHeight * zoom;
              checkVRatio();
            }
            if (scope.xCropZone + scope.widthCropZone > scope.width) {
              scope.xCropZone = scope.width - scope.widthCropZone;
              if (scope.xCropZone < 0) {
                scope.widthCropZone = scope.width;
                scope.xCropZone = 0;
                checkHRatio();
              }
            }
            if (scope.yCropZone + scope.heightCropZone > heightWithImage) {
              scope.yCropZone = heightWithImage - scope.heightCropZone;
              if (scope.yCropZone < 0) {
                scope.heightCropZone = heightWithImage;
                scope.yCropZone = 0;
                return checkVRatio();
              }
            }
          };
          isNearBorders = function(ev) {
            var bottomLeft, bottomRight, h, topLeft, topRight, w, x, y;
            x = scope.xCropZone + elOffset.left;
            y = scope.yCropZone + elOffset.top;
            w = scope.widthCropZone;
            h = scope.heightCropZone;
            topLeft = {
              x: x,
              y: y
            };
            topRight = {
              x: x + w,
              y: y
            };
            bottomLeft = {
              x: x,
              y: y + h
            };
            bottomRight = {
              x: x + w,
              y: y + h
            };
            return nearHSegment(ev, x, w, y, "top") || nearVSegment(ev, y, h, x + w, "right") || nearHSegment(ev, x, w, y + h, "bottom") || nearVSegment(ev, y, h, x, "left");
          };
          nearHSegment = function(ev, x, w, y, borderName) {
            if (ev.pageX >= x && ev.pageX <= x + w && Math.abs(ev.pageY - y) <= borderSensitivity) {
              return borderName;
            }
          };
          nearVSegment = function(ev, y, h, x, borderName) {
            if (ev.pageY >= y && ev.pageY <= y + h && Math.abs(ev.pageX - x) <= borderSensitivity) {
              return borderName;
            }
          };
          scope.mousedown = function(e) {
            grabbedBorder = isNearBorders(e);
            if (grabbedBorder) {
              draggingFn = moveBorders[grabbedBorder];
            } else {
              draggingFn = moveCropZone;
            }
            return draggingFn(e);
          };
          scope.mouseup = function(e) {
            if (draggingFn) {
              draggingFn(e);
            }
            return draggingFn = null;
          };
          scope.mousemove = function(e) {
            if (draggingFn) {
              draggingFn(e);
            }
            return scope.colResizePointer = isNearBorders(e);
          };
          scope.deselect = function() {
            return draggingFn = null;
          };
          scope.cancel = function() {
            scope.dropText = "Drop files here";
            scope.dropClass = "";
            return scope.state = "step-1";
          };
          scope.ok = function() {
            scope.croppedWidth = scope.widthCropZone / zoom;
            scope.croppedHeight = scope.heightCropZone / zoom;
            return $timeout(function() {
              var destinationHeight;
              destinationHeight = scope.destinationHeight || scope.destinationWidth * scope.croppedHeight / scope.croppedWidth;
              ctx.drawImage(imageEl, scope.xCropZone / zoom, scope.yCropZone / zoom, scope.croppedWidth, scope.croppedHeight, 0, 0, scope.destinationWidth, scope.destinationHeight);
              return canvasEl.toBlob(function(blob) {
                return $rootScope.$broadcast("cropme:done", blob);
              }, 'image/' + scope.type);
            });
          };
          scope.$on("cropme:cancel", scope.cancel);
          return scope.$on("cropme:ok", scope.ok);
        }
      };
    }
  ]);

  angular.module("cropme").directive("dropbox", function() {
    return {
      restrict: "E",
      link: function(scope, element, attributes) {
        var dragEnterLeave, dropbox;
        dragEnterLeave = function(evt) {
          evt.stopPropagation();
          evt.preventDefault();
          return scope.$apply(function() {
            scope.dropText = "Drop files here";
            return scope.dropClass = "";
          });
        };
        dropbox = element[0];
        scope.dropText = "Drop files here";
        dropbox.addEventListener("dragenter", dragEnterLeave, false);
        dropbox.addEventListener("dragleave", dragEnterLeave, false);
        dropbox.addEventListener("dragover", (function(evt) {
          var ok;
          evt.stopPropagation();
          evt.preventDefault();
          ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf("Files") >= 0;
          return scope.$apply(function() {
            scope.dropText = (ok ? "Drop now" : "Only files are allowed");
            return scope.dropClass = (ok ? "over" : "not-available");
          });
        }), false);
        return dropbox.addEventListener("drop", (function(evt) {
          var files;
          evt.stopPropagation();
          evt.preventDefault();
          scope.$apply(function() {
            scope.dropText = "Drop files here";
            return scope.dropClass = "";
          });
          files = evt.dataTransfer.files;
          return scope.$apply(function() {
            var file, _i, _len;
            if (files.length > 0) {
              for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                if (file.type.match(/^image\//)) {
                  scope.dropText = "Loading image...";
                  scope.dropClass = "loading";
                  return scope.setFiles(file);
                }
                scope.dropError = "Wrong file type, please drop at least an image.";
              }
            }
          });
        }), false);
      }
    };
  });

  (function(view) {
    "use strict";
    var HTMLCanvasElement, Uint8Array, base64_ranks, decode_base64, is_base64_regex;
    Uint8Array = view.Uint8Array;
    HTMLCanvasElement = view.HTMLCanvasElement;
    is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i;
    base64_ranks = void 0;
    decode_base64 = function(base64) {
      var buffer, code, i, last, len, outptr, rank, save, state, undef;
      len = base64.length;
      buffer = new Uint8Array(len / 4 * 3 | 0);
      i = 0;
      outptr = 0;
      last = [0, 0];
      state = 0;
      save = 0;
      rank = void 0;
      code = void 0;
      undef = void 0;
      while (len--) {
        code = base64.charCodeAt(i++);
        rank = base64_ranks[code - 43];
        if (rank !== 255 && rank !== undef) {
          last[1] = last[0];
          last[0] = code;
          save = (save << 6) | rank;
          state++;
          if (state === 4) {
            buffer[outptr++] = save >>> 16;
            if (last[1] !== 61) {
              buffer[outptr++] = save >>> 8;
            }
            if (last[0] !== 61) {
              buffer[outptr++] = save;
            }
            state = 0;
          }
        }
      }
      return buffer;
    };
    if (Uint8Array) {
      base64_ranks = new Uint8Array([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
    }
    if (HTMLCanvasElement && !HTMLCanvasElement.prototype.toBlob) {
      return HTMLCanvasElement.prototype.toBlob = function(callback, type) {
        var args, blob, data, dataURI, header_end, is_base64;
        if (!type) {
          type = "image/png";
        }
        if (this.mozGetAsFile) {
          callback(this.mozGetAsFile("canvas", type));
          return;
        }
        args = Array.prototype.slice.call(arguments, 1);
        dataURI = this.toDataURL.apply(this, args);
        header_end = dataURI.indexOf(",");
        data = dataURI.substring(header_end + 1);
        is_base64 = is_base64_regex.test(dataURI.substring(0, header_end));
        blob = void 0;
        if (Blob.fake) {
          blob = new Blob;
          if (is_base64) {
            blob.encoding = "base64";
          } else {
            blob.encoding = "URI";
          }
          blob.data = data;
          blob.size = data.length;
        } else if (Uint8Array) {
          if (is_base64) {
            blob = new Blob([decode_base64(data)], {
              type: type
            });
          } else {
            blob = new Blob([decodeURIComponent(data)], {
              type: type
            });
          }
        }
        return callback(blob);
      };
    }
  })(self);

}).call(this);;"use strict";angular.module("directive.g+signin",[]).directive("googlePlusSignin",function(){var e=/\.apps\.googleusercontent\.com$/;return{restrict:"E",template:'<span class="g-signin"></span>',replace:true,link:function(t,n,r){r.clientid+=e.test(r.clientid)?"":".apps.googleusercontent.com";r.$set("data-clientid",r.clientid);var i={callback:"signinCallback",cookiepolicy:"single_host_origin",requestvisibleactions:"http://schemas.google.com/AddActivity",scope:"https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email",width:"wide"};angular.forEach(Object.getOwnPropertyNames(i),function(e){if(!r.hasOwnProperty(e)){r.$set("data-"+e,i[e])}});r.$observe("language",function(e){window.___gcfg={lang:e?e:"en"}});(function(){var e=document.createElement("script");e.type="text/javascript";e.async=true;e.src="https://apis.google.com/js/client:plusone.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})()}}}).run(["$window","$rootScope",function(e,t){e.signinCallback=function(e){if(e&&e.access_token){t.$broadcast("event:google-plus-signin-success",e)}else{t.$broadcast("event:google-plus-signin-failure",e)}}}]);//HAMSTER MIN JS (mousewheel backward side)
(function(e,t){"use strict";var n=function(e){return new n.Instance(e)};n.SUPPORT="wheel";n.ADD_EVENT="addEventListener";n.REMOVE_EVENT="removeEventListener";n.PREFIX="";n.READY=false;n.Instance=function(e){if(!n.READY){n.normalise.browser();n.READY=true}this.element=e;this.handlers=[];return this};n.Instance.prototype={wheel:function(t,r){n.event.add(this,n.SUPPORT,t,r);if(n.SUPPORT==="DOMMouseScroll"){n.event.add(this,"MozMousePixelScroll",t,r)}return this},unwheel:function(t,r){if(t===undefined&&(t=this.handlers.slice(-1)[0])){t=t.original}n.event.remove(this,n.SUPPORT,t,r);if(n.SUPPORT==="DOMMouseScroll"){n.event.remove(this,"MozMousePixelScroll",t,r)}return this}};n.event={add:function(r,i,s,o){var u=s;s=function(t){if(!t){t=e.event}var r=n.normalise.event(t),i=n.normalise.delta(t);return u(r,i[0],i[1],i[2])};r.element[n.ADD_EVENT](n.PREFIX+i,s,o||false);r.handlers.push({original:u,normalised:s})},remove:function(t,r,i,s){var o=i,u={},a;for(var f=0,l=t.handlers.length;f<l;++f){u[t.handlers[f].original]=t.handlers[f]}a=u[o];i=a.normalised;t.element[n.REMOVE_EVENT](n.PREFIX+r,i,s||false);for(var c in t.handlers){if(t.handlers[c]==a){t.handlers.splice(c,1);break}}}};var r,i;n.normalise={browser:function(){if(!("onwheel"in t||t.documentMode>=9)){n.SUPPORT=t.onmousewheel!==undefined?"mousewheel":"DOMMouseScroll"}if(!e.addEventListener){n.ADD_EVENT="attachEvent";n.REMOVE_EVENT="detachEvent";n.PREFIX="on"}},event:function(t){var r=n.SUPPORT==="wheel"?t:{originalEvent:t,target:t.target||t.srcElement,type:"wheel",deltaMode:t.type==="MozMousePixelScroll"?0:1,deltaX:0,delatZ:0,preventDefault:function(){if(t.preventDefault){t.preventDefault()}else{t.returnValue=false}},stopPropagation:function(){if(t.stopPropagation){t.stopPropagation()}else{t.cancelBubble=false}}};if(t.wheelDelta){r.deltaY=-1/40*t.wheelDelta}if(t.wheelDeltaX){r.deltaX=-1/40*t.wheelDeltaX}if(t.detail){r.deltaY=t.detail}return r},delta:function(t){var n=0,s=0,o=0,u=0,a=0,f;if(t.deltaY){o=t.deltaY*-1;n=o}if(t.deltaX){s=t.deltaX;n=s*-1}if(t.wheelDelta){n=t.wheelDelta}if(t.wheelDeltaY){o=t.wheelDeltaY}if(t.wheelDeltaX){s=t.wheelDeltaX*-1}if(t.detail){n=t.detail*-1}u=Math.abs(n);if(!r||u<r){r=u}a=Math.max(Math.abs(o),Math.abs(s));if(!i||a<i){i=a}f=n>0?"floor":"ceil";n=Math[f](n/r);s=Math[f](s/i);o=Math[f](o/i);return[n,s,o]}};e.Hamster=n;if(typeof e.define==="function"&&e.define.amd){e.define("hamster",[],function(){return n})}})(window,window.document)
;angular.module("sticky", []).directive("sticky", function($window) {
  return {
    link: function(scope, element, attrs) {

      var $win = angular.element($window);

      if (scope._stickyElements === undefined) {
        scope._stickyElements = [];

        $win.bind("scroll.sticky", function(e) {
          var pos = $win.scrollLeft();
          console.log(pos);
          for (var i=0; i<scope._stickyElements.length; i++) {

            var item = scope._stickyElements[i];

            if (!item.isStuck && pos > item.start) {
              item.element.addClass("stuck");
              item.isStuck = true;

              if (item.placeholder) {
                item.placeholder = angular.element("<div></div>")
                    .css({height: item.element.outerWidth() + "px",
                      display: 'inline-block',
                      float: "left"})
                    .insertBefore(item.element);
              }
            }
            else if (item.isStuck && pos < item.start) {
              item.element.removeClass("stuck");
              item.isStuck = false;

              if (item.placeholder) {
                item.placeholder.remove();
                item.placeholder = true;
              }
            }
          }
        });

        var recheckPositions = function() {
          for (var i=0; i<scope._stickyElements.length; i++) {
            var item = scope._stickyElements[i];
            if (!item.isStuck) {
              item.start = item.element.offset().top;
            } else if (item.placeholder) {
              item.start = item.placeholder.offset().top;
            }
          }
        };
        $win.bind("load", recheckPositions);
        $win.bind("resize", recheckPositions);
      }

      var item = {
        element: element,
        isStuck: false,
        placeholder: attrs.usePlaceholder !== undefined,
        start: element.offset().top
      };

      scope._stickyElements.push(item);

    }
  };
});