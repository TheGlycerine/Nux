// A complete extension with all 
// callbacks and attributes to apply to an 
// extension

// define your extension namespace.
var logger = Nux.NS('logger')

logger._meta.main = function(config){
	console.log('Loggo!')
}