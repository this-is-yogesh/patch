//how to add secret keys in obj 

//1.Symbol - secret keys of js
//a.You can add a property that will never clash with other keys and won’t show accidentally in loops.

const secretId = Symbol("name");

const user = {
  name: "Yogesh",
  [secretId]: 12345
};

console.log(user.name);       
console.log(user.secretId);   
console.log(user[secretId]);  



