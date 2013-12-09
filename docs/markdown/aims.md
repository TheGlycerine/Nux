# Nux specification

+ Build a large javascript object by importing many smaller files through the conventions of the application.

        Nux.use([
            'car.wheels',
            'car.doors',
            'car.engine',
            'car.driver'
        ])

+ Provide a naming convention targeted toward the extensions logic.

        Nux.use([
            'app',
            'app.model',
            'app.model.shortcuts',
            'app.controller'
        ], function(){
            Nux.use('app.controller.foo');
        })

+ Allow an extension to be imported when needed.

        Nux.use('music.player', function(){
            $('#random_button').click(function(){
                Nux.use('music.artists.shuffle', function(){
                    this.suffler();
                })
            })
        })

+ An extension can require assets (external JS/CSS) files to be imported when used
    
        // car.doors
        var _doors = Nux.NS('car.doors');

        _doors.lock = function(){
            car.windows.close();
        }

        _doors_._meta.assets = [
            './vendor/verlet-1.0.0.js',
        ]

+ An extension can require other extensions (through use of the Nux naming convention) to be implemented prior to the use of the target import.

        // car.doors
        var _doors = Nux.NS('car.doors');

        _doors.lock = function(){
            car.windows.close();
        }

        _doors._meta.required = [
            'car.windows',
        ]

+ Nux implements required data though use of the `_meta` object on every import.

        var _foo = Nux.NS('things.foo');
            
        _foo._meta.main = function(config) {
            // debugger
            console.log("BOOT: foo")
        }
        
        _foo._meta.map = {}
        
        _kernel._meta.foo = [
            //'nux.extension.furnace'
        ]
        
        _furnace._meta.assets = [
            './foo.js'
        ]

+ An extension imported with Nux can be overridden by other extensions. Allowing for easy importing.

+ An extension would load and boot once, but may be imported (silently) many times

        var _foo = Nux.NS('things.foo');
            
        _foo._meta.main = function(config) {
            // debugger
            console.log("BOOT: foo")
        }

        Nux.use('thing.foo');
        // BOOT: foo
        Nux.use('thing.foo');
        Nux.use('thing.foo');


+ Nux can be extended with _batteries_ to augment extension loading
    
        Nux.use(['kernel', 'signals', 'logger', 'timer']);

+ Anything Nux can live without, lives in the batteries.
    
### Terminology

In order to convey some of the ideas built into the framework, some elements will be named in a style accordance to:

+ *extension*: A file designed to be implemented by Nux.use(). A extension is loaded along side many others to produce a larger final output.

+ *battery*: The development modules building Nux as a final product. Most of these are built into Nux.js dist file - but to augment the features of Nux, you may want to develop a _battery_

+ *importing*: Importing an extension defines a method of asyncronous loading of additional files. Once an extension has finished loading and booting, it's imported.

Elements:

+ *boot (extension booting)*: When a Nux extension is imported, a main() method can be called. By associating asset importing, required importing

+ *required*: A Nux extension may require other Nux extensions. For example a car requires it's wheels. Therefore the extensions needed, are imported before the targeted import occurs.

+ *assets*: External files required by a Nux extension to function properlly. By convension these files do not follow the naming convension of Nux objects.
For example your logical car may need an extension to render it called `car.canvas`. This `car.canvas.js` may need jQuery. This is referred to as an asset.

## What is it.

Nux is an MIT licensed asynchronous javascript file loader incorporating an unobtrusive MVC style naming convention to create modular, readable, interchangeable code.

### License

Under MIT to encorage growth of the project and hopefully someone will find it useful. 

### Asynchronous

The methodology applied throughout the framework is designed to be completely asynchronous. When implementing Nux extensions, code is imported without freezing the ui or other extensions. 

### Naming convention

To implement a sexy logic into Nux, you follow a simple rule - create a file based upon your logic. You import the file within the code, based upon it's filename. 

File `basic.shape.js` would be imported with:
	
	// your code
	Nux.use('basic.shape')

A basic file (minimum setup) layout for `basic.shape.js`:
	
	// basic.shape.js
	var shape = Nux.NS('basic.shape');
	
	shape.myFoo = function(){
		console.log("Hey! I'm a nux extension")
	}

### MVC

It's an acronym of which is pimped throughout everything googled in todays javascript code. So ye, Nux is MVC to the core - Not by forcing you to use an MVC framework or fixed coding stratergy - but by implementing a simple convention built into the core style of using the framework. 

Nux provides a namespaced module loader. Smaller files are loaded from a specific directory creating large javascript objects.

#### Simple please?

plug your clever MVC concepts into your Nux file layout and you're done! 
Most of the examples follow simple base use of the Nux framework. For a more logical MVC breakdown, it's not made yet.

### Modular

By nature of a Nux extension, and the methods used to setup an objects are modular. As modular as you need to.

    Nux.use([
        'car',
        'car.wheels',
        'car.doors',
        'car.headlights'
    ])

Each component is specifically designed to it's module. Each module can be imported when required - therefore you do not need to download lots of code at once.

## What can it do?

Nux kind of flips convensions on it's head. We need assets, live importing, MVC and all the guff. Luckily all these are managed by Nux.

### Modular (extensions)

An object built by Nux is designed to tackle these problems:

+ Giant code.
We've all had the point with an application where you stare at line 4000 and think "how did I get to this point?". Nux is designed to locally split that huge file into managable chunks. 

+ Asynchronous loading of little bits.
This is an excellent idea. Why load 8000 lines of javascript all at once? Does the user _really_ need the enire jQuery suite when they first use your code?

Consider if you could load all your Youtube code when someone presses the youtube button?

    $('#play_video').click(function(){
        Nux.use(['view.youtube', 'data.youtube'], function(){
            // Play the first video in the youtube data list
            view.player.play(data.youtube.links[0])
        }, 'js/my_favorites/')
    })

This is a little example of what could be achieved. All data and assets will be loaded before the handler is called.

