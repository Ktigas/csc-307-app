// module.test.js
import mut from './module.js'; // MUT = Module Under Test

// Test cases for sum function
test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing sum with negative numbers', () => {
  expect(mut.sum(-5, 10)).toBe(5);
  expect(mut.sum(-5, -3)).toBe(-8);
});

// Test cases for div function
test('Testing div -- basic division', () => {
  expect(mut.div(10, 2)).toBe(5);
  expect(mut.div(9, 3)).toBe(3);
});

test('Testing div -- decimal results', () => {
  expect(mut.div(5, 2)).toBe(2.5);
  expect(mut.div(1, 3)).toBeCloseTo(0.333, 3);
});

test('Testing div -- division by zero', () => {
  expect(mut.div(10, 0)).toBe(Infinity);
  expect(mut.div(-5, 0)).toBe(-Infinity);
  expect(mut.div(0, 0)).toBe(NaN);
});

test('Testing div -- negative numbers', () => {
  expect(mut.div(-10, 2)).toBe(-5);
  expect(mut.div(10, -2)).toBe(-5);
  expect(mut.div(-10, -2)).toBe(5);
});

// Test cases for containsNumbers function
test('Testing containsNumbers -- with numbers', () => {
  expect(mut.containsNumbers("hello123")).toBe(true);
  expect(mut.containsNumbers("123")).toBe(true);
  expect(mut.containsNumbers("abc1def")).toBe(true);
});

test('Testing containsNumbers -- without numbers', () => {
  expect(mut.containsNumbers("hello")).toBe(false);
  expect(mut.containsNumbers("ABCdef")).toBe(false);
  expect(mut.containsNumbers("!@#$%")).toBe(false);
});

test('Testing containsNumbers -- edge cases', () => {
  expect(mut.containsNumbers("")).toBe(false);
  expect(mut.containsNumbers(" ")).toBe(false); // This will FAIL due to the bug!
  expect(mut.containsNumbers("0")).toBe(true);
});

test('Testing containsNumbers -- mixed characters', () => {
  expect(mut.containsNumbers("price: $100")).toBe(true);
  expect(mut.containsNumbers("version 2.0")).toBe(true);
  expect(mut.containsNumbers("no-digits-here")).toBe(false);
});