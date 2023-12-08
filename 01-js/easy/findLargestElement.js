/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let ln = numbers[0];
    for (let index = 1; index < numbers.length; index++) {
        if (ln < numbers[index])
            ln = numbers[index];
    }
    return ln;
}

module.exports = findLargestElement;