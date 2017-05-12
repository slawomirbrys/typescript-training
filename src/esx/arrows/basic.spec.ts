describe('arrow functions', () => {

    it('can replace simple traditional functions', () => {
        let fnAdd = function(a, b){
            return a + b;
        };
        let arrowAdd = (a, b) => a + b;

        expect(fnAdd.length).toBe(2)
        expect(arrowAdd.length).toBe(2)
        expect(fnAdd(3, 3)).toBe(arrowAdd(3, 3))
    });

    describe('are great for defining simple calculations', () => {
        let arrowSub = (a, b) => a - b;
        let arrowMul = (a, b) => a * b;
        let arrowDiv = (a, b) => a / b;

        it('subtracts numbers correctly', () => {
            expect(arrowSub(20, -15)).toEqual(35)
            expect(arrowSub.length).toBe(2);
        })

        it('multiplies numbers correctly', () => {
            expect(arrowMul(10.2, 5)).toEqual(51)
            expect(arrowMul.length).toBe(2);
        })

        it('divides numbers correctly', () => {
            expect(arrowDiv(546, 39)).toEqual(14)
            expect(arrowDiv.length).toBe(2);
        })
    })

    it('can replace complex traditional functions', () => {
        let fnFib = function(x){
            if (x === 0 || x === 1) {
                return x;
            } else {
                return fnFib(x-1) + fnFib(x-2);
            }
        };

        let arrowFib = x => (x === 0 || x === 1) ? x : arrowFib(x-1) + arrowFib(x-2);

        [fnFib, arrowFib].forEach(function(fn){
            expect(fn(0)).toBe(0);
            expect(fn(1)).toBe(1);
            expect(fn(5)).toBe(5);
            expect(fn(10)).toBe(55);
            expect(fn(15)).toBe(610);
        });
        expect(fnFib.length).toBe(1);
        expect(arrowFib.length).toBe(1);
    });

  it('binds `this` to the eval scope, not the runtime scope', () => {
    // console.log is being spied not to pollute output for other tests
    spyOn(console, 'log');

    const person = {
      name: 'Jarosław',
      greetFriends: function(friends) {
        friends.forEach((friend) => {
          console.log(this.name + ' greets to ' + friend)
        })
      },
    }

    const friendsArray = ['Antoni', 'Andrzej', 'Krystyna', 'Wiktor']

    expect(() => person.greetFriends(friendsArray)).not.toThrow()
    expect(console.log).toHaveBeenCalledWith('Jarosław greets to Antoni');
    expect(console.log).toHaveBeenCalledWith('Jarosław greets to Andrzej');
    expect(console.log).toHaveBeenCalledWith('Jarosław greets to Krystyna');
    expect(console.log).toHaveBeenCalledWith('Jarosław greets to Wiktor');
  })

})
