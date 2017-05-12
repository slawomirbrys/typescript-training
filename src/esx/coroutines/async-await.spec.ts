describe('async functions', () => {

  type UserListPromise = Promise<User[]>;

  it('should perform asynchronous calls sequentially', (done) => {
    async function fetchUsers(): UserListPromise {
      let u0 = await API.getUser(4074);
      let u1 = await API.getUser(8066);
      let u2 = await API.getUser(2029);
      let u3 = await API.getUser(6054);
      return [u0, u1, u2, u3];
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
    async function fetchUsers(): UserListPromise {
      let p0 = API.getUser(4074);
      let p1 = API.getUser(8066);
      let p2 = API.getUser(2029);
      let p3 = API.getUser(6054);
      return Promise.all([p0, p1, p2, p3]);
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

  type SalaryPromise = Promise<number>

  it('should perform a simple business domain scenario', (done) => {
    async function getTotalNationalSalary(nationality: Nationality): SalaryPromise {
      let users = await API.getUsersByNationality(nationality)
      return users
        .reduce((acc, user) => acc += user.salary, 0)
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

  interface CountrySalaries {
    [country: string]: number;
  }
  type CountrySalariesPromise = Promise<CountrySalaries>

  it('should perform a complex business domain scenario', (done) => {
    async function getTotalSalariesByNationality(): CountrySalariesPromise {
      let nationalities = await API.getNationalities()
      let promises = nationalities.map(nationality => API.getUsersByNationality(nationality))
      let usersByNation = await Promise.all(promises)
      let result: CountrySalaries = {}
      nationalities.forEach((nation, idx) => {
        result[nation] = usersByNation[idx]
          .reduce((acc, user) => acc += user.salary, 0)
      })
      return result;
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
