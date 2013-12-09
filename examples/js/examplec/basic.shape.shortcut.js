var _shortcuts = Nux.NS('basic.shape.shortcut');

_shortcuts.triangle = function(){
	return basic.shape.polygon({
		points: 3,
		x: 300,
		y: 50,
		radius: 30,
		stiffness: .8
	});
}

_shortcuts.square = function(){
	return basic.shape.polygon(4);
}