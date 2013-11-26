
;(function(){
	NuxComponentHeader.apply(this, arguments)
})('init', {
	// global options
	
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return function(config, args){
        Nux.config.merge(config);

        var loadA = ['required', 'nux'];
        var assetPath = Nux.config.configif(Nux.__config().assets);
    
        Nux.assets.add(assetPath)
            .load(loadA, function(){
            

            // Init assets is called from Nux core js
            // at this point all defined required assets
            // have been loaded.
        
            // Booted flag for call once.
            var booted = Nux.booted,
                cc = 0;

            if(booted && Nux.__config().runOnce) return booted;
            Nux.booted = true;
            
            console.time('Nux');
            if( Nux.__config().kernel) {
                Nux.use('kernel', function(){
                    Nux.core.slog("READY","Nux booted.");
                    Nux.events.callEvent('ready', true);
                });
            } else {
                Nux.core.slog("READY","Nux booted.");
                Nux.events.callEvent('ready', true);
                
            }

        });  
	}
})
