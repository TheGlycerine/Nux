var timerSpace = Nux.NS('timer');

/*
timer.override.listener.__add = function(){
	Nux.slog('timer', 'add import extension override')
}
*/

timerSpace._meta.main = function(nux) {
	Nux.core.slog('Yo.', 'timer')
}


timerSpace._meta.overrides = ['nux.exension.listener']
