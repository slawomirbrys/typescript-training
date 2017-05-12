describe('arrow functions', () => {

  it('can return objects', () => {
    // define following as arrow functions
    // look out for object literal syntax in arrow functions!
    let makePerson;

    expect(makePerson('John', 'Lennon')).toEqual({first: 'John', last: 'Lennon'})
    expect(makePerson('Paul', 'McCartney')).toEqual({first: 'Paul', last: 'McCartney'})
  })

  it('are great for currying', () => {
    // define following functions:
    // adder as arrow function (it stores first parameter in a closure and return a function accepting second parameter)
    // add5 and minus10 as `adder` calls (curried functions, they actually accept the second parameter and perform actual add)
    let adder, add5, minus10;

    expect(add5(4)).toBe(9)
    expect(add5(-4)).toBe(1)
    expect(add5(3.5)).toBe(8.5)
    expect(add5(400)).toBe(405)
    expect(minus10(4)).toBe(-6)
    expect(minus10(-4)).toBe(-14)
    expect(minus10(3.5)).toBe(-6.5)
    expect(minus10(400)).toBe(390)

    expect(typeof adder).toBe("function");
    expect(adder.length).toBe(1);
    expect(typeof add5).toBe("function");
    expect(add5.length).toBe(1);
    expect(typeof minus10).toBe("function");
    expect(minus10.length).toBe(1);
  })

  it('can make array filter chains more managable', () => {
    const data = [
      {type: 'Clothes', name: 'Socks', price: 1.00, qty: 5},
      {type: 'Clothes', name: 'Trousers', price: 3.90, qty: 2},
      {type: 'Clothes', name: 'Pajams', price: 4.80, qty: 1},
      {type: 'Clothes', name: 'Shoes', price: 23.00, qty: 2},
      {type: 'Music', name: 'David Bowie', price: 11.90, qty: 1},
      {type: 'Music', name: 'Rolling Stones', price: 8.90, qty: 1},
      {type: 'Music', name: 'ABBA', price: 9.90, qty: 1},
      {type: 'Food', name: 'Chips', price: 3.50, qty: 4},
      {type: 'Food', name: 'Fish', price: 8.75, qty: 3},
      {type: 'Food', name: 'Beer', price: 2.80, qty: 12},
    ]

    // REPLACE ALL REGULAR FUNCTION WITH ARROW FUNCTIONS
    const shoppingList = data
      .filter(/* function(d) {
        return d.type != 'Clothes'
      } */) // Remove Clothes
      .filter(/* function(d) {
        return  d.price < 5
      } */) // Find only remaining items with price < 5
      .sort(/* function(a, b) {
        return b.price * b.qty - a.price * a.qty
      } */) // Sort by total price, desc
      .map(/* function(d) {
        return d.name
      } */) // Pull just the name from each item

    expect(shoppingList.shift()).toBe('Beer')
    expect(shoppingList.shift()).toBe('Chips')
  })

})
