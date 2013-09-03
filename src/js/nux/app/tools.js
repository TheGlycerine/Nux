// Assets used by Nux.js
// These should be external methods
// used globally or implemented into
// the global namescape

// framework components
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
	} else {
		// if ia is just a value
		if(_a[ia] || _a[ia] === false ) v = _a[ia];
	}

	if( (v == null) && (def != undefined) ) {
		v = def
	}

	if(returnArray){
		return [v, ia[i]]
	} else {
		return v
	}
};

(function (exports) {
  "use strict";

  function forEachAsync(arr, fn, thisArg) {
    var dones = []
      , index = -1
      ;

    function next(BREAK, result) {
      index += 1;

      if (index === arr.length || BREAK === forEachAsync.__BREAK) {
        dones.forEach(function (done) {
          done.call(thisArg, result);
        });
        return;
      }

      fn.call(thisArg, next, arr[index], index, arr);
    }

    setTimeout(next, 4);

    return {
      then: function (_done) {
        dones.push(_done);
        return this;
      }
    };
  }
  forEachAsync.__BREAK = {};

  exports.forEachAsync = forEachAsync;
}('undefined' !== typeof exports && exports || new Function('return this')()));
