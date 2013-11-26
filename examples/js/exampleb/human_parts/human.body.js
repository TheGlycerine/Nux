var _body = Nux.NS('human.body');

_body.torso = function(){
	console.log("tickle torso")
}

_body._meta.required =  [
	'human.arms'
]