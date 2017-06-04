/// <reference path="../../data/data.ts" />

describe('Functional programming', function(){
	// database is defined in data/data.js file
	var users = db.getUsers();

	describe('Processing data simple scenario', function(){

		it('is possible using for loop, yet inconvenient', function(){
			// calculate total amount of bonus
			// given to all users with nationality equal "DE"
			// whose salary is below 5000
			// where bonus equals 20% of the salary

			// use FOR loops
			var totalBonus;
			// for(...; ...; ...)

			expect(totalBonus).toEqual(13246);
		});

		it('is more readable and more convenient using functional programming', function(){
			// calculate total amount of bonus
			// given to all users with nationality equal "DE"
			// whose salary is below 5000
			// where bonus equals 20% of the salary

			// use functional programming, assign step by step
			var usersDE; // = users.doSomething(...)
			var usersWithSalaryLessThan5000; // = usersDE.doSomething(...)
			var totalBonus; // = usersWithSalaryLessThan5000.doSomething(...)

			expect(usersDE.length).toEqual(39);
			expect(usersWithSalaryLessThan5000.length).toEqual(18);
			expect(totalBonus).toEqual(13246);
		});

		it('is even better using chaining', function(){
			// do the same as above, but don't use intermediate variables
			// process all steps and assign to final variable

			// use functional programming
			var totalBonus;
			// = users
			// .filter(...)
			// .map(...)
			// .reduce(...)

			expect(totalBonus).toEqual(13246);
		});

	});

	it('makes it easy to filter data by condition', function(){
		// fetch the user with ID 9451
		var user9451;

		expect(user9451.id).toEqual(9451);
		expect(user9451.address.city).toEqual("Port Bentonshireland");
		expect(user9451.phone).toEqual("1-139-794-6794");

		// fetch a user with nationality US
		var USUser;

		expect(USUser.nationality).toEqual("US");
	});

	it('makes it easy to filter data by condition', function(){
		// fetch all users with nationality DE only
		var DEUsers;

		expect(DEUsers.length).toEqual(39);
		expect(DEUsers[19].name).toEqual("Nicholas Rogahn");
		expect(DEUsers[38].name).toEqual("Pat Abshire");

		// fetch all users with gmail.com email domain only
		var GmailUsers;

		expect(GmailUsers.length).toEqual(40);
		expect(GmailUsers[19].name).toEqual("Kallie Quigley");
		expect(GmailUsers[39].name).toEqual("Caterina Cruickshank III");
	});

	it('makes it easy to sort data by condition', function(){
		// sort users by descending salary
		var RichestUsers;

		expect(RichestUsers.length).toEqual(118);
		expect(RichestUsers[0].salary).toEqual(9922);
		expect(RichestUsers[2].salary).toEqual(9894);
		expect(RichestUsers[66].salary).toEqual(5389);
		expect(RichestUsers[116].salary).toEqual(1388);

		// sort users by ascending salary
		var PoorestUsers;

		expect(PoorestUsers.length).toEqual(118);
		expect(PoorestUsers[0].salary).toEqual(1292);
		expect(PoorestUsers[2].salary).toEqual(1408);
		expect(PoorestUsers[66].salary).toEqual(6425);
		expect(PoorestUsers[116].salary).toEqual(9922);
	});

	it('makes it easy to modify entire collections', function(){
		// grab all telephone numbers of all users without modifying the order
		var UserPhoneNumbers;

		expect(UserPhoneNumbers.length).toEqual(118);
		expect(UserPhoneNumbers[8]).toEqual("1-415-304-0824");
		expect(UserPhoneNumbers[31]).toEqual("286.336.5409 x035");
		expect(UserPhoneNumbers[92]).toEqual("595.794.3113 x870");
		expect(UserPhoneNumbers[109]).toEqual("1-727-541-7250 x26689");
	});

	it('makes it easy to search for single objects', function(){
		// fetch the phone to the richest user who is American
		// or (gives the same result in this case)
		// fetch the phone to the richest American
		var maxSalary;

		expect(RichestUSUserPhone).toEqual("1-941-502-1947 x609");
	});

});
