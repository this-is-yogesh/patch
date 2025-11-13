//factorial of a number

function findFactorial(n) {
  if (n === 1) {
    return 1;
  }
  const subFactorial = findFactorial(n - 1);
  return n * subFactorial;
}

console.log(findFactorial(8));
