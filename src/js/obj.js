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

function Person() {
    this.name = "王九"
}

function PersonPP() {
    this.name = "王九"
}

Person.prototype = new String();
Person.prototype.constructor = Person();
Person.prototype = new String();

var p = new Person();
console.log(p);