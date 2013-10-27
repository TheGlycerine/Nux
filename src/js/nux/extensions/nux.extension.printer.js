// Methods to help with outputting diagnostics.
var _printer = Nux.NS('printer');

_printer._meta.main = function(config) {
	console.log("PRINTER")
	$('<div/>', {
		'class': 'printer',
		'html': config.toString()
	}).appendTo('body')
}
