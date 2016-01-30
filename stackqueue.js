var Stack = require('./stack');

function StackQueue () {
  this.en = new Stack();
  this.deq = new Stack();
}

StackQueue.prototype.enqueue = function (data) {
  this.en.push(data);
}

StackQueue.prototype.dequeue = function () {
  var dequeued = this.deq.pop();
  
  if (!dequeued) {
    while (this.en.top !== null) {
      this.deq.push(this.en.pop());
    }
    
    dequeued = this.deq.pop();
    
    if (!dequeued) {
      return null;
    }
  }
  
  return dequeued;
}

module.exports = StackQueue;