/*
This file is designed to assist in developing Nux and it's 
core components.
requirejs is needed.
 */

// The components used for Nux to be loaded
// from the requires folder. 
var deps = [
	// 'as/zoe.min', 
	'nx/utils',
	'nx/NuxImplement', 
	'nx/NuxComponentHeader',
];

var components = [
	'nx/_F',
	'nx/init',
	'nx/assets',
	'nx/bootloader',
	'nx/core',
	'nx/config',
	'nx/errors',
	'nx/events',
	'nx/fetch',
	'nx/listener',
	'nx/settings',
	'nx/stack',
	'nx/signature',
	'nx/use',
	'nx/shortcuts',
    // <script src="../src/js/nux/nux.js"></script>
	'nux'
]

var overrides = [
	'nx/listener-handler-map',
	'nx/use-ch'
]

requirejs.config({
	baseUrl: '../src/js/nux',
	paths: {
		nx: 'requires',
		as: 'assets'
	}
})

require(deps, function(zoe, imp, comp){
	window['zoe'] = zoe;
	var count = arguments.length;
	 /*
	Object merge reduce for method mapping with an object return.
	Finished product will be all objects merged.
	 */
	window.MERGE = (function(){
        	return zoe.fn.executeReduce({}, function(obj1, obj2) {
            	return zoe.extend(obj1, obj2, 'REPLACE')
            })
        
    })(this)

	requirejs(components, function(){
		count += arguments.length
		requirejs(overrides, function(){
			count += arguments.length;
			console.log("Loaded", count, 'components - boot nux.');
		});
	});
})