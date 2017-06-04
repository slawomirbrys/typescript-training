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

  it('should resolve for a correct parameter', (done) => {
    cookFood('beef')
      .then(result => {
        expect(result).toBe('steak')
      })
      .catch(error => {
        throw new Error('this should not run')
      })
      .then(done)
  })

  it('should resolve for another correct parameter', (done) => {
    cookFood('chicken')
      .then(result => {
        expect(result).toBe('nuggets')
      })
      .catch(error => {
        throw new Error('this should not run')
      })
      .then(done)
  })

  it('should reject', (done) => {
    cookFood('nails')
      .then(result => {
        throw new Error('this should not run')
      })
      .catch(error => {
        expect(error).toBe('you crazy?')
      })
      .then(done)
  })

  it('errors can be caught', (done) => {
    cookFood('nevermind')
      .then(result => {
        throw new Error('this should not run')
      })
      .catch(error => {
        expect(error.message).toBe('cook what?')
      })
      .then(done)
  })

  // IMPORTANT NOTE: for the sake of these tests, Promise.prototype.tap has been added

  describe('usecases', () => {

    it('can be chained', (done) => {
      Promise.resolve(3)
      .tap(result => expect(result).toEqual(3))
      .then(d => [d, d*d, d*d*d, d*d*d*d])
      .tap(result => expect(result).toEqual([3, 9, 27, 81]))
      .then(([a, b, c, d]) => [a+c, b+d])
      .tap(result => expect(result).toEqual([30, 90]))
      .then(done)
    })

  })

})
