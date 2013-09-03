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


    this.init = function(){
        var scope = this;
        var self = this;
        // The object to affect.
        var obj = arg(arguments, 0, scope);
        // Name of the property to make and watch
        var propertyName = arg(arguments, 1, null);
        // getter setter functions
        var _get = arg(arguments, 2, null);
        var _set = arg(arguments, 3, null);
        
        var _initialValue = hook.value = arg(arguments, 4, obj[propertyName] || undefined);

        // Map the getter and setter if they exist
        if(_get) __get = _get;
        if(_set) __set = _set;


        // Push the method into the passed object
        applyMethod(obj, {
            initial: _initialValue,
            propertyName: propertyName,
            getter: getFunction(_get),
            setter: setFunction(_set)
        });

        return hook;
    }


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
        return function(value, method){
            // call user function
            var value = arg(arguments, 0, __internalStorage);
            var method = arg(arguments, 1, 'get');
            var getMethod = arg(arguments, 2, __get || _get);
            var retVal;
            if(getMethod) {
                var retVal = getMethod(value, method);
            }
            
            if(retVal !== undefined) {
                return retVal
            }

            return __internalStorage;
        }

    };


    var setFunction = function setter(_set) {
        // if default set function has not been applied. call internal
        
        // return this function to the Object.set property
        return function(value){
            // method value will always be stored
            
            // console.log("Set function called.", value)
            __internalStorage = value;

            // call user function
            hook.value = value;
            if(__set == null || __set == undefined) {
                // The user getter is also the setter method. 
                var g = getFunction();
                return g(value, 'set')
            }
            var v = __set(value);
            if(v != undefined) {
                __internalStorage = v;
            }
        }

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

    return this.init.apply(this, arguments)
}
