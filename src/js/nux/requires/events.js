;(function(){
	NuxComponentHeader.apply(this, arguments)
})('events', {
	// global options
	events:  ['ready', 'allExpected']
},function(config){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.

	// A list of all events to be exposed and captured 
		// through the interface. These are implemented as 
		// stacking functions for chaining callback methods.
		
		return (function(context){

				// Self handling event structure. Mostly an 
				// experiment to see if creating and destroying
				// events can be handled silently.
				
				// Why hide the addEvent?
				// 		To ensure the core event handler has as little
				// 		exposure as possble. Once the loading is 
				// 		acheived, only this internal framework
				// 		should handle JS protection.

				var addEvent = function (context, eventName){
					/*
					Add an event to the the call stack, creating a wrapper
					for the passThrough and context.
					 */
					
					if(! context.callbacks.hasOwnProperty(eventName)) {
						 context.callbacks[eventName] = [];
					} else {
						throw(11, eventName)
					}

					return context[eventName] = (function(eventName){ 

						return function(callback){
							/*  add a method to be called when the application is ready.
							If the assets are ready, the function will be called immediately. */

							// By referencing the eventName within the callback, we apply it
							// to the functional scope - keeping the value when the method is
							// called. Without this (thusly returning a function without the closure)
							// would mangle the callback scope and any event would reference the
							// eventName last indexed in the looping 'events' creation.
							
							var name = eventName;
							if(!Nux.booted || !Nux.events.passThrough(eventName)) {
								context.callbacks[name].push(callback);
								return context.callbacks[name];
							} else {
								return callback(Nux)
							}
						}
					})(eventName)
					
				}; 
				/* create the event handlers for each event type*/
				for (var i = 0; i < context.events.length; i++) {
					var eventName = context.events[i];
					
					if(!context.hasOwnProperty(eventName)) {
						addEvent(context, eventName);
					}
				};

				context.create = function(name){
					/*
					Add an event to the event stack - pass a name for the 
					handled event:

						addEvent('foo')

					you can instantly assign listeners.

						addEvent('foo')(function(){
							// first Listener
						})

					This can be called

						callEvent('foo')

					and events can be chained

						Nux.events.foo(function(){
							console.log('foo called');
						})
					 */
					var _context = context;
					var v = addEvent(_context, name)
					_context.events.push(name);
					return v
				}
				return context;
			})({ 

				/* the list of events the system will register for callbacks.
				Probably, not best to mess with these */
				events: config.events,
				callbacks: {},
				callEvent: function(name){
					/* call an event, optionally passing args and scope 

						callEvent(name)

					Call event with arguments

						var returns = callEvent(name, [Nux, foo,'bar']);

					returns is an array of returns from each stacked callback and
					the passthrough state.

					Activate passthrough for all later event calls

						var passed = callEvent(name, true);

					// Next time [name] is called, the handler method is 
					immediately called rather than with stacked.
					*/

					// Arguments passed to the event handler (flattened as apply() )
					var args = arg(arguments, 1, [Nux]);
					var passThrough = false;
					if(Themis.of(args, Boolean)) {
						passThrough = args;
						args = [Nux];
					}

					// Scope of the event (this)
					var scope = arg(arguments, 2, this);
					
					/* Call a chained event with passed information */
					if(!Nux.events.callbacks.hasOwnProperty(name) ) {
						// throw Nux.errors.error(20, name)
						Nux.errors.throw(20, name)
					}

					var vals = []
					for (var i = 0; i < Nux.events.callbacks[name].length; i++) {
						var val = Nux.events.callbacks[name][i].apply(scope, args);
						vals.push(val);
					};

				
					if( passThrough ) {
						passThrough = Nux.events.passThrough(name, passThrough);
					} else {
						passThrough = Nux.events.passThrough(name);
					}

					return [vals, passThrough];
				},
				removeEvent: function(name) {
					Nux.events.callbacks[name] = null;
					Nux.events[name] = null;
					delete Nux.events[name];
					return Nux.events.events.splice(Nux.events.events.indexOf(name), 1);
				},
				dieEvent: function(name) {
					/*
					Unhook and detach handlers mapped to this called event
					name. Therefore any event handlers listening
					will be disconnected and not called.
					 */
					Nux.events.callbacks[name] = []
				},
				exists: function(name) {
 					return ( Nux.events.events.indexOf(name) > 0)? true: false;
				},
				passThrough: function(name, toPass) {
					/* activate a passthrough on an event, When the event is
					called whilst passThrough is True, the callback will be immediately
					called. If passthrough is false or Nux is not booted, the 
					method will by stacked normally.*/ 
					if(!this.hasOwnProperty('passed')) {
						this.passed = {};
					}

					if( Themis.of(toPass, Boolean) ) {
						return this.passed[name] = toPass;
					} else {
						return this.passed[name] || false;
					}
				}
			})
})
