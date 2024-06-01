const {sum_to_n_a, sum_to_n_b, sum_to_n_c} = require("./solution");

describe('sum_to_n', () => {
    const testCases = [
      { input: 5, expected: 15 },
      { input: 10, expected: 55 },
      { input: 100, expected: 5050 },
      { input: 1000, expected: 500500 },
    ];
  
    testCases.forEach(({ input, expected }) => {
      test(`sum_to_n_a(${input})`, () => {
        expect(sum_to_n_a(input)).toBe(expected);
      });
  
      test(`sum_to_n_b(${input})`, () => {
        expect(sum_to_n_b(input)).toBe(expected);
      });
  
      test(`sum_to_n_c(${input})`, () => {
        expect(sum_to_n_c(input)).toBe(expected);
      });
    });
  
    const invalidInputs = ['abc', 1.5];
  
    invalidInputs.forEach((input) => {
      test(`sum_to_n_a(${input}) throws an error`, () => {
        expect(() => sum_to_n_a(input)).toThrow('Input must be an integer');
      });
  
      test(`sum_to_n_b(${input}) throws an error`, () => {
        expect(() => sum_to_n_b(input)).toThrow('Input must be an integer');
      });
  
      test(`sum_to_n_c(${input}) throws an error`, () => {
        expect(() => sum_to_n_c(input)).toThrow('Input must be an integer');
      });
    });


  });