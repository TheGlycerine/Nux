    
// <script type="text/javascript" src='js/vendor/jasmine/lib/jasmine-1.3.1/jasmine.js' ></script>
// <script type="text/javascript" src='js/vendor/jasmine.async.js' ></script>
// <script type="text/javascript" src="js/vendor/jasmine/lib/jasmine-1.3.1/jasmine-html.js"></script>
// 
// <link rel="stylesheet" type="text/css" href="js/vendor/jasmine/lib/jasmine-1.3.1/jasmine.css">
// 
// 
// <script type="text/javascript" src='js/nux/nux.js' ></script>
// <script type="text/javascript" src='js/tests/nuxSpec.js' ></script>
  

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        'nux': 'nux/nux',
        'nux-spec': 'tests/nuxSpec',
        'vendor': 'js/vendor',
        'jasmine': 'vendor/jasmine/lib/jasmine-1.3.1/jasmine',
        'jasmine-async': 'vendor/jasmine.async',
        'jasmine-html': 'vendor/jasmine/lib/jasmine-1.3.1/jasmine-html'

    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine', 'jasmine-async'],
            exports: 'jasmine'
        },
        'nux-spec': {
            deps: ['jasmine-html', 'nux'],
            exports: 'jasmine'
        }
    }
});

// Start the main app logic.
requirejs([
    'nux-spec'
    ],
function   (jasmine, _nux, nuxSpec) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.

     (function() {
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;
        
        var htmlReporter = new jasmine.HtmlReporter();
        
        jasmineEnv.addReporter(htmlReporter);
        
        jasmineEnv.specFilter = function(spec) {
            return htmlReporter.specFilter(spec);
        };
       
        jasmineEnv.execute();
        
    })();

});