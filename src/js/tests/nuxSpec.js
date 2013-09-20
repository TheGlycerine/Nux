// My tests.
describe('Namespace can be created', function(){ 
	it('convert short space to long space', function(){
		var spaceName = 'test';
		var extSpace = Nux.config.def.extensionNamespace;
		var sp = Nux.space(spaceName);
		expect(sp).toEqual(extSpace + '.' + spaceName);
	});

	it('safely converts nested space() calls', function() {
		var spaceName = 'test';
		var extSpace = Nux.config.def.extensionNamespace;
		var sp = Nux.space(  Nux.space( spaceName) );
		expect(sp).toEqual(extSpace + '.' + spaceName);
	})

	it('create space by name', function(){
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

	it('can create new event "test"', function(){ 
		
		expect(callback).toBe(Nux.events.test);
	});

	it('can add event handlers for event "test', function(){

		Nux.events.test(testFunction);
		
		expect(Nux.events.callbacks[extName].length).toEqual(1);
		expect(Nux.events.callbacks[extName][0]).toEqual(testFunction);
	});

	it('can call the custom made event "test"', function(){
		
		Nux.events.test(hooks.testFunction);
		Nux.events.callEvent(extName);
		
		expect(hooks.testFunction).toHaveBeenCalled();
	})

	it('can call the custom made event "test" with arguments', function(){
		
		Nux.events.test(hooks.testFunctionWithArgs);
		Nux.events.callEvent(extName, [1,2,3]);
		
		expect(hooks.testFunctionWithArgs).toHaveBeenCalledWith(1,2,3);
	})

	it('can apply passthrough to "test" events', function() {
		expect(extName in Nux.events.passed).toBe(false);
		Nux.events.callEvent(extName, true);
		expect(Nux.events.passThrough(extName)).toBe(true);
	})	

	it('can call after passthrough "test" immediately', function() {
		expect(Nux.events.passThrough(extName)).toBe(true);
		Nux.events.test(hooks.testFunction);
		expect(hooks.testFunction).toHaveBeenCalled();

	})

	it('can delete event "test" chain handlers', function(){
		Nux.events.dieEvent(extName);
		expect(Nux.events.callbacks[extName].length).toEqual(0);
		expect(Nux.events.passThrough(extName, false)).toBe(false);
		expect(Nux.events.exists(extName) ).toBe(true);
	});

	it('can destory "test" events', function(){
		Nux.events.removeEvent(extName);
		expect(Nux.events.exists(extName) ).toBe(false);

	})
})

describe('When implementing an extension', function(){

	it('add an allowed extension for later import', function(){
		var spaceName = 'nux.extension.test';
		Nux.addAllowed(spaceName);
		
		expect(Nux.config.def.allowed).toContain(spaceName);
	})

	it('_meta.allowed array is applied to config.def', function(){
		var spaceName = 'nux.extension.test';
		
		Nux.addAllowed(spaceName);
		
		var testAllowedHandler = function(){
			//except(Nux.)
		};

		var useHandler = function(){
			
			expect(Nux.config.def.allowed).toContain('nux.extension.testAsset');	
			Nux.use('testAllowed', testAllowedHandler);
		};

		Nux.use('test', useHandler);
	})


	it( 'can expect a loading extension', function() {
		var name = 'test';
		var returnVal = Nux.signature.expected( Nux.space( name ), true);
		
		expect(returnVal).toBe(true);

		var expectSpace = Nux.signature.expected( Nux.space( 'test' ) );
		expect(expectSpace).toEqual(true);

		var expectRaw = Nux.signature.expected( 'test' );
		expect(expectRaw).toEqual(true);

		var expectFalse = Nux.signature.expected( 'foo' );
		expect(expectFalse).toEqual(false);


	});

	it( 'addAllowed() adds to allowed extensions', function(){
		var spaceName = 'nux.extension.test';
		Nux.addAllowed(spaceName);
		expect(Nux.config.def.allowed).toContain(spaceName);
	})

	it( 'addAllowed() adds extensions required list of extensions', function(){
		var spaceName = 'nux.extension.test';

		// Should be in allowed hwhen the test extension is allowed
		var testSpace = 'nux.extension.testAsset';

		Nux.addAllowed(spaceName);
		
		/*
		_test._meta.allowed = ["nux.extension.testAsset.js"]
		*/
		expect(Nux.config.def.allowed).toContain(testSpace);
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