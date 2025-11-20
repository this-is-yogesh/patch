//how to set conditions on change of values in obj


//Proxy can watch every action done on an object.
const user = {
  age: 18
};

const proxy = new Proxy(user, {
  set(target, key, value) {
    if (key === "age" && value < 0) {
      console.log("Age cannot be negative!");
      return false;
    }
    target[key] = value;
          console.log("Age cannot be negative!");
    return true;
  }
});


//proxy.age = -5; // Age cannot be negative!
proxy.age = 25; // sets successfully
console.log(user) // { age: 25 }


//2.detects when someone reads or writes

const book = { title: "JS Guide" };

const proxy2 = new Proxy(book, {
  get(target, key) {
    console.log(`Someone accessed ${key}`);
    return target[key];
  },
  set(target, key, value) {
    console.log(`Someone changed ${key} to ${value}`);
    target[key] = value;
    return true;
  }
});

proxy2.title;          // Someone accessed title
proxy2.title = "New";  // Someone changed title to New