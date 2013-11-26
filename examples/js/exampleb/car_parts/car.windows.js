var _windows = Nux.NS('car.windows');

_windows.open = function(){
	console.log("open the windows");
}

_windows.close = function(){
	console.log("close windows")
}

_windows.alarm = function(){
	this.close()
	console.log("Windows alarms set")
}


_windows._meta.main = function(){
	console.log("MAIN windows have turned up")
}