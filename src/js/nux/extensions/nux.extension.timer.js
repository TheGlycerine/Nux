var timer = Nux.NS('timer');

/*
timer.override.listener.__add = function(){
	Nux.slog('timer', 'add import extension override')
}
*/

timer._meta.main = function(nux) {
	Nux.slog('Yo.', 'timer')
}

timer._meta.overrides = ['nux.exension.listener']
