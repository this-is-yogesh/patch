1️⃣
---***-----
async function always returns a promise 

internally 
async function getData(){return 1}
is
async function getData(){return Promise.resolve(1)}
---***-----

2️⃣. async / await is not synhronous

---***-----
what actually happens is, the function gets promisify which is using async await meaning all the code written after await is also promisfy and this promise runs in the microtask queue , so because the entire code runs together in micro task queue, it gives feeling of sync code exectuion so meaning the main thread is never blocked

---***-----