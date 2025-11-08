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


3.
console.log("Start");

setTimeout(() => {
  console.log("Timeout done");
}, 2000);

console.log("End");

| Step | Who Handles It     | Explanation                                                       |
| ---- | ------------------ | ----------------------------------------------------------------- |
| 1    | JS engine          | Runs `console.log("Start")`                                       |
| 2    | JS engine          | Calls `setTimeout()` — but doesn’t    wait                        

| 3    | Browser (Web APIs) | Browser starts the timer (outside JS thread)                     

| 4    | JS engine          | Runs `console.log("End")` immediately          
                   
| 5    | Browser            | After 2s, timer finishes → callback is sent to the **task queue** 

| 6    | Event loop         | Pushes callback into **call stack** when JS is idle               

| 7    | JS engine          | Executes callback → `console.log("Timeout done")`                 

---***-----