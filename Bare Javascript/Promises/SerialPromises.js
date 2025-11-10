function callApiFunction(data, time, rejectPromise) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (rejectPromise) {
        rej(data);
      }
      res(data);
    }, time);
  });
}

let p1 = callApiFunction("p1", 1000);
let p2 = callApiFunction("p2", 100);
let p3 = callApiFunction("p3", 200);
let p4 = callApiFunction("p4", 2000);

const arrOfPromises = [p1, p3, p2, p4];

//promise.all runs all the promise together but what if we want to run the promise one by one in serial order

let answer = arrOfPromises
  .reduce((acc, curr) => {
    return acc.then(results => {
      return curr.then(result => {
        return [...results, result];
      });
    });
  }, Promise.resolve([]))
  .then(data => console.log(data, "data**"));



