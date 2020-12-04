// 5. Height of a BST

// Write an algorithm to find the height of a binary search tree. What is the time complexity of your algorithm?

let BinarySearchTree = require('./03-bst');

function height(tree) {
    // return zero if null
    if (tree === null) return 0;
     // return the height of the higher subtree, plus one for this node
    return Math.max(height(tree.left), height(tree.right)) + 1;
}

let BST = new BinarySearchTree;
BST.insert(3,3);
BST.insert(1,1);
BST.insert(4,4);
BST.insert(6,6);
BST.insert(9,9);
BST.insert(2,2);
BST.insert(5,5);
BST.insert(7,7);

console.log(height(BST));

// 6. Is it a BST?
// Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates.

function isSearch(tree) {
    if (tree === null) return true;
    // Confirm that the left node is less and right node is more
    if (tree.left !== null && tree.left.key >= tree.key) return false;
    if (tree.right !== null && tree.key >= tree.right.key) return false;
    // If that passes, check that the subtrees are search trees
    return (isSearch(tree.left) && isSearch(tree.right));
}

console.log(isSearch(BST));

// 7. 3rd largest node
// Write an algorithm to find the 3rd largest node in a binary search tree.

function nthLargest(tree, n) {
    // Remove the largest value n-1 times
    for (let i=1; i < n; i++) {
        tree.remove(findMax(tree).key);
    }
    return findMax(tree).key;
}

function findMax(tree) {
    let max = tree;
    while (max.right !== null) {
        max = max.right;
    }
    return max;
}

console.log(nthLargest(BST, 3));

// 8. Balanced BST
// Write an algorithm that checks if a BST is balanced (i.e., a tree where no 2 leaves differ in distance from the root by more than 1).

function isBalanced(tree) {
    let leftHeight = height(tree.left);
    let rightHeight = height(tree.right);
    return (Math.abs(leftHeight - rightHeight) < 2);
}

console.log(isBalanced(BST)); // true

BST = new BinarySearchTree;

BST.insert('E');
BST.insert('A');
BST.insert('S');
BST.insert('Y');
BST.insert('Q');
BST.insert('U');
BST.insert('E');
BST.insert('S');
BST.insert('T');
BST.insert('I');
BST.insert('O');
BST.insert('N');

console.log(isBalanced(BST)); // false

// 9. Are they the same BSTs?
// You are given two arrays which represent two sequences of keys that are used to create two binary search trees. Write a program that will tell whether the two BSTs will be identical or not without actually constructing the tree. You may use another data structure such as an array or a linked list but don't construct the BST. What is the time complexity of your algorithm? E.g., 3, 5, 4, 6, 1, 0, 2 and 3, 1, 5, 2, 4, 6, 0 are two sequences of arrays but will create the exact same BSTs and your program should return true.

function equalTrees(arr1, arr2) {
    // If their starting values (root nodes) or lengths are different they can't create identical trees
    if (arr1[0] !== arr2[0] || arr1.length !== arr2.length) return false;

    // If they're both a single identical value, they're identical leaves
    if (arr1[0] === arr2[0] && arr1.length <= 1) return true;

    // If they're both empty arrays, that's identical too
    if (arr1 === [] && arr2 === []) return true;

    // Now we split the arrays into left and right keys and recursively
    // see if those recursively create identical trees
    let split1 = splitArrayAroundFirstValue(arr1);
    let split2 = splitArrayAroundFirstValue(arr2);

    return(equalTrees(split1.left, split2.left) && equalTrees(split1.right, split2.right));
}

function splitArrayAroundFirstValue(arr) {
    let left = [];
    let right = [];
    for (i=1; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return { left, right };
}

console.log(equalTrees([3,2,1,4],[3,1,2,4])); // false
console.log(equalTrees([2,3,1,4],[2,1,3,4])); // true
console.log(equalTrees([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0])); // true