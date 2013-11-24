;(function(){
	NuxComponentHeader.apply(this, arguments)
})('settings', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
		load: function(obj, cb) {
			/*
			Load an asset file

				{
					url:'http://cd/data.csv', 
					method:'GET', 
					data:{foo:'bar',lorem:'ipsum'
				}
				{
					'url':'http://cd/data.xml', 
					'method':'GET', 
					'data':{'foo':'bar','lorem':'ipsum'}, 
					'header':{'Content-type':'text/xml'}}
				{
					url:'http://data.csv', 
					method:'GET', 
					data:{ foo:'bar',lorem:'ipsum'} }, 
					function(csv) { JSON.stringify(csv, null, '  ')
					}
				{
					url:'http://plain.txt', 
					method:'GET', 
					data:{foo:'bar',lorem:'ipsum'}
				}
				{
					url:'http://xml.xml?foo=bar&lorem=ipsum', 
					method:'DEBUG', 
					data:{foo:'bar',lorem:'ipsum'}
				}
			*/
		
			if( Themis.of(obj, String) ) {
				obj = {
					url: obj,
					method: 'GET'
				}
			}

			majaX(obj, cb);
		}			
	}
})
