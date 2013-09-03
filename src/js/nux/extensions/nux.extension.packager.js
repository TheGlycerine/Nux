// Implement a functionality of accepting an Extension object
// and correctly implementing into the running Widget object code.
var _ext = Nux.NS('packager');
// var core = Nux.import('core');
// core.Load('js/vendor/zoe.js');

// core.Load('js/vendor/gettersetter/gettersetter.js');



_ext.loadExtensions = function(extensions) {
    for (var i = 0; i < extensions.length; i++) {
        var ext = extensions[i];
        this.loadExtension(ext);
    };
}


_ext.loadExtension = function(name) {
    /* pass the name of the extension and the
    loader will attempt to async load it

    The callback accepts the a value retuned from the loaded
    extension run() method.
    The context of the function (this) will refer to the module imported.

    loadExtension('com.strangemother.core', function(obj) {
    })
    */
    var loader = Import( Nux.space('loader'))
    console.log("LOAD", name)
    var callback = arg(arguments, 1, function(){});

    // Begin by loading the extension module.
    core.Import({
            root: EXTENSION_PATH,
            path: name
        }, function(name){
            // Load the Base object from extensions
            // and ready up an extension to load.
            //var base = this.Extension
            var config = core.applicationConfig;
            var spaceMethods = Import(config.extensionNamespace)
            // console.log("Added extension tools", name.path || name);
            loader.loadMethods(spaceMethods, spaceMethods.rules, name)
            if(this.run) {
                var run = this.run(config);
                callback.apply(this, [run])
            }
        })
}

_ext.Extension = core.Base()

_ext.run = function(appConfig) {
    Nux.slog('RUN', 'Packager')
}
