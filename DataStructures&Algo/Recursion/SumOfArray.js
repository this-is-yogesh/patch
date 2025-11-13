//sum of array

function sumOfArray(arr) {
  if (arr.length === 1) return arr[0];
  const sumOfSubArray = sumOfArray(arr.splice(1));
  return arr[0] + sumOfSubArray;
}

console.log(sumOfArray([1, 2, 3, 4, 5, 6, 7]));
/**
 *
 * sum of array is nothing but 1st number + sum of rest n-1 number
 */
