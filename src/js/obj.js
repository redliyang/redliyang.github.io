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
// 
//


var num = 123;
function f1() {
    console.log(num);  //如果是动态作用域打印的就是456 如果是词法作用域 打印123
}
function f2() {
    var num = 456;
    f1();
}
f2();