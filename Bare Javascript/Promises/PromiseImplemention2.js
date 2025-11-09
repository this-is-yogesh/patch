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
