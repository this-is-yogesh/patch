1.if a promise has .then chain but before that it has 2 set timeout in macro task queue, will the microtask queue execute first or .then chain promise

2.what does .then(2) and .then(Promise.resovle(4)) will do

3.  .then(()=>return Promise.resolve(4).then((val)=>return 7)), will .then return 

4.how does finally behave with values passed from .then and .catcha and what will happen if we return value from finally

5.if i have am doing a = this.b and calling a , will it still be attached to this or not

6.does this inside the arrow function which is inside another function can change its behaviour based on the way it is called like 
i: function() { return () => { return this.dev } }
obj.i()()

7.what is behavior of prefix inc and postfix inc like let a = ++b , let c = b++

8.what is 
a. '3' + 1
b. '3' - 1
c.'3' - ' 02 '
d.'3' * ' 02 ' 
e.Number(null)