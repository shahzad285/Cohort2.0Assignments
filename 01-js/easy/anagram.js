/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  let isCharFound = false;
  for (let index = 0; index < str1.length; index++) {
    isCharFound = false
    for (let ind = 0; ind < str2.length; ind++) {
      if (str1[index].toLowerCase() == str2[ind].toLowerCase()) {
        isCharFound = true;
        if (ind == 0) {
          if (str2.length == 1) {
            str2 = "";
            break;
          }
          else {

            str2 = str2.substring(1);
            break;
          }

        }
        else {
          if (ind == str2.length - 1) {
            str2 = str2.substring(0, ind);
            break;
          }
          else {
            str2 = str2.substring(0, ind) + str2.substring(ind + 1);
            break;
          }
        }

      }
    }
    if (!isCharFound) {
      return false;
    }
  }
  if (str2.length != 0)
    return false;
  else
    return true;

}

//console.log(isAnagram('School MASTER', 'The ClassROOM'));
module.exports = isAnagram;
