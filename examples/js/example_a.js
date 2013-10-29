$(document).ready(function(){
	
	$('button.import').click(function(){
		var self = $(this);
		Nux.use(self.text(), function(){
			self.addClass('imported')
		})
	})

})

;Nux
// First the boot, applying a set of rules to
// boot your nux object.
.boot({
	// Boot a full Nux system complete with batteries.
	// refer to nux.extension.kernel
	kernel: false,
	// console logs and test are implemented if required.
	debug: true,
	assetPath: '../src/',
	// Load folder for extension matching the expression
	// {extennsionNamespace}.{extensionName}.js
	extensionPath: "../src/js/nux/extensions/",
	vendorPath: "../src/js/nux/vendor/",
	required: false,
	// Extensions allowed to be executed and implemenred
	// This should only exist in
	// core loaders and baked
	// objects
	allowed: [
	],
	ignoreLog: [ 'space',
	]
}).onReady(function(){
	console.log("Nux ready")
})
