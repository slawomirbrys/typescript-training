describe('async functions', () => {

  // consider examples from promises/api.spec.js file

  // define UserListPromise datatype here

  it('should perform asynchronous calls sequentially', (done) => {
    // write an async function which will request data of 4 users SEQUENTIALLY (when one finished,
    // request another one) and return list of these 4 users to make `expect` calls pass
    // find appropriate users in src/data.js file

    async function fetchUsers(): UserListPromise {
      // async function body
    }

    fetchUsers()
      .then(result => {
        expect(result[0].name).toBe("Ms. Melisa Dooley")
        expect(result[1].address.city).toBe("West East Adelinefurt")
        expect(result[2].name).toBe("Maxie Windler")
        expect(result[3].phone).toBe("(073) 255-0190")
        done();
      });
  })

  it('should perform asynchronous calls simultaneously', (done) => {
    // write an async function which will request data of 4 users SIMULTANEOUSLY (all at the same time)
    // and return list of these 4 users to make `expect` calls pass
    // the data expectations are the same as in previous exercise

    async function fetchUsers(): UserListPromise {
      // async function body
    }

    fetchUsers()
      .then(result => {
        expect(result[0].name).toBe("Ms. Melisa Dooley")
        expect(result[1].address.city).toBe("West East Adelinefurt")
        expect(result[2].name).toBe("Maxie Windler")
        expect(result[3].phone).toBe("(073) 255-0190")
        done();
      });
  })

  // define SalaryPromise datatype here

  it('should perform a simple business domain scenario', (done) => {
    // write an async function which will calculate and return total salaries of users filtered by nationality

    async function getTotalNationalSalary(nationality: Nationality): SalaryPromise {
      // async function body
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
      done();
    });
  })

  // define CountrySalaries datatype here
  // define CountrySalariesPromise datatype here

  it('should perform a complex business domain scenario', (done) => {
    // similarly to the previous exercise write an async function which will
    // calculate and return total salaries of users of all nationalities
    // available in the system
    // the response should be a map: { UK: amount, US: amount, ...}

    async function getTotalSalariesByNationality(): CountrySalariesPromise {
      // async function body
    }

    getTotalSalariesByNationality()
      .then((salaries: CountrySalaries) => {
        let { US, UK, DE, FR } = salaries
        expect(UK).toBe(163734)
        expect(US).toBe(147318)
        expect(FR).toBe(135974)
        expect(DE).toBe(229152)
        done();
      });
  })
})
