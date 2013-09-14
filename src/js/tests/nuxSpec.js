// My tests.
describe('Namespace can be created', function(){ 
	it('convert short space to long space', function(){
		var spaceName = 'test';
		var extSpace = Nux.defaultConfiguration.extensionNamespace;
		var sp = Nux.space(spaceName);
		expect(sp).toEqual(extSpace + '.' + spaceName);
	});

	it('safely converts nested space() calls', function() {
		var spaceName = 'test';
		var extSpace = Nux.defaultConfiguration.extensionNamespace;
		var sp = Nux.space(  Nux.space( spaceName) );
		expect(sp).toEqual(extSpace + '.' + spaceName);
	})

	it('Create space by name', function(){
		var sp = Nux.space('test');
		var testSpace = Nux.NS('test');
		/* {
			_meta: Object,
			created: 1379114017836,
			name: "nux.extension.test",
		} */
		expect(testSpace.name).toEqual(sp);
	})
})
describe('Handling events', function(){
	var testFunction,
		extName = 'test',
		hooks = {
			testFunction: function(){
				return 'test'
			},
			testFunctionWithArgs: function(a,b,c) {
				return [a,b,c];
			}
		}
	
	/*
	Event structure at the heart of the
	import process.
	 */
	beforeEach(function(){

		testFunction = hooks.testFunction;
		
		spyOn(hooks, 'testFunction');
		spyOn(hooks, 'testFunctionWithArgs');

		if(!Nux.events.exists(extName)) {
			callback = Nux.events.create(extName);
		}

	});

	it('can make a new event', function(){ 
		
		expect(callback).toBe(Nux.events.test);
	});

	it('can add event handlers', function(){

		Nux.events.test(testFunction);
		
		expect(Nux.events.callbacks[extName].length).toEqual(1);
		expect(Nux.events.callbacks[extName][0]).toEqual(testFunction);
	});

	it('can call the custom make event', function(){
		
		Nux.events.test(hooks.testFunction);
		Nux.events.callEvent(extName);
		
		expect(hooks.testFunction).toHaveBeenCalled();
	})

	it('can call the custom make event with arguments', function(){
		
		Nux.events.test(hooks.testFunctionWithArgs);
		Nux.events.callEvent(extName, [1,2,3]);
		
		expect(hooks.testFunctionWithArgs).toHaveBeenCalledWith(1,2,3);
	})

	it('can apply passthrough', function() {
		expect(extName in Nux.events.passed).toBe(false);
		Nux.events.callEvent(extName, true);
		expect(Nux.events.passThrough(extName)).toBe(true);
	})	

	it('can call after passthrough immediately', function() {
		expect(Nux.events.passThrough(extName)).toBe(true);
		Nux.events.test(hooks.testFunction);
		expect(hooks.testFunction).toHaveBeenCalled();

	})

	it('can delete event chain handlers', function(){
		Nux.events.dieEvent(extName);
		expect(Nux.events.callbacks[extName].length).toEqual(0);
		expect(Nux.events.passThrough(extName, false)).toBe(false);
		expect(Nux.events.exists(extName) ).toBe(true);
	});

	it('can destory events', function(){
		Nux.events.removeEvent(extName);
		expect(Nux.events.exists(extName) ).toBe(false);

	})
})

describe('Implementing an extension', function(){

	it('Add an allowed extension for later import', function(){
		var spaceName = 'nux.extension.test';
		Nux.addAllowed(spaceName);
		
		expect(Nux.defaultConfiguration.allowed).toContain(spaceName);
	})
 
})

// + Element can be added to add
// + 
// + element can be requested
// + 
// + element main handler can be a string
// + 
// + element main handler can be at:
// + 
// + 	_meta.main
// + 	_meta.run
// + 	.main
// + 	run
// + 
// + element main handler called
// + 
// + Library is namespace safe
// + 
// + an extension has is name in a 'name' attr
// + 
// + an extension can load assets.
// + an extension assets are loaded before the + extension is ran