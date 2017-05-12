describe('Heterogeneous Collections Iterators', () => {

  it('iterates over heterogeneous data structures and returns one item per step', () => {
    type HeterogeneousIterator = IterableIterator<any>;

    function *iterateCollections(users: User[], accounts: SXAccount[]): HeterogeneousIterator {
      for (let u of users){
        yield u;
      }
      for (let a of accounts){
        yield a;
      }
    }

    let iterator: HeterogeneousIterator;
    iterator = iterateCollections(db.getUsers(), dbSX.getAccounts());
    let dumped = [...iterator];
    expect(dumped.length).toEqual(130);
    expect(dumped[0].id).toEqual(7213);
    expect(dumped[0].name).toEqual("Earlene Hirthe");
    expect(dumped[110].id).toEqual(9261);
    expect(dumped[110].nationality).toEqual("UK");
    expect(dumped[120].id).toEqual("a2d7afdc-9e1f-453f-81bd-75da7d83ddaa");
    expect(dumped[120].firstName).toEqual("Alysha");
    expect(dumped[120].country).toEqual("United Kingdom");
    expect(dumped[120].phones.length).toEqual(0);
    expect(dumped[125].id).toEqual("c021adaa-713f-486e-a601-93c2c8cf00c7");
    expect(dumped[125].firstName).toEqual("Nelson");
    expect(dumped[125].country).toEqual("United States");
    expect(dumped[125].phones[0]).toEqual("(893) 775-6690 x4491");
  })

  it('iterates over heterogeneous data structures and returns one item per step', () => {
    interface UnifiedUser {
      id: string | number;
      fullName: string;
      contactPhone: string;
      countryCode: Nationality;
      salary: number;
    }

    function mapUserToUnified(user: User): UnifiedUser {
      return {
        id: user.id,
        fullName: user.name,
        contactPhone: user.phone,
        countryCode: user.nationality,
        salary: user.salary
      };
    }

    function mapCountryToNationality(country: string): Nationality {
      switch(country){
        case "United States": return "US";
        case "United Kingdom": return "UK";
        case "France": return "FR";
        case "Germany": return "DE";
      }
    }

    function mapSXAccountToUnified(account: SXAccount): UnifiedUser {
      return {
        id: account.id,
        fullName: `${account.firstName} ${account.lastName}`,
        contactPhone: account.phones.length ? account.phones[0] : null,
        countryCode: mapCountryToNationality(account.country),
        salary: account.salary
      };
    }

    type UnifiedIterator = IterableIterator<UnifiedUser>;

    function *iterateAndUnifyCollections(users: User[], accounts: SXAccount[]): UnifiedIterator {
      for (let u of users){
        yield mapUserToUnified(u);
      }
      for (let a of accounts){
        yield mapSXAccountToUnified(a);
      }
    }

    let iterator: UnifiedIterator;
    iterator = iterateAndUnifyCollections(db.getUsers(), dbSX.getAccounts());
    let dumped = [...iterator];
    expect(dumped.length).toEqual(130);
    expect(dumped[0].id).toEqual(7213);
    expect(dumped[0].fullName).toEqual("Earlene Hirthe");
    expect(dumped[110].id).toEqual(9261);
    expect(dumped[110].countryCode).toEqual("UK");
    expect(dumped[120].id).toEqual("a2d7afdc-9e1f-453f-81bd-75da7d83ddaa");
    expect(dumped[120].fullName).toEqual("Alysha Okuneva");
    expect(dumped[120].countryCode).toEqual("UK");
    expect(dumped[120].contactPhone).toEqual(null);
    expect(dumped[125].id).toEqual("c021adaa-713f-486e-a601-93c2c8cf00c7");
    expect(dumped[125].fullName).toEqual("Nelson Marquardt");
    expect(dumped[125].countryCode).toEqual("US");
    expect(dumped[125].contactPhone).toEqual("(893) 775-6690 x4491");
  })

})
