# Stack

In the Nux alpha product - a Stack is defined as a mutli dimentional array defining all the extensions and their resource requirements before they are fully implemented.

## Example

Consider you have an item E. item D needs C. 
Item C needs A and B.

	D imports C
	C imports B
	C imports A
	B runs
	A runs
	C runs
	D runs

By performing the load in this sequence, ensure all extensions have their assets availabile before use.

In concept this could get very messy. For example, an extension may require an additional chain of 100 items. Thusly this procedure is costly - But this is a consideration for a later date.


## Implementation

The implementation of this is broken down into smaller methodologies - making it easier to extend later.

To apply context to the framework - the components using the stack are 'required' and 'assets'.

### Set

Conceptially, the Set is very simple. A set contains a 
list of elements. When the list is emptied, a handler is called.

Set +
 |- name: 'require'
 |- list: [
 |		'example.a', 
 |		'example.b'
 |	]
 |- handler: function(){ /* items imported */ }

The Set is stored in a location accessible to all importing extensions. 
when an extension imports, it's name is removed from a Set's list.
Only when the list is empty, the handler will execute.

### Stack

The stack is very similar to a Set; its a defined space where elements are added to a list and removed when they turn up. A Stack is designed to care for 
many Sets, allowing an action to be delegated to all sets and handled.

Given the senario:

    Import B, C
    B & C need A
    Import A

In this senario when A turns up, it is required by two extensions. This is applied with a Stack Set collection thusly:

    Stack(B):
      |
      |- Set('requred', ['A']          )
      |- Set('assets',  ['A', /*'B'*/] ) // B is parallel
    
    Import A
    
    Stack(B):
      |
      |- Set('requred', []    )
      |- Set('assets',  []    ) // B imported parallel.

  
### Requirements

Requirements are additional Nux extensions needed by the importing extension. For example B needs A.
In an extension, requirements are applied like this:

	example._meta.required = [
		'example.b',
		'example.c'
	]

`example` is a fictional namespace given to an extension. `example.b` and `example.c` are also fictional.


Within the framework, Nux import the required extensions in the same way a developer would:

	Nux.use(['example.b', 'example.c'], handler)

The handler would correct the stack and remove these elements when they turn up.

### Assets

Assets work in the same method a requirements. A load list is received and assets are imported parallel to the extension imports. When these new javascript files turn up, they are trmoed from a Stack list.

### Wait

When an extension is imported, it requires `assets` and other extensions and `require`. These elements need to be imported before the importing extension is used.

An extension may have a `main` method - to be used as a boot when the extension loads first time. This is used to implement procedure's before the importing extension does it's thing. 
This may require the `assets` and `require` elements to exist before execution.

An extension has `require` and `assets`. These need to boot before the depedant is booted. Thusly a procedure of waiting is needed.

    Import B
    B needs A
    B needs asset.js
    B Imports A
    B Imports asset.js
    A main Boot
    B main Boot

Change occurs with a deeper boot chain - this time, implementing the wait chain
The wait is needed before `main` boot method is called

    Import C
    -- wait C
    C   needs     B
    C   needs     asset.js
    C   Imports   B
    -- wait B
    C   Imports   asset.js
    B   needs     A
    B   Imports   A
    
    A   main      Boot
    B   main      Boot
    C   main      Boot


Now it's easy to visualize the dependency chain, we can look at how the wait chain procedure works.

C needs B, of which needs A. In the standard setup C will have a Stack

    Stack(C)
        Set('require', ['B'])

B is imported and now A is needed. This must occur before C boots.

    C Needs  B
    
    Stack(C)
        Set('require', ['B'])
        Set('wait', [])
    
    C Import B
    // B Turns up
    B Needs A
    
    Stack(C)
        Set('require', [])
        Set('wait', ['B'])  
    
    Stack(B)
        Set('require', ['A'])
        Set('wait', [])
    
    B import A
    // A turns up
    A Boots
    
    Stack(B)
        Set('require', [])
        Set('wait', [])
    
    B Boots
    
    Stack(C)
        Set('require', [])
        Set('wait', [])
        
    C Boots

### Automatically waiting

Waiting is brilliant, but manually ensuring this chain is follows this produre would be hard coded and not greatly extendable.

To Fix this the automaic waiting of cetain imports (i.e. 'Sets'), is applied to ensure - any import occuring of which is implemented within another Set - will be automatically waited upon.

    Stack(B)
        Set('require', ['A'])
        Set('wait', [])
    
    // Create Stack A
    Stack(A)
        Set('require', [])
        Set('wait', [])
    
    // Resulting
    Stack(B)
        Set('require', ['A'])
        Set('wait', [Stack(A)])

