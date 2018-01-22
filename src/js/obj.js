function Marray(arr) {
    this.arr = arr;
}
Marray.prototype = {
    constructor: Marray,
    push: function (params) {
        this.arr[this.arr.length] = params;
        return this.arr.length;
    },
    pop: function () {
        var temp = this.arr[this.arr.length - 1];
        this.arr.length--;
        return temp;
    }
}

function sum(n) {
    if (n == 1) {
        return 1;
    }
    //return 1+2+3
    //return 1+2
    console.log(n);
    console.log('-------------');
    return n + sum(n - 1);
}

// var num = sum(5);
// console.log(num);




var count = 0;
function test() {
    if (count++ == 5) {
        console.log(count + '---');
        return;
    }
    console.log(count);
    test();
}

// test();

console.log(document.body.childNodes);

var arr = document.body.childNodes;
for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    console.log(ele.nodeType);
}