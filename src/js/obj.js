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

function funv1() {
    console.log(1);
}
function funv1() {
    console.log(2);
}
funv1()


funv1()

var funv1;
console.log(funv1);
funv1 = 1;

 alert(foo); //undefined  函数体
 function foo() {}
 var foo = 2;
 alert(foo); //2