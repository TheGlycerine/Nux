# errors

Errors are an important part of complete code. Errors can be raised through the preferred method of errors.throw(0). By using the central dispatch, errors can be captured correctly.

To see a full list of available errors, 

	Nux.errors.errors

receiveing an Object {} containing a list of error types key (number) and value (string).

To implement your own errors to raise through the framework, simply append the key, value.

# Raise an error

Raising an exception is easy

	Nux.errors.throw(20, 'Bad move Joe.')

Your console will return with:

	NuxError: 20 "Missing callback": Bad move Joe.

For something more custom than a simple throw, You can create an Exception object to perform your magic.

Generate an error Exception object base on an error within the framework.

	exception = Nux.errors.error(20);

returns an Exception object

	exception = new Nux.errors.Exception(20);

Thusly

	throw new Nux.errors.Exception(20)

will return a 'missing callback' exception