//https://github.com/malko/l.js
(function(){var e=function(e){(window.execScript||function(e){window.eval.call(window,e)})(e)},t=function(e,t){return e instanceof(t||Array)},n=document,r="getElementsByTagName",i="replace",s="match",o="length",u="readyState",a="onreadystatechange",f=n[r]("script"),l=f[f[o]-1].innerHTML[i](/^\s+|\s+$/g,"");if(typeof ljs!="undefined"){l&&e(l);return}var c=f[f[o]-1].src[s](/checkLoaded/)?!0:!1,h=n[r]("head")[0]||n.documentElement,p=function(e,t,r){var i=n.createElement(e),s;r&&(i[u]?i[a]=function(){if(i[u]==="loaded"||i[u]==="complete")i[a]=null,r()}:i.onload=r);for(s in t)i[s]=t[s];h.appendChild(i)},d=function(e,n){if(this.aliases&&this.aliases[e]){var r=this.aliases[e].slice(0);return t(r)||(r=[r]),n&&r.push(n),this.load.apply(this,r)}if(t(e)){for(var i=e.length;i--;)this.load(e[i]);return n&&e.push(n),this.load.apply(this,e)}return e[s](/\.css\b/)?this.loadcss(e,n):this.loadjs(e,n)},v={},m={aliases:{},loadjs:function(e,t){var n=e[s]("#")?e[i](/^[^#]+#/,""):null;return n&&(e=e[i](/#.*$/,"")),v[e]===!0?(t&&t(),this):v[e]!==undefined?(t&&(v[e]=function(e,t){return function(){e&&e(),t&&t()}}(v[e],t)),this):(v[e]=function(t){return function(){v[e]=!0,t&&t()}}(t),p("script",{type:"text/javascript",src:e,id:n},function(){v[e]()}),this)},loadcss:function(e,t){var n=e[s]("#")?e[i](/^[^#]+#/,""):null;return n&&(e=e[i](/#.*$/,"")),v[e]||p("link",{type:"text/css",rel:"stylesheet",href:e,id:n},function(){v[e]=!0}),v[e]=!0,t&&t(),this},load:function(){var e=arguments,n=e[o];return n===1&&t(e[0],Function)?(e[0](),this):(d.call(this,e[0],n<=1?undefined:function(){m.load.apply(m,[].slice.call(e,1))}),this)},addAliases:function(e){for(var n in e)this.aliases[n]=t(e[n])?e[n].slice(0):e[n];return this}};if(c){var g,y,b;for(g=0,y=f[o];g<y;g++)v[f[g].src]=!0;b=n[r]("link");for(g=0,y=b[o];g<y;g++)(b[g].rel==="stylesheet"||b[g].type==="text/css")&&(v[b[g].href]=!0)}ljs=m,l&&e(l)})();



/*! sprintf.js | Copyright (c) 2007-2013 Alexandru Marasteanu <hello at alexei dot ro> | 3 clause BSD license */(function(e){function r(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function i(e,t){for(var n=[];t>0;n[--t]=e);return n.join("")}var t=function(){return t.cache.hasOwnProperty(arguments[0])||(t.cache[arguments[0]]=t.parse(arguments[0])),t.format.call(null,t.cache[arguments[0]],arguments)};t.format=function(e,n){var s=1,o=e.length,u="",a,f=[],l,c,h,p,d,v;for(l=0;l<o;l++){u=r(e[l]);if(u==="string")f.push(e[l]);else if(u==="array"){h=e[l];if(h[2]){a=n[s];for(c=0;c<h[2].length;c++){if(!a.hasOwnProperty(h[2][c]))throw t('[sprintf] property "%s" does not exist',h[2][c]);a=a[h[2][c]]}}else h[1]?a=n[h[1]]:a=n[s++];if(/[^s]/.test(h[8])&&r(a)!="number")throw t("[sprintf] expecting number but found %s",r(a));switch(h[8]){case"b":a=a.toString(2);break;case"c":a=String.fromCharCode(a);break;case"d":a=parseInt(a,10);break;case"e":a=h[7]?a.toExponential(h[7]):a.toExponential();break;case"f":a=h[7]?parseFloat(a).toFixed(h[7]):parseFloat(a);break;case"o":a=a.toString(8);break;case"s":a=(a=String(a))&&h[7]?a.substring(0,h[7]):a;break;case"u":a>>>=0;break;case"x":a=a.toString(16);break;case"X":a=a.toString(16).toUpperCase()}a=/[def]/.test(h[8])&&h[3]&&a>=0?"+"+a:a,d=h[4]?h[4]=="0"?"0":h[4].charAt(1):" ",v=h[6]-String(a).length,p=h[6]?i(d,v):"",f.push(h[5]?a+p:p+a)}}return f.join("")},t.cache={},t.parse=function(e){var t=e,n=[],r=[],i=0;while(t){if((n=/^[^\x25]+/.exec(t))!==null)r.push(n[0]);else if((n=/^\x25{2}/.exec(t))!==null)r.push("%");else{if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))===null)throw"[sprintf] huh?";if(n[2]){i|=1;var s=[],o=n[2],u=[];if((u=/^([a-z_][a-z_\d]*)/i.exec(o))===null)throw"[sprintf] huh?";s.push(u[1]);while((o=o.substring(u[0].length))!=="")if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null)s.push(u[1]);else{if((u=/^\[(\d+)\]/.exec(o))===null)throw"[sprintf] huh?";s.push(u[1])}n[2]=s}else i|=2;if(i===3)throw"[sprintf] mixing positional and named placeholders is not (yet) supported";r.push(n)}t=t.substring(n[0].length)}return r};var n=function(e,n,r){return r=n.slice(0),r.splice(0,0,e),t.apply(null,r)};e.sprintf=t,e.vsprintf=n})(typeof exports!="undefined"?exports:window);

// http://strangemother.github.io/getterSetterJS/
// 475 bytes gzipped (967 bytes uncompressed)
	function arg(b,a,c,f){var d=null;if(a.constructor==Array)for(var e=0;e<a.length;e++){if(b[a[e]]||!1===b[a[e]]){d=b[a[e]];break}}else if(b[a]||!1===b[a])d=b[a];null==d&&void 0!=c&&(d=c);return f?[d,a[e]]:d}getterSetter=function(b){return GetterSetter.apply(b,arguments)};
	GetterSetter=function(){var b,a,c;this.init=function(){var l=arg(arguments,0,this),g=arg(arguments,1,null),h=arg(arguments,2,null),k=arg(arguments,3,null),m=f.value=arg(arguments,4,l[g]||void 0);h&&(a=h);k&&(c=k);h=d(h);k=e(k);b=m;Object.defineProperty(l,g,{get:h,set:k});return f};var f={value:null,getter:function(b){return b?(a=b,this):d(a)},setter:function(b){return b?(c=b,this):e(c)}},d=function(d){return function(g,c){g=arg(arguments,0,b);c=arg(arguments,1,"get");var e=arg(arguments,2,a||d),f;
	e&&(f=e(g,c));return void 0!==f?f:b}},e=function(a){return function(a){b=a;f.value=a;if(null==c||void 0==c)return d()(a,"set");a=c(a);void 0!=a&&(b=a)}};return this.init.apply(this,arguments)};


// Assets used by Nux.js
// These should be external methods
// used globally or implemented into
// the global namescape

// framework components
function arg(_a, ia, def, returnArray) {
	var v = null

	// if ia is an array, find the
	// first correct definition
	if (ia.constructor  == Array) {
		for(var i=0; i<ia.length; i++) {
			if(_a[ia[i]] || _a[ia[i]] === false ){
				v = _a[ia[i]];
				break;
			}
		}
	} else {
		// if ia is just a value
		if(_a[ia] || _a[ia] === false ) v = _a[ia];
	}

	if( (v == null) && (def != undefined) ) {
		v = def
	}

	if(returnArray){
		return [v, ia[i]]
	} else {
		return v
	}
};

(function (exports) {
  "use strict";

  function forEachAsync(arr, fn, thisArg) {
    var dones = []
      , index = -1
      ;

    function next(BREAK, result) {
      index += 1;

      if (index === arr.length || BREAK === forEachAsync.__BREAK) {
        dones.forEach(function (done) {
          done.call(thisArg, result);
        });
        return;
      }

      fn.call(thisArg, next, arr[index], index, arr);
    }

    setTimeout(next, 4);

    return {
      then: function (_done) {
        dones.push(_done);
        return this;
      }
    };
  }
  forEachAsync.__BREAK = {};

  exports.forEachAsync = forEachAsync;
}('undefined' !== typeof exports && exports || new Function('return this')()));


/* 
 * zoe.js 0.0.1
 * http://zoejs.org
 */(function(e,t){typeof exports=="object"?module.exports=t():typeof define=="function"&&define.amd?define(function(){return t()}):e.zoe=t()})(this,function(){var e={},t=typeof window!="undefined"?window.console=window.console||{}:global.console;t.dir=t.dir||function(){},t.log=t.log||function(){};var n=e.fn=function(e,t){if(typeof e=="function"||typeof e=="string")t=e,e=null;var u=function(){return u.run(u._this||this,Array.prototype.splice.call(arguments,0),u.fns)};return u.constructor=n,u.fns=e||[],u.run=(typeof t=="string"?n[t]:t)||n.LAST_DEFINED,u.on=i,u.off=s,u.first=o,u._this=undefined,u.bind=r,u},r=function(e){return this._this=e,this},i=function(e){return this.fns.push(e),this},s=function(e){if(!e){this.fns=[];return}for(var t=0;t<this.fns.length;t++)if(this.fns[t]==e){this.fns.splice(t,1);return}},o=function(e){return this.fns=[e].concat(this.fns),this};n.executeReduce=function(e,t){return t===undefined&&(t=e,e=undefined),typeof e=="function"&&(e=e()),function(n,r,i){var s=e;for(var o=0;o<i.length;o++)s=t(s,i[o].apply(n,r));return s}};var u=n.LAST_DEFINED=n.executeReduce(function(e,t){return t!==undefined?t:e});n.STOP_DEFINED=function(t,n,r){var i;for(var s=0;s<r.length;s++){i=r[s].apply(t,n);if(i!==undefined)return i}return i},n.ASYNC=n.ASYNC_NEXT=function(t,r,i){var s=0,o;typeof r[r.length-1]=="function"&&(o=r.pop());var u=function(e){return function(){i[e]?i[e].length>=r.length+1||i[e].run==n.ASYNC?i[e].apply(t,r.concat([u(e+1)])):(i[e].apply(t,r),u(e+1)()):o&&o()}};return u(0)()},n.ASYNC_SIM=function(t,n,r){var i=0,s;typeof n[n.length-1]=="function"&&(s=n.pop());for(var o=0;o<r.length;o++)r[o].apply(t,n.concat([function(){++i==r.length&&s()}]))},e.on=function(e,t,r){var i=e[t];if(!i||i.constructor!=n||i.run!=n.LAST_DEFINED)e[t]=n(i?[i]:[]);e[t].on(r)},e.off=function(e,t,r){if(e[t].constructor==n)return e[t].off(r)};var a=e.extend=function(n,r,i){n=n||{};var s=arguments;s.length>2&&(i=s[s.length-1]);var o;typeof i=="object"?(o=i,i=undefined):i||(r._extend&&(n._extend=a(n._extend||{},r._extend,"REPLACE")),o=n._extend);if(o)for(var u in o){var f=u.indexOf(".");if(f!=-1){var l=u.substr(0,f);o[l]||(o[l]=a)}}for(var u in r)if(!r.hasOwnProperty||r.hasOwnProperty(u)){if(u=="_extend")continue;var c=r[u],h,p=u.length,d=u.substr(0,2)=="__",v=u.substr(p-2,2)=="__",m=d&&!v&&(u=u.substr(2))&&a.APPEND||!d&&v&&(u=u.substr(0,p-2))&&a.PREPEND||d&&v&&(u=u.substr(2,p-4))&&a.REPLACE,g=m||i||o&&(o[u]||o["*"])||a.DEFINE;typeof g=="string"&&(g=a[g]);try{h=g(n[u],c,o&&a.deriveRules(o,u))}catch(y){throw t.dir(n),t.dir(r),t.dir(a.deriveRules(i,u)),'zoe.extend: "'+u+'" override error. \n ->'+(y.message||y)}h!==undefined&&(n[u]=h)}if(s.length>3){var b=[n];b.concat(Array.prototype.splice.call(s,2,s.length-3,s.length-3)),b.push(i),$z.extend.apply(this,b)}return n};a.EXTEND=a,a.DEFINE=function(t,n){if(t!==undefined)throw"No override specified.";return n},a.REPLACE=function(t,n){return n!==undefined?n:t},a.FILL=function(t,n){return t===undefined?n:t},a.IGNORE=function(){};var f=function(e){return e!=null&&e.constructor==Object},l=function(e){return typeof e=="function"},c=function(e){return typeof e=="string"},h=function(e){return e instanceof Array},p=function(e,t){return e?typeof e=="string"?e:(e&&!e["*"]&&(e["*"]=t),e):t};a.APPEND=function(t,n,r){return f(n)?a(f(t)?t:{},n,p(r,"REPLACE")):l(n)?a.CHAIN(t,n):c(n)?a.STR_APPEND(t,n):h(n)?a.ARR_APPEND(t,n):n},a.PREPEND=function(t,n,r){return f(n)&&(t===undefined||f(t))?a(t||{},n,p(r,"FILL")):l(n)?a.CHAIN_FIRST(t,n):c(n)?a.STR_PREPEND(t,n):h(n)?a.ARR_PREPEND(t,n):t===undefined?n:t},a.DAPPEND=function(t,n,r){return a.APPEND(t,n,p(r,"DAPPEND"))},a.DPREPEND=function(n,r,i){return e.extend.PREPEND(n,r,p(i,"DPREPEND"))},a.DREPLACE=function(t,n,r){return f(n)?a(t||{},n,p(r,"DREPLACE")):h(n)?a(t||[],n,p(r,"DREPLACE")):n},a.DFILL=function(t,n,r){return f(n)?a(t||{},n,p(r,"DFILL")):typeof t=="undefined"?n:t},a.ARR_APPEND=function(t,n){return t=t||[],t.concat||(t=[t]),t.concat(n)},a.ARR_PREPEND=function(t,n){return n=n||[],n.concat||(n=[n]),n.concat(t||[])},a.STR_APPEND=function(t,n){return t?t+n:n},a.STR_PREPEND=function(t,n){return n+t},a.deriveRules=function(e,t){var n;for(var r in e){if(r=="*")continue;var i=r.split(".");if(i[0]==t||i[0]=="*")n=n||{},n[i.splice(1).join(".")]=e[r]}return n},a.makeChain=function(e,t){return typeof e=="string"&&(e=n[e]),function(r,i){if(!r||r.constructor!=n||r.run!=e)r=n(r?[r]:[],e);return t?r.first(i):r.on(i),r}},a.CHAIN=a.makeChain(n.LAST_DEFINED),a.CHAIN_FIRST=a.makeChain(n.LAST_DEFINED,!0),a.CHAIN_STOP_DEFINED=a.makeChain(n.STOP_DEFINED),a.CHAIN_ASYNC=a.makeChain(n.ASYNC),e.create=function(e,t){t=v(e,t),t._definition&&(t=t._definition);var r;d(t,function(e){if(e._base)return r=e._base(t),!0}),r=r||{},r._definition=t,r._extend={_base:a.IGNORE,_implement:a.IGNORE,_reinherit:a.IGNORE,_make:a.IGNORE,_integrate:a.IGNORE,_built:a.IGNORE};var i=[],s=n(),o=n();return o._this=s._this=r,d(t,function(n){n=o(n,t)||n,n._integrate&&o.on(n._integrate),a(r,n),n._make&&n._make.call(r,t,n),n._built&&s.on(n._built),i.push(n)},function(t){return i.indexOf(t)!=-1&&!t._reinherit}),s(t),r};var d=function(e,n,r){r=r||function(){};if(e._implement)for(var i=0,s=e._implement.length;i<s;i++){var o=e._implement[i];o||(t.dir(e),t.log("Implementor not defined!")),o._definition&&(o=o._definition);if(r(o))continue;if(d(o,n,r))return!0}return n(e)},v=function(e,t){return e instanceof Array||(t=e,e=[]),t=t||{},t._implement=e.concat(t._implement||[]),t};return e.inherits=function(t,n){if(t._definition)return e.inherits(t._definition,n);if(n._definition)return e.inherits(t,n._definition);var r=!1;return d(t,function(e){if(e===n)return r=!0,!0}),r},e.Constructor={_base:function(e){function t(){t.construct&&t.construct.apply(this,arguments)}return t},_extend:{prototype:a,construct:a.CHAIN},_integrate:function(e){if(typeof e=="function"&&!e._definition)return{construct:e,prototype:e.prototype};var t=Object.getOwnPropertyDescriptor;if(t){var n=t(e,"prototype");n&&!n.enumerable&&a(this.prototype,e.prototype,a.deriveRules(this._extend,"prototype"))}}},e.InstanceEvents={_extend:{_events:"ARR_APPEND"},construct:function(){var t=this.constructor._events;if(!t)return;for(var n=0;n<t.length;n++){var r=t[n];this[r]=e.fn(this[r]?[this[r]]:[]).bind(this)}}},e});