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
Person.prototype = new String();
Person.prototype.constructor = Person;
Person.prototype.say = function () {
    console.log('11');
};

var p = new Person();
console.log(p);
p.say();

function PersonPP() {
    this.name = "sad"
}
PersonPP.prototype = new String();;
PersonPP.prototype.say = function () {
    console.log('22');
};



var p23 = new PersonPP();
console.log(p23);
p23.say();


var p2 = new Person();
console.log(p2);
p2.say();