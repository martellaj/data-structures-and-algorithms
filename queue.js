function ListNode (data) {
  this.next = null;
  this.prev = null;
  this.data = data;
}

function Queue () {
  this.start = null;
  this.end = null;
  this.count = 0;
}

Queue.prototype.enqueue = function (data) {
  if (data === null) {
    return;
  }
  
  if (this.start === null) {
    this.start = new ListNode(data);
    this.end = this.start;
  } else {
    var newElement = new ListNode(data);
    newElement.prev = this.end;    
    this.end.next = newElement;
    this.end = newElement;
  }
  
  this.count++;
}

Queue.prototype.dequeue = function () {
  var dequeued;
  
  if (this.start === null) {
    return null;
  } else if (this.start === this.end) {
    dequeued = this.start;
    this.start = null;
    this.end = null;
    this.count--;
    return dequeued;
  } else {
    dequeued = this.start;
    this.start = this.start.next;
    this.start.prev = null;
    this.count--;
    return dequeued;
  }
}

module.exports = Queue;