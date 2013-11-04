var error = Namespace( Nux.space('error'));

CRITICAL_ERROR = 1

error.error = function(name) {
    var message = arg(arguments, 1, name);
    var level = arg(arguments, 2, CRITICAL_ERROR);

    var e = {
    	name: name,
    	message: message,
    	level: level,
    	htmlMessage: "Error " + name + ":" + level,
    	toString:    function(){return this.name + ": " + this.message}
    }

    return e;
}