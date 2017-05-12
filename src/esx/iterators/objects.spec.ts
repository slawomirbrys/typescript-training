describe('Object Iterators', () => {

  const sourceObject1 = {
    '-kdjio3amxzo': 9376502,
    '-kjd84jsukdf': 8364584,
    '-klaurn720gh': 9803441,
    '-k29fjsnc820': 2641924
  }

  const sourceObject2 = {
    'evqja': "Louisa_Heller@yahoo.com",
    'wsdjqbi': "Petra74@yahoo.com",
    'l6wwqneabsn': "Raphael.Bradtke@yahoo.com",
    'kggmvp': "Arden.McDermott82@hotmail.com",
    "42pqcmfndi": "Ruby85@yahoo.com"
  }

  it('iterates over objects and returns a single value each step', () => {
    function *iterateObject<T>(src: { [key: string]: T }): IterableIterator<T> {
      for (let key in src){
        if (src.hasOwnProperty(key)){
          yield src[key];
        }
      }
    }

    let numberIterator: IterableIterator<number>;
    numberIterator = iterateObject(sourceObject1);
    expect([...numberIterator]).toEqual([9376502, 8364584, 9803441, 2641924]);

    numberIterator = iterateObject(sourceObject1);
    expect(numberIterator.next().value).toEqual(9376502);
    expect(numberIterator.next().value).toEqual(8364584);

    let stringIterator: IterableIterator<string>;
    stringIterator = iterateObject(sourceObject2);
    expect([...stringIterator]).toEqual(["Louisa_Heller@yahoo.com", "Petra74@yahoo.com", "Raphael.Bradtke@yahoo.com", "Arden.McDermott82@hotmail.com", "Ruby85@yahoo.com"]);

    stringIterator = iterateObject(sourceObject2);
    expect(stringIterator.next().value).toEqual("Louisa_Heller@yahoo.com");
    expect(stringIterator.next().value).toEqual("Petra74@yahoo.com");
  })

})
