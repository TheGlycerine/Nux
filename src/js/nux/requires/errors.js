;(function(){
	NuxComponentHeader.apply(this, arguments)
})('errors', {
	// global options
},function(){
	// Your implementation goes here.
	// Nux may not exist, therefore A light loader is implemented
	// and your content is stored until the method can
	// be successfully applied.
	return {
			Exception: function(errorCode, val, message) {
				this.value = val;
				this.message = message;
				this.errorCode = errorCode;
				this.toString = function(){
					return 'NuxError: ' + this.errorCode + ' "' + this.message + '": ' + this.value;
				}

				return this;
			},
			errors: {
				00: 'Not Booted',
				01: 'Missing Asset',
				04: 'not implemented',
				// The event name passed has already been
				// created. addEvent() has been used
				11: 'event exists',
				
				// The event name called does not exist
				20: 'event missing',
				// The allowed array from the config file
				// is missing. implent:
				//  {
				//    allowed: [],
				//  }
				30: 'Missing allowed',
				// the asset of which tried to load
				// is not allowed.
				75: 'refuse asset'
			},
			errorMap: function(errorCode) {
				return {
					errorCode: errorCode,
					message: this.errors[errorCode]
				}
			},
			error: function(errorCode){
				// Pass an identifier to 
				// produce an error.
				var em = this.errorMap(errorCode);
				
				var exception = new this.Exception(errorCode, arg(arguments, 1, null), em.message);
				return exception;
			},
			throw: function(errorCode, value) {
				throw this.error(errorCode, value);
			}
		}
})
