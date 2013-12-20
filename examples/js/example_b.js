nuxReady = function(){
	// This method will boot when nux is prepared

	// lets build a car!
	_nuxcar = Nux.use(['car'], function(){
		console.log("imported door and windows", car, _car)
		car.doors.open()
		console.log("---")
		car.lock()
	}, 'js/exampleb/car_parts/');
 /*
	_human = Nux.use(['human.body'], function(){
		console.log(human);
	}, 'js/exampleb/human_parts/')	
*/
}