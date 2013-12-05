$(document).ready(function(){
	
	$('button.import').click(function(){
		var self = $(this);
		Nux.use(self.text(), function(){
			self.addClass('imported');
		})
	})

})

nuxReady = function(){
	
}
