(function(){var e=this;function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function g(a,b,c){g=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return g.apply(null,arguments)};var h=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function l(a,b){return a<b?-1:a>b?1:0}function ca(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})}function da(a){var b="\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(a,b,k){return b+k.toUpperCase()})};function m(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}m.prototype.clone=function(){return new m(this.x,this.y)};m.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};m.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};m.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function n(a,b){this.width=a;this.height=b}n.prototype.clone=function(){return new n(this.width,this.height)};n.prototype.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};n.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};n.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function p(a,b,c,d){this.left=a;this.top=b;this.width=c;this.height=d}p.prototype.clone=function(){return new p(this.left,this.top,this.width,this.height)};p.prototype.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};p.prototype.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
p.prototype.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function ea(){var a=new p(200,200,250,250);this.f=new n(a.width,a.height);this.b=new m(a.left,a.top)};function fa(){this.b=[]}function q(a){var b=new ea;a.b.push(b);return new p(b.b.x,b.b.y,b.f.width,b.f.height)};var u;a:{var v=e.navigator;if(v){var w=v.userAgent;if(w){u=w;break a}}u=""};var x=-1!=u.indexOf("Opera")||-1!=u.indexOf("OPR"),y=-1!=u.indexOf("Trident")||-1!=u.indexOf("MSIE"),ga=-1!=u.indexOf("Edge"),z=-1!=u.indexOf("Gecko")&&!(-1!=u.toLowerCase().indexOf("webkit")&&-1==u.indexOf("Edge"))&&!(-1!=u.indexOf("Trident")||-1!=u.indexOf("MSIE"))&&-1==u.indexOf("Edge"),A=-1!=u.toLowerCase().indexOf("webkit")&&-1==u.indexOf("Edge");function B(){var a=e.document;return a?a.documentMode:void 0}var C;
a:{var D="",E=function(){var a=u;if(z)return/rv\:([^\);]+)(\)|;)/.exec(a);if(ga)return/Edge\/([\d\.]+)/.exec(a);if(y)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(A)return/WebKit\/(\S+)/.exec(a);if(x)return/(?:Version)[ \/]?(\S+)/.exec(a)}();E&&(D=E?E[1]:"");if(y){var F=B();if(null!=F&&F>parseFloat(D)){C=String(F);break a}}C=D}var G={};
function H(a){if(!G[a]){for(var b=0,c=h(String(C)).split("."),d=h(String(a)).split("."),k=Math.max(c.length,d.length),f=0;0==b&&f<k;f++){var ia=c[f]||"",ja=d[f]||"",ka=RegExp("(\\d*)(\\D*)","g"),la=RegExp("(\\d*)(\\D*)","g");do{var r=ka.exec(ia)||["","",""],t=la.exec(ja)||["","",""];if(0==r[0].length&&0==t[0].length)break;b=l(0==r[1].length?0:parseInt(r[1],10),0==t[1].length?0:parseInt(t[1],10))||l(0==r[2].length,0==t[2].length)||l(r[2],t[2])}while(0==b)}G[a]=0<=b}}
var I=e.document,ha=I&&y?B()||("CSS1Compat"==I.compatMode?parseInt(C,10):5):void 0;var J;if(!(J=!z&&!y)){var K;if(K=y)K=9<=Number(ha);J=K}J||z&&H("1.9.1");y&&H("9");function L(a){this.c=a;this.b()}function M(a,b){a.a.onclick=b}L.prototype.f=function(){return this.a};L.prototype.b=function(){this.a=document.createElement("BUTTON");this.a.setAttribute("class","button");this.a.innerHTML=this.c};function N(){this.b();this.a=[]}function O(a,b){a.a.push(b);a.c.appendChild(b.f())}N.prototype.f=function(){return this.c};N.prototype.b=function(){this.c=document.createElement("DIV");this.c.setAttribute("id","toolbar")};function P(){this.b()}P.prototype.f=function(){return this.a};P.prototype.b=function(){this.a=document.createElement("INPUT");this.a.id="imageInput";this.a.type="text";this.a.setAttribute("placeholder","\u0412\u0432\u0435\u0434\u0438\u0442\u0435 Url \u0438\u043b\u0438 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0430\u0434\u0440\u0435\u0441 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0438");this.a.onfocus=g(this.c,this)};P.prototype.c=function(){this.a.setAttribute("value","")};function Q(a,b,c){if("string"==typeof b)(b=R(a,b))&&(a.style[b]=c);else for(var d in b){c=a;var k=b[d],f=R(c,d);f&&(c.style[f]=k)}}var S={};function R(a,b){var c=S[b];if(!c){var d=ca(b),c=d;void 0===a.style[d]&&(d=(A?"Webkit":z?"Moz":y?"ms":x?"O":null)+da(d),void 0!==a.style[d]&&(c=d));S[b]=c}return c};var ma="se s sw e w ne n nw".split(" ");function T(a){this.c=a;this.b()}T.prototype.f=function(){return this.a};
T.prototype.b=function(){this.a=document.createElement("DIV");this.a.setAttribute("class","border");Q(this.a,"width",this.c.width+"px");Q(this.a,"height",this.c.height+"px");Q(this.a,"display","none");for(var a=0,b=0;2>=b;++b)for(var c=0;2>=c;++c)if(1!=b||1!=c){var d=.5*c*this.c.width,k=.5*b*this.c.height,f=document.createElement("DIV");f.setAttribute("class",ma[a]);Q(f,"left",d-5+"px");Q(f,"top",k-5+"px");Q(f,"width","10px");Q(f,"height","10px");this.a.appendChild(f);++a}};function U(a,b){this.g=b;this.c=a;this.b();this.h=new T(a);this.a.appendChild(this.h.f())}U.prototype.f=function(){return this.a};U.prototype.b=function(){this.a=document.createElement("DIV");this.a.setAttribute("class","capture");Q(this.a,"top",this.c.top+"px");Q(this.a,"left",this.c.left+"px");var a=document.createElement("IMG");a.setAttribute("src",this.g);a.setAttribute("alt","\u0442\u0435\u043a\u0441\u0442");Q(a,"width",this.c.width+"px");Q(a,"height",this.c.height+"px");this.a.appendChild(a)};function na(){var a=document.createDocumentFragment();a.appendChild(oa(this));a.appendChild(pa(this));a.appendChild(qa(this));a.appendChild(ra(this));document.body.appendChild(a);this.g=[]}function sa(a,b){a.b.onchange=b}function V(a,b,c){b=new U(b,c);a.a.appendChild(b.f());a.g.push(b)}function pa(a){a.c=new P;return a.c.f()}function qa(a){a.b=document.createElement("INPUT");a.b.type="file";a.b.setAttribute("accept","image/*");Q(a.b,"display","none");return a.b}
function oa(a){a.f=new N;O(a.f,new L("Undo"));O(a.f,new L("Redo"));O(a.f,new L("Add image"));return a.f.f()}function ra(a){a.a=document.createElement("DIV");a.a.id="canvas";return a.a};function W(a){this.f=a;this.b=new na;ta(this);this.a=[]}W.prototype.g=function(){var a=window.event.target,b=new FileReader;b.onload=g(function(){var a=b.result.toString(),d=q(this.f);V(this.b,d,a)},this);b.readAsDataURL(a.files[0])};W.prototype.h=function(){if(0==this.a.length)throw Error("Command stack is empty");console.log("undo");this.a.pop();null.i()};function ta(a){var b=a.b.f;M(b.a[0],g(a.h,a));M(b.a[1],function(){console.log("redo")});M(b.a[2],g(a.c,a));sa(a.b,g(a.g,a))}
W.prototype.c=function(){var a=this.b.c.a.value;if(a){var b=q(this.f);V(this.b,b,a)}else this.b.b.click()};function ua(){new W(new fa)}var X=["Sample","start"],Y=e;X[0]in Y||!Y.execScript||Y.execScript("var "+X[0]);for(var Z;X.length&&(Z=X.shift());)X.length||void 0===ua?Y[Z]?Y=Y[Z]:Y=Y[Z]={}:Y[Z]=ua;})();
