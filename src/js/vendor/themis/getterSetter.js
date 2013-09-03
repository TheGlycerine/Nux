function arg(_a, ia, def, returnArray) {
    var v = null

    // if ia is an array, find the
    // first correct definition
    if (ia.constructor  == Array) { 
        for(var i=0; i<ia.length; i++) {
            if(_a[ia[i]] || _a[ia[i]] === false ){
                v = _a[ia[i]];
                break;
            }
        }
    }
    else {
        if(_a[ia] || _a[ia] === false ) v = _a[ia];
    }

    if( (v == null) && (def != undefined) ) {
        v = def
    }

    if(returnArray){
        return [v, ia[i]]
    }
    else
    {
        return v
    }

}
//getter setter ideas

getterSetter = function(parent) {
    return GetterSetter.apply(parent, arguments)
}
 
GetterSetter = function getterSetter(){

    // The value's storage
    var __internalStorage,
        __get, 
        __set;
    var self;

    // passed back as an internal hook object.
    var hook = {
        // the current value
        value: null,
        // the getter function to call
        getter: function(func){
            if(func){
                __get = func;
                return this;
            } else {
                return getFunction(__get)
            }

        },
        // the setter function to call
        setter: function(func){
            if(func){
                __set = func;
                return this;
            } else { 
                
                return setFunction(__set)
            }
            return __get;
            
        }, // if only getter - return getter;

        // For chaining
    }

    // internal wrapper get function
    var getFunction = function getter(_get) {

        // return this function to the Object.get property
        return function(){
            // call user function
            if(_get) {
                return _get.apply(this.scope || this, [__internalStorage, 'get'])
            }
            
            return __internalStorage;
        }
    };


    var setFunction = function setter(_set) {
        // if default set function has not been applied. call internal
        ;
        var scope = this.scope;
        // return this function to the Object.set property
        var c = (function(_set){
            var scope = this
            return function(value){

                // method value will always be stored
                
                // console.log("Set function called.", value)
                __internalStorage = value;

                // call user function
                if(__set == null || __set == undefined) {
                    // user has getSet applied
                    return __get.apply(scope || this, [__internalStorage, 'set'])
                    
                }
                var v = __set(value);
                if(v != undefined) {
                    __internalStorage = v;
                }

            }

            return this;
        }).apply(scope, [_set])
        return c;
    };
 
    /*
    Apply a definition to an object.
     */
    var applyMethod = function(obj, data){
        __internalStorage = data.initial;
        return Object.defineProperty(obj, data.propertyName, {
                get: data.getter,
                set: data.setter
            });
    }

    this.init = function(){
        var scope = this;
        self = this
        // The object to affect.
        var obj = arg(arguments, 0, scope);
        // Name of the property to make and watch
        var propertyName = arg(arguments, 1, null);
        // getter setter functions
        var _get = arg(arguments, 2, null);
        var _set = arg(arguments, 3, null);
        
        var _initialValue = arg(arguments, 4, undefined);
        this.scope = arg(arguments, 5, obj);

        // Map the getter and setter if they exist
        if(_get) __get = _get;
        if(_set) __set = _set;

        // Push the method into the passed object
        applyMethod(obj, {
            initial: _initialValue,
            propertyName: propertyName,
            getter: getFunction.apply(this.scope,[_get]),
            setter: setFunction.apply(this.scope,[_set])
        });

        return hook;
    }


    return this.init.apply(this, arguments)
}


// A method to handle both get and set of a property
function getSet(value, method){
    //console.log('getSet', arguments)
    if(method == 'get') return value;
}

/*
value given by user,
lib keeps an internal sotre of the data applied.
 */
function setter(value) {
    // debugger;
    console.log('setter', arguments);

    /*
    Return a value overwrites the internal storage procedure.
     */
    // return value
}

/*
recieves original value set
property set to.
object associated with reference.
 */
function getter(value) {
    console.log('getter', arguments)
    return value;
}

o = {
    name: 'Jay'
}

//both = getterSetter(o, 'both', getSet)
//single = getterSetter(o, 'single', getter, setter, 'plinko')
//console.log(single)