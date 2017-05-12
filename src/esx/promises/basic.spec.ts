describe('promises', () => {

  function cookFood(ingredient){
    // Immediately return a promise which will eventually get resolved
    // or rejected by calling the corresponding function.
    return new Promise((resolve, reject) => {
      // simulating something asynchonous here...
      setTimeout(() => {
        if (ingredient === 'beef') {
          resolve('steak')
        } else if (ingredient === 'chicken') {
          resolve('nuggets')
        } else if (ingredient === 'nails') {
          reject('you crazy?')
        } else {
          reject(new Error('cook what?'))
        }
      }, 0)
    })
  }

  // this suite is a little different
  // given an example promise boilerplate above
  // adapt it to support 4 different scenarios:
  // - resolved x2
  // - rejected
  // - error catch

  it('should resolve for a correct parameter', (done) => {
    cookFood('beef')
      .then(result => {
        expect(result).toBe(/*ENTER GUESS HERE*/)
      })
      .catch(error => {
        throw new Error('this should not run')
      })
      .then(done)
  })

  it('should resolve for another correct parameter', (done) => {
    cookFood(/*ENTER GUESS HERE*/)
      .then(result => {
        expect(result).toBe('nuggets')
      })
      .catch(error => {
        throw new Error('this should not run')
      })
      .then(done)
  })


  it('should reject', (done) => {
    cookFood(/*ENTER GUESS HERE*/)
      .then(result => {
        throw new Error('this should not run')
      })
      .catch(error => {
        expect(error).toBe(/*ENTER GUESS HERE*/)
      })
      .then(done)
  })

  it('errors can be caught', (done) => {
    cookFood('nevermind')
      .then(result => {
        throw new Error('this should not run')
      })
      .catch(error => {
        expect(error.message).toBe(/*ENTER GUESS HERE*/)
      })
      .then(done)
  })

  // IMPORTANT NOTE: for the sake of these tests, Promise.prototype.tap has been added

  describe('usecases', () => {

    it('can be chained', (done) => {
      // specify thenable functions to make expectations pass
      Promise.resolve(/* YOUR ANSWER */)
      .tap(result => expect(result).toEqual(3))
      .then(/* YOUR ANSWER */)
      .tap(result => expect(result).toEqual([3, 9, 27, 81]))
      .then(/* YOUR ANSWER */)
      .tap(result => expect(result).toEqual([30, 90]))
      .then(done)
    })

  })

})
