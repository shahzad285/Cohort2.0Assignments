/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str=str.replace(/[^a-zA-Z0-9]/gi,'');
  let totalCount = str.length;
  let halfCount = 0;
  if(totalCount==0 || totalCount==1)
   return true;


  str = str.toLowerCase();
  if (str.length % 2 != 0)
    halfCount = (str.length - 1) / 2;
  else
    halfCount = (str.length) / 2;

  for (let i = 0; i < halfCount; i++) {
    if (str[i] != str[totalCount - i-1])
      return false;
  }
  return true;
}

module.exports = isPalindrome;
