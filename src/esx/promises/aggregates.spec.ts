// IMPORTANT NOTE: for the sake of these tests, Promise.prototype.finally has been added

describe('promise aggregates', () => {

  // implement a promise function that rejects with a value after specified time (in ms)
  const rejectDelay = <T>(reason: T, delay: number): Promise<T> =>
    new Promise((resolve, reject) => {
      setTimeout(() => reject(reason), delay);
    });

  // implement a promise function that resolves with a value after specified time (in ms)
  const resolveDelay = <T>(value: T, delay: number): Promise<T> =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(value), delay);
    });

  interface TrainingPromise {
    all<T>(values: Iterable<T | PromiseLike<T>>): Promise<T[]>;
    race<T>(values: Iterable<T | PromiseLike<T>>): Promise<T>;
    any<T>(values: Iterable<T | PromiseLike<T>>): Promise<T>;
  }

  const TrainingPromise: TrainingPromise = <TrainingPromise>{};

  describe('TrainingPromise.all', () => {

    TrainingPromise.all = (promises) => {
      const values = [];
      return promises .reduce((aggr, p) => {
        return aggr.then(_ => p).then(v => values.push(v) )
      }, Promise.resolve())
      .then(_ => values);
    }

    it('is resolved after all promises get resolved', (done) => {
      TrainingPromise.all([
        resolveDelay('s1', 100),
        resolveDelay('s2', 300),
        resolveDelay('s3', 200)
      ]).then(([v1, v2, v3]) => {
        expect(v1).toEqual('s1')
        expect(v2).toEqual('s2')
        expect(v3).toEqual('s3')
      }).catch(fail)
      .finally(done)
    })

    it('is rejected if at least one gets rejected', (done) => {
      TrainingPromise.all([
        resolveDelay('s1', 100),
        rejectDelay('f2', 300),
        resolveDelay('s3', 200)
      ]).then(fail)
      .catch(reason => {
        expect(reason).toEqual('f2')
      }).finally(done)
    })

  })

  describe('TrainingPromise.race', () => {

    TrainingPromise.race = (promises) =>
      new Promise((resolve, reject) => {
        promises.forEach(p => p.then(resolve).catch(reject))
      })

    it('is resolved, if the first settled promise is resolved', (done) => {
      TrainingPromise.race([
        resolveDelay('s1', 100),
        rejectDelay('f1', 200)
      ]).then(value => {
        expect(value).toEqual('s1')
      }).catch(fail)
      .finally(done)
    })

    it('is rejected, if the first settled promise is rejected', (done) => {
      TrainingPromise.race([
        rejectDelay('f1', 100),
        resolveDelay('s1', 200)
      ]).then(fail)
      .catch(reason => {
        expect(reason).toEqual('f1')
      }).finally(done)
    })

    it('resolves with the value of the first promise that resolves', (done) => {
      TrainingPromise.race([
        resolveDelay('s1', 300),
        resolveDelay('s2', 100),
        resolveDelay('s3', 200),
      ]).then(value => {
        expect(value).toEqual('s2')
      }).catch(fail)
      .finally(done)
    })

    it('rejects with the reason of the first promise that rejects', (done) => {
      TrainingPromise.race([
        rejectDelay('f1', 300),
        rejectDelay('f2', 100),
        rejectDelay('f3', 200),
      ]).then(fail)
      .catch(reason => {
        expect(reason).toEqual('f2')
      }).finally(done)
    })
  })

  describe('TrainingPromise.any', () => {

    TrainingPromise.any = function(promises){
      var rejections = [];

      return new Promise((resolve, reject) => {
        promises.reduce((aggr, p) => {
          return aggr.then(_ => p).catch(r => {
            rejections.push(r)
            if (rejections.length === promises.length){
              reject(rejections)
            }
          })
        }, Promise.resolve(null))

        promises.forEach(item => {
          item.then(resolve)
        })
      })
    }

    it('resolves with the value of the first promise that resolves', (done) => {
      TrainingPromise.any([
        resolveDelay('s1', 300),
        rejectDelay('f1', 100),
        rejectDelay('f2', 200),
      ]).then(value => {
        expect(value).toEqual('s1')
      }).catch(fail)
      .finally(done)
    })

    it('rejects if all promises reject', (done) => {
      TrainingPromise.any([
        rejectDelay('f1', 300),
        rejectDelay('f2', 100),
        rejectDelay('f3', 200),
      ]).then(fail)
      .catch(([r1, r2, r3]) => {
        expect(r1).toEqual('f1')
        expect(r2).toEqual('f2')
        expect(r3).toEqual('f3')
      }).finally(done)
    })
  })
})
