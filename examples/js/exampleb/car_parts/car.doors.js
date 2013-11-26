var _doors = Nux.NS('car.doors');

_doors.open = function(){
	console.log("open the door");
}

_doors.lock = function(){
	console.log("Lock doors")
	car.windows.close()
}

_doors._meta.required = [
	'car.windows',
]