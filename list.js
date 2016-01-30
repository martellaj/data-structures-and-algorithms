function ListNode (data) {
  this.next = null;
  this.data = data;
}

function List () {
  this.head = null;
  this.tail = null;
}

/**
 * @name insert
 * @desc Inserts a new node at the end of the list.
 */
List.prototype.insert = function (data) {
  if (!this.head) {
    this.head = new ListNode(data);
    this.tail = this.head;
  } else {
    this.tail.next = new ListNode(data); 
    this.tail = this.tail.next;
  }
}

/**
 * @name fill
 * @desc Inserts a number of nodes into the list.
 */
List.prototype.fill = function (numberOfNodes) {
  for (var i = 0; i < numberOfNodes; i++) {
    this.insert(i);
  }
}

/**
 * @name removeDuplicates
 * @desc Removes duplicates from list, while maintaining pointers to head and tail.
 */
List.prototype.removeDuplicates = function () {
  var prev = this.head;
  var curr = prev.next;
  
  var bank = {};
  bank[prev.data] = true;
  
  while (curr) {
    if (bank[curr.data] === true) {
      prev.next = curr.next;
      
      if (curr.next === this.tail) {
        this.tail = prev;
      }
    } else {
      bank[curr.data] = true;
      prev = curr;      
    }
    
    curr = curr.next;
  }
}

/**
 * @name print
 * @desc Prints the contents of the list.
 */
List.prototype.print = function () {
  var curr = this.head;
  
  console.log('List head: ', this.head.data);
  console.log('List tail: ', this.tail.data, '\n');  
  
  console.log('List contents: ');
  while (curr) {
    console.log(curr.data);
    curr = curr.next;
  }
  console.log();
}

/**
 * @name insertAfter
 * @desc Inserts a new element with value of data after an element with data of 
 *       target, while maintaining head and tail.
 * 
 * @disclaimer This function worked with a previous implementation of List,
 *             it might need to be revamped.
 */
List.prototype.insertAfter = function (target, data) {
  if (target === null) {
    var newHead = new ListNode(data);
    newHead.next = this.head;
    this.head = newHead;
    
    return true;
  } else {
    var curr = this.head;
    var prev = null;
    
    while (curr) {
      if (curr.data === target) {
        var newElement = new ListNode(data);
        newElement.next = curr.next;
        curr.next = newElement;
        
        if (newElement.next === null) {
          this.tail = newElement;
        }  
        
        return true;      
      } else {
        prev = curr;
        curr = curr.next;
      }
    }
  }
  
  return false;
}

/**
 * @name delete
 * @desc Deletes the first element with the value of data, while maintaining
 *       the pointers to head and tail.
 */
List.prototype.delete = function (data) {
  var curr = this.head;
  var prev = null;
  
  // Iterate over list until it reaches the end.
  while (curr) {
    // Check the head.
    if (prev === null) {
      // If head is the element to delete, change the head pointer and return true.
      if (curr.data === data) {
        this.head = this.head.next;
        return true;   
      } else {
        prev = curr;
        curr = curr.next;
      }
    } else {
      // If element is in the middle, set the previous element's next value to
      // the element-to-delete's next.
      if (curr.data === data) {
        prev.next = curr.next;
        
        // Check if element-to-delete was tail. If so, update tail to previous.
        if (curr.next === null) {
          this.tail = prev;
        }
        
        return true;
      } else {
        prev = curr;
        curr = curr.next;
      }
    }
  }
  
  // If this code gets hit, it means the element was not found.
  return false;
}

/**
 * @name kthToLast
 * @desc Returns the kth to last element in a linked list.
 */
List.prototype.kthToLast = function (k) {
  if (typeof k !== 'number' || k < 0) {
    return null;
  }
  
  var fast = this.head;
  var slow = this.head;
  
  // Make sure to go to k - 1, to account for the space that the slow
  // pointer takes up.
  for (var i = 0; i < k - 1; i++) {
    fast = fast.next;
    
    if (fast === null) {
      return -1;
    }
  }
  
  // Move pointers until it reaches the last element (when fast.next
  // is equal to null).
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  
  return slow.data;
}

/**
 * @name toNumber
 * @desc Takes a list that represents a number whose digits are in 
 *       reverse order and returns the number it represents.
 */
List.prototype.toNumber = function () {
  var curr = this.head;
  var val = 0;
  var i = 1;
  
  while (curr) {
    val += curr.data * i;
    curr = curr.next;
    i *= 10;
  }
  
  return val;
}

/**
 * @name fromNumber
 * @desc Called on an empty list, takes the input number and splits
 *       it up into its digits, and adds them to the list in reverse
 *       order.
 */
List.prototype.fromNumber = function (number) {
  while (number > 1) {
    this.insert(number % 10);
    number = Math.floor(number / 10);
  }
}

module.exports = List; 