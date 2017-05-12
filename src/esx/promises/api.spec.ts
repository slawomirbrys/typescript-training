describe('REST API promises', () => {

  it('handles getNationalities call', (done) => {
    API.getNationalities().then(nationalities => {
      expect(nationalities).toEqual(["US", "UK", "DE", "FR"])
    })
    .then(done)
  })

  it('handles getUser call', (done) => {
    API.getUser(7344).then(user => {
      expect(user.name).toBe("Tiara Will")
    })
    .then(done)
  })

  it('handles getUsersByNationality call', (done) => {
    Promise.all([
      API.getUsersByNationality("UK").then(usersUK => {
        expect(usersUK.length).toBe(30)
      }),
      API.getUsersByNationality("US").then(usersUS => {
        expect(usersUS.length).toBe(25)
      }),
      API.getUsersByNationality("FR").then(usersFR => {
        expect(usersFR.length).toBe(24)
      }),
      API.getUsersByNationality("DE").then(usersDE => {
        expect(usersDE.length).toBe(39)
      })
    ])
    .then(done)
  })

  it('should perform a simple business domain scenario', (done) => {
    function getTotalNationalSalary(nationality){
      return API.getUsersByNationality(nationality)
        .then(users => {
          return users.reduce((acc, user) => acc += user.salary, 0)
        })
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
    interface CountrySalaries {
      [country: string]: number;
    }

    function getTotalSalariesByNationality(): Promise<CountrySalaries> {
      // this is a non-trivial example - need to break the chain

      // promise holds nationalities list (ordered)
      let nationalitiesPromise = API.getNationalities();

      // promise holds per-nationality salaries list (ordered)
      let usersByNationPromise = nationalitiesPromise.then(nationalities => {
        return nationalities.map(nationality => API.getUsersByNationality(nationality))
      }).then(promises => {
        return Promise.all(promises);
      })

      // join the together again
      return Promise.all([nationalitiesPromise, usersByNationPromise]).then(([nationalities, usersByNation]) => {
        let result: CountrySalaries = {}
        nationalities.forEach((nation, idx) => {
          result[nation] = usersByNation[idx]
            .reduce((acc, user) => acc += user.salary, 0)
        })
        return result;
      })
    }

    getTotalSalariesByNationality()
      .then((salaries: CountrySalaries) => {
        let { US, UK, DE, FR } = salaries
        expect(UK).toBe(163734)
        expect(US).toBe(147318)
        expect(FR).toBe(135974)
        expect(DE).toBe(229152)
      })
      .then(done);
  })
})
