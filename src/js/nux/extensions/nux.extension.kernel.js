/*
To use Nux as a inheritence loading and factory class, 
importing the kernel will provide 
core options and interface printers
 */
var _kernel = Nux.NS('kernel');

_kernel._meta.main = function(config){
	console.log("BOOT: Kernel. Needed: ", _kernel._meta.required, 'This should have booted first')
}

_kernel._meta.required = [
	'nux.extension.required',
	//'nux.extension.furnace'
]