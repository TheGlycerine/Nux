var _example = Nux.NS('example.c');

_example.myFoo = function(){
	console.log("Hey! I'm a nux extension")
	return true;
}

/* Nux extension stuff below */

_example._meta.main = function(config) {
	/*
	should boot last
	 */
	console.log("1. BOOT C: First to boot")
}
/*
_example._meta.required = [
	'example.d'
]
*/