
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

finally can only return reject not resovle to then or finally, then can have one more arg as catch function where it works as catch, if the error is caught there , it will not move down to original catch
what will be output
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
