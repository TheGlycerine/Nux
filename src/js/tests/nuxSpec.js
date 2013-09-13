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