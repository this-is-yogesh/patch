
6️⃣
---***-----

then block always returns a resolved promise
p1.then(
(data)=> return 2 // then internally it does 
return Promise.resolve(2)
if nothing returned then it just does Promise.resolve() which is basically
undefined
)
---***-----

7️⃣. The correct behaviour of then ,catch and finally

1.finally can only return reject not resovle to then or finally, 

2.then can have one more arg as catch function where it works as catch, if the error is caught there , it will not move down to original catch
what will be output

3.then which has catch, so it works like this -> if then is resolving then whatever we return from that then it will go down but if the catch (the arg catch) is catching then whatever we return from that catch, that will go down
---***-----
example : 
function callBack(resolve, reject) {
  resolve(1);
}
let obj = new Promise(callBack);

obj
  .then(data => {
    console.log("data1", data);
    return Promise.reject(3);
  })
  .then(
    data => {
      console.log("data2", data);
      return Promise.resolve(5);
    },
    e => {
      console.log("errorThen", e);
      return Promise.resolve(5);
    }
  )
  .catch(error => console.log("erro1", error))
  .finally(final => console.log("final1", final))
  .then(data => {
    console.log("lasthen", data);
    return 3
  })
  .finally(final => console.log("final2", final));
---***----
