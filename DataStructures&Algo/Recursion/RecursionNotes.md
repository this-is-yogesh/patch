1️⃣. just assume that you will get the correct and in sum(n-1) , sum of 5 is 5 + sum of (5-1), thats it
---***----
function sumOfArray(arr) {
  if (arr.length === 1) return arr[0];
  const sumOfSubArray = sumOfArray(arr.splice(1));
  return arr[0] + sumOfSubArray;
}
---***----