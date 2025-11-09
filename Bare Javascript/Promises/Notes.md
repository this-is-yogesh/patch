Facts : 
Promises was introduced in js in 2015 and Async/Await in 2017
1️⃣ 
---***-----
Javascript is a single threaded language, we cannot do any asynchronous in task without the help of browser
1. What “Single-threaded” Means
JavaScript itself (the language + runtime) runs on a single thread, meaning:
It can execute only one piece of code at a time.
There’s one call stack — no parallel execution inside the JS engine.

2. But... How Do We Have Async Stuff Like setTimeout, fetch, Promise, etc.?

Because JavaScript (the language) is single-threaded,
but it runs inside an environment — like a browser or Node.js —
and that environment provides the asynchronous capabilities.


3. console.log("Start");

setTimeout(() => {
  console.log("Timeout done");
}, 2000);

console.log("End");

| Step | Who Handles It     | Explanation                                                       |
| ---- | ------------------ | ----------------------------------------------------------------- |
| 1    | JS engine          | Runs `console.log("Start")`                                       |
| 2    | JS engine          | Calls `setTimeout()` — but doesn’t    wait                        

| 3    | Browser (Web APIs) | Browser/Nodejs starts the timer (outside JS thread)                     

| 4    | JS engine          | Runs `console.log("End")` immediately          
                   
| 5    | Browser            | After 2s, timer finishes → callback is sent to the **task queue** 

| 6    | Event loop         | Pushes callback into **call stack** when JS is idle               

| 7    | JS engine          | Executes callback → `console.log("Timeout done")`                 


4. Event Loop = The Coordinator

The event loop continuously checks:

“Is the JS call stack empty?”

“Any tasks waiting in the callback queue or microtask queue?”

If yes → moves them into the JS engine to run.

That’s how asynchronous tasks appear “concurrent” even though JS runs on one thread.
---***-----


2️⃣. disadvantage of setTimeout 
---***-----

There is no gurantee that if we add a timer to timeout, it will execute exactly after that , because if we put say 2s timer and add sync task like huge looops which are taking 5s, then setTimeout will run only after 5s
---***-----


3️⃣ diff b/w higher order function and callback
---***-----

function parking(){}

function carParking(){}

parking(carParking)

parking is HOF as it is taking another function as arg
carParking is callback as it is being passed as an arg to another fun
---***-----

4️⃣.
---***-----
There are two phases to promises, 
creation phase and consumption phase

creation phase:
let p1 = new Promise(callbackFunction)
function callbackFunction(resolve,reject){
  resolve("resolved message")
}

consumption phase:
p1.then(function(data){console.log(data)})


the biggest advantage of promise is inversion of control which simply means better control over completion of asyn task, we will exactly be able to know when the async task is completed and then do the operation after the async task 

Callbacks give control away.
There’s unpredictability in how the function we gave our callback to will handle it — it might call it late, call it multiple times, or NEVER CALL IT AT ALL.

Promises give control back.
We know exactly when our code will run after the async task completes and what to do with it — because the JavaScript engine guarantees that the .then() (or await) handler will run once, in order, and after the Promise settles.
That’s the “inversion of control” benefit.
---***-----

5️⃣.
---***-----

How is resolve and reject injected in promise

class myPromise {
  constructor(callBack) {
    callBack(this.#resolve, this.#reject);
  }
  #resolve() {} -> private methods
  #reject() {} -> private methods
  then() {}
  catch() {}
  finally() {}
}

function callBack(resolve, reject) {

}
let obj = new myPromise(callBack);
console.log(obj,'obj**')

---***-----
