# Themis

I love javascript but I hate testing boo! I also hate type checking and TakeThat.

Themis provides a object testing and type checking at the native of all element.

By implementing a method '.is()' on all extendable native objects, we instantly have 
type checking!

Lets have a look at some basic functionality.

    var name = 'Charlie Sheen';

    name.is(String);            // true
    name.is('Charlie Sheen');   // true
    name.is.string();           // true

    name.is(Number);            // false
    name.is('Alan Harper');     // false
    name.is.Number();           // false

And that's it!

# Methods

A closer look at all the available checker methods:

### TL;DR:

type checking is now super fun. Using the method provided on all types,
`is()` can check types and arbitrary values.

    element.is(Number)                  // is Number type
    element.is(Boolean)                 // is Boolean type
    element.is(String)                  // is String type
    element.is(Object)                  // is object type
    element.is(Array)                   // is Array type
    element.is(Function)                // is Function type

    // a few extras.
    element.is(undefined)               
    element.is(NaN)                     // is NaN exact
    element.is(null)                    // is null
    element.is(jQuery | $ | $(foo))     // is jQuery or it's instances


`Themis.is()` is also extended to call primitive data types for fast type checking.

    element.is.number()     // Is element a Number type                         
    element.is.boolean()    // is boolean type                                  
    element.is.string()     // is string type                                   
    element.is.undefined()  // is undefined         
    element.is.object()     // is an object type
    element.is.array()      // is array type
    element.is.function()   // is function


And a few specials:

    element.is.false()      // element is boolean false or string 'false'
    element.is.true()       // element is boolean true or string 'true'
    element.is.nan()        // is NaN of type Number
    element.is.NaN()        // same
    element.is.null()       // is null
    element.is.jquery()     // is a jquery object or instance of    


## Breakdown

A deeper look at how Themis equates.

### number
    
    var age = 42;

    // Type checking
    age.is(Number);         // true
    age.is.number();        // true
   
    // Exact data checking
    age.is(42);             // true
    age.is.number(42);      // true

    // Stuff that would make Thesis say
    age.is(Boolean);        // false
    age.is.boolean();       // false
    age.is.number(12);      // false


### boolean

    var accepted = true;

    // Type checking
    accepted.is(Boolean);           // true
    accepted.is.boolean();          // true
   
    // Exact data checking
    accepted.is(true);              // true
    accepted.is.boolean(true);      // true
    accepted.is.true();             // true

    // Stuff that would be bad
    accepted.is(String);            // false
    accepted.is(false);             // false
    accepted.is.boolean(false);     // false
    accepted.is.false();            // false


### string
    
    var name = 'Hugh Laurie';

    // Type checking
    name.is(String);                // true
    name.is.string();               // true

    // Exact data checking
    name.is('Hugh Laurie');         // true
    name.is.string('Hugh Laurie');  // true

    // stuff for no's
    name.is(Object);                // false
    name.is.object();               // false
    name.is('Jeeves');              // false
    name.is.string('Jeeves');       // false


### object

    var thing = { name: 'fleurgh' };

    // type checking
    thing.is(Object);                       // true
    thing.is.object();                      // true

    // exact checking
    thing.is({ name: 'fleurgh' })           // true
    thing.is.object({ name: 'fleurgh' })    // true

    // falseys
    thing.is(Array);                        // false
    thing.is.array();                       // false
    thing.is({});                           // false
    thing.is.object({})                     // false

### undefined

    var brain = undefined;

    // Type checking
    brain.is(undefined);            // true
    brain.is.undefined();           // true

    // stuff for no's
    brain.is(null);                // false
    brain.is.null();               // false


### null

    var eridanus = null;

    // Type checking
    eridanus.is(null);              // true
    eridanus.is.null();             // true

    // negatives
    eridanus.is(String);            // false
    eridanus.is.string();           // false
    

### array

    var phaser = [1,2,3];

    // Type checking
    phaser.is(Array);               // true
    phaser.is.array();              // true
    phaser.is([1,2,3]);             // true

    // bads'
    phaser.is(String);              // false
    phaser.is.string();             // false
    phaser.is([]);                  // false
    phaser.is.array([]);            // false



### function

    var form = function(){ /* code */ };

    // Type checking
    form.is(Function);
    form.is.function();

// jquery

