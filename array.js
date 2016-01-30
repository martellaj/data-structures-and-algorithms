module.exports = {
  pairsOf10: pairsOf10,
  isRotated: isRotated,
  fibonacci: fibonacci,
  fibonacciIterative: fibonacciIterative
};

/**
 * @name fibonacci
 * @desc Recursive implementation of Fibonacci.
 */
function fibonacci (index) {
  if (index === 0) {
    return 0;
  } else if (index === 1 || index === 2) {
    return 1;
  } else {
    return fibonacci(index - 1) + fibonacci(index - 2);
  }
}

/**
 * @name fibonacciIterative
 * @desc Iterative implementation of Fibonacci.
 */
function fibonacciIterative (index) {
  var fib = 0;
  var fibLast1 = 1;
  var fibLast2 = 1;
  
  for (var i = 0; i < index; i++) {
    if (i === 1 || i === 2) {
      fib = 1;
    } else {
      fib = fibLast1 + fibLast2;
      fibLast1 = fibLast2;
      fibLast2 = fib;
    }
  }
  
  return fib;
}

/**
 * @name mostFrequent
 * @desc Finds the most frequent object in an array.
 */
Array.prototype.mostFrequent = function () {
  var counts = {};
  var max = this[0];
  
  for (var i = 0; i < this.length; i++) {
    if (counts[this[i]] === undefined) {
      counts[this[i]] = 1;
    } else {
      counts[this[i]]++;
    }
    
    if (counts[this[i]] > counts[max]) {
      max = this[i];
    }
  }
  
  return max;
}

/**
 * @name pairsOf10
 * @desc Prints out pairs of integers in an array that equal 10.
 */
function pairsOf10 (array) {
  var present = {};
  
  for (var i = 0; i < array.length; i++) {
    if (present[array[i]] === undefined) {
      present[array[i]] = 1;
    } else {
      present[array[i]]++;
    }
  }
  
  for (var i = 0; i < array.length; i++) {
    var inverse = 10 - array[i];
    if (present[inverse] > 0) {
      if (array[i] === inverse) {
        if (present[inverse] > 1) {
          console.log(array[i] + ' + ' + inverse + ' = 10');  
        }
      } else {
        console.log(array[i] + ' + ' + inverse + ' = 10');        
      }
    }
  }
}

/**
 * @name isRotated
 * @desc Determines if the two given arrays are rotated versions of each other.
 */
function isRotated (arr1, arr2) {
  var s1 = arr1.join('');
  var s2 = arr2.join('');
  
  if (s1.length === s2.length && ((s2.concat(s2)).indexOf(s1) > -1)) {
    return true;
  } else {
    return false;
  }
}

/**
 * @name binarySearch
 * @desc Binary search for a sorted array.
 */
Array.prototype.binarySearch = function (val) {
  var start = 0;
  var end = this.length - 1;
  
  while (start <= end) {
    var mid = Math.floor((start + end) / 2);
    if (this[mid] === val) {
      return true;
    } else if (this[mid] > val) {
      end = mid - 1;
    } else if (this[mid] < val) {
      start = mid + 1;
    }
  }
  
  return false;
}

/**
 * @name rotatedBinarySearch
 * @desc Rotates the array and then performs binary search.
 */
Array.prototype.rotatedBinarySearch = function (val) {
  var min = {
    pos: null,
    val: null
  };
  
  var rotatedCorrectly = [];
  
  // Find the start of the list.
  for (var i = 0; i < this.length; i++) {
    if (min.pos === null || this[i] < min.val) {
      min.pos = i;
      min.val = this[i];
    }
  }
  
  // Fill values from the real start of the list to the rotated end.
  for (var i = min.pos; i < this.length; i++) {
    rotatedCorrectly.push(this[i]);
  }
  
  // Fill values from the rotated start to the real start.
  for (var i = 0; i < min.pos; i++) {
    rotatedCorrectly.push(this[i]);
  }

  // Return the value from the rotated array.
  return rotatedCorrectly.binarySearch(val);
}