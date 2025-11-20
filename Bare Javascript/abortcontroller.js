//how to cancel ongoing fetch request

//AbortController = Remote control to stop any ongoing asynchronous task (fetch, events, streams, timers).

const controller = new AbortController();

function apiMethod() {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    signal: controller.signal,
  })
    .then(res => res.json())
    .then(data => console.log(data.slice(0, 3)))
    .catch(err => console.log("Cancelled:", err.name));
}

function cancelApi() {
  controller.abort(); // 🔥 cancel the request
}
function callApi() {
  setTimeout(apiMethod, 2000);
  setTimeout(cancelApi,5000)
}

callApi();
