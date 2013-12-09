var _ship = Nux.NS('spaceship');

_ship.structure = {
	// space structure
}

_ship.communication = {
	init: function(){
		console.log('Communication boot');
	}
}

_ship._meta.main = function(_Nux){
	/* this is a reference to _ship */
	console.log('Bootup ship', _Nux);
	this.communication.init()
}
