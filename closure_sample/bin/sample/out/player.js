(function(){function b(a,d){this.x=void 0!==a?a:0;this.y=void 0!==d?d:0}b.prototype.clone=function(){return new b(this.x,this.y)};b.prototype.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};b.prototype.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};b.prototype.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function c(a,d){this.b=a;this.a=d}c.prototype.clone=function(){return new c(this.b,this.a)};c.prototype.ceil=function(){this.b=Math.ceil(this.b);this.a=Math.ceil(this.a);return this};c.prototype.floor=function(){this.b=Math.floor(this.b);this.a=Math.floor(this.a);return this};c.prototype.round=function(){this.b=Math.round(this.b);this.a=Math.round(this.a);return this};function e(a,d,p,q){this.b=a;this.c=d;this.f=p;this.a=q}e.prototype.clone=function(){return new e(this.b,this.c,this.f,this.a)};e.prototype.ceil=function(){this.b=Math.ceil(this.b);this.c=Math.ceil(this.c);this.f=Math.ceil(this.f);this.a=Math.ceil(this.a);return this};e.prototype.floor=function(){this.b=Math.floor(this.b);this.c=Math.floor(this.c);this.f=Math.floor(this.f);this.a=Math.floor(this.a);return this};
e.prototype.round=function(){this.b=Math.round(this.b);this.c=Math.round(this.c);this.f=Math.round(this.f);this.a=Math.round(this.a);return this};function f(a){this.b=new c(a.f,a.a);this.a=new b(a.b,a.c)}f.prototype.g=function(){console.log("pos: "+this.a.x+", "+this.a.y);console.log("size: "+this.b.b+", "+this.b.a)};function g(){alert("created model");this.a=[]}function h(a){a.a.push(new f(new e(10,10,250,250)))}g.prototype.g=function(){for(var a=0;a<this.a.length;++a)console.log("###  images: "+(a+1)),this.a[a].g()};function k(){this.a=new g;h(this.a);h(this.a);h(this.a);h(this.a)};function l(){(new k).a.g()}var m=["Sample","start"],n=this;m[0]in n||!n.execScript||n.execScript("var "+m[0]);for(var r;m.length&&(r=m.shift());)m.length||void 0===l?n[r]?n=n[r]:n=n[r]={}:n[r]=l;})();
