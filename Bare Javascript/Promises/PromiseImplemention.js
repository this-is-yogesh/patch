const States = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
};
class myPromise {
  #promiseState = States.PENDING;
  #handlers = new Array();
  #value;
  constructor(callBack) {
    callBack(this.#resolve.bind(this), this.#reject.bind(this));
  }
  #resolve(value) {
    this.#promiseState = States.FULFILLED;
    this.#value = value;
    if (this.#handlers?.length)
      this.#handlers.forEach(thenCallbacks => thenCallbacks(value));
  }
  #reject(value) {}

  then(thenCallBack) {
    if (this.#promiseState === States.FULFILLED) {
      thenCallBack(this.#value);
    } else {
      this.#handlers.push(thenCallBack);
    }
  }
  catch() {}
  finally() {}
}

let obj = new myPromise(callBack);
obj.then(thenCallBack);

function callBack(resolve, reject) {
  setTimeout(() => {
    resolve("Custom Promise is resolved");
  }, 3000);
  //or
  resolve("Custom Promise is resolved 2");
}
function thenCallBack(data) {
  console.log("Thencallback data->", data);
}
