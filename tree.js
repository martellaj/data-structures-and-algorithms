var Stack = require('../stack/stack');
var Queue = require('../queue/queue');

function TreeNode (data) {
  this.left = null;
  this.right = null;
  this.data = data; 
}

function Tree () {
  this.root = null;
}

/**
 * @name insert
 * @desc Inserts a value into the tree.
 */
Tree.prototype.insert = function (value) {
  if (this.root === null) {
    this.root = new TreeNode(value);
    return true;
  }
  
  var curr = this.root;
  
  while (curr) {
    if (curr.data === value) {
      return false;
    } else if (value > curr.data) {
      if (curr.right === null) {
        curr.right = new TreeNode(value);
        return true;
      } else {
        curr = curr.right;
      }
    } else if (value < curr.data) {
      if (curr.left === null) {
        curr.left = new TreeNode(value);
        return true;
      } else {
        curr = curr.left;
      }
    }
  }
}

/**
 * @name findNode
 * @desc Returns the node with the given value.
 */
Tree.prototype.findNode = function (value) {
  if (this.root === null) {
    return null;
  }
  
  var curr = this.root;
  
  while (curr) {
    if (curr.data === value) {
      return curr;
    } else if (value > curr.data) {
      curr = curr.right;
    } else if (value < curr.data) {
      curr = curr.left;
    }
  }
  
  return false;
}

/**
 * @name bfs
 * @description Performs breadth-first search on a tree.
 */
Tree.prototype.bfs = function (value) {
  var visitedNodes = new Queue();
  
  if (this.root.data === value) {
    return this.root;
  }
  
  visitedNodes.enqueue(this.root); 
  
  while (visitedNodes.count > 0) {
    var curr = visitedNodes.dequeue().data;
    console.log(curr.data);
    
    if (curr.left !== null) {
      if (curr.left.data === value) {
        return curr.left;
      } else {
        visitedNodes.enqueue(curr.left);
      }
    }
    
    if (curr.right !== null) {
      if (curr.right && curr.right.data === value) {
        return curr.right;
      } else {
        visitedNodes.enqueue(curr.right);
      } 
    }
  }
  
  return false;
}

/**
 * @name dfs
 * @desc Performs depth-first serach on a tree.
 */
Tree.prototype.dfs = function (value) {
  var visitedNodes = new Stack();
  
  if (this.root.data === value) {
    return this.root;
  }
  
  visitedNodes.push(this.root);
  
  while (visitedNodes.top !== null) {
    var curr = visitedNodes.pop().data;
    console.log(curr.data);
    
    if (curr.right !== null) {
      if (curr.right.data === value) {
        return curr.right;
      } else {
        visitedNodes.push(curr.right);
      }
    }
    
    if (curr.left !== null) {
      if (curr.left.data === value) {
        return curr.left;
      } else {
        visitedNodes.push(curr.left);
      }
    }
  }
  
  return false;
}

/**
 * @name preorder
 * @desc Performs pre-order traversal (operation performed on the node, then
 *       its left descedents, then its right descedents.
 */
Tree.prototype.preorder = function (root) {
  root ? console.log(root.data) : null; 
  root.left ? this.preorder(root.left) : null;
  root.right ? this.preorder(root.right) : null;  
}

/**
 * @name preorderIterative
 * @desc Same as preorder, but iteratively instead of recursively.
 */
Tree.prototype.preorderIterative = function () {
  var visitedNodes = new Stack();
  
  visitedNodes.push(this.root);
  
  while (visitedNodes.top !== null) {
    var curr = visitedNodes.pop().data;
    console.log(curr.data);
    
    if (curr.right !== null) {
      visitedNodes.push(curr.right);
    }
    
    if (curr.left !== null) {
      visitedNodes.push(curr.left);
    }
  }
}

/**
 * @name inorder
 * @desc Performs inorder traversal (operation performed on left descendents,
 *       the node, and then its right descendents).
 */
Tree.prototype.inorder = function (root) {
  root.left ? this.inorder(root.left) : null;
  root ? console.log(root.data) : null;   
  root.right ? this.inorder(root.right) : null; 
}

/**
 * @name postorder
 * @desc Performs inorder traversal (operation performed on left descendents,
 *       then its right descendents, then the node itself).
 */
Tree.prototype.postorder = function (root) {
  root.left ? this.postorder(root.left) : null;
  root.right ? this.postorder(root.right) : null;   
  root ? console.log(root.data) : null;   
}

/**
 * @name getHeigh
 * @desc Returns the height of the tree.
 */
Tree.prototype.getHeight = function () {
  return internalGetHeight(this.root);
}

/**
 * @name internalGetHeight
 * @desc Calculates the height of the subtree provided.
 */
function internalGetHeight (root) {
  if (root === null) {
    return 0;
  } else {
    return 1 + Math.max(internalGetHeight(root.left), internalGetHeight(root.right));
  }
}

/**
 * @name lowestCommonAncestor
 * @desc Gets the LCA between 2 nodes in a tree.
 */
Tree.prototype.lowestCommonAncestor = function (a, b) {
  return internalLowestCommonAncestor(this.root, a, b).data;
}

/**
 * @name internalLowestCommonAncestor
 * @desc Calculates the LCA.
 */
function internalLowestCommonAncestor (root, a, b) {
  if (root.data < a && root.data < b) {
    return internalLowestCommonAncestor(root.right, a, b);
  } else if (root.data > a && root.data > b) {
    return internalLowestCommonAncestor(root.left, a, b);
  } else {
    return root;
  }
}

module.exports = Tree;