;(function(config){
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
        // Special internal logger written to conform
        // to a log method for Nux, 
        // Apply slog name to define an action
        // performed under 'slog name' when in debug
        ignoreLog: ['handle'],
        
    };

    var Nux = {
        __config: function(){
            return NuxConfig;
        },
        implementPreloaded: function(__nux){
            // implement a an object set into
            // nux.
            var lf = function(){    
                    // console.log("implementing cached", this.paths);
                    return [
                        this.paths, 
                        this.method(this.config, NuxConfig), 
                        this.config
                    ];
                };

            /*
            FOUND BUG!

            By reversing this method listing, the 
            "implement shortcuts" bug occurs.
            
             */
            for (var i = 0; i < __nux.length; i++) {
                var v = (lf).apply( __nux[i] );
                this.implement.apply(this, v);
            }
            /*
            for (var j = __nux.length - 1; j >= 0; j--) {
                var y = (lf).apply( __nux[j] );
                this.implement.apply(this, y);
            }
            */

        },
        implement: function(paths, method, config) {
            
            if(!config) {
                config = paths;
                paths = null;
            }

            function assign(obj, keyPath, value, config) {
                
                if(!keyPath || keyPath && keyPath.length === 0) {
                    // no path - is override
                    var methodObject = value;
                    if( typeof(methodObject) == 'function') {
                        methodObject = value();
                    }

                    ext = zoe.extend(Nux, methodObject, config);
                    return ext;
                } else {

                }

                lastKeyIndex = keyPath.length-1;

                for (var i = 0; i < lastKeyIndex; ++ i) {
                    key = keyPath[i];
                    if (!(key in obj))
                    obj[key] = {};
                    obj = obj[key];
                }

                obj[keyPath[lastKeyIndex]] = value;
                return obj;
            }

            // Map module into Nux.
            for(var key in config) {
                // console.log('assign', key)
                NuxConfig[key] = config[key];
            }   

            return assign(Nux, paths, method, config);
        },

        
    };
    var NuxLoader = function(){

        if(window.hasOwnProperty('__Nux')) {
            Nux.implementPreloaded( window.__Nux );
        }

        var self = this;
        /** legacy and shortcut additions. **/
        
        // self['import']   = self.fetch.get;
        self.load           = self.fetch.load;
        self.configure      = self.config.configure;
        self.booted         = false;
        self.NS             = self.core.namespace;
        self.space          = self.core.space;
        self.onReady        = self.events.ready;
        self.onAllExpected  = self.events.allExpected;
        self.addAllowed     = self.config.addAllowed;

        self.core.globalise.apply(self);
        
        var init = function(config, args) {
            console.time('Full load');

            Nux.init(config, args);
   
            return self;    
        };

        self.boot = function(localConfig) {
            var bootConfig = config;
            var mergedConfig = Nux.config.merge(bootConfig, localConfig, 'FILL');
            
            return init.apply(this, [mergedConfig]);
        };

        return self.boot;
    };

    // Boot the Nux lib
    return NuxLoader.apply(Nux, arguments);
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
});