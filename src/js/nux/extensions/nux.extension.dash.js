/*
Actions to apply the namespacing and 
setup methodology
 */

Namespace('com.strangemother.dash', 'js/app/');
// Loader namespace and init runner
com.strangemother.dash.Run = function(name){
	console.log("Run dashInit", name);
    return 'Run method called';
}
