# 4. What does this program do?

Without running this code in your code editor, explain what the following program does. Show with an example the result of executing this program. What is the runtime of this algorithm?

```
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}
```

*This function recursively returns the sum of all the keys in the tree. Given the previous example:*
```
        3
1           4
    2           6
              5      9
                    7
```
*...the function would return 37.*
