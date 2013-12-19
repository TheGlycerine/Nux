//https://github.com/malko/l.js
(function(){
/*
* script for js/css parallel loading with dependancies management
* @author Jonathan Gotti < jgotti at jgotti dot net >
* @licence dual licence mit / gpl
* @since 2012-04-12
* @todo add prefetching using text/cache for js files
* @changelog
*            - 2013-01-25 - add parrallel loading inside single load call
*            - 2012-06-29 - some minifier optimisations
*            - 2012-04-20 - now sharp part of url will be used as tag id
*                         - add options for checking already loaded scripts at load time
*            - 2012-04-19 - add addAliases method
*/
	/** gEval credits goes to my javascript idol John Resig, this is a simplified jQuery.globalEval */
	var gEval = function(js){ ( window.execScript || function(js){ window[ "eval" ].call(window,js);} )(js); }
		, isA =  function(a,b){ return a instanceof (b || Array);}
		//-- some minifier optimisation
		, D = document
		, getElementsByTagName = 'getElementsByTagName'
		, replace = 'replace'
		, match = 'match'
		, length = 'length'
		, readyState = 'readyState'
		, onreadystatechange = 'onreadystatechange'
		//-- get the current script tag for further evaluation of it's eventual content
		,scripts = D[getElementsByTagName]("script")
		,script  = scripts[ scripts[length] - 1 ].innerHTML[replace](/^\s+|\s+$/g,'')
	;
	//avoid multiple inclusion to override current loader but allow tag content evaluation
	if( typeof ljs !== 'undefined' ){ script && gEval(script); return; }

	var checkLoaded = scripts[ scripts[length] - 1 ].src[match](/checkLoaded/)?true:false
		//-- keep trace of header as we will make multiple access to it
		,header  = D[getElementsByTagName]("head")[0] || D.documentElement
		,appendElmt = function(type,attrs,cb){
			var e = D.createElement(type), i;
			if( cb ){ //-- this is not intended to be used for link
				if(e[readyState]){
					e[onreadystatechange] = function(){
						if (e[readyState] === "loaded" || e[readyState] === "complete"){
							e[onreadystatechange] = null;
							cb();
						}
					};
				}else{
					e.onload = cb;
				}
			}
			for( i in attrs ){ e[i]=attrs[i]; }
			header.appendChild(e);
			// return e; // unused at this time so drop it
		}
		,load = function(url,cb){
			if( this.aliases && this.aliases[url] ){
				var args = this.aliases[url].slice(0);
				isA(args) || (args=[args]);
				cb && args.push(cb);
				return this.load.apply(this,args);
			}
			if( isA(url) ){ // parallelized request
				for( var l=url.length; l--;){
					this.load(url[l]);
				}
				cb && url.push(cb); // relaunch the dependancie queue
				return this.load.apply(this,url);
			}
			if( url[match](/\.css\b/) ){
				return this.loadcss(url,cb);
			}
			return this.loadjs(url,cb);
		}
		,loaded = {}  // will handle already loaded urls
		,loader  = {
			aliases:{}
			,loadjs: function(url,cb, p){
				var id  =(url[match]('#')?url[replace](/^[^#]+#/,''):null);
				id && (url = url[replace](/#.*$/,''));
				if( loaded[url] === true ){ // already loaded exec cb if any
					cb && cb();
					return this;
				}else if( loaded[url]!== undefined ){ // already asked for loading we append callback if any else return
					if( cb ){
						loaded[url] = function(ocb,cb){ return function(){ ocb && ocb(); cb && cb(); } }(loaded[url],cb);
					}
					return this;
				}
				// first time we ask this script
				if(p) url=p+url;
				loaded[url] = function(cb){ return function(){loaded[url]=true; cb && cb();}}(cb);
				appendElmt('script',{type:'text/javascript',src:url,id:id},function(){ loaded[url]() });
				return this;
			}
			,loadcss: function(url,cb){
				var id  =(url[match]('#')?url[replace](/^[^#]+#/,''):null);
				id && (url = url[replace](/#.*$/,''));
				if(! loaded[url]){
					appendElmt('link',{type:'text/css',rel:'stylesheet',href:url,id:id},function(){ loaded[url]=true; });
				}
				loaded[url] = true;
				cb && cb();
				return this;
			}
			,load: function(){
				var argv=arguments,argc = argv[length];
				if( argc === 1 && isA(argv[0],Function) ){
					argv[0]();
					return this;
				}
				load.call(this,argv[0], argc <= 1 ? undefined : function(){ loader.load.apply(loader,[].slice.call(argv,1))} )
				return this;
			}
			,addAliases:function(aliases){
				for(var i in aliases ){
					this.aliases[i]= isA(aliases[i]) ? aliases[i].slice(0) : aliases[i];
				}
				return this;
			}
		}
	;
	if( checkLoaded ){
		var i,l,links;
		for(i=0,l=scripts[length];i<l;i++){
			loaded[scripts[i].src]=true;
		}
		links = D[getElementsByTagName]('link');
		for(i=0,l=links[length];i<l;i++){
			(links[i].rel==="stylesheet" || links[i].type==='text/css') && (loaded[links[i].href]=true);
		}
	}
	//export ljs
	ljs = loader;
	// eval inside tag code if any
	script && gEval(script);
})();


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
 */

/* 
 * zoe.js 0.0.1
 * http://zoejs.org
 */
(function (root, factory) {
  //nodejs
  if (typeof exports === 'object')
    module.exports = factory();
  //amd + zoe global
  else if (typeof define === 'function' && define.amd)
    define(function() {
      return factory();
    });
  //browser zoe global
  else
    root.zoe = factory();
}(this, function() {

/*
 * A natural JavaScript extension-based inheritance model.
 *
 * Read the full documentation at
 * http://zoejs.org
 * 
 * Environment
 * -----------
 *
 * This module works in NodeJS, AMD and the browser.
 *
 * In the case of AMD and the browser, a global 'zoe' is created.
 *
 */
  
var zoe = {};

/*
 * console.log, console.dir
 * Console log function existence wrappers
 * 
 */
var console = typeof window != 'undefined' ? window.console = window.console || {} : global.console;
console.dir = console.dir || function(){};
console.log = console.log || function(){};

/*
 * zoe.fn
 * Function composition and execution
 * http://zoejs.org/#zoe.fn
 *
 * Usage:
 *   zoe.fn([initialFunctions], executionFunction);
 *   zoe.fn(executionFunction);
 *   zoe.fn([initialFunctions]);
 * 
 * [initialFunctions]: an array of the inital functions to be provided (optional)
 * executionFunction: the main execution function to handle function execution and output (optional)
 *    when no executionFunction is provided, defaults to zoe.fn.LAST_DEFINED
 *
 * output: a function instance of a zoe.fn 'function chain', with the following public properties:
 *   on: function(f), used to add new functions to the list of functions
 *   off: function(f), used to remove functions from the list of functions
 *   first: function(f), used to add a new function at the beginning of the list of functions
 *   bind: function(self), used to permanently bind this instance to the given 'this' reference
 *         when passed the value `undefined`, binding will revert to natural function binding
 * 
 */

var zoe_fn = zoe.fn = function(fns, run) {
  if (typeof fns == 'function' || typeof fns == 'string') {
    run = fns;
    fns = null;
  }
  
  var instance = function() {
    // http://zestjs.org/docs/zoe#zoe.fn
    return instance.run(instance._this || this, Array.prototype.splice.call(arguments, 0), instance.fns);
  }
  
  instance.constructor = zoe_fn;
  
  instance.fns = fns || [];
  instance.run = (typeof run == 'string' ? zoe_fn[run] : run) || zoe_fn.LAST_DEFINED;
  
  instance.on = on;
  instance.off = off;
  instance.first = first;
  
  instance._this = undefined;
  instance.bind = bind;
  
  return instance;
}

var bind = function(_this) {
  this._this = _this;
  return this;
}
var on = function(fn) {
  this.fns.push(fn);
  return this;
}
var off = function(fn) {
  if (!fn) {
    this.fns = [];
    return;
  }
  for (var i = 0; i < this.fns.length; i++)
    if (this.fns[i] == fn) {
      this.fns.splice(i, 1);
      return;
    }
}
var first = function(fn) {
  this.fns = [fn].concat(this.fns);
  return this;
}

/* zoe.fn.executeReduce
 * 
 * A helper function in building synchronous composition functions
 * takes a "reduce" function to amalgamating synchronous outputs into a
 * single output
 *
 * Usage:
 *   zoe.fn.executeReduce(startVal, function(out1, out2) {
 *     return reducedOutput;
 *   });
 *
 */
zoe_fn.executeReduce = function(startVal, reduce) {
  if (reduce === undefined) {
    reduce = startVal;
    startVal = undefined;
  }
  if (typeof startVal == 'function')
    startVal = startVal();
  return function(self, args, fns) {
    var output = startVal;
    for (var i = 0; i < fns.length; i++)
      output = reduce(output, fns[i].apply(self, args));
    return output;
  }
}

/*
 * zoe.fn.LAST_DEFINED
 * http://zoejs.org/#zoe.fn.LAST_DEFINED
 *
 * Executes all functions in the chain, returning the last non-undefined
 * output.
 *
 */
var l = zoe_fn.LAST_DEFINED = zoe_fn.executeReduce(function(out1, out2) {
  return out2 !== undefined ? out2 : out1;
});

/*
 * zoe.fn.STOP_DEFINED
 * http://zoejs.org/#zoe.fn.STOP_DEFINED
 *
 * Runs the execution of fns, until one function returns
 * a non-undefined output.
 * Then no further functions are executed.
 * 
 */
zoe_fn.STOP_DEFINED = function STOP_DEFINED(self, args, fns) {
  var output;
  for (var i = 0; i < fns.length; i++) {
    output = fns[i].apply(self, args);
    if (output !== undefined)
      return output;
  }
  return output;
}
/*
 * zoe.fn.COMPOSE
 *
 * Output of each function is the input to the next function
 *
 */
/* zoe_fn.COMPOSE = function COMPOSE(self, args, fns) {
  if (fns.length == 0)
    return;
  var output = fns[0].apply(self, args);
  for (var i = 1; i < fns.length; i++)
    output = fns[i].call(self, output);
  return output;
} */
/*
 * zoe.fn.ASYNC
 * http://zoejs.org/#zoe.fn.ASYNC
 *
 * Allows for the creation of an asynchronous step function, with the
 * last argument to each successive function being the 'next' callback
 * into the next function or final completion.
 *
 */
zoe_fn.ASYNC = zoe_fn.ASYNC_NEXT = function ASYNC_NEXT(self, args, fns) {
  var i = 0;
  var complete;
  if (fns.length == 0 || (args.length >= fns[0].length && typeof args[args.length - 1] == 'function'))
    complete = args.pop();
  var _args = args;
  var makeNext = function(i) {
    return function() {
      if (fns[i]) {
        if (arguments.length)
          _args = Array.prototype.splice.call(arguments, 0);
        if (fns[i].length >= _args.length + 1 || fns[i].run == zoe_fn.ASYNC) {
          fns[i].apply(self, _args.concat([makeNext(i + 1)]));
        }
        else {
          // if the function length is too short to take the 'next' callback, and
          // it is not an async function chain itself, then assume it is
          // it is synchronous and call it anywyay. used for render component 'load'
          fns[i].apply(self, _args);
          makeNext(i + 1)();
        }
      }
      else if (complete)
        complete();
    }
  }
  return makeNext(0)();
}

/*
 * zoe.fn.ASYNC_SIM
 * http://zoejs.org/#zoe.fn.ASYNC_SIM
 *
 * Parallel asynchronous step functions.
 */
zoe_fn.ASYNC_SIM = function ASYNC_SIM(self, args, fns) {
  var completed = 0;
  var complete;
  if (typeof args[args.length - 1] == 'function')
    complete = args.pop();
  for (var i = 0; i < fns.length; i++)
    fns[i].apply(self, args.concat([function() {
      if (++completed == fns.length)
        complete();
    }]));
}

/*
 * zoe.on
 * http://zoejs.org/#zoe.on
 *
 * Shorthand for converting any function to a chain
 * Effectively duck punching using zoe.fn, but if the
 * function is already a zoe.fn, it is just added to the
 * list (using less memory than recursive duck punching)
 *
 * Usage:
 *
 * zoe.on(obj, methodName, fn);
 *
 * obj: the object with a function property
 * methodName: the function name on the object
 * fn: the function to hook into the given function
 *
 *
 * The corresponding zoe.off method works as with zoe.fn() off.
 *
 */
zoe.on = function(obj, name, f) {
  var val = obj[name];
  if (!val || val.constructor != zoe_fn || val.run != zoe_fn.LAST_DEFINED)
    obj[name] = zoe_fn(val ? [val] : []);
  obj[name].on(f);
}
zoe.off = function(obj, name, f) {
  if (obj[name].constructor == zoe_fn)
    return obj[name].off(f);
}



/*
 * zoe.extend
 * http://zoejs.org/#zoe.extend
 *
 * Extend obj A by merging properties from obj B
 * A flexible rules mechanism allows for advanced merging functions
 *
 * Usage:
 *
 * zoe.extend(objA, objB, [rules,]);
 *
 * objA: the object to modify (the host object)
 * objB: the object with the new properties to add (the extending object)
 * rules: a rule function or object map.
 *        typically rule functions are constant functions located at zoe.extend.RULE
 *        for convenience, these can also be referenced by a rule string, 'RULE'
 * 
 */
//also allows multiple extension: extend(a, b, c, d, e, rule). But then rule must be specified.
var zoe_extend = zoe.extend = function extend(a, b, rule) {
  a = a || {};
  var _arguments = arguments;
  if (_arguments.length > 2)
    rule = _arguments[_arguments.length - 1];
  
  var ruleObj;

  if (typeof rule == 'object') {
    ruleObj = rule;
    rule = undefined;
  }
  else if (!rule) {
    if (b._extend)
      a._extend = zoe_extend(a._extend || {}, b._extend, 'REPLACE');
    ruleObj = a._extend;
  }

  // auto populate extend rules for sub extensions
  if (ruleObj)  
    for (var p in ruleObj) {
      var dotPos = p.indexOf('.');
      if (dotPos != -1) {
        var fp = p.substr(0, dotPos);
        if (!ruleObj[fp])
          ruleObj[fp] = zoe_extend;
      }
    }
  
  for (var p in b)
    if (!b.hasOwnProperty || b.hasOwnProperty(p)) {
      if (p == '_extend') continue;

      var v = b[p];
      var out;
      
      var pLength = p.length;
      var firstUnderscores = p.substr(0, 2) == '__';
      var lastUnderscores = p.substr(pLength - 2, 2) == '__';
      
      //a fancy (minifies better) way of setting the underscore rules to the appropriate extend function
      var underscoreRule = (firstUnderscores && !lastUnderscores && (p = p.substr(2)) && zoe_extend.APPEND)
        || (!firstUnderscores && lastUnderscores && (p = p.substr(0, pLength - 2)) && zoe_extend.PREPEND)
        || (firstUnderscores && lastUnderscores && (p = p.substr(2, pLength - 4)) && zoe_extend.REPLACE);
      
      //apply the right rule function
      var curRule = (underscoreRule || rule || (ruleObj && (ruleObj[p] || ruleObj['*'])) || zoe_extend.DEFINE);
      
      //allow rules to be strings
      if (typeof curRule == 'string')
        curRule = zoe_extend[curRule];
      
      try {
        out = curRule(a[p], v, ruleObj && zoe_extend.deriveRules(ruleObj, p));
      }
      catch (er) {
        console.dir(a);
        console.dir(b);
        console.dir(zoe_extend.deriveRules(rule, p));
        throw 'zoe.extend: "' + p + '" override error. \n ->' + (er.message || er);
      }
      if (out !== undefined)
        a[p] = out;
    }
    
  //multiple extension
  if (_arguments.length > 3) {
    var args = [a];
    args.concat(Array.prototype.splice.call(_arguments, 2, _arguments.length - 3, _arguments.length - 3));
    args.push(rule);
    $z.extend.apply(this, args);
  }
  
  return a;
}

zoe_extend.EXTEND = zoe_extend;
zoe_extend.DEFINE = function DEFINE(a, b) {
  if (a !== undefined)
    throw 'No override specified.';
  else
    return b;
}
zoe_extend.REPLACE = function REPLACE(a, b) {
  if (b !== undefined)
    return b;
  else
    return a;
}
zoe_extend.FILL = function FILL(a, b) {
  if (a === undefined)
    return b;
  else
    return a;
}
zoe_extend.IGNORE = function IGNORE() {}
var is_obj = function(obj) {
  return obj != null && obj.constructor == Object;
}
var is_fn = function(obj) {
  return typeof obj == 'function';
}
var is_str = function(obj) {
  return typeof obj == 'string';
}
var is_arr = function(obj) {
  return obj instanceof Array;
}
var default_rule = function(rule, ext) {
  if (!rule)
    return ext;
  if (typeof rule == 'string')
    return rule;
  if (rule && !rule['*'])
    rule['*'] = ext;
  return rule;
} 
zoe_extend.APPEND = function APPEND(a, b, objRule) {
  if (is_obj(b))
    return zoe_extend(is_obj(a) ? a : {}, b, default_rule(objRule, 'REPLACE'));
  else if (is_fn(b))
    return zoe_extend.CHAIN(a, b);
  else if (is_str(b))
    return zoe_extend.STR_APPEND(a, b);
  else if (is_arr(b))
    return zoe_extend.ARR_APPEND(a, b);
  else
    return b;
}
zoe_extend.PREPEND = function PREPEND(a, b, objRule) {
  if (is_obj(b) && (a === undefined || is_obj(a)))
    return zoe_extend(a || {}, b, default_rule(objRule, 'FILL'));
  else if (is_fn(b))
    return zoe_extend.CHAIN_FIRST(a, b);
  else if (is_str(b))
    return zoe_extend.STR_PREPEND(a, b);
  else if (is_arr(b))
    return zoe_extend.ARR_PREPEND(a, b);
  else
    return a === undefined ? b : a;
}
zoe_extend.DAPPEND = function DAPPEND(a, b, rules) {
  return zoe_extend.APPEND(a, b, default_rule(rules, 'DAPPEND'));
}
zoe_extend.DPREPEND = function DPREPEND(a, b, rules) {
  return zoe.extend.PREPEND(a, b, default_rule(rules, 'DPREPEND'));
}
zoe_extend.DREPLACE = function DREPLACE(a, b, rules) {
  if (is_obj(b))
    return zoe_extend(a || {}, b, default_rule(rules, 'DREPLACE'));
  else if (is_arr(b))
    return zoe_extend(a || [], b, default_rule(rules, 'DREPLACE'));
  else
    return b;
}
zoe_extend.DFILL = function DFILL(a, b, rules) {
  if (is_obj(b))
    return zoe_extend(a || {}, b, default_rule(rules, 'DFILL'));
  else
    return typeof a == 'undefined' ? b : a;
}
zoe_extend.ARR_APPEND = function ARR_APPEND(a, b) {
  a = a || [];
  if (!a.concat)
    a = [a];
  return a.concat(b);
}
zoe_extend.ARR_PREPEND = function ARR_PREPEND(a, b) {
  b = b || [];
  if (!b.concat)
    b = [b];
  return b.concat(a || []);
}
zoe_extend.STR_APPEND = function STR_APPEND(a, b) {
  return a ? a + b : b;
}
zoe_extend.STR_PREPEND = function STR_PREPEND(a, b) {
  return b + a;
}


/*
 create a rule for a property object from a rules object
 eg rules = { 'prototype.init': zoe.extend.APPEND, '*.init': zoe.extend.REPLACE, '*.*': zoe.extend.REPLACE }
 
 then deriveRule(rules, 'prototype') == { 'init': zoe.extend.APPEND, 'init': zoe.extend.REPLACE, '*.*': zoe.extend.REPLACE }
*/
zoe_extend.deriveRules = function(rules, p) {
  var newRules;
  
  for (var r in rules) {
    if (r == '*')
      continue;
    
    var parts = r.split('.');
    if (parts[0] == p || parts[0] == '*') {
      newRules = newRules || {};
      newRules[parts.splice(1).join('.')] = rules[r];
    }
  }
  
  return newRules;
}
/*
 * zoe.extend.makeChain
 *
 * Creates a zoe.extend rule that will automatically
 * combine functions with the given execution function
 *
 * Usage:
 *   zoe.extend.makeChain(EXECUTION_FUNCTION [, first]);
 *
 * When the 'first' parameter is provided, this creates
 * a reverse chain putting the new items at the beginning of the
 * function list to be executed.
 *
 * The 'ignoreExecution' property exists to check if we want to
 * override the execution function on the chain if one already exists.
 *
 * zoe.extend.CHAIN is a weak extension rule as it will append to whatever
 * chain already exists on the host object, by setting this flag to true.
 *
 */

zoe_extend.makeChain = function(executionFunction, first) {
  if (typeof executionFunction == 'string')
    executionFunction = zoe_fn[executionFunction];
  return function(a, b) {
    if (!a || a.constructor != zoe_fn || a.run != executionFunction)
      a = zoe_fn(!a ? [] : [a], executionFunction);
    
    if (first)
      a.first(b);
    else
      a.on(b);
    
    return a;
  }
}

// create the zoe.extend rules for the corresponding function chain methods.
zoe_extend.CHAIN = zoe_extend.makeChain(zoe_fn.LAST_DEFINED);
zoe_extend.CHAIN_FIRST = zoe_extend.makeChain(zoe_fn.LAST_DEFINED, true);
zoe_extend.CHAIN_STOP_DEFINED = zoe_extend.makeChain(zoe_fn.STOP_DEFINED);
zoe_extend.CHAIN_ASYNC = zoe_extend.makeChain(zoe_fn.ASYNC);



/*
 * zoe.create
 * http://zoejs.org/#zoe.create
 *
 * JavaScript object inheritance
 *
 * Usage:
 * 
 *   zoe.create(def)
 *   Creates a new instance of the class defined by def.
 *
 *   zoe.create([inherits], def)
 *   Creates a new instance of the class defined by def, with the given inheritance.
 *
 * zoe.create simply uses zoe.extend to copy the def into a new object.
 *
 * There are then 7 special optional properties on the definition object which will be picked
 * up when performing zoe.create. These properties allow for a natural but flexible class
 * inheritance model in JavaScript.
 * 
 *
 *   1. _base:
 *   
 *     A function that creates a new instance of the base object for extension.
 *
 *   2. _extend:
 *
 *     If an _extend property is provided, this property will be used as the zoe.extend rules specification.
 *
 *   3. _implement:
 *
 *     This acts in exactly the same way as calling zoe.create with an array of inheritors.
 *
 *   4. _reinherit:
 *
 *     Rarely used, merely a technical formality for flexibility in the diamond problem.
 *
 *   5. _make:
 *
 *     It may be necessary to have a function that does the creation of a definition, instead of just
 *     property extension.
 *
 *     In this case a make function can be provided:
 *
 *     _make = function(createDefinition, makeDefinition) {
 *     }
 *
 *     createDefinition is the primary definition provided into zoe.create.
 *
 *     makeDefinition is the definition currently being implemented from the _implement array, and is
 *     the same as the definition that would define the above _make function.
 *
 *     'this' is bound to the output object.
 *
 *   6. _integrate:
 *
 *     Integrate functions are the first hook on each inheritor. They run for all inheritors that
 *     are placed after the inheritor with the integrate hook.
 *     
 *     _integrate = function(makeDefinition, createDefinition) {
 *       //can check and modify the output object, accessed as 'this'
 *     }
 *     
 *     makeDefinition: the current definition being implemented
 *     createDefinition: the primary definition in zoe.create
 *     'this': is bound to the output object
 *     
 *     return value:
 *     In some rare cases, it can be necessary to perform some mapping of the definition object first.
 *     In this case, a derived definition object can be returned which will be used instead.
 *     The primary use case for this is to allow standard JavaScript constructors as _implement items
 *     when implementing zoe.constructor objects.
 *
 *   7. _built:
 *
 *     If an inheritor wants to apply some final changes to the object after all the other inheritors
 *     have completed, then a built function can make final modifications.
 *
 *     _built = function(createDefinition) {
 *     }
 *
 *
 *  NOTE: For the _integrate, _make and _built functions, these should never modify the definition objects,
 *        only the output object.
 */
zoe.create = function(inherits, definition) {
  definition = inheritCheck(inherits, definition);
  
  if (definition._definition)
    definition = definition._definition;
  
  //find base definition (first base defined)
  var base, name;
  implementLoop(definition, function(item) {
    base = base || item._base;
    name = name || item._name;
  });

  var obj = base ? base(name) : {};
  
  obj._definition = definition;
    
  obj._extend = {
    _name: zoe_extend.IGNORE,
    _base: zoe_extend.IGNORE,
    _implement: zoe_extend.IGNORE,
    _reinherit: zoe_extend.IGNORE,
    _make: zoe_extend.IGNORE,
    _integrate: zoe_extend.IGNORE,
    _built: zoe_extend.IGNORE
  };
  
  //state variables
  var _inherited = [];
  var _built = zoe_fn();
  var _integrate = zoe_fn();
  
  _integrate._this = _built._this = obj;
  
  implementLoop(definition, function loop(def) {
    
    def = _integrate(def, definition) || def;
    
    if (def._integrate)
      _integrate.on(def._integrate);
    
    zoe_extend(obj, def);
    
    if (def._make)
      def._make.call(obj, definition, def);
      
    if (def._built)
      _built.on(def._built);
      
    _inherited.push(def);
    
  }, function skip(def) {
    // diamond problem
    // - skip double inheritance by default, lowest inheritor always used
    // - 'reinherit' property can specify to always rerun the inheritance at each repeat
    return _inherited.indexOf(def) != -1 && !def._reinherit
  });
  
  _built(definition);
  
  return obj;
}
/*
 * implementLoop
 * Helper function to walk the implements of a definition
 *
 * First, 'skip' is run (if it exists). If it returns true, the current node
 * is skipped entirely and we move to the next sibling.
 *
 * Then 'loop' runs on each item in the implements stack, traversing from leaf to branch
 * left to right.
 * 
 * As the process goes, definitions with a "_definition" property in the implement
 * array are cleaned to be direct definitions.
 *
 */
var implementLoop = function(def, loop, skip) {
  skip = skip || function() {}
  if (def._implement)
    for (var i = 0, len = def._implement.length; i < len; i++) {
      var item = def._implement[i];
      if (!item) {
        console.dir(def);
        console.log('Implementor not defined!');
      }

      if (item._definition) {
        item = item._definition;
        //cleaning disabled to allow requirejs module tracing
        //def.implement[i] = item;
      }
      
      if (skip(item))
        continue;
      
      if (implementLoop(item, loop, skip))
        return true;
    }
  return loop(def);
}

/*
 * Helper to allow for flexible forms of
 *
 * zoe.implement([], {})
 * zoe.implement({})
 * zoe.implement([])
 *
 * All compiling into the definition
 *
 */
var inheritCheck = function(inherits, definition) {
  if (!(inherits instanceof Array)) {
    definition = inherits;
    inherits = [];
  }
  definition = definition || {};
  definition._implement = inherits.concat(definition._implement || []);
  return definition;
}

/*
 * zoe.inherits
 *
 * A utility function to determine if an object has inherited
 * the provided definition.
 *
 */
zoe.inherits = function(obj, def) {
  if (obj._definition)
    return zoe.inherits(obj._definition, def);
  if (def._definition)
    return zoe.inherits(obj, def._definition);
    
  var match = false;
  implementLoop(obj, function(item) {
    if (item === def) {
      match = true;
      return true;
    }
  });
  
  return match;
}



/*
 * zoe.Constructor
 * http://zoejs.org/#zoe.Constructor
 *
 * A base inheritor definition for zoe.create that allows for javascript prototype construction
 * such that we can create a class that can be instantiated with the new keyword.
 *
 * Usage:
 *
 *   var Obj = zoe.create([zoe.Constructor], {
 *     construct: function(args) {
 *     },
 *     prototype: {
 *       prototype: 'property'
 *     }
 *   });
 *
 *   var p = new Obj(args);
 *
 * In this way, zoe.create and zoe.Constructor provide a convenience method for
 * building up constructable prototypes with multiple inheritance through definition objects.
 *
 * Additionally, once zoe.Constructor has been implemented, standard JavaScript classes written
 * natively can also be extended by adding them into the zoe.create implement list after zoe.Constructor.
 *
 */

// test eval support
var evalSupport = false;
try {
  eval('');
  evalSupport = true;
}
catch (e) {}

zoe.Constructor = {
  _base: function(name) {
    if (evalSupport && name && name.match(/^[a-z]+$/i))
      return eval('(function ' + name + '(){if(' + name + '.construct)' + name + '.construct.apply(this, arguments);})');
    else
      return function Constructor() {
        // http://zoejs.org/#zoe.create
        if (Constructor.construct)
          Constructor.construct.apply(this, arguments);
      }
  },
  _extend: {
    prototype: zoe_extend,
    construct: zoe_extend.CHAIN
  },
  _integrate: function(def) {
    //allow for working with standard prototypal inheritance as well    
    if (typeof def == 'function' && !def._definition)
      return {
        construct: def,
        prototype: def.prototype
      };
    //the prototype property is skipped if it isn't an enumerable property
    //thus we run the extension manually in this case
    var getPropertyDescriptor = Object.getOwnPropertyDescriptor;
    if (getPropertyDescriptor) {
      var p = getPropertyDescriptor(def, 'prototype');
      if (p && !p.enumerable)
        zoe_extend(this.prototype, def.prototype, zoe_extend.deriveRules(this._extend, 'prototype'));
    }
  }
};

zoe_fn.COMPOSE_FIRST = function COMPOSE_FIRST(self, args, fns) {
  if (fns.length == 0)
    return;
  var newArgs = fns[0].apply(self, args);
  args = (newArgs instanceof Array) ? newArgs : args;
  for (var i = 1; i < fns.length; i++)
    fns[i].apply(self, args);
}
zoe.InstanceEvents = {
  _extend: {
    _events: 'ARR_APPEND' 
  },
  construct: function() {
    var _events = this.constructor._events;
    if (!_events)
      return;

    for (var i = 0; i < _events.length; i++) {
      var evt = _events[i];
      this[evt] = zoe.fn(this[evt] ? [this[evt]] : [], this[evt] ? 'COMPOSE_FIRST' : 'LAST_DEFINED').bind(this);
    }
  }
};

return zoe;
}));



;function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}