module.exports = {
  selection: selection,
  insertion: insertion,
  quick: quick,
  merge: mergeSort
};

/**
 * @name selection
 * @desc Selection sort traverses the data from start to end, swapping the current
 *       value with the lowest value in the array. Not very efficient (O(n^2)),
 *       but is in-place so good for memory.
 */
function selection (data) {
  selectionRecursive(data, 0);
}

function selectionRecursive (data, start) {
  if (start < data.length) {
    // Swap value at start with smallest value left in the array.
    swap(data, start);

    // Then move on to the next position.
    selectionRecursive(data, start + 1);
  } else {
    return;
  }
}

function swap (data, start) {
  var minPos = start;
  
  for (var i = start + 1; i < data.length; i++) {
    if (data[i] < data[minPos]) {
      minPos = i;
    }
  }
  
  var temp = data[start];
  data[start] = data[minPos];
  data[minPos] = temp;
}

/**
 * @name insertion
 * @desc Insertion sort essentially splits up the array to be sorted into 2 arrays,
 *       sorted and unsorted. It iterates through unsorted array, taking a value
 *       to compare to the sorted array and inserting into the correct position.
 *       It is in-place and stable, with a best-case running time of O(n), but 
 *       average and worst-case of O(n^2).
 */
function insertion (data) {
  // Iterate over entire array, compare each value to already-sorted elements
  // before it, and insert into correct position.
  for (var i = 0; i < data.length; i++) {
    // Get copy of current value, because we'll write over it if it needs to be inserted.
    var curr = data[i];
    var currEndPos = i;
    
    // Iterate over sorted part, and shift elements if curr is smaller than any elements.
    for (var j = i - 1; j >= 0; j--) {
      if (curr < data[j]) {
        data[j+1] = data[j];
        
        // Mark where curr should go.
        currEndPos = j;
      }
    }
    
    // Insert curr into its right position (before the number it's smaller than).
    data[currEndPos] = curr;
  }
}

/**
 * @name quick
 * @desc A function that implements quicksort.
 */
function quick (data) {
  if (data.length < 2) {
    return data;
  }
  
  var left = [];
  var right = [];
  
  var pivot = Math.floor(data.length / 2); 
  var pivotVal = data[pivot];
  
  // Divy up the data into 2 split arrays, smaller and larger than a random pivot.
  for (var i = 0; i < data.length; i++) {
    if (pivot === i) {
      continue;
    }
    
    if (data[i] < pivotVal) {
      left.push(data[i]);
    } else {
      right.push(data[i]);
    }
  }
  
  // Sort the subsets.
  left = quick(left);
  right = quick(right);
  
  // Don't forget to add pivot value back into the mix.
  left.push(pivotVal);
  
  // Combine the results and return.
  return left.concat(right);
}

/**
 * @name mergeSort
 * @desc Divide and conquer. Split data, sort, and merge.
 */
function mergeSort (data) {
  if (data.length < 2) {
    return data;
  }
  
  // Split the data.
  var left = data.slice(0, Math.floor(data.length / 2));
  var right = data.slice(Math.floor(data.length / 2), data.length);

  // Merge each half.
  left = mergeSort(left);
  right = mergeSort(right);

  // Merge sorted halves and return.
  return merge(left, right);
}

function merge (left, right) {
  var merged = [];
  var lIndex = 0;
  var rIndex = 0;
  var mIndex = 0;
  
  while (lIndex < left.length && rIndex < right.length) {
    if (left[lIndex] < right[rIndex]) {
      merged[mIndex++] = left[lIndex++];
    } else {
      merged[mIndex++] = right[rIndex++];
    }
  }
  
  while (lIndex < left.length) {
    merged[mIndex++] = left[lIndex++];
  }
  
  while (rIndex < right.length) {
    merged[mIndex++] = right[rIndex++];
  }
  
  return merged;
}