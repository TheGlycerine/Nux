;(function(){
	var comp = NuxComponentHeader.apply(this, arguments);
	/*
	comp.meta({
		description: 'override the use method to implement a console.log'
	})
	*/

})({
	// global options
	'use': 'CHAIN'
}, function(){
	return {
		use: function(){
			console.log('USE', arguments[0])
		}
	}
})
