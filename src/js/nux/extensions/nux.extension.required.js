/**
 * module to allow imports of required nux objects
 * before the target extension is booted.
 */
var _required = Nux.NS('required');

_required.handler = function(){
	console.log("INJECT")
	return true;
}
_required._meta.map = {
	'Nux.listener': {
		handler: _required.handler
	}
}

_required._meta.main = function(config) {

}
