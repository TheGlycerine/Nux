/*
Core module loaded at init.
This module contains loader methods required for framework creation
 */

var _core = Nux.NS('core');
// Loader - to simplify Imports.
_core.imported = {}

// Required extensions

_core._meta.extensions = [
	// 'nux.extension.alpha.signals',
]


_core.Constructor = function(){
    /* The baseic constructor for all elements */
    return zoe.Constructor;
}

_core.Base = function() {
    // The Extension base Object
    // Every extension is derrived from this one
    var inherit = this.Constructor()
    // Load a base config objec to begin inheritance
    var WidgetBase = {

        // An array of elements of which to inherit from.
        // This should be another extendable object
        _implement: [inherit],

        // An object of static methods to apply
        // Base.name()
        extend: zoe.extend,

        // Copy B to A; if B exists in A, an error is thrown
        DEFINE: zoe.extend.DEFINE,
        // Copy B to A; If B exists in A, A is overritten 
        REPLACE: zoe.extend.REPLACE,
        // Copy B to A where B not in A
        FILL: zoe.extend.FILL,
        // Deep copy B to A (i.e. objects)
        DFILL: zoe.extend.DFILL,
        // Ignore - not added to call chain
        IGNORE: zoe.extend.IGNORE,
        // Append stringy text
        STR_APPEND: zoe.extend.STR_APPEND,
        // prepend to strings
        STR_PREPEND: zoe.extend.STR_PREPEND,
        // Append to an array
        ARR_APPEND: zoe.extend.ARR_APPEND,
        // prepend to an array
        ARR_PREPEND: zoe.extend.ARR_PREPEND,
        
        // functions: CHAIN
        // objects: REPLACE
        // strings: STR_APPEND
        // array: ARR_APP
        // other: REPLACE
        APPEND: zoe.extend.APPEND,
        PREPEND: zoe.extend.PREPEND,
        DAPPEND: zoe.extend.DAPPEND,
        DPREPEND: zoe.extend.DPREPEND,
        CHAIN: zoe.extend.CHAIN,
        // Adds the function from objB to the beginning of a zoe.fn chain on objA.
        CHAIN_FIRST: zoe.extend.CHAIN_FIRST,
        CHAIN_STOP_DEFINED: zoe.extend.CHAIN_STOP_DEFINED,
        CHAIN_ASYNC: zoe.extend.CHAIN_ASYNC,

        baseStatic: function(){
                return 'Base static method'
        },
        // (new Base()).version()
        prototype: {
            init: function() {
                console.log("Init base method. Arguments: ", arguments);
            },
            baseMethod: function(){
                return 'Base standard method'
            }
        }
    }

    return WidgetBase
}
_core.base = _core.Base()

_core.import = function(name, fun){

	var pName 			= name.path || name,
	    importAllowed 	= _core.allowAccess(pName),
		isImported 		= this.imported.hasOwnProperty(pName),
		ran 			= false;
		
	if(isImported && importAllowed) {
		return true;

	} else if (importAllowed) {
		// Reference ajile importer with path, folder path.
		var _imported = this.imported;
		// console.log('Imported', pName)
		// Load preloader.
		var importHandler = function(listener){
			Ajile.RemoveImportListener(pName, importHandler);
			if(ran) return true;

			try {
				(fun).apply(listener.item, [name]);
				_imported[pName] = listener.item;
				ran = true;
			} catch(e) {
				if(e.name) {
					console.error(e.name, 'Importing extension "'+  pName + '":', e.message);
				} else {
					debugger;
					console.error('Error', pName, e);
				}
				ran = false;
			}
			

			listener.item.unload = function(){
				// slice from imported
				return Ajile.Unload(pName);
			}

		}

		Ajile.AddImportListener(pName, importHandler);
		Import(pName, name.root || null);
	}

	return importAllowed;
}

_core.run = function(config){
    Nux.slog("Hi :)", config)
}
