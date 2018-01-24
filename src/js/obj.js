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


function Foo() {
    getName = function () { alert(1); };
    return this;
}

function getName() { alert(5); }

// getName = function () { alert(4); };

Foo().getName(); // ?1