function Marray(arr) {
    this.arr = arr;
}
Marray.prototype = {
    constructor : Marray,
    push : function (params) {
        this.arr[this.arr.length] = params;
        return this.arr.length;
    },
    pop : function () {
        var temp = this.arr[this.arr.length - 1];
        this.arr.length--;
        return temp;
    }
}
// var p = new Marray();
// var p2 = new Marray();
// p.name = '2';
// console.log(p.valueOf());
// console.log(p);

// console.log(p2.name);
// console.log(p.constructor.prototype);
// console.log(arr);
// console.log(arr.splice(1, 3, 'k', 'm'));

function foo(a , b ,c) {
    var res = a > b ? a : b;
    res = res > c ? res : c;
    return res;
}

var foo1 = new Function('a',
'b',
'c',
'var res = a > b ? a : b;res = res > c ? res : c;return res;'
)
// console.log(foo(1, 2, 3));
console.log(foo1(2,3,5));