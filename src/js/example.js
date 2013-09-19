Nux.onReady(function(Nux){
	Nux.addAllowed(['nux.extension.kernel'])
		.use('kernel', function() {
			Nux.slog("Kernel", 'setup')
	})
});