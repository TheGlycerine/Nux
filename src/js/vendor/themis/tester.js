
//i.toString() == ImageLoader.toString()
/*

Usage.

// number
// boolean
// true
// false
// string
// undefined
// null
// object
// array
// function
// jquery


Equations of correct

Extra optional type:
    
    // Check an element against a type.

    element.is.number()     // Is element a Number type                         
    element.is.boolean()    // is boolean type                                  
    element.is.true()       // element is boolean true or string 'true'
    element.is.false()      // element is boolean false or string 'false'
    element.is.string()     // is string type                                   
    element.is.undefined()  // is undefined                                     
    element.is.nan()        // is NaN of type Number
    element.is.NaN()        // same
    element.is.null()       // is null
    element.is.object()     // is an object type
    element.is.array()      // is array type
    element.is.function()   // element is function
    element.is.jquery()     // element is a jquery object or instance of
    
    // Check an element is a type of Native

    element.is(Number)                  // is Number type
    element.is(Boolean)                 // is Boolean type
    element.is(String)                  // is String type
    element.is(undefined)               
    element.is(NaN)                     // is NaN exact
    element.is(null)                    // is null
    element.is(Object)                  // is object type
    element.is(Array)                   // is Array type
    element.is(Function)                // is Function type
    element.is(jQuery | $ | $(foo))     // is jQuery or it's instances


    // Check against exact elements

    element.is(0)     // element == Number && element == value

    element.is(true)  // element == Boolean && element == value
        // Same as
        element.is.true()
        element.is.false()
    
    element.is('foo')   // element == String && element == value
    element.is(NaN)     // element == Number && element == NaN
    
    element.is([1,2,3]) // element == Array && element == values
    element.is({ foo: 'bar' }) // element == object && element == values
    element.is(function(){}) // element == Function && element == value


    is:

    
    I = Variable in, I(Entity)
    // Your check is dependant upon the input accuracy.
    O = check against, I(Entity).is( O(testAgainstEntity) )

    true = logic forumlating a true boolean
    false = logic formulating a false boolean

          I         O            true                        false
        ----------------------------------------------------------------------
        Number     Number       0.0                          < 0.0 || > 0.0
        Number     Boolean      > 0.00                        < 0.0
        Number     String       Number.toString() == '0'     != '0'
        Number     undefined    NaN || undefined             != 'NaN' || NaN
        Number     NaN          NaN || 'NaN'                 != NaN || 'NaN'

        Boolean    Number       0                            < 0 || > 0
        Boolean    Boolean      true                         false 
        Boolean    String       'true'                       'false'
        Boolean    undefined    false                        false
        Boolean    NaN          false                        false      // NAN is not a zero value, and doesn't compare equal to zero.
                                                                        // Almost all languages do this I guess.

        String     Number       Number(O)                    != Number(O)
        String     Boolean      String('') || 'true'         != String(O) || 'false'
        String     String       ''                           != O
        String     undefined    'undefined'                  != 'undefined'
        String     NaN          'NaN'                        != 'NaN'
    


    
    Testing Parents.
    basis:
        Number

    // Full ride test, testing every base of the entity.
    Entity.complex()

    100% coverage goals.
    
    Each Contructor call should be undefined.
    Native.contructor()()
    Date
    String
    Number
    Bool
    Object
    Array



With native overides.

    is: returns true / false

        entity - entity to test against.
        strict - should the test types additional to content.
        
        Object.is(Object)   // true/false
        
        Number.is( 
            (Number || String || int || Object.toString()), 
            strict= (true/false)
        )
    
        Boolean is(
            (Number== 0.0/-0.0,
             String== 'true'/'false',
             int==0/-0,
             undefined
             null

             )

        )


# Instantiating

Starting the use of Themis is easy - Defining options can be done
*/

