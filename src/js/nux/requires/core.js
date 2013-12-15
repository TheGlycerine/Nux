;(function(){
	NuxComponentHeader.apply(this, arguments)
})('core', {
	// global options
	globalName: "Nux",
	globalConfigName: 'NuxConfig',
	allowGlobals: true
},function(config){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	
	return {
		spaceDefinitions: [],
		newSpace: function(name, space) {
			/*
			Write a new namespace for a preloading extension
			 */

			// If the name register is not in the expected
			// namespace, and debug == true; raise error
			if(Nux.__config().debug) {
				Nux.core.slog('SPACE', name);
			}
			
			if(!space.hasOwnProperty('_meta')) {
				space['_meta'] = {
						name: name,
						created: +(new Date)		
					}
			}				

			if(Nux.hasOwnProperty('signature'))
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
			
				if(!space.hasOwnProperty(Nux.__config().overrideSpace)) {
					overrideSpace = space[Nux.__config().overrideSpace];
				}
				
				for( var i = 0; i < overrides.length; i++ ) {
					var path = Nux.space( overrides[i] );
					var objName = path.replace(Nux.space(), '');
					// Every method is marked for override of the
					// original
					overrideSpace[objName] = {}
				};
				
				space[Nux.__config().overrideSpace] = overrideSpace;
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

				var _name = Nux.space(name, Nux.core.spaceHash[name]);

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
				return Import(Nux.__config().extensionNamespace);
			}
			// console.log("Space", name, _space)
			return _space;	
		},
		spaceHash: {},
		space: function(name) {
			var path = arg(arguments, 1, null);
			/*
			Receive the fully qualified name
			for the application NAMESPACE

			// only add namespace to the start of the name
			// if there is no folder space
			// '.'
			*/
			if(!name) {
				name = ''
			} else {
				name = name
			}

			if( name.indexOf(Nux.__config().extensionNamespace) >= 0) {
				return name
			}

			var str=name;
			if( name.indexOf('.') < 0 && (path == null || Nux.__config().extensionPath == path) ) {
				
				str = Nux.__config().extensionNamespace + '.' + name
				
			}
			Nux.core.spaceHash[str] = path
			return str;
		},

		makeGlobal: function(name, entity) {
			// create a global scoped (window) object.
			// apply the global object
			if( window.hasOwnProperty(name) && !window[name].debug) {
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
			if(config.allowGlobals) {

				this.core.makeGlobal(config.globalConfigName, this.Config);
				this.core.makeGlobal(config.globalName, this);
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
		    		prefix = Nux.__config().prefix || Nux.__config().globalName;
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

			var hidden = Nux.__config().ignoreLog;
			if(!Nux.__config().debug) return 
			/* State log, for writing statement logs 
			unique to Nux loading */
			if(hidden.indexOf(state.toLowerCase()) == -1 ) {
				Nux.core.log(rPad10(state), string);
			}
		}
	}
})
