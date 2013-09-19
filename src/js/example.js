Nux.onReady(function(Nux){
	Nux.addAllowed(['nux.extension.kernal']).use('kernal', function() {
		Nux.slog("Kernal", 'setup')
	})
});

