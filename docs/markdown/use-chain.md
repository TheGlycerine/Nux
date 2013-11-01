# use chain

The use method allows you to import an extension into your namespace.

Simply put, when you need to import your extension, you 'use()' it.

	use('foo', function(){
		// foo extension
	})

import many extensions at the same time.

	use(['foo', 'bar'], function(){
		// foo and bar have been
		// imported
	})


## Listener

### add(array, function)

pass an array of ext names to import. The names are converted to fully qualified name spaces using Nux.space(name). 
An array of the fully qualified names are stored as 'expectedListeners'
in the Nus.listener.listeners array.

When an import occurs the array is checked. Every occurance of the name within the 'expectedListeners' array of a listener object is sliced. 
After the name is sliced from the objects expectedListeners; any Nux.listener.listeners object without any expectedListeners is called. 

This method ensures a method applied to a chain of ext imports are called at the right time.

Nux.use(Array, F)
	Nux.fetch.use(Array | String, F)
	Nux.listener.add(Array, F)
	Nux.fetch.get(String)
		Nux.fetch._import(String, String)
			Import


## use

A wrapper of Nux.fetch.use method to perform a an import of an extension and call a handler. When the handler is used, it is disposed of. Therefore all methods passed to use() are once only. 

	use('foo', function(){
		// called once
	})

## then

To perform an import after a previous extension has been fetched; can be access with the 'then' method.
Unlike the use(), this method will wait until the extensions referenced within the chain are imported. 

	use(['core', 'kernel'], function(){
		// two extensions imported
		// the 'then()' method
	 	// should kick in
	}).then('loader', function(){
		// 'core' and 'kernel'
		// were imported prior
		// to the download
		// procedure of the 
		// 'loader' extension.
	})


## on

create a method of which waits for a request to an extension. When the extension is imported, the handler will react.
As an extension can be imported many times, this method will be used many times.

	on('foo', function(){
		// called always
	})


## once

create a method of which wait for a request to an extension. When the extension is imported, the handler will react once.
This method reference is disposed after one use.


	once('foo', function(){
		// called always
	})

You can wait for many extensions before a call to your handler.

	once(['foo', 'bar'], function(){
		// called always after the imports
	})