Nux
===

Asynchronous mvc module inheritance framework for complex object design.

## Whut?

Writing javascript is fun! re-writing it is boring. Using frameworks is awesome, but hooking them up can be tedious.
In any modern javascript application you tend to do:
  
+ Asynchronous script loading from any location.
+ big objects
+ interface stuff
+ server loady stuff

I also want:

+ Flexible packaging via namespaced files and/or structured directories. easy testing
+ Namespace support for encapsulating.
+ Multiple inheritance based on object extension,
+ DRY logic

I also have a shed load of files I personally love:

+ chosen.js, gridster, sockey.io .. jquery plugins ..

Current tools tend to be:

require, jquery, jasminejs, backbone, ember, .. list is forever ..

To build a modern application using javascript, you need to write a large amount code. 
As a modern developer, I'm hastly inviting OOP and DRY logic to everything I touch. 

By leveraging some excellent tools, Nux provides a light slimline extension, for you to create
large or complex javscript objects with worrying about the foreplay.

+ easy OOP style logic loading for framework level and application level object extension
+ simple and powerful method overrides for prototypal inheritance
+ easy asset loading for your other frameworks
+ natively asynscronous 
+ A single namespace

Although very unfinished, some of the basic functionality is handled perfectly thanks to some brilliant open source work.


## Example.

**All code examples are subject to change; these examples are part pseudo code and future implementations (they should work ... )**

Basic usage:

	Nux.use('foo', function(){
		// import complete.
	})

`use()` allows live import of code, kinda like RequireJS, LABjs or any other script loaders but with a significant difference.

Unlike other script loaders, You're implementing a script designed to plug into a larger javascript object. 

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


Providing us with the ability to cleanly divide complex objects into sub componenents

Nux.use(['core', 'example'], function(){
	// ... Perform logic
	Nux.use(['foo', 'test'], function(){
		// All loaded.
	})
})


### Batteries included

Nux wouldn't be complete without some features to make it work. Lcukily these features are loaded into Nux
in the same way the extensions are made.

+ signals - integrated web socket events
+ factory - building many objects from a single component.
+ asset loader - Loading external files using the same event chain.
