var _tester = Nux.NS('Nux.test');

_tester.chainboot = function(){
	
	Nux.use('Nux.example.a', function(){
		console.log('Nux example a')
	}, this);

	Nux.use('Nux.example.b', function(){
		console.log('Nux example b')
	}, this);
}

_tester._meta.main = function(){
	console.log('Main tester.')
	_tester.chainboot()
}

