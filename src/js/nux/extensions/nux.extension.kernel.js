/*
To use Nux as a inheritence loading and factory class, 
importing the kernel will provide 
core options and interface printers
 */
var _kernel = Nux.NS('kernel');

_kernel._meta.main = function(config){
	console.log("kernel boot")
}

_kernel._meta.assets = [
	'nux/assets/jquery-2.0.3.min.js'
]

_kernel._meta.required = [
	'nux.extension.required',
	// 'nux.extension.furnace'
]