function HashTable () {
  this.storage = [];
}

HashTable.prototype.insert = function (key, value) {
  var index = hash(key);
  var bucket = this.storage[index];
  
  if (!bucket) {
    this.storage[index] = [];
  }
  
  this.storage[index].push({
    key: key,
    value: value
  });  
}

HashTable.prototype.remove = function (key) {
  var index = hash(key); 
  var bucket = this.storage[index];
  
  if (!bucket) {
    return null;
  } else {
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket.splice(i, 1);
      }
    }
  }
  
  return null;
}

HashTable.prototype.retrieve = function (key) {
  var index = hash(key); 
  var bucket = this.storage[index];
  
  if (!bucket) {
    return null;
  } else {
    for (var i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].value;
      }
    }
  }
  
  return null;
}

function hash (key) {
  if (typeof key === 'number') {
    return key % 5;
  } else if (typeof key === 'string') {
    return key.charCodeAt(0) % 5;    
  } else {
    return 999;
  }
}

module.exports = HashTable;