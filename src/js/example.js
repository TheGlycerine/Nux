Nux.onReady(function(Nux){
	Nux.addAllowed(['nux.extension.kernel'])
		.use('kernel', function() {
			Nux.core.slog("Kernel", 'setup')
	})
});