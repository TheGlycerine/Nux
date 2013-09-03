// A complete extension with all 
// callbacks and attributes to apply to an 
// extension

// define your extension namespace.
var myExt = Nux.NS('myextension')

// Optional run method called when your
// extension is implemented
myExt.main = function(config){
	Nux.log('main')
}

myExt.metaRun = function(config){
	Nux.log('metaRun. Optionally run another method name at load')
}

/*
can be a string reference to this extension
or a function to call.
If an alternative method is referenced run()
will not be called.
*/
myExt._meta.main = 'metaRun'