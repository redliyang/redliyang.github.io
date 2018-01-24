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
// var num;
function f() {
    function foo() {
        var num;
        num = 999;
        console.log(num); // 999
    }

    console.log(num); //678
    // var num = 678;
    foo();
}

f();
num = 456;
