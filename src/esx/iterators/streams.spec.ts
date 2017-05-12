describe('Stream Iterators', () => {

  type StreamIterator = IterableIterator<string>;

  const dataStream = [
    "0r:8cSumDFY:LOP:Y5p:TFKq",
    "Bio5:uSe:8q:37zgyjBd:Ljz",
    "88:Mo9n:AEYz5Zn:ujF2rNc",
    "K:MOE:OawCm:NEhVFH:JLiG9",
    "pe5:Hy4n:rUqJC:hCfT6upV",
    "O:7f2gk4:Zoe:usr:e0Cmj:EP"
  ]

  it('iterates over data streams and returns a chunk each step', () => {
    function *iterateStream(src: string[]): StreamIterator {
      for (let sequence of src){
        for (let chunk of sequence.split(':')){
          yield chunk;
        }
      }
    }

    let iterator: StreamIterator;
    iterator = iterateStream(dataStream);
    expect([...iterator]).toEqual(["0r", "8cSumDFY", "LOP", "Y5p", "TFKq", "Bio5", "uSe", "8q", "37zgyjBd", "Ljz", "88", "Mo9n", "AEYz5Zn", "ujF2rNc", "K", "MOE", "OawCm", "NEhVFH", "JLiG9", "pe5", "Hy4n", "rUqJC", "hCfT6upV", "O", "7f2gk4", "Zoe", "usr", "e0Cmj", "EP"]);

    iterator = iterateStream(dataStream);
    expect(iterator.next().value).toEqual("0r");
    expect(iterator.next().value).toEqual("8cSumDFY");
    expect(iterator.next().value).toEqual("LOP");
    expect(iterator.next().value).toEqual("Y5p");
  })

  it('iterates over data streams, aggregates chunks and returns joined 3 pieces each step', () => {
    function *iterateStreamAndBuffer(src: string[]): StreamIterator {
      let count = 0, buffer = '';
      for (let sequence of src){
        for (let chunk of sequence.split(':')){
          count++;
          buffer += chunk;
          if (count === 3) {
            yield buffer;
            buffer = '';
            count = 0;
          }
        }
      }
      if (count) {
        yield buffer;
      }
    }

    let iterator: StreamIterator;
    iterator = iterateStreamAndBuffer(dataStream);
    expect([...iterator]).toEqual(["0r8cSumDFYLOP", "Y5pTFKqBio5", "uSe8q37zgyjBd", "Ljz88Mo9n", "AEYz5ZnujF2rNcK", "MOEOawCmNEhVFH", "JLiG9pe5Hy4n", "rUqJChCfT6upVO", "7f2gk4Zoeusr", "e0CmjEP"]);

    iterator = iterateStreamAndBuffer(dataStream);
    expect(iterator.next().value).toEqual("0r8cSumDFYLOP");
    expect(iterator.next().value).toEqual("Y5pTFKqBio5");
    expect(iterator.next().value).toEqual("uSe8q37zgyjBd");
    expect(iterator.next().value).toEqual("Ljz88Mo9n");
  })

})
