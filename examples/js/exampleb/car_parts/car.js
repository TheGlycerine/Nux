var _car = Nux.NS('window.car');

_car.open = function(){
	console.log("open the car");
	this._open = true;
}

_car.close = function(){
	console.log('close the doors');
	this._open = false;
}

_car.lock = function(){
	car.windows.close();
	this.close();
	Nux.use('car.locks', function(){
		car.locks.lock()	
	})
}

_car._meta.required = [
	'car.windows',
]