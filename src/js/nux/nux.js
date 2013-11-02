//https://github.com/malko/l.js
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
			url = (this._prefix)? this._prefix + url: url;
			return this.loadjs(url,cb);
		}
		,loaded = {}  // will handle already loaded urls
		,loader  = {
			aliases:{}
			,loadjs: function(url,cb){
				
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
			,prefix: function(path) {
				if(path) this._prefix = path;
				return this._prefix;
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

/* 
 * zoe.js 0.0.1
 * http://zoejs.org
 */(function(e,t){typeof exports=="object"?module.exports=t():typeof define=="function"&&define.amd?define(function(){return t()}):e.zoe=t();zoe=t()})(this,function(){var e={},t=typeof window!="undefined"?window.console=window.console||{}:global.console;t.dir=t.dir||function(){},t.log=t.log||function(){};var n=e.fn=function(e,t){if(typeof e=="function"||typeof e=="string")t=e,e=null;var u=function(){return u.run(u._this||this,Array.prototype.splice.call(arguments,0),u.fns)};return u.constructor=n,u.fns=e||[],u.run=(typeof t=="string"?n[t]:t)||n.LAST_DEFINED,u.on=i,u.off=s,u.first=o,u._this=undefined,u.bind=r,u},r=function(e){return this._this=e,this},i=function(e){return this.fns.push(e),this},s=function(e){if(!e){this.fns=[];return}for(var t=0;t<this.fns.length;t++)if(this.fns[t]==e){this.fns.splice(t,1);return}},o=function(e){return this.fns=[e].concat(this.fns),this};n.executeReduce=function(e,t){return t===undefined&&(t=e,e=undefined),typeof e=="function"&&(e=e()),function(n,r,i){var s=e;for(var o=0;o<i.length;o++)s=t(s,i[o].apply(n,r));return s}};var u=n.LAST_DEFINED=n.executeReduce(function(e,t){return t!==undefined?t:e});n.STOP_DEFINED=function(t,n,r){var i;for(var s=0;s<r.length;s++){i=r[s].apply(t,n);if(i!==undefined)return i}return i},n.ASYNC=n.ASYNC_NEXT=function(t,r,i){var s=0,o;typeof r[r.length-1]=="function"&&(o=r.pop());var u=function(e){return function(){i[e]?i[e].length>=r.length+1||i[e].run==n.ASYNC?i[e].apply(t,r.concat([u(e+1)])):(i[e].apply(t,r),u(e+1)()):o&&o()}};return u(0)()},n.ASYNC_SIM=function(t,n,r){var i=0,s;typeof n[n.length-1]=="function"&&(s=n.pop());for(var o=0;o<r.length;o++)r[o].apply(t,n.concat([function(){++i==r.length&&s()}]))},e.on=function(e,t,r){var i=e[t];if(!i||i.constructor!=n||i.run!=n.LAST_DEFINED)e[t]=n(i?[i]:[]);e[t].on(r)},e.off=function(e,t,r){if(e[t].constructor==n)return e[t].off(r)};var a=e.extend=function(n,r,i){n=n||{};var s=arguments;s.length>2&&(i=s[s.length-1]);var o;typeof i=="object"?(o=i,i=undefined):i||(r._extend&&(n._extend=a(n._extend||{},r._extend,"REPLACE")),o=n._extend);if(o)for(var u in o){var f=u.indexOf(".");if(f!=-1){var l=u.substr(0,f);o[l]||(o[l]=a)}}for(var u in r)if(!r.hasOwnProperty||r.hasOwnProperty(u)){if(u=="_extend")continue;var c=r[u],h,p=u.length,d=u.substr(0,2)=="__",v=u.substr(p-2,2)=="__",m=d&&!v&&(u=u.substr(2))&&a.APPEND||!d&&v&&(u=u.substr(0,p-2))&&a.PREPEND||d&&v&&(u=u.substr(2,p-4))&&a.REPLACE,g=m||i||o&&(o[u]||o["*"])||a.DEFINE;typeof g=="string"&&(g=a[g]);try{h=g(n[u],c,o&&a.deriveRules(o,u))}catch(y){throw t.dir(n),t.dir(r),t.dir(a.deriveRules(i,u)),'zoe.extend: "'+u+'" override error. \n ->'+(y.message||y)}h!==undefined&&(n[u]=h)}if(s.length>3){var b=[n];b.concat(Array.prototype.splice.call(s,2,s.length-3,s.length-3)),b.push(i),$z.extend.apply(this,b)}return n};a.EXTEND=a,a.DEFINE=function(t,n){if(t!==undefined)throw"No override specified.";return n},a.REPLACE=function(t,n){return n!==undefined?n:t},a.FILL=function(t,n){return t===undefined?n:t},a.IGNORE=function(){};var f=function(e){return e!=null&&e.constructor==Object},l=function(e){return typeof e=="function"},c=function(e){return typeof e=="string"},h=function(e){return e instanceof Array},p=function(e,t){return e?typeof e=="string"?e:(e&&!e["*"]&&(e["*"]=t),e):t};a.APPEND=function(t,n,r){return f(n)?a(f(t)?t:{},n,p(r,"REPLACE")):l(n)?a.CHAIN(t,n):c(n)?a.STR_APPEND(t,n):h(n)?a.ARR_APPEND(t,n):n},a.PREPEND=function(t,n,r){return f(n)&&(t===undefined||f(t))?a(t||{},n,p(r,"FILL")):l(n)?a.CHAIN_FIRST(t,n):c(n)?a.STR_PREPEND(t,n):h(n)?a.ARR_PREPEND(t,n):t===undefined?n:t},a.DAPPEND=function(t,n,r){return a.APPEND(t,n,p(r,"DAPPEND"))},a.DPREPEND=function(n,r,i){return e.extend.PREPEND(n,r,p(i,"DPREPEND"))},a.DREPLACE=function(t,n,r){return f(n)?a(t||{},n,p(r,"DREPLACE")):h(n)?a(t||[],n,p(r,"DREPLACE")):n},a.DFILL=function(t,n,r){return f(n)?a(t||{},n,p(r,"DFILL")):typeof t=="undefined"?n:t},a.ARR_APPEND=function(t,n){return t=t||[],t.concat||(t=[t]),t.concat(n)},a.ARR_PREPEND=function(t,n){return n=n||[],n.concat||(n=[n]),n.concat(t||[])},a.STR_APPEND=function(t,n){return t?t+n:n},a.STR_PREPEND=function(t,n){return n+t},a.deriveRules=function(e,t){var n;for(var r in e){if(r=="*")continue;var i=r.split(".");if(i[0]==t||i[0]=="*")n=n||{},n[i.splice(1).join(".")]=e[r]}return n},a.makeChain=function(e,t){return typeof e=="string"&&(e=n[e]),function(r,i){if(!r||r.constructor!=n||r.run!=e)r=n(r?[r]:[],e);return t?r.first(i):r.on(i),r}},a.CHAIN=a.makeChain(n.LAST_DEFINED),a.CHAIN_FIRST=a.makeChain(n.LAST_DEFINED,!0),a.CHAIN_STOP_DEFINED=a.makeChain(n.STOP_DEFINED),a.CHAIN_ASYNC=a.makeChain(n.ASYNC),e.create=function(e,t){t=v(e,t),t._definition&&(t=t._definition);var r;d(t,function(e){if(e._base)return r=e._base(t),!0}),r=r||{},r._definition=t,r._extend={_base:a.IGNORE,_implement:a.IGNORE,_reinherit:a.IGNORE,_make:a.IGNORE,_integrate:a.IGNORE,_built:a.IGNORE};var i=[],s=n(),o=n();return o._this=s._this=r,d(t,function(n){n=o(n,t)||n,n._integrate&&o.on(n._integrate),a(r,n),n._make&&n._make.call(r,t,n),n._built&&s.on(n._built),i.push(n)},function(t){return i.indexOf(t)!=-1&&!t._reinherit}),s(t),r};var d=function(e,n,r){r=r||function(){};if(e._implement)for(var i=0,s=e._implement.length;i<s;i++){var o=e._implement[i];o||(t.dir(e),t.log("Implementor not defined!")),o._definition&&(o=o._definition);if(r(o))continue;if(d(o,n,r))return!0}return n(e)},v=function(e,t){return e instanceof Array||(t=e,e=[]),t=t||{},t._implement=e.concat(t._implement||[]),t};return e.inherits=function(t,n){if(t._definition)return e.inherits(t._definition,n);if(n._definition)return e.inherits(t,n._definition);var r=!1;return d(t,function(e){if(e===n)return r=!0,!0}),r},e.Constructor={_base:function(e){function t(){t.construct&&t.construct.apply(this,arguments)}return t},_extend:{prototype:a,construct:a.CHAIN},_integrate:function(e){if(typeof e=="function"&&!e._definition)return{construct:e,prototype:e.prototype};var t=Object.getOwnPropertyDescriptor;if(t){var n=t(e,"prototype");n&&!n.enumerable&&a(this.prototype,e.prototype,a.deriveRules(this._extend,"prototype"))}}},e.InstanceEvents={_extend:{_events:"ARR_APPEND"},construct:function(){var t=this.constructor._events;if(!t)return;for(var n=0;n<t.length;n++){var r=t[n];this[r]=e.fn(this[r]?[this[r]]:[]).bind(this)}}},e});

// http://strangemother.github.io/getterSetterJS/
// 475 bytes gzipped (967 bytes uncompressed)
	function arg(b,a,c,f){var d=null;if(a.constructor==Array)for(var e=0;e<a.length;e++){if(b[a[e]]||!1===b[a[e]]){d=b[a[e]];break}}else if(b[a]||!1===b[a])d=b[a];null==d&&void 0!=c&&(d=c);return f?[d,a[e]]:d}getterSetter=function(b){return GetterSetter.apply(b,arguments)};
	GetterSetter=function(){var b,a,c;this.init=function(){var l=arg(arguments,0,this),g=arg(arguments,1,null),h=arg(arguments,2,null),k=arg(arguments,3,null),m=f.value=arg(arguments,4,l[g]||void 0);h&&(a=h);k&&(c=k);h=d(h);k=e(k);b=m;Object.defineProperty(l,g,{get:h,set:k});return f};var f={value:null,getter:function(b){return b?(a=b,this):d(a)},setter:function(b){return b?(c=b,this):e(c)}},d=function(d){return function(g,c){g=arg(arguments,0,b);c=arg(arguments,1,"get");var e=arg(arguments,2,a||d),f;
	e&&(f=e(g,c));return void 0!==f?f:b}},e=function(a){return function(a){b=a;f.value=a;if(null==c||void 0==c)return d()(a,"set");a=c(a);void 0!=a&&(b=a)}};return this.init.apply(this,arguments)};

(function(config){
	var NuxConfig = {
		allowGlobals: true,
		globalName: "Nux",
		globalConfigName: 'NuxConfig',
		name: "Name",
		debug: false,
		prefix: "NX",
		// secure defined the requirement to check if an asset
		// is allowed to be imported.
		// If false, the extension must first be applied through
		// addAllowed(name)
		// If true, the extension will be allowed automatically
		secure: false,
		// Extension namespace to build an extension
		// based upon spaces loaded. - It"s at this
		// point we target another application or version 
		// foo.extension.2
		extensionNamespace: "nux.extension",
		// Load folder for extension matching the expression
		// {extennsionNamespace}.{extensionName}.js
		extensionPath: "js/nux/extensions/",
		// Call once, if only once instance of the 
		// Nux can be booted at any given time.
		runOnce: true,
		overrideSpace: 'override',
		// relative prefix for all assets imported
		assetPath: './',
		// If a method is called prior to the Nux.boot() method
		// being called; autoBoot ensures the call does not go
		// unanswered. Instead; core logic is imported using 
		// boot config settings and an attempt is made to the method
		// call when required.
		autoBoot: true,
		// Automatically collect requirements (other extensions
		// the importing extension requires to run correctly)
		required: true,
		// Extensions allowed to be executed and implemenred
		// This should only exist in
		// core loaders and baked
		// objects
		allowed: [],
		events:  ['ready', 'allExpected'],
		// Special internal logger written to conform
		// to a log method for Nux, 
		// Apply slog name to define an action
		// performed under 'slog name' when in debug
		ignoreLog: ['handle'],
		// independant file assets  used for Nux.
		assets: {
			'agile': "js/vendor/com.iskitz.ajile.src.js?mvcoff,mvcshareoff,cloakoff, debugoff",			
			'zoe': 	"js/vendor/zoe.min.js",
			'themis': [
				//"js/vendor/themis/getterSetter.js", 
				"js/vendor/themis/tester.js"],
			'nux': ["agile", "themis"],
			// assets fundamental to Nux - Will be loaded first
			'required': [
				'themis', 
				'agile',
				'js/nux/vendor/majaX.js',
				'js/nux/app/tools.js'
			]
		}		
	}

	var Nux = {
		// A funtion foconsr callback defaults
		_F: function(){},


		core: {
			spaceDefinitions: [],
			newSpace: function(name, space) {
				/*
				Write a new namespace for a preloading extension
				 */

				// If the name register is not in the expected
				// namespace, and debug == true; raise error
				if(Nux.config.def.debug) {
					Nux.core.slog('SPACE', name);
				}
				
				space['name'] = name;
				space['created'] = +(new Date);
				
				if(!space.hasOwnProperty('_meta')) {
					space['_meta'] = {
							Nux: Nux
						}
				}
			
				

				var overrides = Nux.signature.overridesAllowed(name);
				// Overrides will have been previously
				// applied through the allowed permissions
				if( overrides ) {	
					// a list of extensions
					// should exist if they have been correctly
					//  
					// applied at addAllowed() passing
					// a config object with 'overrides' defined

					var overrideSpace = {};
				
					if(!space.hasOwnProperty(Nux.config.def.overrideSpace)) {
						overrideSpace = space[Nux.config.def.overrideSpace];
					}
					
					for( var i = 0; i < overrides.length; i++ ) {
						var path = Nux.space( overrides[i] );
						var objName = path.replace(Nux.space(), '');
						// Every method is marked for override of the
						// original
						overrideSpace[objName] = {}
					};
					
					space[Nux.config.def.overrideSpace] = overrideSpace;
				}
				/*
				Return a new base space object for the name provided.
				*/
				return space
			},

			namespace: function(name){
				var space = arg(arguments, 1, null);
				// To be returned.
				var _space;
				/*
				Return a namespace. If the namespace
				does not exist a new empty object will
				be returned.
				*/
				
				if( name ) {

					var _name = Nux.space(name);

					(!Namespace) && Nux.errors.throw(01, 'zoejs needed for Namespace')
					if( space ) {

						var _space = Namespace( _name );
						_space = space;
					} else {
						var __space = Namespace( _name );
						var _space = Nux.core.newSpace(_name, __space);
					}

					for( var i = 0; i < Nux.core.spaceDefinitions.length; i++ ) {
					 	var definition = Nux.core.spaceDefinitions[i];
					};
				} else {
					return Import(Nux.config.def.extensionNamespace);
				}

				return _space;	
			},

			space: function(name) {
				/*
				Receive the fully qualified name
				for the application NAMESPACE
				*/
				if(!name) {
					name = ''
				} else {
					name = name
				}

				if( name.indexOf(Nux.config.def.extensionNamespace) >= 0) {
					return name
				}

				var str = Nux.config.def.extensionNamespace + '.' + name;
				return str;
			},

			makeGlobal: function(name, entity) {
				// create a global scoped (window) object.
				// apply the global object
				if( window.hasOwnProperty(name) ) {
					throw new Error("Nux.makeGlobal: '" + name + "' already exists.");
				} else {
					window[name] = entity;
				}
			},

			meta: function(extension){
				/*
				Provide a meta object, returned is a
				object chain for making requests to 
				an extensions _meta data

				following can be performed:

					meta.value()
				
				Receive an object containing meta content on the extension

					meta.parent()

				Recieve the parent extension; the element associated with this 
				meta data

					meta.has(value)

				returns true/false if the associated meta object has the value
				associated.
				 */
				

				var metaMethod = (function(extension){
					var meta = extension._meta;
					var chain = {
						parent: function(){
							return extension;
						},

						value: function(){
							var el = arg(arguments, 0, null);
							return (el)? meta[el]: meta;
							
						},

						has: function(name){
							/*
							Does this meta have the given
							value
							 */
							return meta.hasOwnProperty(name);
						}
					};

					return chain;
				})(extension)

				return metaMethod
			},
			globalise: function(){
				if(Nux.config.def.allowGlobals) {

					Nux.core.makeGlobal(Nux.config.def.globalConfigName, Nux.Config);
					Nux.core.makeGlobal(Nux.config.def.globalName, Nux);
				}
			},

			/** @param {...string} s */
			log: function(s) {
				var msgs = [],
					orig = console.log,
			        prefix = (window== top ? '' : '[' + window.name + ']');
			    
			    var i = 0;
			    while(arguments.length){
			    	if(i == 0) { 
			    		prefix = Nux.config.def.prefix || Nux.config.def.globalName;
			    		prefix += ': ';
			    	} else { 
			    		prefix = '';
			    	}
			        msgs.push([].shift.call(arguments));
			        i++;
			    };
			    var isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
			    var append = ''
			    if(isChrome){
				    var stack = new Error().stack;

				   	// debugger
				    var file = stack.split("\n")[2].split(":")[2].split('/').pop();
				    if(!file)
						file = stack.split("\n")[2].split("/")[4].split("?")[0]
					line = parseInt(stack.split("\n")[2].split(":")[3], 10);
				  
					append = '> ' + file + ':' + line
				}

				// msgs.push(append)

			    orig.apply(console, msgs);
			},

			slog: function(state, string){

				var rPad10 = function rPad10(s) {
				    return s + ( "          " ).substr( s.length );
				}

				var hidden = Nux.config.def.ignoreLog;
				if(!Nux.config.def.debug) return 
				/* State log, for writing statement logs 
				unique to Nux loading */
				if(hidden.indexOf(state.toLowerCase()) == -1 ) {
					Nux.core.log(rPad10(state), string);
				}
			}
		}, 

		Shell: function(){
			// return a ready widget
			return loader.Class.apply(this, arguments)
		},

		settings: {
			load: function(obj, cb) {
				/*
				Load an asset file

					{
						url:'http://cd/data.csv', 
						method:'GET', 
						data:{foo:'bar',lorem:'ipsum'
					}
					{
						'url':'http://cd/data.xml', 
						'method':'GET', 
						'data':{'foo':'bar','lorem':'ipsum'}, 
						'header':{'Content-type':'text/xml'}}
					{
						url:'http://data.csv', 
						method:'GET', 
						data:{ foo:'bar',lorem:'ipsum'} }, 
						function(csv) { JSON.stringify(csv, null, '  ')
						}
					{
						url:'http://plain.txt', 
						method:'GET', 
						data:{foo:'bar',lorem:'ipsum'}
					}
					{
						url:'http://xml.xml?foo=bar&lorem=ipsum', 
						method:'DEBUG', 
						data:{foo:'bar',lorem:'ipsum'}
					}
				*/
			
				if( Themis.of(obj, String) ) {
					obj = {
						url: obj,
						method: 'GET'
					}
				}

				majaX(obj, cb);
			}			
		},

		config: {
			// Default configuration for Nux.
			def: NuxConfig,

			merge: function(){
				/* Merge config passed with default config space 
				
					merge({})
				merges passed bject into the nux def configuration
				returned it an updated version of Nux.config.def

					merge({}, {})

				merge the two objects by reference of  objectA == objectA <- objectB

					merge({}, {},  rules={})

				pass an object set as defined rules for merging.
				Returned is ObjectA with ObjectB properites applied by 
				definitions with the rules object. By default the rules are
				Nux.config.rules
				*/
				var config = arg(arguments, 0, {
						applied: (new Date) // Time the config object was applied
					}), 
					dest = arg(arguments, 1, Nux.config.def),
					rules = arg(arguments, 2, Nux.config.rules);
				
				return zoe.extend(dest, config, rules);

			},

			configure: function(on){
				return Nux
			},

			rules: {
				'*': 'REPLACE',
				'allowed': 'ARR_APPEND'
			},

			permit: function(path, children){
				/*
				Permit a path to import with use().

				pass children=true:

					permit(pathString, true)

				collects deep permissions from
				extensions _meta.allowed. This data may exist 
				outside the required extension. 

				If the extension needs to be imported, the _meta.main
				is not called therefore the extension should be inert.
				 */
				path = arg(arguments, 0, null);
				children = arg(arguments, 1, false);

				var overrides = null;
				var mp;

				if( Themis.of(path, String) ) {
						mp = [Nux.space(path)];
					} else if( Themis.of(path, Object) ) {
						mp = [Nux.space(path.name)];
						
						// object should be mapped to
						// path and overrides
						//var allowed = Nux.signature.overridesAllowed(path, path.overrides)
						overrides = path.overrides;
					} else if( Themis.of(path, Array) ) {
						
						mp = [Nux.space(path[0])];
						overrides = path[1];

					}

					if(path)  {
						if(children){
								
							Nux.signature.permit(path, children);
						} 
					}

					if( overrides ) {
						Nux.signature.overrides[mp[0]] = overrides;
					};
					var merge = zoe.extend(Nux.config.def, { allowed: mp }, Nux.config.rules);
					return merge;
			},

			addAllowed: function(path, parent){
				/*
				Add a path to allow for use(). If a path is not
				allowed, the import will fail.
				
				When importing children the framework may load the
				external file to read the _meta. The extensions _meta.main
				method will not be called.

					addAllowed(path, false)

				Don't import _meta.allowed

					addAllowed(path, true)

				Import children.

				This method mplements the config.permit method
				 */
				var getChildren = arg(arguments, 1, false);
				
				if( path ) {
					if( Themis.of(path, String) ) {
						Nux.config.permit(path, getChildren);
					} else if( Themis.of(path, Object) ) {
 						Nux.errors.throw(04, 'addAllowed accepts String or Array');
					} else if( Themis.of(path, Array) ) {
						for( var i = 0; i < path.length; i++) {
							Nux.config.permit(path[i]);
						};
					};
				};

				return Nux;
			}
		},	

		assets: {
			allow: function(name) {
				/* returns true or false if the passed name is allowed
				access - this is both user defined and blacklist. 
				If an array is provided an object is returned.
				Key is the name of the iterative, value is true/false */
				if( !Themis.of(name, Array) ) {
					name = [name]
				};

				if( !Nux.config.def.hasOwnProperty('allowed') ){
					Nux.errors.throw(30, 'config.def.allowed != []')
					Nux.core.log("WHAT?   Missing access allowances for", name);
					return false;
				};

				var inExtensions = false;

 				name.forEach(function(_name, i, a){
					Nux.config.def.allowed.forEach(function(s,j,b){
						if(s == name || Nux.space(s) == _name) {
							inExtensions = true;
							// Nux.core.log('ALLOW   ', _name)
						}
					});
				});

				if( inExtensions || !Nux.config.def.secure ) {
					// Nux.core.log("Allow access:", name);
					return true;
				};

				Nux.errors.throw(75, name);
				Nux.core.log("REFUSE ASSET", name);
				return false;
			},

			add: function(obj) {
				/**
				 * assign an object of assets for use
				 * with the framework. Correctly applying 
				 * these will allow for better baking.
				 */
				if(obj) ljs.addAliases(obj);

				return this
			},

			load: function(obj, cb) {
				// clean nux string
				try {
					console.log('load', obj)
					var path = Nux.config.def.assetPath;
					ljs.prefix(path);
					ljs.load(obj, cb);
				} catch(e) {
					console.log(e)
				}
			}
		},

		fetch: {
			fails: {},
			expected: [],
			listeners :{},
			chain: [],
			imported: [],	

			load: function() {
				return Load.apply(this, arguments);
			},
			
			next: function(){
				var next = Nux.fetch.chain.shift();

				if(next) {
					return Nux.use.apply(Nux, next)
				}
			},

			use: function(name) {

				var handler = arg(arguments, 1, Nux._F);
				var path = arg(arguments, 2, Nux.config.def.extensionPath);
				
				// Add to handler chain
				// This method may throw an error is the asset has been refused.
				
				// Turn a string into an array if required.
				var _handlerHooks = (Themis.of(name, Array))? name: [name];
				// spaceify the names
				var handlerHooks = [];

				for (var i = 0; i < _handlerHooks.length; i++) {
					var _name = Nux.space(_handlerHooks[i]);
					handlerHooks.push(_name);
				};
				
				// name is implemented as array only
				Nux.listener.add(handlerHooks, handler);

				console.time(handlerHooks)
				// Add removeListener (on name import list) handler to listeners
				Nux.listener.add(handlerHooks, function(ext){
					console.timeEnd(ext.name);
					console.log(arguments);
				});

				for (var i = 0; i < handlerHooks.length; i++) {
					var name = handlerHooks[i];
					// begin import
					Nux.fetch.get(name, path);
				};

				// Nux.fetch.get(Nux.space(name), path);
				
				/*
					// receive import
						// handle import to all listeners
							// slice import name from any handler in chain with importName in [name] array
							// handler handlers with an empty array of names should be called:
								Every call made removed a name from the list. If the
								list is empty all names are imported and the handler 
								should be called.
							// removed any called listener.
				// return chain methods:
					// Use: 
						perform another concurrent call. 
						use() is returned because you may want a different
						handler hooked to a name import
					// Then:
						After the previous handlers have been executed, ( use() )
						_then_ perform this method.
					// On: 
						Inhert handler of which is only called when the name
						is imported. No import is made when on() referenced
				 */
			},

			_use: function(name){
				/*
				Externally accessible method o implement a Nux
				extension. the Use method:

					use(nameString [, handlerFunction][, importPathString])

				returned is an extension chain containing:

					then(name [, handlerFunction])
				
				This method implements the fetch.get method
				 */
				
				var handler = arg(arguments, 1, Nux._F);
				var path = arg(arguments, 2, Nux.config.def.extensionPath);
				var handler_hook = arg(arguments, 3, name);
				
				// This method may throw an error is the asset has been refused.
				Nux.listener.add(handler_hook, handler);
			
				Nux.core.slog('PROCESS', handler_hook);
				
				console.time("IMPORT " +  (name.path || name))

				Nux.fetch.get(Nux.space(name), path, function(){
					console.timeEnd("IMPORT " + (name.path || name))
				});

				var chain = Nux.fetch.chain;
				// Import Chain
				var hook = {
					then: function(_name){
						/*
						Chaining imports can be a nasty business.
						Use promise like then() method hooking to stop
						nesting nightmares.

						use('core').then('loader', function(){
							// core and loader imported.
						})
						*/
						var _n = Nux.space(_name);

						if(Nux.space(name) in Nux.fetch.fails) {
							Nux.core.slog("REFUSE", _n);
						} else {
							var _handler = arg(arguments, 1, Nux._F);
							// debugger
							var pri = chain.push([_n, _handler]);
							// Nux.core.log("with  ", _n, 'handler:', Boolean(_handler));
						}
					}
				}

				return hook
			},

			get: function(name){
				/*
				Perform an import utilizing the namespace.
				A single fully qualified name should be passed.
				listeners should already be prepared.
				This method implements the internally used _import method.
				*/
				var path = arg(arguments, 1, Nux.config.def.extensionPath);
				Nux.fetch._import(name, path);
			},
			
			_import: function(name){
				/*
				Performs an import to the referenced file.
				This should be used internally in favour of the 
				fetch.use(name, handler) method.
				Handlers and callbacks should have been setup prior
				to calling this method.

				return is undefined.
				 */
				
				var path = arg(arguments, 1, Nux.config.def.extensionPath),
					v 	 = Include(name, path);

				return v;
			}
		},

		errors: {
			Exception: function(errorCode, val, message) {
				this.value = val;
				this.message = message;
				this.errorCode = errorCode;
				this.toString = function(){
					return 'NuxError: ' + this.errorCode + ' "' + this.message + '": ' + this.value;
				}

				return this;
			},
			errors: {
				00: 'Not Booted',
				01: 'Missing Asset',
				04: 'not implemented',
				// The event name passed has already been
				// created. addEvent() has been used
				11: 'event exists',
				
				// The event name called does not exist
				20: 'event missing',
				// The allowed array from the config file
				// is missing. implent:
				//  {
				//    allowed: [],
				//  }
				30: 'Missing allowed',
				// the asset of which tried to load
				// is not allowed.
				75: 'refuse asset'
			},
			errorMap: function(errorCode) {
				return {
					errorCode: errorCode,
					message: this.errors[errorCode]
				}
			},
			error: function(errorCode){
				// Pass an identifier to 
				// produce an error.
				var em = this.errorMap(errorCode);
				
				var exception = new this.Exception(errorCode, arg(arguments, 1, null), em.message);
				return exception;
			},
			throw: function(errorCode, value) {
				throw this.error(errorCode, value);
			}
		},

		listener: {
			// Storage place of handlers waiting for
			// imports
			listeners: [],
			masterListeners: {},
			// Is true when Nux is ready to accept
			// events
			add: function(names, handler){
				
				// Loop names, applying namespace - 
				// follow by applying this as the new
				// handler hook chain
				
				// Call the master listener, passing the element 
				// if which is called.
				Nux.listener.masterListener(names);

				var hookChain = [];
				for (var i = 0; i < names.length; i++) {
					var space = Nux.space(names[i]);
					hookChain.push(space);
				};

				// Push the listener chain
				Nux.listener.listeners.push({
					expectedListeners: hookChain,
					listeners: [handler],
					// List of extensions imported
					// (later to be passed to the handler method
					// as arguments)
					extensions: []
				});
				
				return true;
			},
			masterListener: function(space){
				/*
				Create and return the master listener
				 */

				if(!Nux.listener.masterListeners.hasOwnProperty(space)) {
					Nux.listener.masterListeners[space] = 1;
				} else {
					Nux.listener.masterListeners[space]++;
				};
				
				if(!Nux.listener.masterListeners['master']) {
					Nux.listener.masterListeners['master'] = Ajile.AddImportListener(Nux.listener.handler);
				}
				return Nux.listener._masterLister;
			},
			handler: function(listener){
				/*
				An extension was imported. The object passed is the 
				listener object containing the extension and the handler
				 */
				// call all methods hooked
				var handlers = [],
					required = (listener.item._meta && 
						listener.item._meta.required)? listener.item._meta.required: null;

				if(required) {
					Nux.use(required, function(){
						console.log('All imports for', listener.name)
						

					});
				}
				
				console.log("Importing", listener.name)
				// strip the listener names from expected listeners
				var len = Nux.listener.listeners.length;
				while(len--) {

					var handler = Nux.listener.listeners[len];

					var ni = handler.expectedListeners.indexOf(listener.name);
					if(ni > -1) {

						// Check the extension for required - push the allowed
						// into the import array for this extension.
						if(required) {
							handler.expectedListeners = handler.expectedListeners.concat(required);
						}

						// remove the name of the expected listeners
						handler.expectedListeners.splice(ni, 1);
						// add a reference to the item imported.
						// by using the same index, arguments passed
						// back to the handler method are
						// positioned the same in the arguments
						// list
						handler.extensions.push(listener.item);

					}

					if(handler.expectedListeners.length == 0) {
						// If all the expected listeners have been
						// removed, all extensions required for 
						// this handler have been fetched.
						handlers = handlers.concat(handler.listeners);
						Nux.listener.listeners.splice(len, 1);
					}
				};

				// Call each handler in the array
				console.log("Calling", handlers.length, 'handlers')
				for (var i = 0; i < handlers.length; i++) {
					var hook = handlers[i];
					hook.apply(Nux, handler.extensions);
				};
			},
			

			metaRequired: function(listener, callHandler) {
				var required 	= {}

				if(!Nux.config.def.required) return
				if( listener.item.hasOwnProperty('_meta') ) {
					/*
					This should be changed to reference 
					the 'required' handler list from an extensions
					_meta object. These object should be imported
					before the endpoint handler is called.
					 */
					required = ( listener.item._meta.hasOwnProperty('extensions') )? 
									listener.item._meta.extensions: {};
					var overrides 	= listener.item._meta.overrides;
				};


				if( Nux.assets.allow(required) ) {
					Nux.core.slog('REQUIRE', required + ' for ' + listener.name);
					// debugger;
					forEachAsync(required, function(_next, el, i, arr) {
						
						Nux.signature.add(el)
						console.time('WANTED ' + el, arr)
						Nux.core.log('ASYNCGET', el)
						
						Nux.use(el, function(){
							Nux.core.log("Downloaded next item")
							console.timeEnd('WANTED ' + el)
							
						});

					}).then(function(){
						Nux.core.log("Pass listener", listener)
						callHandler(handler, listener)
					})

				} else {
					Nux.core.slog('DISALLOW', required);
				}
			},

			metaRun: function(listener){
				// extend the extension namespace and build
				// an extension around the provided namespace
				// objects.
				// defAppConfig.namespace = Namespace(defAppConfig.extensionNamespace)
				// Collect the run method from the _meta data or
				// default to the .run() method
				var runMethodName 	= 'main',
					runMethod,
					extension 		= listener.item,
					space 			= Nux.space(listener.name),
					defAppConfig 	= {},
					listeners 		= Nux.fetch.listeners[space];

				try{
					defAppConfig = (core.hasOwnProperty('_meta'))? core._meta.applicationConfig || {}: {};
				} catch(e) {

				}

				// debugger;
				// Cannnot use preferable loader components loader.Import/loader.Load
				// as they haven't been imported yet.
				zoe.extend(defAppConfig, Nux.config.def, {
					'*': zoe.extend.DFILL,
					'extensions': zoe.extend.ARR_APPEND
				})


				if( extension.hasOwnProperty('_meta') ) {
					var  meta = extension._meta;
					var runMethodName = ( meta.hasOwnProperty('main') ) ? 'main' : 'run';
					var metaValue = extension._meta[runMethodName];

					if( Themis.of(metaValue, String)) {

						if( extension.hasOwnProperty(runMethodName) ) {
							// call string defined extension run method
							runMethod = extension[metaValue];
						} else if( extension._meta.hasOwnProperty(runMethodName) ){
							runMethod = extension._meta[metaValue];
						} else {
							var s = listener.name + '._meta.main defines missing method ' + runMethodName
							throw new Error(s);
						}

					} else if(Themis.of(metaValue, Function)) { 
						runMethod = metaValue;
					}
					
				}

				var run;
				if(runMethod){ 
					run = runMethod(defAppConfig)
				} else {
					if(extension.hasOwnProperty('run')) {
						run = extension.run(defAppConfig);	
					}
				} 

				// Call handlers for this listeners name.
				Nux.signature.run(listener.name, run || true);
			},
		},

		signature: {
			signatures: {},
			overrides: {},
			// A space defines a signatures set and values.
			space: function(){
				var _space = {
					allowed: false,
					children: false,
					expected: false,
					/* The extension has loaded and the methods main
					import has been run */
					run: false,
					received: false
				}

				return _space;
			},
			state: function(name){
				// return the state of an entity;
				var _n = Nux.space(name);
				return Nux.signature.signatures[_n];
			},
			createSpace: function(obj){
					return Nux.signature.signatures[obj] = (new Nux.signature.space);
			},
			getSpace: function(obj) {

				if(!Nux.signature.exists(obj)) {
					Nux.signature.createSpace(obj);
				}

				return Nux.signature.signatures[obj]
			},


			exists: function(name) {
				// A config has loaded itself.
				return Nux.signature.signatures.hasOwnProperty(name)
			},
			
			add: function(name){
				/*
				Add a signature to the map to check 
				when the extension is loading.
				 */
				// A config has loaded itself.
				var space;

				if(!Nux.signature.exists(name)) {
					space = Nux.signature.createSpace(name);
					Nux.core.slog("WANTED", name);
				}

				return space || Nux.signature.getSpace(name);
			},

			permit: function(name, children) {

				// If children, check to see if name permit 
				// has children referenced. 
				// If no children are dermined (by space awareness?)
				// Call the allowed and inspect the children
				var sigSpace = Nux.signature.getSpace(name);
				sigSpace.allowed = true;
				sigSpace.children = children;
				debugger
			},
			receive: function(name){
				var a = arguments;
				name = arg(a, 0, null);
				name = name.name || name;

				Nux.core.slog('RECEIVE', name)

				if(Nux.signature.expected(name)) {
					var sigSpace = Nux.signature.getSpace(name);
					sigSpace.received = true;
				} else {
					Nux.signature.allowed(name, function(){
						Nux.core.slog('UNEXPECTED', 'ALLOWED ' + name);
					}, function(){
						Nux.core.slog('UNEXPECTED', 'REFUSE ' + name);
					})
				}
			},

 			run: function(name, runValue) {
 				// the imported object's run procedure has
 				// occured
 				if( Nux.signature.exists(name)) {
 					var sigSpace = Nux.signature.getSpace(name);
 					sigSpace.run = runValue;
    				Nux.core.slog("RUN", name)

 				} else {

					Nux.signature.allowed(name, function(){
						Nux.core.slog('BAD RUN', name);
					}, function(){
						Nux.core.slog('NO RUN', 'REFUSE ' + name);
					})	
 				}

 				return Nux.signature.getSpace(name)
 			},

			expected: function(){
				/**
				 * return if the package name is expecting to load.
				 * This would occur between an import and receive event
				 * for the importing package.
				 * 
				 * expected() --> returns array of expected imports
				 * expected(name) --> returns bool if name is expected
				 * expected(name, bool) --> set the expecting value
				 */
				var a = arguments;
				var name = arg(a, 0, false);
				var v = null;

				if(name) {					
					if (arg(a, 1, false) == true ) {
						
						if(Nux.fetch.expected.indexOf(name) == -1) {
							
							Nux.fetch.expected.push(name);
							v = true;						
							if( Nux.signature.exists(name) ) {
								var sigSpace = Nux.signature.getSpace(name);
								sigSpace['expected'] = v;
								Nux.core.slog("EXPECTED", name)
							} 

						} else {

							v = true;

						}
			

					} else {
						if(Nux.fetch.expected.indexOf(name) > -1){
							v = true
						} else {
							v = false;
							sp = Nux.space(name);
							if(Nux.fetch.expected.indexOf(sp) > -1){
								v=true;
							}
						}
					}
				} 


				var exp = (v !== null)? v: Nux.fetch.expected;
				
				// Nux.signature.signatures[name]['expected'] = v
				return exp;
			},

			allowed: function(name) {
				// returns true/false if the passed sig is
				// allowed. Pass a callback method to call 
				// in async request methods; i.e User input 
				var cb = arg(arguments, 1, null);
				var cbf = arg(arguments, 2, null);
				if( cb ) {
 					var r = Nux.assets.allow(name);
					if( r ) {
						return cb(name) || r;
					} else {
						return cbf(name) || r;

					};
				} else {
					return Nux.assets.allow(name)
				}
			},

			overridesAllowed: function(name, overrides) {
				var allows = {}

				if( overrides ) {	
					for( var i = 0; i < overrides.length; i++ ) {
						var override = overrides[i];
						allows[override] = Nux.signature.overrideAllowed(name, override)
					};
				} else {
					if(name) {
						allows = Nux.signature.overrides[name];
					}
				}

				// how many? return false;
				return allows;
			},

			overrideAllowed: function(name, override) {
				/* Pass an override string 

				 	overrideAllowed()
				 	    returns the overrides allowed.
				 	    
				 	overrideAllowed(name)
				 		return a list of overrides for this name
				 		
				 	overrideAllowed(name, override)
				 		returns boolean if this override is allowed.
				 	
				 returning bool if this application
				 is allowed to override this method
				*/
				if( Nux.signature.exists(name) ) {
					
					if( override ) {
						if( Nux.signature.overrides.hasOwnProperty(name) ) {
							var value = Nux.signature.overrides[name][override];
							if( Themis.of(value, Boolean)) {
								return value;
							} else if( Themis.of(value, Object) ) {
								return value.allowed;
							}
						} else {
							return false;
						}
					
					} else {
						return Nux.signature.overrides[name]
					}
				}

				return  Nux.signature.overrides
			},

			addFail: function(name){
				// Add a fail account against the signature
				// returns the count of fails occured

				if( Nux.fetch.fails.hasOwnProperty(name) ) {
					Nux.fetch.fails[name] += 1
				} else {
					Nux.fetch.fails[name] = 1;
				}

				if(Nux.signature.exists(name)) {
					Nux.signature.signatures[name]['fails'] = Nux.fetch.fails[name];
					Nux.core.slog("FAILED", name)					
				} else {
					Nux.core.slog("LOST FAIL", name)
				}


				return Nux.fetch.fails[name];
			},

			hasFailed: function(name){
				// Check if the signature passed (plugin name)
				// has failed returns 
				// true for failed 
				// false for a passed signature
				if( Nux.fetch.fails.hasOwnProperty(name) ) {
					return true;
				} else {
					return false;
				}
			}
		},

		use: function(obj){
			/* provide array or string of assets to import */
			var handler = arg(arguments, 1, Nux._F);
			var path = arg(arguments, 2, Nux.config.def.extensionPath);

			if(!Nux.booted) {
				Nux.errors.throw(00, 'Nux.boot() must be performed')
			}
			
			var hook = Nux.fetch.use(obj, handler, path, obj);

			return hook;
		},

		// A list of all events to be exposed and captured 
		// through the interface. These are implemented as 
		// stacking functions for chaining callback methods.
		events: (function(context){

				// Self handling event structure. Mostly an 
				// experiment to see if creating and destroying
				// events can be handled silently.
				
				// Why hide the addEvent?
				// 		To ensure the core event handler has as little
				// 		exposure as possble. Once the loading is 
				// 		acheived, only this internal framework
				// 		should handle JS protection.

				var addEvent = function (context, eventName){
					/*
					Add an event to the the call stack, creating a wrapper
					for the passThrough and context.
					 */
					
					if(! context.callbacks.hasOwnProperty(eventName)) {
						 context.callbacks[eventName] = [];
					} else {
						throw(11, eventName)
					}

					return context[eventName] = (function(eventName){ 

						return function(callback){
							/*  add a method to be called when the application is ready.
							If the assets are ready, the function will be called immediately. */

							// By referencing the eventName within the callback, we apply it
							// to the functional scope - keeping the value when the method is
							// called. Without this (thusly returning a function without the closure)
							// would mangle the callback scope and any event would reference the
							// eventName last indexed in the looping 'events' creation.
							
							var name = eventName;
							if(!Nux.booted || !Nux.events.passThrough(eventName)) {
								context.callbacks[name].push(callback);
								return context.callbacks[name];
							} else {
								return callback(Nux)
							}
						}
					})(eventName)
					
				}; 
				/* create the event handlers for each event type*/
				for (var i = 0; i < context.events.length; i++) {
					var eventName = context.events[i];
					
					if(!context.hasOwnProperty(eventName)) {
						addEvent(context, eventName);
					}
				};

				context.create = function(name){
					/*
					Add an event to the event stack - pass a name for the 
					handled event:

						addEvent('foo')

					you can instantly assign listeners.

						addEvent('foo')(function(){
							// first Listener
						})

					This can be called

						callEvent('foo')

					and events can be chained

						Nux.events.foo(function(){
							console.log('foo called');
						})
					 */
					var _context = context;
					var v = addEvent(_context, name)
					_context.events.push(name);
					return v
				}
				return context;
			})({ 

				/* the list of events the system will register for callbacks.
				Probably, not best to mess with these */
				events: NuxConfig.events,
				callbacks: {},
				callEvent: function(name){
					/* call an event, optionally passing args and scope 

						callEvent(name)

					Call event with arguments

						var returns = callEvent(name, [Nux, foo,'bar']);

					returns is an array of returns from each stacked callback and
					the passthrough state.

					Activate passthrough for all later event calls

						var passed = callEvent(name, true);

					// Next time [name] is called, the handler method is 
					immediately called rather than with stacked.
					*/

					// Arguments passed to the event handler (flattened as apply() )
					var args = arg(arguments, 1, [Nux]);
					var passThrough = false;
					if(Themis.of(args, Boolean)) {
						passThrough = args;
						args = [Nux];
					}

					// Scope of the event (this)
					var scope = arg(arguments, 2, this);
					
					/* Call a chained event with passed information */
					if(!Nux.events.callbacks.hasOwnProperty(name) ) {
						// throw Nux.errors.error(20, name)
						Nux.errors.throw(20, name)
					}

					var vals = []
					for (var i = 0; i < Nux.events.callbacks[name].length; i++) {
						var val = Nux.events.callbacks[name][i].apply(scope, args);
						vals.push(val);
					};

				
					if( passThrough ) {
						passThrough = Nux.events.passThrough(name, passThrough);
					} else {
						passThrough = Nux.events.passThrough(name);
					}

					return [vals, passThrough];
				},
				removeEvent: function(name) {
					Nux.events.callbacks[name] = null;
					Nux.events[name] = null;
					delete Nux.events[name];
					return Nux.events.events.splice(Nux.events.events.indexOf(name), 1);
				},
				dieEvent: function(name) {
					/*
					Unhook and detach handlers mapped to this called event
					name. Therefore any event handlers listening
					will be disconnected and not called.
					 */
					Nux.events.callbacks[name] = []
				},
				exists: function(name) {
 					return ( Nux.events.events.indexOf(name) > 0)? true: false;
				},
				passThrough: function(name, toPass) {
					/* activate a passthrough on an event, When the event is
					called whilst passThrough is True, the callback will be immediately
					called. If passthrough is false or Nux is not booted, the 
					method will by stacked normally.*/ 
					if(!this.hasOwnProperty('passed')) {
						this.passed = {};
					}

					if( Themis.of(toPass, Boolean) ) {
						return this.passed[name] = toPass;
					} else {
						return this.passed[name] || false;
					}
				}
			})
		
	};

	var NuxLoader = function(){
		var self = this
		/** legacy and shortcut additions. **/
		// self['import']  	= self.fetch.get;
		self.load 			= self.fetch.load;
		self.configure		= self.config.configure;
		self.booted 		= false;
		self.NS 			= self.core.namespace;
		self.space 			= self.core.space;
		self.onReady 		= self.events.ready;
		self.onAllExpected 	= self.events.allExpected;
		self.addAllowed 	= self.config.addAllowed;

		self.core.globalise();
		var init = function(config, args) {
			console.time('Full load')

			self.config.merge(config);
			var loadA = ['required', 'nux'];

			self.assets.add(self.config.def.assets)
				.load(loadA, function(){
					

					// Init assets is called from self core js
					// at this point all defined required assets
					// have been loaded.
				
					// Booted flag for call once.
					var booted = self.booted,
						cc = 0;

					if(booted && self.config.def.runOnce) return booted;
					self.booted = true;
					
					console.time('Nux')
					if( self.config.def.kernel) {
						self.use('kernel', function(){
							self.core.slog("READY","Nux booted.");
							self.events.callEvent('ready', true)
						})
					} else {
						self.core.slog("READY","Nux booted.");
						self.events.callEvent('ready', true)
						
					}

				});		
				return self;	
		};

		return self.boot = function(localConfig) {
			var bootConfig = config;
			var mergedConfig = Nux.config.merge(bootConfig, localConfig, 'FILL');
			
			return init.apply(this, [mergedConfig]);
		}
	}

	// Boot the Nux lib
	return NuxLoader.apply(Nux, this);
})({
	// Name the parental object to exist.
	// If this is not 'Nux' the initial Nux object
	// will be deleted from the namespace
	name: "Foo",
	// console logs and test are implemented if required.
	debug: true,
	// Load folder for extension matching the expression
	// {extennsionNamespace}.{extensionName}.js
	extensionPath: "js/nux/extensions/",
	vendorPath: "js/nux/vendor/",

	// Extensions allowed to be executed and implemenred
	// This should only exist in
	// core loaders and baked
	// objects
	allowed: [
	]
})