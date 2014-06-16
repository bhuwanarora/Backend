(function(){angular.module("cropme",["ngSanitize"]).directive("cropme",["$window","$timeout","$rootScope",function(a,b,c){var d,e,f,g;return f=100,d=8,e=function(a){if(a.destinationHeight){if(a.ratio)throw"You can't specify both destinationHeight and ratio, destinationHeight = destinationWidth * ratio";a.ratio=destinationHeight/destinationWidth}else a.ratio&&(a.destinationHeight=a.destinationWidth*a.ratio);if(a.ratio&&a.height&&a.destinationHeight>a.height)throw"Can't initialize cropme: destinationWidth x ratio needs to be lower than height";if(a.destinationWidth>a.width)throw"Can't initialize cropme: destinationWidth needs to be lower than width";return a.ratio&&!a.height&&(a.height=a.destinationHeight),a.type||(a.type="png")},g=function(a){var b,c;for(c=0,b=0;a;)c+=a.offsetTop,b+=a.offsetLeft,a=a.offsetParent;return{top:c,left:b}},{template:"<div\n   ng-show=\"state == 'step-1'\"\n ng-style=\"{'width': width + 'px', 'height': height + 'px'}\">\n     <div class=\"cropme-file-input\">\n     <input type=\"file\"/>\n        <div\n          class=\"cropme-button\"\n           ng-click=\"browseFiles()\">\n            Upload Profile Picture          </div>\n            </div>\n</div>\n<div\n  class=\"step-2\"\n  ng-show=\"state == 'step-2'\"\n ng-style=\"{'width': width + 'px'}\"\n  ng-mousemove=\"mousemove($event)\"\n    ng-mousedown=\"mousedown($event)\"\n    ng-mouseup=\"mouseup($event)\"\n    ng-mouseleave=\"deselect()\"\n  ng-class=\"{'col-resize': colResizePointer}\">\n    <img ng-src=\"{{imgSrc}}\" ng-style=\"{'width': width + 'px'}\"/>\n <div class=\"overlay-tile\" ng-style=\"{'top': 0, 'left': 0, 'width': xCropZone + 'px', 'height': yCropZone + 'px'}\"></div>\n  <div class=\"overlay-tile\" ng-style=\"{'top': 0, 'left': xCropZone + 'px', 'width': widthCropZone + 'px', 'height': yCropZone + 'px'}\"></div>\n   <div class=\"overlay-tile\" ng-style=\"{'top': 0, 'left': xCropZone + widthCropZone + 'px', 'right': 0, 'height': yCropZone + 'px'}\"></div>\n  <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + 'px', 'left': xCropZone + widthCropZone + 'px', 'right': 0, 'height': heightCropZone + 'px'}\"></div>\n  <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + heightCropZone + 'px', 'left': xCropZone + widthCropZone + 'px', 'right': 0, 'bottom': 0}\"></div>\n <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + heightCropZone + 'px', 'left': xCropZone + 'px', 'width': widthCropZone + 'px', 'bottom': 0}\"></div>\n  <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + heightCropZone + 'px', 'left': 0, 'width': xCropZone + 'px', 'bottom': 0}\"></div>\n <div class=\"overlay-tile\" ng-style=\"{'top': yCropZone + 'px', 'left': 0, 'width': xCropZone + 'px', 'height': heightCropZone + 'px'}\"></div>\n  <div class=\"overlay-border\" ng-style=\"{'top': (yCropZone - 2) + 'px', 'left': (xCropZone - 2) + 'px', 'width': widthCropZone + 'px', 'height': heightCropZone + 'px'}\"></div>\n</div>\n<div class=\"cropme-actions\" ng-show=\"state == 'step-2'\">\n   <button id=\"cropme-cancel\" ng-click=\"cancel()\">Cancel</button>\n    <button id=\"cropme-ok\" ng-click=\"ok()\">Ok</button>\n</div>\n<canvas\n   width=\"{{destinationWidth}}\"\n    height=\"{{destinationHeight}}\"\n  ng-style=\"{'width': destinationWidth + 'px', 'height': destinationHeight + 'px'}\">\n</canvas>",restrict:"E",scope:{width:"=",destinationWidth:"=",height:"=?",destinationHeight:"=?",iconClass:"=?",ratio:"=?",type:"=?"},link:function(a,h){var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;return a.dropText="Drop picture here",a.state="step-1",o=null,q=null,r=null,A=null,p=null,t=h.find("img")[0],j=h.find("canvas")[0],n=j.getContext("2d"),z=function(c,d){return A=a.width/c,r=d*A,a.widthCropZone=Math.round(a.destinationWidth*A),a.heightCropZone=Math.round((a.destinationHeight||f)*A),a.xCropZone=Math.round((a.width-a.widthCropZone)/2),a.yCropZone=Math.round((a.height-a.heightCropZone)/2),b(function(){return p=g(s)})},s=h[0].getElementsByClassName("step-2")[0],e(a),i=h.find("input"),i.bind("change",function(){var b;return b=this.files[0],a.$apply(function(){return a.setFiles(b)})}),i.bind("click",function(a){return a.stopPropagation(),i.val("")}),a.browseFiles=function(){return i[0].click()},a.setFiles=function(b){var d;return b.type.match(/^image\//)?(a.dropError="",d=new FileReader,d.onload=function(b){return t.onload=function(){var b,d,e;return e=t.naturalWidth,d=t.naturalHeight,b=[],e<a.width&&b.push("The image you dropped has a width of "+e+", but the minimum is "+a.width+"."),a.height&&d<a.height&&b.push("The image you dropped has a height of "+d+", but the minimum is "+a.height+"."),a.ratio&&a.destinationHeight>d&&b.push("The image you dropped has a height of "+d+", but the minimum is "+a.destinationHeight+"."),a.$apply(function(){return b.length?a.dropError=b.join("<br/>"):(c.$broadcast("cropme:loaded",e,d),a.state="step-2",z(e,d))})},a.$apply(function(){return a.imgSrc=b.target.result})},d.readAsDataURL(b)):a.dropError="Wrong file type, please select an image."},w=function(b){return a.xCropZone=b.pageX-p.left-a.widthCropZone/2,a.yCropZone=b.pageY-p.top-a.heightCropZone/2,k()},v={top:function(b){var c;return c=b.pageY-p.top,a.heightCropZone+=a.yCropZone-c,a.yCropZone=c,m(),k()},right:function(b){var c;return c=b.pageX-p.left,a.widthCropZone=c-a.xCropZone,l(),k()},bottom:function(b){var c;return c=b.pageY-p.top,a.heightCropZone=c-a.yCropZone,m(),k()},left:function(b){var c;return c=b.pageX-p.left,a.widthCropZone+=a.xCropZone-c,a.xCropZone=c,l(),k()}},l=function(){return a.ratio?a.heightCropZone=a.widthCropZone*a.ratio:void 0},m=function(){return a.ratio?a.widthCropZone=a.heightCropZone/a.ratio:void 0},k=function(){return a.xCropZone<0&&(a.xCropZone=0),a.yCropZone<0&&(a.yCropZone=0),a.widthCropZone<a.destinationWidth*A?(a.widthCropZone=a.destinationWidth*A,l()):a.destinationHeight&&a.heightCropZone<a.destinationHeight*A&&(a.heightCropZone=a.destinationHeight*A,m()),a.xCropZone+a.widthCropZone>a.width&&(a.xCropZone=a.width-a.widthCropZone,a.xCropZone<0&&(a.widthCropZone=a.width,a.xCropZone=0,l())),a.yCropZone+a.heightCropZone>r&&(a.yCropZone=r-a.heightCropZone,a.yCropZone<0)?(a.heightCropZone=r,a.yCropZone=0,m()):void 0},u=function(b){var c,d,e,f,g,h,i,j;return i=a.xCropZone+p.left,j=a.yCropZone+p.top,h=a.widthCropZone,e=a.heightCropZone,f={x:i,y:j},g={x:i+h,y:j},c={x:i,y:j+e},d={x:i+h,y:j+e},x(b,i,h,j,"top")||y(b,j,e,i+h,"right")||x(b,i,h,j+e,"bottom")||y(b,j,e,i,"left")},x=function(a,b,c,e,f){return a.pageX>=b&&a.pageX<=b+c&&Math.abs(a.pageY-e)<=d?f:void 0},y=function(a,b,c,e,f){return a.pageY>=b&&a.pageY<=b+c&&Math.abs(a.pageX-e)<=d?f:void 0},a.mousedown=function(a){return q=u(a),(o=q?v[q]:w)(a)},a.mouseup=function(a){return o&&o(a),o=null},a.mousemove=function(b){return o&&o(b),a.colResizePointer=u(b)},a.deselect=function(){return o=null},a.cancel=function(){return a.dropText="Drop files here",a.dropClass="",a.state="step-1"},a.ok=function(){return a.croppedWidth=a.widthCropZone/A,a.croppedHeight=a.heightCropZone/A,b(function(){var b;return b=a.destinationHeight||a.destinationWidth*a.croppedHeight/a.croppedWidth,n.drawImage(t,a.xCropZone/A,a.yCropZone/A,a.croppedWidth,a.croppedHeight,0,0,a.destinationWidth,a.destinationHeight),j.toBlob(function(a){return c.$broadcast("cropme:done",a)},"image/"+a.type)})},a.$on("cropme:cancel",a.cancel),a.$on("cropme:ok",a.ok)}}}]),angular.module("cropme").directive("dropbox",function(){return{restrict:"E",link:function(a,b){var c,d;return c=function(b){return b.stopPropagation(),b.preventDefault(),a.$apply(function(){return a.dropText="Drop files here",a.dropClass=""})},d=b[0],a.dropText="Drop files here",d.addEventListener("dragenter",c,!1),d.addEventListener("dragleave",c,!1),d.addEventListener("dragover",function(b){var c;return b.stopPropagation(),b.preventDefault(),c=b.dataTransfer&&b.dataTransfer.types&&b.dataTransfer.types.indexOf("Files")>=0,a.$apply(function(){return a.dropText=c?"Drop now":"Only files are allowed",a.dropClass=c?"over":"not-available"})},!1),d.addEventListener("drop",function(b){var c;return b.stopPropagation(),b.preventDefault(),a.$apply(function(){return a.dropText="Drop files here",a.dropClass=""}),c=b.dataTransfer.files,a.$apply(function(){var b,d,e;if(c.length>0)for(d=0,e=c.length;e>d;d++){if(b=c[d],b.type.match(/^image\//))return a.dropText="Loading image...",a.dropClass="loading",a.setFiles(b);a.dropError="Wrong file type, please drop at least an image."}})},!1)}}}),function(a){"use strict";var b,c,d,e,f;return c=a.Uint8Array,b=a.HTMLCanvasElement,f=/\s*;\s*base64\s*(?:;|$)/i,d=void 0,e=function(a){var b,e,f,g,h,i,j,k,l,m;for(h=a.length,b=new c(h/4*3|0),f=0,i=0,g=[0,0],l=0,k=0,j=void 0,e=void 0,m=void 0;h--;)e=a.charCodeAt(f++),j=d[e-43],255!==j&&j!==m&&(g[1]=g[0],g[0]=e,k=k<<6|j,l++,4===l&&(b[i++]=k>>>16,61!==g[1]&&(b[i++]=k>>>8),61!==g[0]&&(b[i++]=k),l=0));return b},c&&(d=new c([62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51])),b&&!b.prototype.toBlob?b.prototype.toBlob=function(a,b){var d,g,h,i,j,k;return b||(b="image/png"),this.mozGetAsFile?void a(this.mozGetAsFile("canvas",b)):(d=Array.prototype.slice.call(arguments,1),i=this.toDataURL.apply(this,d),j=i.indexOf(","),h=i.substring(j+1),k=f.test(i.substring(0,j)),g=void 0,Blob.fake?(g=new Blob,g.encoding=k?"base64":"URI",g.data=h,g.size=h.length):c&&(g=k?new Blob([e(h)],{type:b}):new Blob([decodeURIComponent(h)],{type:b})),a(g))}:void 0}(self)}).call(this);