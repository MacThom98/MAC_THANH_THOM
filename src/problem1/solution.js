// Problem 1: Three ways to sum to n

// Provide 3 unique implementations of the following function in JavaScript.
// **Input**: `n` - any integer
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// Resolution methods
// I separate the validation functions into isInteger(n) and isValidSum(sum) to check the validity of the input and the sum.
// The isInteger(n) function uses Number.isInteger(n) to check if the input n is an integer.
// The isValidResult(value) function checks if the sum sum exceeds Number.MAX_SAFE_INTEGER.
// In each implementation (sum_to_n_a, sum_to_n_b, sum_to_n_c), I call the isInteger(n) function to validate the input and return an error if the input is not an integer.
// During the calculation process, I call the isValidSum(sum) function to check if the sum exceeds Number.MAX_SAFE_INTEGER and return an error if the sum is invalid.

const SAFE_RESULT = Number.MAX_SAFE_INTEGER;

// Function to check if the input is an integer
function isInteger(n){
    return Number.isInteger(n);
}

// Function to check if the sum exceeds Number.MAX_SAFE_INTEGER
function isValidResult(value) {
    return value < SAFE_RESULT;
  }
// Solution 1 - Using a for loop
var sum_to_n_a = function(n) {
    if (!isInteger(n)) {
        throw new Error("Input must be an integer");
      }
      
      let sum = 0;
      
      for (let i = 1; i <= n; i++) {
        const newSum = sum + i;
        
        if (!isValidResult(newSum)) {
          throw new Error("Result exceeds Number.MAX_SAFE_INTEGER");
        }
        
        sum = newSum;
      }
      
      return sum;
};

// Solution 2 - Using mathematical formula
var sum_to_n_b = function(n) {
    if (!isInteger(n)) {
        throw new Error("Input must be an integer");
      }
      
      const sum = (n * (n + 1)) / 2;
      
      if (!isValidResult(sum)) {
        throw new Error("Result exceeds Number.MAX_SAFE_INTEGER");
      }
      
      return sum;
};


// Solution 3 - Using recursion
var sum_to_n_c = function(n) {
    if (!isInteger(n)) {
        throw new Error("Input must be an integer");
      }
      
      if (n === 1) {
        return 1;
      }
      
      const subSum = sum_to_n_c(n - 1);
      const sum = n + subSum;
      
      if (!isValidResult(sum)) {
        throw new Error("Result exceeds Number.MAX_SAFE_INTEGER");
      }
      
      return sum;
};

module.exports = {sum_to_n_a, sum_to_n_b, sum_to_n_c}