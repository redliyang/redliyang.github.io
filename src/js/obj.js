function Marray(arr) {
    this.arr = arr;
    this.aa = function name() {
        console.log('object');
    };
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

// console.log(arr);
// console.log(arr.splice(1, 3, 'k', 'm'));

