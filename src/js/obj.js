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

var date = new Date();
console.log(typeof date.getDate());

var math = new RegExp();
console.log(math);

var aa = -1;
console.log(Math.abs(aa));

var str = new String();
console.log(typeof str);

var sre = 'asdas';
console.log(typeof sre); 