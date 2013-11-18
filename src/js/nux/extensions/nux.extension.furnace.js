/*
Furnace extension allows class inheritence and
chaining thanks to zoe.js.

This may be required by other extension for use with 
method chaining and overriding.
 */
var _furnace = Nux.NS('furnace');

_furnace._meta.assets = [
	'nux/assets/zoe.min.js',
	'nux/assets/foo.js'
]

_furnace._meta.main = function(config){
	// debugger
	console.log("Boot furnace", FOO)
}