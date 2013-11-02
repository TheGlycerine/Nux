# _meta.required

You can optionally pass an array of requirements for your extension. the required extensions will be imported before your run method is performed.

The extensions required should be in the namespace format.

	_kernal._meta.required = [
		"nux.extension.printer",
		"nux.extension.core", 
		"nux.extension.error",
		"nux.extension.loader",
		"nux.extension.logger",
		"nux.extension.packager"
	]