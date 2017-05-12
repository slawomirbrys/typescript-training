describe('REST API promises', () => {

  it('handles getNationalities call', (done) => {
    // imagine, that API.getNationalities executes AJAX call to a REST API
    // that is asynchronously resolved with list of nationalities
    //
    // use API.getNationalities function to fetch data and make the `expect` call pass

    expect(nationalities).toEqual(["US", "UK", "DE", "FR"])
  })

  it('handles getUser call', (done) => {
    // imagine, that API.getUser executes AJAX call to a REST API
    // that is asynchronously resolved with data of the user, given by id
    //
    // use API.getUser function to fetch appropriate user and make the `expect` call pass

    expect(user.name).toBe("Tiara Will")
  })

  it('handles getUsersByNationality call', (done) => {
    // imagine, that API.getUsersByNationality executes AJAX call to a REST API
    // that is asynchronously resolved with list of all users of a given nationality
    //
    // use API.getUsersByNationality function to fetch appropriate users and make the `expect` call pass

    expect(usersUK.length).toBe(30)
    expect(usersUS.length).toBe(25)
    expect(usersFR.length).toBe(24)
    expect(usersDE.length).toBe(39)

    // order problem? hint:
    // no need to use API.getNationalities
    // use Promise.all to execute done, each promise can have its .then to manage assertion
  })

  it('should perform a simple business domain scenario', (done) => {
    // write a function which will calculate and return total salaries of users filtered by nationality

    function getTotalNationalSalary(nationality){
      // function body
    }

    Promise.all([
      getTotalNationalSalary("UK"),
      getTotalNationalSalary("US"),
      getTotalNationalSalary("FR"),
      getTotalNationalSalary("DE")
    ]).then(salaries => {
      let [UK, US, FR, DE] = salaries
      expect(UK).toBe(163734)
      expect(US).toBe(147318)
      expect(FR).toBe(135974)
      expect(DE).toBe(229152)
    })
    .then(done);
  })

  it('should perform a complex business domain scenario', (done) => {
    // similarly to the previous exercise write a function which will
    // calculate and return total salaries of users of all nationalities
    // available in the system
    // the response should be a map: { UK: amount, US: amount, ...}

    function getTotalSalariesByNationality(){
      // function body
    }

    getTotalSalariesByNationality()
      .then(salaries => {
        let { US, UK, DE, FR } = salaries
        expect(UK).toBe(163734)
        expect(US).toBe(147318)
        expect(FR).toBe(135974)
        expect(DE).toBe(229152)
      })
      .then(done);
  })
})