(function(config){
    function arg(_a, ia, def, returnArray) {
        var v = null

        // if ia is an array, find the
        // first correct definition
        if (ia.constructor == Array) {
            /*
             * Each item is checked. if the
             * item in the array is
             * a definition within the oaet 
             * arguments or object - pass it 
             */
            for (var i = 0; i < ia.length; i++) {
                if (_a[ia[i]]) {

                    v = _a[ia[i]];
                    break;
                }
            }
        } else {
            // if ia is just a value
            if (_a[ia]) v = _a[ia];
        }

        if ((v == null) && (def != undefined)) {
            v = def
        }

        if (returnArray) {
            return [v, ia[i]]
        } else {
            return v
        }

    }
 

    /*
    SIMPLE TESTING!!! =D
     */
    var Tester = function(){
        var scope = {
            version: '0.01',
            // basic settings
            options: {
                // 10 seconds as milliseoncds
                refreshInterval: 10000,
                // Needs an element
                id: null,
                // when the image is refreshed
                updateCallback: function(){},
                primitives: [
                    Number,
                    Boolean,
                    String,
                    undefined,
                    null,
                    Object,
                    Array,
                    Function
                ],
               
                // element.is(Number)                  // is Number type
                // element.is(Boolean)                 // is Boolean type
                // element.is(String)                  // is String type
                // element.is(undefined)               
                // element.is(NaN)                     // is NaN exact
                // element.is(null)                    // is null
                // element.is(Object)                  // is object type
                // element.is(Array)                   // is Array type
                // element.is(Function)                // is Function type
                // element.is(jQuery | $ | $(foo))     // is jQuery or it's instances

                /* extend the javascript natively. 
                Number, Object *Others not listed yet
                will be extended with a themis entity. */
                useNative: false,
                container: null,      // object to return themis methods, used if useNative is true
                /* use namespace.
                If false, any native entity will inherit 
                methods defined for themis, 
                If true, all methods will be namespaced with
                themis method

                Turn this on in fear of overriding javascript 
                native methods (it shouldn't be an issue ( TEST IT =D !! )) 
                */
               useNameSpace: false, 

               globalName:'Themis',
               // Allow Variable override method is Themis options have
               // been applied before the object load.
               testerOveride: true
            }
        }


        
        var methods = {
            is: function() {
                console.log('goo')
                /*
                The element to check against. 

                 */
                var checkAgainst = arg(arguments, 0, null);
                var thisVal = this.valueOf();
                var pass = false;
             }

        } 

        function __getter(value) {
            console.log('Handle', arguments)
            return value;
        }
        
        function setter(value) {

        }

        _is = getterSetter(methods, 'is', __getter, setter)
        // I love Javascript ( YEY )
        // I hate testing ( BOO )
        // I want to have tests easy (like type (EXTRA YEY!! ))
        // Lets use the simplest testing script in the world* ( DOUBLE YEY! )
        // *could also be Observable Universe.

        this.init = function(options) {
            // Pass some options, scope

            var scope = (this.options.useNative === true)? this: this.options.container || {};
            if( IS._function(options) ) {
                options = options.apply(this)
            }

            this.options = this._extend(this.options, options);
            scope = this.mapNatives.apply(this);
            if(this.options.useNameSpace) {
                this.container = scope;
            };

            return this;
        }

        scope.addOptions = this.init

        /*
        This will be called when the new Themis() method is instansiated.
        pass some options to extend and do stuff.
         */
        scope._extend = function (target, other) {
            target = target || {};
            for (var prop in other) {
                if (typeof other[prop] === 'object') {
                  target[prop] = this._extend(target[prop], other[prop]);
                } else {
                  target[prop] = other[prop];
                }
            }
            return target;
        }
        
        var isListener = function(method){
            /*is listener */
            var getterSetter=  function(v,m){
                // console.log("is fetch", v,m)
            }
             // console.log("is isListener")

            _is = getterSetter(this, method.name, getterSetter)
        }

        /*
        Loop through all testable natives 
        and extend them with the themis method mapping.
         */
        scope.mapNatives = function mapNatives() {
            // primitives
            var primitives =  arg(arguments, 0, this.options.primitives);
            // debugger
            var po = {};

           

            for (var i = primitives.length - 1; i >= 0; i--) {
                var primitive = primitives[i];
                 var tester = this.tester.apply(this);
                tester.name = this.options.globalName;

                for (var j = tester.all.length - 1; j >= 0; j--) {

                    // A list of all tester methods to use.
                    var testerMethod = tester.all[j];

                    if(primitive && primitive.hasOwnProperty(this.options.globalName) &&
                        this.options.useNative ) {
                        // Allow overide of a previous globalName
                    
                        // Store override method
                        var overrideMethod = primitive[this.options.globalName];
                        // implement new method
                        primitive.prototype[this.options.globalName][testerMethod.name] = testerMethod
                        // append old method to construct call
                        

                        primitive.prototype[this.options.globalName].overrideMethod = overrideMethod;
                        
                        
                        console.log("Pushing override", this, primitive)
                    } else {
                        // push method into primitive
                        if(primitive && primitive.prototype){
                            po[testerMethod.name] = testerMethod
                        }
                        isListener.apply(this, [testerMethod])
                        //console.log("Pushing", this, testerMethod) 
                    } 
                };            
            };


            return po;
        }
     
        scope.tester = function tester(){
            var options = arg(arguments,0, {})
            var self = this;
            var pass = false;

            this.of = function of(part, whole) {
                // whole in primitves
                // check of types.
                if(self.options.primitives.indexOf(whole) >= 0) {
                    // Check part is of type
                    var sn = (whole === undefined)? 'undefined' : 
                        (whole === null)? 'null' : whole.name
                    
                    pass = IS['_' + sn.toLowerCase()](part);
                    return pass;
                }

                // Check an exact value
                pass = (new this.constructor(part)) == whole
                return pass
                // whole is of type.
                    // exact check
            }


            this.is = function is() {
                /* The element to check against. */
                var inner = (function(){
                    //console.log("inner", this)
                    return function(){
                        var placeholder = self;
                        var checkAgainst = arg(arguments, 0, placeholder);
                        var thisVal = this.valueOf();
                        if(thisVal && (checkAgainst != placeholder)) {
                            var pass = this.is.of.call(this,thisVal, checkAgainst)
                            return pass;
                        } else if(thisVal && (checkAgainst == placeholder)){
                            
                            if(checkAgainst === thisVal) {
                                return true;
                            }

                            return thisVal
                        }
                        console.log(thisVal,'is', (checkAgainst)? checkAgainst.name || checkAgainst: checkAgainst, pass);
                    }
                }).apply(this)


                return inner.apply(this, arguments);
            };
           
            //this.is.valueOf = function() { 
            //    var s = this;
            //     console.log(s.valueOf())
            //     return self.valueOf() 
            //};

            this.is.of = this.of; 
            this.is.name = this.is.name ||  'is';

            this.is.number = (function number(){
                
                var os = this;

                // console.log('number scope is');

                return function(){
                    //console.log('Number inner scope', this, os)
                    var p = arg(arguments, 0, null);
                    var c = this.is()
                    if(p) {
                        return this.of(p, Number);
                    } else if(p == null){
                        // get original value return .

                        return this.of(this.valueOf(), Number)
                    }
                }
            }).apply(this)

            this.all = (function(){
                this.is = this.is;
                this.length = 1;
                return this;
            }).apply({
                0: this.is
            });
            // Pass a renference to all available methods.
            
             var getterSetter=  function(v,m){
                console.log("fetch", v,m)
            }

            // return an instance of self.
            return this;
        }

        scope.new = function(config) {

            var tester = new Tester(config);

            if( tester.options.useNameSpace) {
                // Push into global namespace
                var name = tester.options.globalName || 'Themis'
                window[name] = tester;
                isListener.apply(this, [tester])
                
                var Themis = getterSetter(window, name, function(v, m){
                        if(m == 'set') {
                            
                            return __Themis.new(v)
                        } else {
                            return __Themis
                        }
                    });
                
            }
        } 
        


        return this.init.apply(scope, arguments);
    }

    /*  
     *  IS - Javascript framework for datatype checks.
     *  
     *  Copyright (c) 2013 Fred Heusschen
     *  www.frebsite.nl
     *
     *  Dual licensed under the MIT and GPL licenses.
     *  http://en.wikipedia.org/wiki/MIT_License
     *  http://en.wikipedia.org/wiki/GNU_General_Public_License
     */
    var IS = (function() {
        this._null = function( a )
        {
            return ( a === null );
        };
        this._undefined = function( a )
        {
            return ( this._null( a ) || typeof a == 'undefined' || a === 'undefined' );
        };

        this._string = function ( a )
        {
            return ( ( a instanceof String || typeof a == 'string' ) && !this._undefined( a ) && !this._true( a ) && !this._false( a ) );
        };
        this._number = function( a )
        {
            return ( ( a instanceof Number || typeof a == 'number' ) && !isNaN( a ) );
        };
        this._boolean = function( a )
        {
            return ( a instanceof Boolean || typeof a == 'boolean' || this._true( a ) || this._false( a ) );
        };
        this._object = function( a )
        {
            return ( ( a instanceof Object || typeof a == 'object' ) && !this._null( a ) && !this._jquery( a ) && !this._array( a ) );
        };
        this._array = function ( a )
        {
            return ( a instanceof Array );
        };
        this._function = function( a )
        {
            return ( a instanceof Function || typeof a == 'function' );
        };

        this._jquery = function ( a )
        {
            return ( typeof jQuery != 'undefined' && a instanceof jQuery );
        };

        this._true = function( a )
        {
            return ( a === true || a === 'true' );
        };
        this._false = function( a )
        {
            return ( a === false || a === 'false' );
        };
        this._percentage = function( a )
        {
            return ( this._string( a ) && a.slice( -1 ) == '%' && this._number( parseInt( a.slice( 0, -1 ), 10 ) ) );
        };

        return this;
    })();

    var tester = new Tester(config);

    return tester;

})(function(options){
    try {
        c = window[this.options.globalName || 'Themis'] || {};
        c.testerOveride = true;
        c._default = true;
        
        if(this.options.testerOveride) {
            
            // debugger;
            var scope = this;
            function setter(value) {
                
                //console.log('setter', arguments);

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
            function __getter(value) {
                // console.log('GET', arguments)

                return value;
            }
            
            function getter(value) {
                
                return __Themis

            }

            window['__Themis'] = this

            _is = getterSetter(window['__Themis'], 'is', __getter, setter)

            __themis = getterSetter(window, this.options.globalName, getter, setter, this)
            
    
        } else {
            window[this.options.globalName] = this;
        }

        return c;
    } catch(e) {
        return {}; 
    };
})


Themis = {
    globalName: 'Themis',
    useNameSpace: true
};


{

     // An array/object of all the 

        // map tester method names within the prototype of the 
        // array.
        // Allowing for correct enumeration of the all array and
        // the additional benifit of calling all.testMethod
        
        /*
        Accepts only a number to check.
        */
        this.number_check = function number_check(){
            var num = arg(arguments, 0, null);
            
            if(!IS._number(num)) {
                throw new Error('tester.number_check can only accept type Number');
                // Throw null as it's the only variant not used by tester
                return null;
            }
            var thisVal = this.valueOf();
            if(thisVal === num) {
                return true;
            }

            return false;
        }

        this.boolean_check = function boolean_check(){
            var bool = arg(arguments, 0, null);
            
            if(!IS._boolean(bool)) {
                throw new Error('tester.boolean_check can only accept type Boolean');
                // Throw null as it's the only variant not used by tester
                return null;
            }
            var thisVal = this.valueOf();
            if(thisVal > 0) {
                return true;
            }

            return false;            
        }
        
        /*
                
        I = Variable in, I(Entity)
        // Your check is dependant upon the input accuracy.
        O = check against, I(Entity).is( O(testAgainstEntity) )

        true = logic forumlating a true boolean
        false = logic formulating a false boolean

          I         O            true                        false
        ----------------------------------------------------------------------
        String     Number       Number(O)                    != Number(O)
        String     Boolean      String('') || 'true'         != String(O) || 'false'
        String     String       ''                           != O
        String     undefined    'undefined'                  != 'undefined'
        String     NaN          'NaN'                        != 'NaN'
         */
        this.string_check = function string_check(){
            var str = arg(arguments, 0, null);
            
            if(!IS._string(str)) {
                throw new Error('tester.string_check can only accept type String');
                // Throw null as it's the only variant not used by tester
                return null;
            }

            var thisVal = this.valueOf();
            if(thisVal > 0) {
                return true;
            }

            return false;            
        }
   
        this.undefined_check = function undefined_check(){
            var str = arg(arguments, 0, null);
            
            if(!IS._undefined(str)) {
                throw new Error('tester.undefined_check can only accept type undefined');
                // Throw null as it's the only variant not used by tester
                return null;
            }
            var thisVal = this.valueOf();
            if(thisVal > 0) {
                return true;
            }

            return false;            
        }


}

