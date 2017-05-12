describe('coroutines', () => {

  type UserListCoroutine = () => Promise<User[]>;

  it('should perform asynchronous calls sequentially', (done) => {
    function* fetchUsers(){
      let u0 = yield API.getUser(4074);
      let u1 = yield API.getUser(8066);
      let u2 = yield API.getUser(2029);
      let u3 = yield API.getUser(6054);
      return [u0, u1, u2, u3];
    }

    const fetchUsersCoroutine: UserListCoroutine = async(fetchUsers);
    fetchUsersCoroutine().then(result => {
      expect(result[0].name).toBe("Ms. Melisa Dooley")
      expect(result[1].address.city).toBe("West East Adelinefurt")
      expect(result[2].name).toBe("Maxie Windler")
      expect(result[3].phone).toBe("(073) 255-0190")
      done();
    });
  })

  it('should perform asynchronous calls simultaneously', (done) => {
    function* fetchUsers(){
      let p0 = API.getUser(4074);
      let p1 = API.getUser(8066);
      let p2 = API.getUser(2029);
      let p3 = API.getUser(6054);
      return Promise.all([p0, p1, p2, p3]);
    }

    const fetchUsersCoroutine: UserListCoroutine = async(fetchUsers);
    fetchUsersCoroutine().then(result => {
      expect(result[0].name).toBe("Ms. Melisa Dooley")
      expect(result[1].address.city).toBe("West East Adelinefurt")
      expect(result[2].name).toBe("Maxie Windler")
      expect(result[3].phone).toBe("(073) 255-0190")
      done();
    });
  })

  type NationalSalaryCoroutine = (nationality: Nationality) => Promise<number>;

  it('should perform a simple business domain scenario', (done) => {
    function* getTotalNationalSalary(nationality: Nationality){
      let users = yield API.getUsersByNationality(nationality)
      return users
        .reduce((acc, user) => acc += user.salary, 0)
    }

    const getNationalSalaryCoroutine: NationalSalaryCoroutine = async(getTotalNationalSalary);
    Promise.all([
      getNationalSalaryCoroutine("UK"),
      getNationalSalaryCoroutine("US"),
      getNationalSalaryCoroutine("FR"),
      getNationalSalaryCoroutine("DE")
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
  type CountrySalariesCoroutine = () => Promise<CountrySalaries>;

  it('should perform a complex business domain scenario', (done) => {
    function* getTotalSalariesByNationality(){
      let nationalities = yield API.getNationalities()
      let promises = nationalities.map(nationality => API.getUsersByNationality(nationality))
      let usersByNation = yield Promise.all(promises)
      let result = {}
      nationalities.forEach((nation, idx) => {
        result[nation] = usersByNation[idx]
          .reduce((acc, user) => acc += user.salary, 0)
      })
      return result;
    }

    const getTotalSalariesByNationalityCoroutine: CountrySalariesCoroutine = async(getTotalSalariesByNationality);
    getTotalSalariesByNationalityCoroutine().then(salaries => {
      let { US, UK, DE, FR } = salaries
      expect(UK).toBe(163734)
      expect(US).toBe(147318)
      expect(FR).toBe(135974)
      expect(DE).toBe(229152)
      done();
    });
  })
})
