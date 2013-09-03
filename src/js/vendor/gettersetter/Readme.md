# getterSetterJS

getterSetterJS - easy mutator methods in javascript.

http://strangemother.github.com/getterSetterJS/

* Remove your brackets
* utilize compound operators


## What is getterSetterJS?

getterSetterJS allows you to override variables with functional methods, 
giving logic to your variables! By doing so you can make your code smarter
and cleaner, for you and your end user.

In essence, getterSetterJS allows you to perform javascript mutating with a little ease.

Wikipedia - http://en.wikipedia.org/wiki/Mutator_method

So the real question is; what are getter/setters?

## What's a Setter? What's a Getter?!

In computer science, these would be refered to as *mutator methods*. 
Methods to controls changes to a variable. 

If I have a lamp with an on switch, I can use switch to both define the 
lamp's state and affect it's state. This can be done successfully with the
current syntax:

imagine our on() method has a shed load of logic.

    var lamp  = new lamp();
    lamp.on(true)
    // lamp is on
    lamp.on()
    // returns true

with mutator logic, this would be rewritten:

    var lamp = new lamp();
    lamp.on = true;
    // lamp is on
    lamp.on
    // return true

With this most excellent change, your `on` method can still be a variable,
and act like a method or function

http://pragprog.com/articles/tell-dont-ask

http://stackoverflow.com/questions/1568091/why-use-getters-and-setters


# Usage

There are a few ways to setup a getterSetterJS reference

### TL;DR:

    var car = {};

    // use gettSetterJS in three ways
    hook = getterSetter(car, 'doors')                       // transparent method (organic)
    hook = getterSetter(car, 'hasBoot', getSet)             // single mutator (semi skimmed)
    hook = getterSetter(car, 'wheels', getter, setter, 4)   // double mutator (full fat)
                                                       ^--- optional 
    // The hook
    {
        value: 'initVal',
        getter: function(){},
        setter: function(){}
    }

    // Overriding a getter / setter
    hook.getter(newFunction(value, method){ return value })
    hook.setter(newFunction(value){ return value })

    // Using hook method
    hook.getter()()                 // Use your getter 
    hook.getter()(value, method)    // Call your method mutator / single hook getSet
    hook.setter()(value)            // use the setter


## Transparent method - Organic

The silent method of fall-through. No overrides; getterSetterJS is intert

    var human = {};
    hook = getterSetter(human, 'arms');
    human.arms = 2;

This is useful for setup and using the hook object later to 
manipulate your getterSetterJS reference



## Single mutator - semi skimmed

Make it easy to override by using the same function for boths get and set
mutators


    var milk = {};
    milk.fat = 1;
    milk.type = 'semi';
    milkFat = function(value, method) {
        if(milk.type == 'semi') {
            return "0.1%";
        }

        return value;
    }

    hook = getterSetter(milk, 'fat', milkFat)

    >>> milk.fat 
    >>> "0.1%"

    >>> milk.type = 'full'
    >>> 1


it's easy to both protect and manipulate an outgoing variable, without
ugly method hooks and calls.
You'll also notice, getterSetterJS understands only one mutator exists. Therefore
**with a single mutator, returning a value will only work for a getter**


## Double mutator - Full Fat

In a full fat method, you can supply the getter, setter and an initial variable.

    var milk = {}
    var spillage = 0.2;
    var getter = function(value){
        // Tidy up the output of the stored data.
        return Math.round(value);
    }

    var setter = function(value){
        // Every time we poor some milk, some is spilt
        return value * (1 - spillage);
    }

    var hook = getterSetter(milk, 'amount', getter, setter, 100)

Now every time we use `milk.amount`, it edits the stored data,

    >>> milk.amount -= 1
    >>> 99
    >>> milk.amount -= 1
    >>> 78
    >>> milk.amount -= 1
    >>> 61
    >>> milk.amount -= 1
    >>> 48

Cool Huh! You'll notice compound operators work with your functions!


## Using getterSetterJS

getterSetterJS exposes a single method `getterSetter()` to use.


### Simplest example.

In it's default state. getterSetterJS is completely inert. thusly your mutator
will act like a variable.

    fish = {};
    fish.isAlive = true;
    hook = getterSetter(fish, 'isAlive');

    >>> fish.isAlive
    >>> true


You'll notice getterSetterJS will not affect the existing variable using a silent
fall-through.


## Spy

Act as a spy by only viewing what happens to the variable. No interaction 
with the content is needed, getterSetterJS will keep the variable data stored.

    function ageSetter(value) {
        console.log('fish age', value);
    }

    function ageGetter(value) {
        console.log('fish age will be', value)
    }

    silentHook = getterSetter(fish, 'age', ageGetter, ageSetter, 5);

    >>> fish.age
    >>> "fish age will be 5"
    >>> fish.age = 3
    >>> "fish age 3"

