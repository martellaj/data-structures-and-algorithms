/**
 * @name findFirstNonrepeatedCharacter
 * @desc Finds the first nonrepeated character in a string.
 */
String.prototype.findFirstNonrepeatedCharacter = function () {
  var counts = {};
  
  for (var i = 0; i < this.length; i++) {
    if (counts[this[i]] === undefined) {
      counts[this[i]] = 1;
    } else {
      counts[this[i]]++;
    }
  }
  
  for (var i = 0; i < this.length; i++) {
    if (counts[this[i]] === 1) {
      return this[i];
    }
  }
  
  return null;
}

/**
 * @name removeChars
 * @desc Removes any characters found in the remove string from the object.
 */
String.prototype.removeChars = function (remove) {
  var charsToRemove = {};
  var charsRemoved = '';
  
  for (var i = 0; i < remove.length; i++) {
    charsToRemove[remove[i]] = true;
  }
  
  for (var i = 0; i < this.length; i++) {
    if (charsToRemove[this[i]] !== true) {
      charsRemoved += this[i];
    }
  }
  
  return charsRemoved;
}

/**
 * @name reverseWords
 * @desc Reverses the words in a sentence.
 */
String.prototype.reverseWords = function () {
  var words = this.split(' ');
  var wordsReversed = '';
  
  for (var i = words.length - 1; i >= 0; i--) {
    wordsReversed += words[i] + ' '; 
  }
  
  return wordsReversed.trim();
}

/**
 * @name reverseWords2
 * @desc Reverses the words in a sentence, without using split.
 */
String.prototype.reverseWords2 = function () {
  var wordsReversed = '';
  var curr = '';
  
  for (var i = 0; i < this.length; i++) {
    if (this[i] !== ' ') {
      curr += this[i];
    } else {
      wordsReversed = curr + ' ' + wordsReversed;
      curr = '';
    }
  }
  
  // Don't forget to grab the last word.
  wordsReversed = curr + ' ' + wordsReversed;
  
  return wordsReversed.trim();
}

/**
 * @name convertToInt
 * @desc Converts the string to a number.
 */
String.prototype.convertToInt = function () {
  var isNegative = this[0] === '-' ? true : false;
  var largestBit = isNegative === true ? 1 : 0;
  var converted = 0;
  var place = 1;
  
  for (var i = this.length - 1; i >= largestBit; i--) {
    converted += this[i] * place;
    place *= 10;
  }
  
  return isNegative === true ? converted * -1 : converted;
}

/**
 * @name isPalindrome
 * @desc Checks if the string is a palindrome.
 */
String.prototype.isPalindrome = function () {
  var modified = this.toLowerCase().replace(/[^\w]/g, '');
  
  if (modified.length === 1) {
    return true;
  }
  
  for (var i = 0; i < Math.floor(modified.length / 2); i++) {
    if (modified[i] !== modified[modified.length - 1 - i]) {
      return false;
    }
  }
  
  return true;
}

/**
 * @name isAnagram
 * @desc Checks if comp is an anagram of the String.
 */
String.prototype.isAnagram = function (comp) {
  var a = {};

  // Build out table of letter counts.
  for (var i = 0; i < this.length; i++) {
    if (a[this[i]]) {
      a[this[i]]++;
    } else {
      a[this[i]] = 1;
    }
  }
  
  // Decrement a count when a letter is hit in the comparison string.
  for (var i = 0; i < comp.length; i++) {
    if (a[comp[i]]) {
      a[comp[i]]--;
    }
  }
  
  // Check keys in the table and see if all were used up.
  for (k in a) {
    if (a.hasOwnProperty(k)) {
      if (a[k] !== 0) {
        return false;
      }
    }
  }
  
  return true;
}

/**
 * @name hasUniqueCharacters
 * @desc Checks if String has any repeating characters.
 */
String.prototype.hasUniqueCharacters = function () {
  var characters = [];
  
  for (var i = 0; i < this.length; i++) {
    if (characters.indexOf(this[i]) > -1) {
      return false;
    } else {
      characters.push(this[i]);
    }
  }
  
  return true;
}

/**
 * @name isPermutation
 * @desc Checks if comp is a permutation of the string.
 */
String.prototype.isPermutation = function (comp) {
  if (this.length !== comp.length) {
    return false;
  }
  
  var bank = {};
  
  for (var i = 0; i < this.length; i++) {
    if (bank[this[i]]) {
      bank[this[i]]++;
    } else {
      bank[this[i]] = 1;
    }
  }
  
  for (var i = 0; i < comp.length; i++) {
    if (!bank[comp[i]] || bank[comp[i]] === 0) {
      return false;
    } else {
      bank[comp[i]]--;
    }
  }
  
  return true;
}

/**
 * @name compress
 * @desc Compresses a String that has repeated values.
 */
String.prototype.compress = function () {
  if (!this) {
    return null;
  } else if (this.length === 0 || this.length === 1 || this.length === 2) {
    return this.toString();
  }
  
  var lastChar = this[0];
  var charCount = 1;
  var compressed = '';
  
  for (var i = 1; i < this.length; i++) {
    if (this[i] === lastChar) {
      charCount++;
    } else {
      compressed += lastChar + charCount;
      lastChar = this[i];
      charCount = 1;
    }
  }
  
  compressed += lastChar + charCount;
  
  if (compressed.length < this.length ) {
    return compressed;
  } else {
    return this.toString();
  }
}

module.exports = null;