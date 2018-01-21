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

// console.log(arr);
// console.log(arr.splice(1, 3, 'k', 'm'));

var o = {
    name : '44'
};

// console.log(Object.create(o));

function create(o) {
    if (Object.create) {
        return Object.create(o);
    } else {
        function F() { }
        F.prototype = o;
        return new F();
    }
}
console.log(create(o));
// var p = new Marray();

// for(var k in p){
// }
// o.__proto__ = p;
// console.log(o);