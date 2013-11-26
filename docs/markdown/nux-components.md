# Nux components.

Nux is designed to be configurable right to the core. The Nux core library can 
be destructed into many smaller components. These are merged together for
a production environment as nux.js and nux.min.js. 

Using the development version, imports each sub component using require.js
and loads the finished product.

when finalising a finished production version, Grunt will concatenate all
the files references within the 'requires' folder and generate a new 
nux.js and nux.min.js file

## Component Types

There are two methods of implementation. You can build a new object within
Nux for example 'Nux.foo', or implement an overriding component designed to
extend the functionality of a previously defined component.


### Nux component

Implementing a component onto Nux is pretty simple. This will allow you to
provide core funcationily to the central library of which will be baked into
a finished file when Nux is compiled.

	;(function(){
		NuxComponentHeader.apply(this, arguments)
	})('foo', {
		// global options
	},function(){
		// Your implementation goes here.
		// Nux may not exist, therefore A light loader is implemented
		// and your content is stored until the method can
		// be successfully applied.
		return {}
	})

This content will live in a file accessible to the running code before Nux 
implements its components.
If you're basically adding some functionality to Nux, it would go into 'requires/*.js'. 
Alternatively you could add save the content accessible to the development.js file 
when require.js loads.

### Nux overriding

By overriding an already existing component requires a tweek. To utilize a mapping
method, you can directly target a method and the override type. Here is a 
basic example of overriding the use method.

	;(function(){
		NuxComponentHeader.apply(this, arguments);
	})({
		// global options
		'use': 'CHAIN'
	},function(){
		return {
			use: function(){
				console.log('USE', arguments[0])
			}
		}
	})


### Combining the two

	;(function(){
		return NuxComponentHeader.apply(this, arguments)
	})('bootloader', {
		// global options
	},function(){
		// Your implementation goes here.
		// Nux may not exist, therefore A light loader is implemented
		// and your content is stored until the method can
		// be successfully applied.
		return {}
	}).chain({
		'listener.handler': 'CHAIN'
	}, function(){
		return {
			listener: {
				handler: function(listener){
					console.log("handler chain", arguments);
				}
			}
		}
	})
