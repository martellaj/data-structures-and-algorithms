function ListNode (data) {
  this.data = data;
  this.next = null;
}

function Stack () {
  this.top = null;
}

/**
 * @name push
 * @desc Pushes a new node onto the stack.
 */
Stack.prototype.push = function (data) {
  var newTop = new ListNode(data);
  newTop.next = this.top;
  this.top = newTop;
}

/**
 * @name pop
 * @desc Pops the top from the stack.
 */
Stack.prototype.pop = function () {
  if (this.top === null) {
    return null;
  }
  
  var element = this.top;
  this.top = element.next;
  
  return element;
}

/**
 * @name peek
 * @desc Returns value of top node without popping it.
 */
Stack.prototype.peek = function () {
  if (this.top === null) {
    return null;
  } else {
    return this.top.data;
  }
}

/**
 * @name isEmpty
 * @desc Determines if Stack is empty or not.
 */
Stack.prototype.isEmpty = function () {
  if (this.top != null) {
    return false;
  } else {
    return true;
  }
}

/**
 * @name print
 * @desc Traverses the stack and prints each element.
 */
Stack.prototype.print = function () {
  var curr = this.top;
  
  while (curr) {
    console.log(curr.data);
    curr = curr.next;
  }
}

/**
 * @name sort
 * @desc Sorts a stack in ascending order, constrained to only 1 additional stack.
 */
Stack.prototype.sort = function () {
  var aux = new Stack();
  var isSorted = false;
  
  while (!isSorted) {
    if (aux.isEmpty()) {
      aux.push(this.pop().data);
    } else {
      var top = this.pop();
      
      // We want the largest element to be on the bottom of aux, so pop all smaller
      // elements back onto stack and push top (the largest element) onto aux.
      if (top.data > aux.peek()) {
        while (aux.isEmpty() === false) {
          this.push(aux.pop().data);
        }
      }
      
      aux.push(top.data);
      
      // If there are no elements left to place, it means aux is reverse sorted.
      if (this.isEmpty()) {
        isSorted = true;
      }
    }
  }
  
  // Move elements from aux back onto stack.
  while (aux.isEmpty() === false) {
    this.push(aux.pop().data);
  }
}

module.exports = Stack;