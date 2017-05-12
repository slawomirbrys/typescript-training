describe('spread parameters', () => {

  it('should be able to call a function and spread the arguments', () => {
    const args = ['a', 'b', 'c']
    let calls = 0
    myFunction(...args)
    expect(calls).toBe(1)

    function myFunction(...args: string[]);
    function myFunction(a, b, c) {
      expect(a).toBe('a')
      expect(b).toBe('b')
      expect(c).toBe('c')
      calls++
    }
  })

  it('should be easier to concatenate arrays', () => {
    const array1 = [1, 2, 3]
    let result = [...array1, 4, 5, 6]
    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('can clone arrays', () => {
    const array1 = [9, 8, 7, 6, 5, 4, 3, 2, 1]

    let array2 = [...array1]
    expect(array1 === array2).toBe(false)

    let array3 = [...array1].sort()
    expect(array1).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1])
    expect(array3).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])

    let array4 = [10, ...array1, 0]
    expect(array4).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])

    let array5 = [...array1].splice(3, 3)
    expect(array5).toEqual([6, 5, 4])
  })

})
