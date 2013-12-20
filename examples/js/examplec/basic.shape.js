var _shape = Nux.NS('basic.shape');

_shape.polygons = [];

_shape.polygon = function(points, simulator) {
	/*
	polygon(1, [sim])
	 */
	var _sim = simulator || this.simulator();

	if(!_sim) return Nux.errors.throw(101, _sim);

	var _points 	= 3,
		_origin 	= new Vec2(600, 50),
		_radius 	= 50,
		_spokeStiff = 1,
		_treadStiff = 1,
		_type 		= 'tire';

	if( Themis.of(points, Number) ) {
		_points = points;
	} else if( Themis.of(points, Object) ) {
		_points =	 points.points;
		_origin 	= new Vec2(points.x || points.coord[0] || 600, points.y || points.coord[1] || 50);
		_radius 	= points.radius;
		_spokeStiff = points.spokeStiffness || points.stiffness || _spokeStiff;
		_treadStiff = points.treadStiffness || points.stiffness || _spokeStiff;
		_type 		= points.type || _type;

	}
	
	var poly = _sim[_type](_origin, _radius, _points, _spokeStiff, _treadStiff);
	_shape.polygons.push(poly);
	return poly;
}

_shape.simulator = function(sim) {
	if(sim !== undefined) {
		this._simulator = sim;
		return this;
	} else {
		return this._simulator;
	}
}

_shape._meta.required = [
	'basic.renderer.verlet',
	'basic.shape.shortcut'
]

_shape._meta.errors = {
	101: 'Verlet Simulator missing'
}