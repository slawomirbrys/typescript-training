describe('rest parameters', () => {

  it('catch non-specified params', () => {
    function resty(first, second, ...others) {
      return others
    }

    // expect(resty().length).toBe(0)
    // expect(resty(1).length).toBe(0)
    expect(resty(1, 2).length).toBe(0)
    expect(resty(1, 2, 3).length).toBe(1)
    expect(resty(1, 2, 3, undefined, 5, undefined, 7, undefined, 9, 10).length).toBe(8)
  })

  it('has a different length than `arguments`', () => {
    function resty(first, second, ...others) {
      return others.length == arguments.length
    }

    // expect(resty()).toBe(true)
    // expect(resty(1)).toBe(false)
    expect(resty(1, 2)).toBe(false)
    expect(resty(1, 2, 3)).toBe(false)
    expect(resty(1, 2, 3, undefined, 5, undefined, 7, undefined, 9, 10)).toBe(false)
  })

  describe('gimmePairs function', function() {
    let gimmePairs = function(...elements){
      let result = [];
      elements.forEach((elem1, idx, rest) => {
        rest
          .slice(idx + 1)
          .forEach(elem2 => result.push([elem1, elem2]) );
      });
      return result;
    }

    // or
    gimmePairs = (...elements) =>
      elements.map((elem1, idx, rest) =>
        rest
          .slice(idx + 1)
          .map(elem2 => [elem1, elem2])
      ).reduce((aggr, elem) => aggr.concat(elem), []);

    beforeEach(function() {
      jasmine.addMatchers(customMatchers);
    })

    it('returns correct results', function() {
      expect(gimmePairs(1)).toEqualJSON([]);
      expect(gimmePairs(1, 2)).toEqualJSON([[1, 2]]);
      expect(gimmePairs(1, 2, 3)).toEqualJSON([[1, 2], [2, 3], [1, 3]]);
      expect(gimmePairs(1, 2, 3, 4)).toEqualJSON([[1, 2], [2, 3], [3, 4], [1, 3], [2, 4], [1, 4]]);
    })
  })
})
