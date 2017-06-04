describe('Closures', function(){

	it('can hold private data - incrementer', function(){
		function incrementer(){
			var x = 0;
			return function(){
				return ++x;
			}
		}

		var inc1 = incrementer();
		expect(inc1()).toEqual(1);
		expect(inc1()).toEqual(2);
		expect(inc1()).toEqual(3);
		var inc2 = incrementer();
		expect(inc2()).toEqual(1);
		expect(inc2()).toEqual(2);
		expect(inc2()).toEqual(3);
		expect(inc2()).toEqual(4);
	});

	it('can hold private data - counter', function(){
		function counter(){
			var x = 0;
			return {
				inc: function(){
					return ++x;
				},
				dec: function(){
					return --x;
				}
			}
		}

		var c1 = counter();
		expect(c1.inc()).toEqual(1);
		expect(c1.inc()).toEqual(2);
		expect(c1.inc()).toEqual(3);
		expect(c1.dec()).toEqual(2);
		expect(c1.dec()).toEqual(1);

		var c2 = counter();
		expect(c2.dec()).toEqual(-1);
		expect(c2.dec()).toEqual(-2);
	});

	it('can encapsulate domain logic', function(){
		function finanseStorage(){
			var incomes = [];
			var outcomes = [];
			var sum = function(numbers){
				return numbers.reduce(function(a, b){
					return a + b;
				}, 0);
			}
			return {
				saveIncome: function(income){
					incomes.push(income);
				},
				saveOutcome: function(outcome){
					outcomes.push(outcome);
				},
				getBalance: function(){
					return parseFloat((sum(incomes) - sum(outcomes)).toFixed(2));
				}
			}
		}

		var f1 = finanseStorage();
		expect(f1.getBalance()).toEqual(0);
		f1.saveIncome(1500);
		f1.saveIncome(525);
		expect(f1.getBalance()).toEqual(2025);
		f1.saveIncome(300);
		expect(f1.getBalance()).toEqual(2325);
		f1.saveOutcome(599.99);
		expect(f1.getBalance()).toEqual(1725.01);
		f1.saveOutcome(49.99);
		f1.saveOutcome(824.91);
		f1.saveOutcome(174.4);
		expect(f1.getBalance()).toEqual(675.71);

		var f2 = finanseStorage();
		expect(f2.getBalance()).toEqual(0);
		f2.saveIncome(1000);
		f2.saveOutcome(29.99);
		f2.saveOutcome(718.85);
		f2.saveIncome(150);
		expect(f2.getBalance()).toEqual(401.16);
		f2.saveOutcome(396.81);
		f2.saveIncome(72);
		expect(f2.getBalance()).toEqual(76.35);
	});

});
