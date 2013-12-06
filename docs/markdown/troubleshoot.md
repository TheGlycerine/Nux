# Troubleshooting

### _meta is not defined

You're making a component and the console is moaning about _meta?

Check to ensure you're not overriding the value before the _meta attributes. 
This could be:

+ You're changing the root object too much (the item of which should have _meta)
+ You have overridden the _meta method with another method of which does not work properly
+ You have used the wrong method for namespacing.

Ensure you have at the top of your component file:

    var _fooThing = Nux.NS('foo.thing.space');

not to be confused with:

    var _fooThing = Nux.use('foo.thing.space');

---
In the second example, you attempting to import the file Nux is currently making. This does not go well. The Nux namespace does not have the _met
a object to implement.