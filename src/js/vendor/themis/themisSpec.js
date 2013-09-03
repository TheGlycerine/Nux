describe('Themis', function(){
    describe('should extend primitives', function(){
        if(themis.options.useNative) {
            // themis.options.primitives[i]
            it('it extends primitive String', function(){
                expect(themis.all.is.toString() ).toEqual(String().is.toString())  
            })

            it('it extends primitive Number', function(){
                expect(themis.all.is.toString() ).toEqual(Number().is.toString())  
            })

            it('it extends primitive Boolean', function(){
                expect(themis.all.is.toString() ).toEqual(Boolean().is.toString())  
            })

            it('it extends primitive Array', function(){
                expect(themis.all.is.toString() ).toEqual(Array().is.toString())  
            })

            it('it extends primitive Object', function(){
                expect(themis.all.is.toString() ).toEqual(Object().is.toString())  
            })
            
            it('it extends primitive Function', function(){
                expect(themis.all.is.toString() ).toEqual(Function().is.toString())  
            })
        };
    })


    describe('is should be extended with object method', function(){

        it('is.number()', function(){
            expect(themis.all.is.number).toBeDefined()
        })

        it('is.boolean()', function(){
            expect(themis.all.is.boolean).toBeDefined()
        })
        
        it('is.string()', function(){
            expect(themis.all.is.string).toBeDefined()
        })
        
        it('is.object()', function(){
            expect(themis.all.is.object).toBeDefined()
        })
        
        it('is.array()', function(){
            expect(themis.all.is.array).toBeDefined()
        })
        
        it('is.function()', function(){
            expect(themis.all.is.function).toBeDefined()
        })
        
        it('is.false()', function(){
            expect(themis.all.is.false).toBeDefined()
        })
        
        it('is.true()', function(){
            expect(themis.all.is.true).toBeDefined()
        })
        
        it('is.nan()', function(){
            expect(themis.all.is.nan).toBeDefined()
        })

        it('is.NaN()', function(){
            expect(themis.all.is.NaN).toBeDefined()
        })
        
        it('is.undefined()', function(){
            expect(themis.all.is.undefined).toBeDefined()
        })

        it('is.null()', function(){
            expect(themis.all.is.null).toBeDefined()
        })

        it('is.jquery()', function(){
            expect(themis.all.is.jquery).toBeDefined()
        })
    })

    describe('value.is() returns value', function(){
        
        it('is(5)', function(){
            var v = 5;
            expect(v.is()).toBe(v);
        });

        it('is(true)', function(){
            var b = true;
            expect(b.is()).toBe(b);
        })

        it('is("Gilbert")', function(){
            var v = 'Gilbert';
            expect(v.is()).toBe(v);
        });

        it('is({})', function(){
            var v = {};
            expect(v.is()).toBe(v);
        });

        it('is([])', function(){
            var v = [];
            expect(v.is()).toBe(v);
        });

    })

    describe('check a Number against postive', function(){
        it('5 is(5)', function(){
            var v = 5;
            expect(v.is(5)).toBe(true);
        })

        it('5 is.number()', function(){
            var v = 5;
            expect(v.is.number()).toBe(true);
        })

        it('5 is.number(5)', function(){
            var v = 5;
            expect(v.is.number(5)).toBe(true);
        })

    })

    describe('check a Number against negative', function(){
        var numberValue;
        var randomVal = function(){ return Math.round(Math.random() * 10000); }

        beforeEach(function(){
            numberValue = randomVal();
        });

        it('is not (random value)', function(){ 
            expect(numberValue.is(randomVal()) ).toBe(false);
        })

        it('is not (Object)', function(){
            expect(numberValue.is(Object) ).toBe(false);
        })

        it('is not (Function)', function(){
            expect(numberValue.is(Function) ).toBe(false);
        })

        it('is not (String)', function(){
            expect(numberValue.is(String) ).toBe(false);
        })

        it('is not (Array)', function(){
            expect(numberValue.is(Array) ).toBe(false);
        })

        it('is not (Boolean)', function(){
            expect(numberValue.is(Boolean) ).toBe(false);
        })
    })

})