describe('Destructuring', () => {

  const noop = (anything?) => {}

  // use the functions defined at the end of the file
  // they will be needed for destructuring

  describe('with Objects', () => {

    it('can be used to pull apart objects', () => {
      let { city, voivodeship, zip } = getAddress();
      expect(city).toBe('Kazimierz Dolny')
      expect(voivodeship).toBe('lubelskie')
      expect(zip).toBe(24120)
    })

    it('can alias destructured variables', () => {
      let {city: c, voivodeship: v, zip: z} = getAddress()
      expect(c).toBe('Kazimierz Dolny')
      expect(v).toBe('lubelskie')
      expect(z).toBe(24120)
      // expect(() => noop(city)).toThrow()
      // expect(() => noop(voivodeship)).toThrow()
      // expect(() => noop(zip)).toThrow()
    })

    it('can destructure nested variables', () => {
      let { coords: {lat, long} } = getAddress()
      expect(lat).toBe(51.3180409)
      expect(long).toBe(21.9542483)
      // expect(() => noop(coords)).toThrow()
    })

    it('can destructure both top-level and nested variables', () => {
      let { city, coords: {lat, long} } = getAddress()
      expect(city).toBe('Kazimierz Dolny')
      expect(lat).toBe(51.3180409)
      expect(long).toBe(21.9542483)
      // expect(() => noop(coords)).toThrow()
    })
  })

  describe('with Arrays', () => {

    it('can be used to pull apart arrays', () => {
      let [one, two,] = getNumbers()
      expect(one).toBe(1)
      expect(two).toBe(2)
    })

    it('can skip indexes in arrays', () => {
      let [one, , three, ] = getNumbers()
      expect(one).toBe(1)
      expect(three).toBe(3)
      // expect(() => noop(two)).toThrow()
    })

  })
})

function getAddress() {
  return {
    city: 'Kazimierz Dolny',
    voivodeship: 'lubelskie',
    zip: 24120,
    coords: {
      lat: 51.3180409,
      long: 21.9542483,
    },
  }
}

function getNumbers() {
  return [1, 2, 3, 4, 5, 6]
}
