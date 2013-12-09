;(function(){
	NuxComponentHeader.apply(this, arguments)
})('config', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
			// Default configuration for Nux.

			merge: function(){
				/* Merge config passed with default config space 
				
					merge({})
				merges passed bject into the nux def configuration
				returned it an updated version of Nux.__config()

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
					dest = arg(arguments, 1, Nux.__config()),
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
					var merge = zoe.extend(Nux.__config(), { allowed: mp }, Nux.config.rules);
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
			},

			relatives: function(strOrObj, path){
				/*
				pass a string, array or object and 
				all paths with a relative reference at the
				start of the string will be replaced with
				a context to the extensionPath
				 */
				
				var rep = function(s){
					var p = path
					var r = './'
					
					if(p.slice(-1) != '/') {
						p += '/';
					}
					if( s.slice(0, r.length) == r) {
						return (p + s.slice(r.length));
					} else {
						return s
					}
				}

				if( typeof( strOrObj ) == 'string') {
					return rep(strOrObj);
				} else if( strOrObj instanceof Array ) {
					var retObj = []
					for (var i = 0; i < strOrObj.length; i++) {
						retObj.push( rep(strOrObj[i]) );
					};
					return retObj;

				} else if( typeof(strOrObj) == 'object' ) {
					var retObj = {};

					for( var key in strOrObj ) {
						var val = strOrObj[key];
						if( typeof(val) == 'string' ) {
							retObj[key] = rep(val);
						} else if (val instanceof Array) {
							// expecting array
							retObj[key] = []
							for (var i = 0; i < val.length; i++) {
								retObj[key].push( rep(val[i]) );
							};
						}
					}
					return retObj;
				}
			},

			configif: function(strOrObj, match) {
				/*
				returned is a relicated object or
				string with sprintf formatted strings
				replaced with config object values.
				 */
				if( typeof( strOrObj ) == 'string') {
					return sprintf(strOrObj, Nux.__config())

				} else if( strOrObj instanceof Array ) {
					var retObj = []
					for (var i = 0; i < strOrObj.length; i++) {
						retObj.push( sprintf(strOrObj[i], Nux.__config()) );
					};
					return retObj;

				} else if( typeof(strOrObj) == 'object' ) {
					var retObj = {};

					for( var key in strOrObj ) {
						var val = strOrObj[key];
						if( typeof(val) == 'string' ) {
							retObj[key] = sprintf(val, Nux.__config());
						} else if (val instanceof Array) {
							// expecting array
							retObj[key] = []
							for (var i = 0; i < val.length; i++) {
								retObj[key].push( sprintf(val[i], Nux.__config()) );
							};
						}
					}
					return retObj;
				}
			}
		}
})
