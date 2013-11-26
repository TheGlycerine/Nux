var _locks = Nux.NS('car.locks');

_locks.lock = function(){
	console.log("Lock locks");
	car.doors.close();
	car.windows.alarm();

}

_locks._meta.main = function(){
	console.log('locks have arrived')
}
_locks._meta.required = [
	'car.windows',
	'car.doors',
]