You'll also notice the typeof 
    
    >>> typeof(fish.age)
    >>> 'number'


## Act

By wrapping a variable, you can act upon it's data. In this example, we
fix and edit a name.

    var lastName = 'Flappy';
    var saluation = 'Dr';

    function nameSetter(v) {
        var firstName = v.charAt(0).toUpperCase() + v.toLowerCase().slice(1); // capitalize
        return firstName + ' ' + lastName; // concatenate last name
    }

    function nameGetter(v) {
        if(v == null) v = 'who?';
        return saluation + ' ' + v;
    }

    wrappingHook = nameSetter(fish, 'name', nameGetter, nameSetter);

    >>> fish.name
    >>> "Dr who?"

    >>> fish.name = 'DAVE'
    >>> fish.name
    >>> "Dr Dave Flappy"
    
    >>> salutation = 'Sgt'
    >>> fish.name
    >>> "Sgt Dave Flappy"



# The hook!
    
The getterSetter method returns a object, allowing you to spy on
your mutator methods and variable.
Here is an example of the fish hook.

    {
        value: true
        getter: function(func){}
        setter: function(func){}
    }

The value returned from the setter and stored as the actual mutator value.

----

# Looking deeper

getterSetterJS works on some very simple principles. Let's have a look at
a few exmaples of how data flows through getterSetterJS.

**A getter function always provides information, never stores it**

The concept states, a getter only sends information out of our variable.
This could be phrased as *get my content out of my variable*.

Therefore if I want to get information from *foo*, I must use the getter.

Thusly, When using getterSetterJS, your getter function will manipuate the
data after it's received the real data.

    person = {}
    
    setter = function(value) {
        // does nothing
    }

    getter = function(value) {
        return value + ' kills ducks'
    }

    hook = getterSetter(person, 'name', getter, setter, 'Clive');

    >>> person.name
    >>> 'Clive kills ducks'


**Returning a value from your setter function will manipulate the stored value**

    obj = {}
    getter = function(value, method){
        // acts as a spy only. 
    } // returns undefined

    setter = function(value){
        // setter only
        return value + 1;
    }

    hook = getterSetter(obj, 'foo', getter, setter)

    >>> obj.foo = 5
    >>> obj.foo
    >>> 6
    >>> hook.value
    >>> 6


**Returning a value from your getter function will manupulate the outgoing value**

    obj = {}

    getter = function(value, method){
        return value + 1;
    }

    setter = function(value){
        // setter only
        return value;
    }

    hook = getterSetter(obj, 'foo', getter, setter)

    >>> obj.foo = 5
    >>> obj.foo
    >>> 6
    >>> hook.value
    >>> 5


**The getter function may also be a setter**

    obj = {}

    getter = function(value, method){
        return value + 1;
    }

    setter = function(value){
        // setter only
        return value;
    }

    hook = getterSetter(obj, 'foo', getter, setter)

    >>> obj.foo = 5
    >>> obj.foo
    >>> 6
    >>> hook.value
    >>> 5
    

## override a getter/setter

pass a new function into your getter or setter method and the override is
applied immediately.

Lets set up a basic read out of eyes for our fish.
    
    fish = {}
    oHook = getterSetter(fish, 'eyes', function(value) {
        // get function
        return value;
    }, function(value){
        // set function
        return value
    })

    >>> fish.eyes = 2

An example of an inert *(and slightly verbose)*  getterSetter - we'll override the getter 
with the `hook` reference.

    oHook.getter(function(v) {
        return v + 1; 
    })

    >>> fish.eyes
    >>> 3



***zzzZZZZAP!*** Fish just got struck by nuclear quantum lightening! Something
wierd has happened to poor Fishy's eyes. Every time I count them, the number changes!


Look at what nonsense has been concoted from the bolt of lightening.

    oHook.getter(function(v) {
        return v * v; 
    })


What craziness is this!? Let's get two scientists to help us out:

    // Mike: "All fish have two eyes clive... "
    fish.eyes = 2;

    // Clive: "Okay, let me check"
    >>> fish.eyes
    >> 4

    // Clive: "You're mad Mike!! This fish clearly has 4 eyes!"
    fish.eyes = 4

    // Mike: "Okay dinf. Show me!"
    >>> fish.eyes
    >>> 16


This is a clear case of nuclear quantum lightening strikes. Luckily Clive discovers
the fix

    var nothingFunction = function(){}
    oHook.getter(nothingFunction);


now, there is nothing to distort our variable.

    // Clive: "Look Mike, I fixed it"
    fish.eyes = 2;

    // Mike: "Brilliant"
    >>> fish.eyes
    >>> 2
