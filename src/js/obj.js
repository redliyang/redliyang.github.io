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

var num = 123;
       num = "";
       num = true;
       num = [];
       num = function () {

       }
console.log(num);

// var func1 = function (){
//     console.log(123);
// }
//
func1()
func1 = function (){
    console.log(456);
}