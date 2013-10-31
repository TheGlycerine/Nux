# use chain




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