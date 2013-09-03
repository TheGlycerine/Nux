Extension('com.strangemother.signals', {
	name: 'Logger',
	// create an extension loading exensions though ajile, 
	// implement inheritence by zoe.js
	
	// Other extensions used by this extension. This allows
	// access to the extensions, and provides access to the
	// user security model
	extensions: [],

	// List of extenal files required for the extension.
	// By using the internal loader, the extension 
	// leverages the requirejs loading sequence
	require: [],

	
    // load extension
	// check extension
	_rules: {
        'logger.log': Extension.CHAIN,
        'core.allowAccess': Extension.CHAIN
    },

    methods: {
        /* Methods defined to target self */
        __init: function() {
            console.log('log init', arguments)    
        },
        core: {
            allowAccess: function(name){
                var aa = strangemother.core.allowAccess(name)
                if(aa){
                    console.log("allow", name)
                } else {
                    console.log("deny", name)
                }
                return aa
            }
        },
        logger: {
            log: function(){ 
                console.log('logger')
                console.log.apply(arguments)
            },
            dispatchSpace: {}
        }
    }
})