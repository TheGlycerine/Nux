var _example = Nux.NS('example.a');

_example.myFoo = function(){
	console.log("Hey! I'm a nux extension")
	return true;
}

/* Nux extension stuff below */

_example._meta.main = function(config) {
	/*
	should boot last
	 */
	console.log("5. BOOT: example A")
}

_example._meta.required = [
	'example.b',
	'example.c',
]

_example._meta.assets = [
	'vendor/va.js',
]
