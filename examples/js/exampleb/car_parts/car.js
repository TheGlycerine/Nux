var _car = Nux.NS('window.car');

_car.open = function(){
	console.log("open the car");
	this._open = true;
}

_car.close = function(){
	console.log('close the car');
	this._open = false;
}

_car.lock = function(){
	car.windows.close();
	this.close();
	Nux.use('car.locks', function(){
		console.log("Locks imported")
		car.locks.lock();
	}, this)
}

_car._meta.main = function(){
	console.log("car main run", car.windows)
}
_car._meta.required = [
	'car.windows',
	'car.doors',
]