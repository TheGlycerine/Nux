//

fish = {}
fish.swimming = false;
fish.isAlive = true
// simplest
hook = getterSetter(fish, 'isAlive');

// Inner Hook example.
hookHook = getterSetter(hook, 'value', function(value, method) {
    
    if(method == 'get') {
        // setters return nothing.
        console.log("Returning 'value' for isAlive");
        return value;
    }
});

// return fish.isAlive value.
// hookHook.getter()();

console.log(hook);
// check vook value == fish.isAlive originally

// check hook fall through works (it's just a variable.)

// Use a getter and setter
doubleHook = getterSetter(fish, 'breed', function(value, method) {
    console.log("Breed", method, value);
    if(method == 'get') {
        return value
    }
})

// Act as a spy. By only viewing what happens to the variable.
function ageSetter(value) {
    console.log('fish age', value);
}

function ageGetter(value) {
    console.log('fish age will be', value)
}


// >>> fish.age = 5
// >>> 10
silentHook = getterSetter(fish, 'age', ageGetter, ageSetter, 5);

// You'll also notice the typeof 
// >>> typeof(fish.age)
// >>> 'number'


// Silently wrapping a variable.
var lastName = 'Flappy';
var saluation = 'Dr';

function setter(v) {
    var firstName = v.charAt(0).toUpperCase() + v.toLowerCase().slice(1); // capitalize
    return firstName + ' ' + lastName; // concatenate last name
}

function getter(v) {
    if(v == null) v = 'who?';
    return saluation + ' ' + v;
}

wrappingHook = getterSetter(fish, 'name', getter, setter);

oHook = getterSetter(fish, 'eyes', function(value) {
    // get function
    return value;
}, function(value){
    return value
})

oHook.getter(function(v) {
    return v * v; 
})
// >>> fish.name
// >>> "Dr who?"
// >>> fish.name = 'DAVE'
// >>> fish.name
// >>> "Dr Dave Flappy"
