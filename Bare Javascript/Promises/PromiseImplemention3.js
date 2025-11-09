// have 4 api calls run one after the other

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

let p1 = callApiFunction("p1", 100, true);
let p2 = callApiFunction("p2", 300);
let p3 = callApiFunction("p3", 1000);
let p4 = callApiFunction("p4", 6000, true);

// p1.then(console.log);
// p2.then(console.log);
// p3.then(console.log);
// p4.then(console.log);

/**
 *
 * this way, the calls will just start logging as soon as it finishes,
 * it is not in continous flow
 * To solve this problem we can use promise.all, it does what is, it takes an array of promises and only returns the data once it has finished executing all the promises, IT WILL GIVE US THE RESOLVED DATA IN SAME ORDER WE HAVE PROVIDED IN ARRAY
 */

/** the time taken for Promise.all to execute is the maximum time of all the promises we have provided */

const arrOfPromises = [p4, p3, p2, p1];
const allPromises = Promise.all(arrOfPromises);
allPromises
  .then(data => console.log(data))
  .catch(err => console.log("Promise.all error", err));

//same syntax as

let a = Promise.resolve(34);
a.then(console.log);

/**
 *
 * draw back of Promise.all is, if we reject any one of the promise we have provided then it will not give us any data at all so if any one of the api call fails,then no data will be shown at all
 *
 * This problem is solved by Promise.allSettled who returns the response from all the promises in from of obj = {status ,value/reason} irrespective if promise is rejected or resolved and because of that, we dont need catch block for allSettled as then block only returns the entire result
 */

const allPromisesSettled = Promise.allSettled(arrOfPromises);
allPromisesSettled.then(data => console.log(data));

/**Promise.race , again takes arr of promises but returns only that promise that is resolved/rejected first so response is not array of resolved/rejected data here */

const promiseAny = Promise.any(arrOfPromises);
promiseAny
  .then(data => console.log("resolvedFirstAny", data))
  .catch(err => console.log("rejectedFirstAny", err));

/**Promise.any , again takes arr of promises but returns only that promise that is resolved first , if all are rejected then returns error  */
