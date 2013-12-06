/*
Shared across all example files to clean up Nux examples and to make it easier to
share the template.
 */
$(document).ready(function(){
	
	$('.switch').click(function(){
		localStorage.theme = $('.switch input')[0].checked
		$('body').toggleClass('dark', $('.switch input')[0].checked);
		
	})

	if(localStorage.theme == 'true') {
		$('body').addClass('dark');
		$('.switch input')[0].checked = true
	}

	$('.navbar button.ex').click(function(){
		var val = $(this).data('example');
		window.location = val + '.html';
	})
	
})


// Will load Nux or the development environment.
bootNux = function(){
	if(!window.hasOwnProperty('Nux')) return false
	if(window['__devInt']) window.clearInterval(window['__devInt']);

	;Nux
	// First the boot, applying a set of rules to
	// boot your nux object.
	.boot({
		// Boot a full Nux system complete with batteries.
		// refer to nux.extension.kernel
		kernel: false,
		// console logs and test are implemented if required.
		debug: false,
		// Asset path loads the files required for the extension
		// from this location. This should map to your
		// JS folder relative to the location of this
		// boot config
		assetPath: '../src/js/nux/assets',
		// Load folder for extension matching the expression
		extensionPath: "../src/js/nux/extensions/",
		vendorPath: "../src/js/vendor",
		required: false,
	}).onReady(function(){
		nuxReady()
	});

	return true
}
window['__devInt'] = (!bootNux())? window.setInterval(bootNux, 100): -1;

