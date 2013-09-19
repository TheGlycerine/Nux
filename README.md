Nux
===

Asynchronous MVC Module Inheritance Framework.

Nux is an MIT licensed asynchronous javascript file loader incorporating an unobtrusive MVC style naming convention to create modular, readable, interchangeable code.

Nux provides a namespaced module loader. Smaller files loaded from a specific directory, large javascript objects are created. By implementing:

* asynchronous loading for javascript object
* ‘dotted name syntax’ naming for javascript files
* clever rules and chaining for overrides
* modular methodology for javascript code design
* multiple inheritance and chaining based on object extension

Covering all bases, Nux sits as a tiny loadout building a larger more complex javascript object without you needing to code the ropes.

## Simply put.

We make a very complex object for our game. By using Nux, it all becomes easy to manage.

**/root/js/game/objects/vehicles/** 

	// Files:
	* car.doors.js
	* car.windows.js
	* car.wheels.js

Use:
	
	Nux.use([‘doors’, ‘windows’], function(){
		// doors and windows loaded.
		car.doors.lock();
		car.windows.down();
		car.use(‘wheels’, function(){
			car.wheels.burn();
		});
	})


## A better explanation.

I don’t need a framework for everything. Additionally; I love all frameworks and try to incorporate the latest ideas whenever possible.
When I’m at home; I want to hack my JS with all sorts of nonsense. Whilst at work; I want speed and simplicity and clarity.

Nux has been carefully crafted to be an asynchronous javascript loader, applying some clever tools to help make big javascript objects little.

By applying one simple convention (file naming) we achieve the following:

### Live load javascript module to create simple objects.

	Nux.use(‘core’);

### Apply an easy naming convention for your files for automatic loading
	

 	// Files
 	|- car.doors.js
 	|- car.wheels.js
	
	// Importing
	Nux.use([‘doors’, ‘wheels’], function(){
		console.log(car.doors, car.wheels);
	});

### namespace encapsulation for factory style object design.

	
## But… What? Why?

Need to write something big or clever? Nux is designed to tackle one or all of these daily JS problems:
 
* Realise at 1000 lines, it's just the start?
* Wanted to reuse your own clever little code, to find it's stitched in too deep?
* Use lots of open-source and always need to plug them together?
* Using loadouts, frameworks and mvc is sometimes a bit too much?

To build a modern application using javascript, you need to write a large amount code. 
As a modern developer, I'm hastily inviting OOP and DRY logic to everything I touch. 

By leveraging some excellent tools, Nux provides a light slimline extension, for you to create large or complex javascript objects with worrying about the foreplay.

+ easy OOP style logic loading for framework level and application level object extension
+ simple and powerful method overrides for prototypal inheritance
+ easy asset loading for your other frameworks
+ natively asynchronous 
+ A single namespace

Although very unfinished, some of the basic functionality is handled perfectly thanks to some brilliant open source work.


## Example.

**All code examples are subject to change; these examples are part pseudocode and future implementations (they should work ... )**

Basic usage:

	Nux.use('foo', function(){
		// import complete.
	})

`use()` allows live import of code, kinda like RequireJS, LABjs or any other script loaders but with a significant difference.

Unlike other script loaders, You're implementing a script designed to plug into a larger javascript object. 

The end product is not your tiny bit of code you imported; It’s the larger entity you’re creating. 

The smaller file you’ve loaded (named an `extensions`) contains code you’ve implemented to work within a larger parent entity. 

	var _test = Nux.NS('test');

	_test.moooCow = function() {
		return ‘Cows do a mooo’;
	}

	// Urm… so ye - that’s pretty much a complete extension.

This extension is written in a manner allowing it to be modular and easy to write.


### Kernel

To use nux as a core object, it needs other nux extensions. These are not loaded unless specified.

	Nux.use('kernel', function(){
		// import complete.
	})

This loads the kernel extension of which contains basic setup of nux.

## Import location

The file imported is `nux/extensions/nux.extension.foo.js`. The file is located within a script load area. Nux has an extension folder of which to load core extensions from. It looks something like this:

	-- nux.js
	|
	|--- extensions
	|    |
	|    |--- nux.extensions.core.js
	|    |--- nux.extensions.example.js
			 // ... snip ...
	|    |--- nux.extensions.foo.js
	|    |--- nux.extensions.test.js
	|
	|--- vendor
	|    // ... other dependencies ... 


Providing us with the ability to cleanly divide complex objects into sub components

	Nux.use(['core', 'example'], function(){
		// ... Perform logic
		Nux.use(['foo', 'test'], function(){
			// All loaded.
		})
	})


### Batteries included

Nux wouldn't be complete without some features to make it work. Luckily these features are loaded into Nux
in the same way the extensions are made.

+ signals - integrated web socket events
+ factory - building many objects from a single component.
+ asset loader - Loading external files using the same event chain.


