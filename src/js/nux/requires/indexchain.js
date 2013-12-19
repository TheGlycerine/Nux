/*
Ordered calling of a chained set of methods, before a final
method is applied.

callback
|- Stack
	|- boot     - 
	|- assets   - load 
	|- required - boot		-
				- assets	- load
				- required	- boot
							- assets
							- required ... 

 */
;(function(){
	NuxComponentHeader.apply(this, arguments)
})('indexchain', {
	// global options
},function(){
	var chainScope = {
		
	};

	var _scope = {

		create: function(name, callback) {
			// Return a chain with the callback
			// waiting on all chain elements to return
			// true.
			
			return (function() {
				var _name = name;
				var map = {};
				var runner = function(_map){
					/*
					provide a an object of arrays (a map) 
					to numerate. If all arrays are empty, true
					is returned.
					 */
					
					for (var key in _map) {
						if (_map.hasOwnProperty(key)) {
							if(_map[key].length > 0 ) {
								return false
							}
						}
					}

					return true
				}

				doCall = function(){
					/*
					calls the scoped 'callback' method
					if the runner(map) is true			
					 */
					var valid = runner(map)
					if(valid) {
						callback()
					} 
				}
				return {
					add: function(name, assets) {
						/*
						Add a name chain waiting to wait on.
						 */						
						if(!map.hasOwnProperty(name)) {
							map[name] = assets
						} else {
							map[name].concat(assets);
						}
					},
					done: function(name, assets) {
						// remove the name chain waiting on these
						// assets.
						console.log("Done", name)
						if(!map.hasOwnProperty(name)) {
							return false;
						}

						for (var i = 0; i < assets.length; i++) {
							var asset = assets[i];
							map[name].splice(map[name].indexOf(asset), 1)
						};

						doCall()
					}
				}
			})()
		}
	};

	return _scope
})
