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
const allPromises = Promise.all(arrOfPromises);
allPromises
  .then(data => console.log(data, "realData"))
  .catch(err => console.log("Promise.all error", err));

class myPromise {
  all(arrayOfPromies) {
    return new Promise((resolve, reject) => {
      const ansArray = new Array(arrayOfPromies.length);
      let count = 0;
      for (let i = 0; i < arrayOfPromies.length; i++) {
        arrayOfPromies[i].then(data => {
          ansArray[i] = data; //preserves the order
          count++;
          if (count === arrayOfPromies.length) {
            resolve(ansArray);
          }
        });
      }
    });
  }
}

let promise = new myPromise();
promise
  .all(arrOfPromises)
  .then(data => console.log(data, "polyfillData"))
  .catch(err => console.log("Promise.all error", err));
