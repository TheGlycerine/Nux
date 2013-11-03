# _meta.assets

**Assets have been removed from an internal app during pre release.**

You can optionally provide a set of js assets to import prior to your extension run method is performed. 
These assets can be libraries and extenal files your extension depends upon.

Unlike _meta.required objects, you do not pass namespace strings.
The imported javascript files are relative to your root package location.

A clean convention is to supply your extenal js files relative to your extension in a folder named 'js'.

This convension may be enforced as mandatory in future versions of Nux

Package for 'foo' extension


	|- nux.extension.foo.js
	|- js/
	   |- assets.js

## examples:

There are a number of ways to import your assets. The simplest method allows you to pass a 'String' or 'Array' of strings.

example:

	// run your own javascript
	_kernel._meta.assets = 'js/main.js'

That's pretty basic, lets look at some more interesting import patterns.

### Array Importing.

You can import an array of string. Each relative from your root path

	_kernel._meta.assets = [
		'js/main.js',
		'js/jquery.js',
		'js/foo.js'
	]

They will all be imported before your extension run method is performed.


### Parrallel importing (Dependency sets)

Sometimes a js files to import have dependencies of their own. 

File 'foo.js' needs 'jquery' and 'main.js' to run first. We can shuffle the '_meta.assets' about to make sure this happens.

	_kernel._meta.assets = [
		['js/jquery', 'js/main.js'],
		'js/foo.js'
	]

This ensures jquery and main.js are loaded in parrallel. After execution 'foo.js' is loaded.

### Alias assets (Manual assets)

Sometimes a lot of assets are required, and having them all loaded at once is overkill.
Instead of Nux loading the assets automatically, you can apply an object of assets for later import and use manually.

	_kernel._meta.assets = {
		jquery: 'js/jquery.js',
		foo: 'js/foo.js',
		ui: [
			'jquery',
			'js/vendor/l.js',
			'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js'
		]
	}

As you can see, alias assets provide complex management and dependancies.
Later you can use your assets like:

	Nux.asset.load('ui', function(){
		// assets loaded.
	})
