/**
 * All of the solutions in this file come from http://careercup.com.
 * 
 * As part as the function documentation, an @id will be included that can be used
 * to find the page of the question (http://careercup.com/question?id=@id).
 */
module.exports = {
  getMinInclusiveRange: getMinInclusiveRange
};

/**
 * Given k lists of integers, this function will find the minimum range between
 * them that includes an integer from each list.
 * 
 * @id 16759644
 * @public
 * @name getMinInclusiveRange
 * @param {Array} lists An array of integer lists
 * @return {None} Prints out range instead of returning it
 */
function getMinInclusiveRange (lists) {
  var pointers = [];
  var minRange = null;
  var start;
  var end;
  var startList;
  
  // Initialize list of pointers.
  for (var i = 0; i < lists.length; i++) {
    pointers[i] = 0;
  }
  
  // Continue to iterate over lists until the list with the start of the range
  // element runs out of elements.
  while (!startList || pointers[startList] !== lists[startList].length - 1) {
    var max = getMaxPointer(lists, pointers);
    var min = getMinPointer(lists, pointers);
    var range = max - min.val;
    
    // Check if the current minimum range is smaller than the overall minimum
    // range. Also check if equal, so the mininum number changes.
    if (minRange === null || range <= minRange) {
      minRange = range;
      start = min.val;
      end = max;
      startList = min.list;
    }
    
    // Increment pointer with that has the next smallest element.
    var nextMin = lists[0][pointers[0] + 1];
    var nextMinIndex = 0;
    
    // Find the list with the next smallest element.
    for (var i = 0; i < lists.length; i++) {
      if (lists[i][pointers[i] + 1] < nextMin) {
        nextMin = lists[i][pointers[i] + 1];
        nextMinIndex = i;
      }
    }
    
    // Increment the pointer if the list still has elements.
    if (pointers[nextMinIndex] < lists[nextMinIndex].length) {
      pointers[nextMinIndex]++;      
    }
  }
  
  // Print out the range.
  console.log(start, end);
}

/**
 * Determines the minimum value from a list of lists and their respective pointers.
 * 
 * @private
 * @name getMinPointer
 * @param {Array} lists An array of integer lists
 * @param {Array} pointers An array of indices for lists
 * @return {Object} An object with two properties, value and list
 */
function getMinPointer (lists, pointers) {
  var min = {
    val: lists[0][pointers[0]],
    list: 0 
  };
  
  for (var i = 1; i < lists.length; i++) {
    if (lists[i][pointers[i]] < min.val) {
      min.val = lists[i][pointers[i]];
      min.list = i;
    }
  }
  
  return min;
}

/**
 * Determines the maximum value from a list of lists and their respective pointers.
 * 
 * @private
 * @name getMaxPointer
 * @param {Array} lists An array of integer lists
 * @param {Array} pointers An array of indices for lists
 * @return {Number} The maximum value amongst current pointers.
 */
function getMaxPointer (lists, pointers) {
  var max = lists[0][pointers[0]];
  
  for (var i = 1; i < lists.length; i++) {
    if (lists[i][pointers[i]] > max) {
      max = lists[i][pointers[i]];
    }
  }
  
  return max;
}