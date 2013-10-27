Nux
// First the boot, applying a set of rules to
// boot your nux object.
.boot({
	// Boot a full Nux system complete with batteries.
	// refer to nux.extension.kernel
	kernel: true,
	// console logs and test are implemented if required.
	debug: true,
	assetPath: '../src/',
	// Load folder for extension matching the expression
	// {extennsionNamespace}.{extensionName}.js
	extensionPath: "../src/js/nux/extensions/",
	vendorPath: "../src/js/nux/vendor/",

	// Extensions allowed to be executed and implemenred
	// This should only exist in
	// core loaders and baked
	// objects
	allowed: [
	],
	ignoreLog: [ 'wanted', 
	'space', 
	'receive',
	'run',
	'expected'
	]
}).onReady(function(){
	console.log("Nux ready")
})