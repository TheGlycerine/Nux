// Loader method to load configurations and create
// base application of which to start the initial
// application.
// previous to the loader implementing it's methods
// it should be expected the App is still in an
// initialized state - and not ready for much.
// After the loader procedure is complete -
// The rest of the application can continue

// Create a namespace to push all provided
// methods into the correct place.
var loader = Nux.NS('loader');

var Extension = {
    version: function(){
        return '0.1'
    }
}


loader.clone = function(obj){
    if(obj == null || typeof(obj) != 'object') {
        return obj;
    }

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = loader.clone(obj[key]);
    return temp;
}

loader.Master = function(name) {
    var extensionObject = arg(arguments, 1, null);
    // debugger;
    if(extensionObject == null && typeof(name) == 'object')
    {
        extensionObject = name;
    } 
    else if(extensionObject == null) 
    {
        extensionObject = {}
        return new loader.loadMethods(extensionObject)
    }

    
    return loader.loadMethods(extensionObject)
    
}

Extension = loader.Master;

loader.spy = function() {
}

hooks = []

loader.Class = function(){
    /*
    Return a new version of the extension - pass arguments into the
    class for extension handlers to recieve.
    */

    var newClass = new (loader.FactoryClass.apply(this))
    
    // class the init procedure for all ext.
    newClass.init.apply(this, arguments)
    
    return newClass
}

loader.rules = function(){
    /*
    default override rules for method importing.;
    object {} - optionally pass an object to mp into the 
                rules for merged rules definition
    _rules    - optionally pass a rule value to define how the obj 
                merge rules are concatenated into the default
    */
    var obj = arg(arguments, 0, {})
    var _rules = arg(arguments, 1,  zoe.extend.REPLACE)
    var rules = zoe.extend({
        '*': zoe.extend.REPLACE,
        'init': zoe.extend.CHAIN_FIRST
    }, obj, _rules);

    return rules;
}

loader.FactoryClass = function(){

    /*
    Factory loader to return a readily created version of a Widget.
    obj {} - optional object to apply to the scope of the widget, not the namespace
    rules {} - rules definition to apply the object override
        
        var constructor = (loader.factory())
        var Cls = new (loader.factory(arguments));

    */
    var obj = arg(arguments, 0, {});
    var rules = arg(arguments, 1, loader.rules());
    var extBase;

    // Take a clone at this point, rather than using the referenced namespace
    var ext = Nux.NS('core').Base();

    var clone = loader.clone(ext);
    if(!clone) {
        debugger
        console.error('Extension missing: core.Extension')
    }
    extBase = zoe.extend(clone, obj, rules || undefined);
    var cloneClass = new zoe.create(extBase);

    return cloneClass
}

loader.bakeMethods = function(obj, rules){
    /*
    Add the object to the namespace allowing all widgets to run 
    the implied options.
    */
    var context = arg(arguments, 2, {});
    Nux.core.slog('Bake', context.name || context)
    var ext = core.base;
    var extended = zoe.extend(ext , obj, rules);
    return extended
}

loader.loadMethods = function(ext) {
    /* Push a set of methods into the main Extension object
    The methods will be implemented using the DREPLACE method unless overridden
    Returned is a ready to use Class constructor of the Extension method.
    */
    var obj = arg(arguments, 0, {});
    // Pass a context object such as name.
    var map = loader.map(obj);
    
    var _rules = map.rules || loader.rules({
        '*': zoe.extend.DREPLACE
    })

    var rules = arg(arguments, 1, _rules);
    var context = arg(arguments, 2, {});

    // Extend the existing Extension object with the passed values.
    loader.bakeMethods(map, rules, context);
    return loader.FactoryClass();
}

loader.map = function(ext){
    /*
    Receive an extension object to be correct implemented
    into the interface - This doesn't attach the methods
    on the loading constructs, it loads the
    passed methods into a base Extension returning back
    an Extesion object.
     */
    // Make the extension Object
    // Clone the staticMethods object to make it a base
    // method to be an object
    var obj = (ext? loader.clone(ext.staticMethods): {})
    if(obj == undefined) obj = {};
    // Push all methods (standard call methods)
    // into the 'prototype' method of which ZOE will use
    obj.prototype = (ext? ext.methods || ext: {});
    
    if(!obj.hasOwnProperty('init') && obj.prototype.hasOwnProperty('init')){
        // map an init
        obj.init = obj.prototype.init;
    }

    
    // push inherits to _implement
    obj._implement = (ext? ext.inherits: []);
    return obj;
}

// Rename Run to something - Scope of Nux
loader.run = function(config) {
    // Every extension starts with a Run procedure
    // A config given by the loader provides serverside
    // requirements and allowances
    
    // var core = Import( Nux.space('core') );
    
    // Begin by loading the extension module.
    var spaceMethods = Import(Nux.config.def.extensionNamespace);

    Nux.core.slog('\'lo :)', Nux.space('loader'))
    // debugger

    Nux.use('packager', function(listener){
        Nux.core.slog("Sup :|", listener.name)
        // Load the original methods implemented from the given space
        // ('core' probably)
        // debugger
        loader.loadMethods(spaceMethods, (spaceMethods._meta)? spaceMethods._meta.rules: null, listener)
        // load string array
        // this.loadExtensions(config.extensions);
    })


    // Return an object defining the methodology of your
    // Primary Extension
}

// A list of extensions for the widget to use.
// Without defining the widgets here.
// they will not be requested through the 
// framework
loader._meta.extensions = []