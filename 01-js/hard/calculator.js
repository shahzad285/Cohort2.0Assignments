/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {

  constructor(result = 0) {
    this.result = result;
  }

  add(num) {
    this.result = this.result + num;
  }
  subtract(num) {
    this.result = this.result - num;
  }
  divide(num) {
    if (num == 0) {
      throw new Error("Something went wrong");
    }
    this.result = this.result / num;
  }
  multiply(num) {
    this.result = this.result * num;
  }
  clear(num) {
    this.result = 0;
  }
  getResult() {
    return this.result;
  }
  calculate(str) {
    str = str.replace(/\s/g, '');
    let countBracketInitializations = 0;
    for (let index = 0; index < str.length; index++) {
      if (str[index] == '(')
        countBracketInitializations++;
    }
    let startIndex = 0;
    let endIndex = 0;
    for (let index = 0; index < countBracketInitializations; index++) {
      for (let j = 0; j < str.length; j++) {
        if (str[j] == '(') {
          startIndex = j;
        }
        if (str[j] == ')') {
          endIndex = j;
        }
        if (endIndex > 0) {
          let subStr = this.solveString(str.substring(startIndex + 1, endIndex));
          let preBracketStr = startIndex > 0 ? str.substring(0, startIndex) : '';
          let postBracketStr = endIndex < str.length - 1 ? str.substring(endIndex + 1) : '';
          str = preBracketStr + subStr + postBracketStr;
          startIndex = 0;
          endIndex = 0;
          break;
        }
      }
    }
    let fr = this.solveString(str);
    this.result = +fr;
  }


  solveString(subStr) {

    while (subStr.indexOf('/') > 0) {
      let i = subStr.indexOf('/');
      let bi = this.findLargestIndexLessThanSpecifiedIndex(subStr, i);
      let ai = this.findsmallesIndexGreaterThanSpecifiedIndex(subStr, i);
      let bsubStr = (bi > 0 ? subStr.substring(0, bi + 1) : '')
      let asubStr = (ai > 0 ? subStr.substring(ai) : '');
      let preNum = +subStr.substring(bi > 0 ? bi + 1 : 0, i);
      let postNum = ai > 0 ? +subStr.substring(i + 1, ai) : +subStr.substring(i + 1);
      if (isNaN(preNum) || isNaN(postNum))
        throw new Error('Not a number');
      if (postNum == 0)
        throw new Error('Divide by zero');
      let csubStr = preNum / postNum;
      subStr = bsubStr + csubStr + asubStr;
    }
    while (subStr.indexOf('*') > 0) {
      let i = subStr.indexOf('*');
      let bi = this.findLargestIndexLessThanSpecifiedIndex(subStr, i);
      let ai = this.findsmallesIndexGreaterThanSpecifiedIndex(subStr, i);
      let bsubStr = (bi > 0 ? subStr.substring(0, bi + 1) : '')
      let asubStr = (ai > 0 ? subStr.substring(ai) : '');
      let preNum = +subStr.substring(bi > 0 ? bi + 1 : 0, i);
      let postNum = ai > 0 ? +subStr.substring(i + 1, ai) : +subStr.substring(i + 1);
      if (isNaN(preNum) || isNaN(postNum))
        throw new Error('Not a number');
      let csubStr = preNum * postNum;
      subStr = bsubStr + csubStr + asubStr;
    }
    while (subStr.indexOf('+') > 0) {
      let i = subStr.indexOf('+');
      let bi = this.findLargestIndexLessThanSpecifiedIndex(subStr, i);
      let ai = this.findsmallesIndexGreaterThanSpecifiedIndex(subStr, i);
      let bsubStr = (bi > 0 ? subStr.substring(0, bi + 1) : '')
      let asubStr = (ai > 0 ? subStr.substring(ai) : '');
      let preNum = +subStr.substring(bi > 0 ? bi + 1 : 0, i);
      let postNum = ai > 0 ? +subStr.substring(i + 1, ai) : +subStr.substring(i + 1);
      if (isNaN(preNum) || isNaN(postNum))
        throw new Error('Not a number');
      let csubStr = preNum + postNum;
      subStr = bsubStr + csubStr + asubStr;
    }
    while (subStr.indexOf('-') > 0) {
      let i = subStr.indexOf('-');
      let bi = this.findLargestIndexLessThanSpecifiedIndex(subStr, i);
      let ai = this.findsmallesIndexGreaterThanSpecifiedIndex(subStr, i);
      let bsubStr = (bi > 0 ? subStr.substring(0, bi + 1) : '')
      let asubStr = (ai > 0 ? subStr.substring(ai) : '');
      let preNum = +subStr.substring(bi > 0 ? bi + 1 : 0, i);
      let postNum = ai > 0 ? +subStr.substring(i + 1, ai) : +subStr.substring(i + 1);
      if (isNaN(preNum) || isNaN(postNum))
        throw new Error('Not a number');
      let csubStr = preNum - postNum;
      subStr = bsubStr + csubStr + asubStr;
    }
    return subStr;

  }

  findLargestIndexLessThanSpecifiedIndex(str, specifiedInd) {
    let resInd = -1;
    for (let i = 0; i < specifiedInd; i++) {
      if (str[i] == '*' || str[i] == '+' || str[i] == '-') {
        resInd = i;
      }
    }
    return resInd;
  }

  findsmallesIndexGreaterThanSpecifiedIndex(str, specifiedInd) {
    let resInd = -1;
    for (let i = specifiedInd + 1; i < str.length; i++) {
      if (str[i] == '*' || str[i] == '+' || str[i] == '-' || str[i] == '/') {
        resInd = i;
        break;
      }
    }
    return resInd;
  }

}




// let calc = new Calculator();
// calc.calculate('(2 + 3) * (6 - (4 + 1) / 2) + 7');
// console.log(calc.getResult());
module.exports = Calculator;
