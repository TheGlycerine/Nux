Extension('nux.extension.signals', {
	name: 'Signals',
	// create an extension loading exensions though ajile, 
	// implement inheritence by zoe.js
	
	// Other extensions used by this extension. This allows
	// access to the extensions, and provides access to the
	// user security model
	extensions: ['com.strangemother.database.Store'],

	// List of extenal files required for the extension.
	// By using the internal loader, the extension 
	// leverages the requirejs loading sequence
	require: ['vendor/signals'],
	
    // load extension
	// check extension

    methods: {
        /* Methods defined to target self */
        init__: function(){
            console.log("Signal Send start", arguments);
        },
        __init: function(){
            console.log("Signal Send finished", arguments);
        },
        logger: {
            log: function(){
                console.log("Signal Override")
            }
        },
        extension: {
            loadExtension: function(name) {
                console.log('loading', name)
            }
        }, 
        signals: {
            signal: function(){ 

                // Shim the widgets loadExtension
                // to pass through this method. Allowing for a 
                // start and end signal.
                return new Signal();
            },
            /* Begin listing to an object and event */
            // return signal bindings
            on: function(widget, eventName, listener) {
                // The widget to reference
                /*
                Check context of listener at runtime.
                This should be the parent object (widget?)
                 */
                var context = arg(arguments, 3, this);
                // higher number is higher priority
                var priority = arg(arguments, 4, 0);
                // Create a dispatchSpace name if it doesn't exist.
                var space = this.createSpace(widget.name || widget, eventName);
                var bindings = space.add(listener, context, priority);
                space.bindings = bindings;
                return bindings;
            },
            dispatch: function(widget, eventName) {
                // temp context bindings.
                var context = arg(arguments, 2, null);
                var space = this.createSpace(widget.name || widget, eventName);
                // Namespace for dispatch call
                if(context) {
                    space.bindings.context = context;
                }
                space.dispatch();
            },
            createSpace: function(name, eventName) {
                // Create widget space
                if(!this.dispatchSpace.hasOwnProperty(name)) {
                    this.dispatchSpace[name] = {};
                }

                // create eventName space.
                if(!this.dispatchSpace[name].hasOwnProperty(eventName)) {
                    this.dispatchSpace[name][eventName] = this.signal();
                }

                return this.dispatchSpace[name][eventName];
            },
            dispatchSpace: {}
        }
    }
})