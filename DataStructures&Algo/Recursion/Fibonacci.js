//fibonacci number
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);;
}

console.log(fibonacci(16));
/**
 * fib of 0 is 0
 * fib of 1 is 1
 * fib of 2 is fib of 0 + fib of 1 = 1
 * fib of 3 is fib of 2 + fib of 1 = 1 + 1 = 2
 * fib of 4 is fib of 3 + fib of 2 = 2 + 1 = 3
 * fib of 5 is fib of 4 + fib of 3 = 3 + 2 = 5
 * hence fib of n is fib of n -1 + fib of n -2
 * 0,1,1,2,3,5,8,13,21
 * 0,1,2,3,4,5,6,7
 *
 *
 */
