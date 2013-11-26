var _doors = Nux.NS('car.doors');

_doors.open = function(){
	console.log("open the door");
	this._open = true;
}

_doors.close = function(){
	console.log('close the doors');
	this._open = false;
}

_doors.lock = function(){
	console.log("Lock doors")
	car.windows.close();
	this.close()
}

_doors._meta.required = [
	'car.windows',
]

_doors._meta.main = function(){
	console.log("MAIN doors have turned up")
}