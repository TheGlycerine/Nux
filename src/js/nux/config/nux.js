NuxConfig({
	// List of required extensions - Nux objects.
	"extensions": [
		"nux.extension.core",
		"nux.extension.loader",
		"nux.extension.error",
		"nux.extension.packager",
		"nux.extension.alpha.signals",
	],

	// Data endpoints used for 
	// configuration of the extension. If the
	// setting exists, it will be loaded
	// into the application as the extension is
	// applied. JSON is wanted.
	"settings": {
		"core": []
	},

	// associated application
	"extension": 'nux',
})(function(Nux){
	// Callback function to perform logic on
	// the object (the above config).
	// This is handy for setting up libraries as all applicarion.requirements
	// will be loaded.
	// debugger;
	Nux.log("Run config run.", this)
	Ajile.EnableCloak(false); // Disables cloaking.
	Ajile.EnableRefresh(true);  // Enables refreshing

})