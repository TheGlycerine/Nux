$(document).ready(function(){
	
	$('button.import').click(function(){
		var self = $(this);
		Nux.use(self.text(), function(){
			self.addClass('imported');
		})
	})

	$('.switch').click(function(){
		localStorage.theme = $('.switch input')[0].checked
		$('body').toggleClass('dark', $('.switch input')[0].checked);
		
	})

	if(localStorage.theme == 'true') {
		$('body').addClass('dark');
		$('.switch input')[0].checked = true
	}

})

nuxReady = function(){
	// This method will boot when nux is prepared

	// lets build a car!
	_nuxcar = Nux.use(['car'], function(){
		
		car.doors.open()
		car.locks.lock()
		console.log("imported door and windows", car, _car)

	}, 'js/exampleb/car_parts/');

	_human = Nux.use(['human.body'], function(){
		console.log(human);
	}, 'js/exampleb/human_parts/')

	
}

// Will load Nux or the development environment.
bootNux = function(){
	if(!window.hasOwnProperty('Nux')) return false
	if(window['__devInt']) window.clearInterval(window['__devInt']);

	;Nux
	// First the boot, applying a set of rules to
	// boot your nux object.
	.boot({
		// Boot a full Nux system complete with batteries.
		// refer to nux.extension.kernel
		kernel: false,
		// console logs and test are implemented if required.
		debug: false,
		// Asset path loads the files required for the extension
		// from this location. This should map to your
		// JS folder relative to the location of this
		// boot config
		assetPath: '../src/js/nux/assets',
		// Load folder for extension matching the expression
		extensionPath: "../src/js/nux/extensions/",
		vendorPath: "../src/js/vendor",
		required: false,
	}).onReady(function(){
		nuxReady()
	});

	return true
}
window['__devInt'] = (!bootNux())? window.setInterval(bootNux, 100): -1;
