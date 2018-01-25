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

function foo(){
    var obj = {
        name:"潘文斌",
        nickName:"文武宝宝"
    }
    return obj;
}
var obj1 = foo();
var obj2 = foo();
// console.log(obj1 == obj2);

function foo() {
    var num = 123;
    return function (a) {
        //1.如果传参数，这里的a肯定不是Undefined，所以条件判断为true
        if (a !== undefined) {
            num = a;
        } else {
            //如果不传参，代表要获取这个值，直接return
            return num;
        }
    };
}
var func = foo();
//设置值
// func(789);

//理想状态下的获取值
// var x = func();
// console.log(x);
// func(987);
// console.log(func());

function foo() {
    var name = "张国荣";
    var age = 18;

    return [
        function(){
            return name;
        },
        function(){
            return age;
        }
    ]
}

// var getName = foo();
// console.log(getName());
// console.log(getName[1]());


function foo() {
    var name = "张国荣";
    var age = 18;

    return {
        getName: function () {
            return name;
        },
        getAge: function () {
            return age;
        }
    }
}

var obj = foo();
console.log(obj.getName());
console.log(obj.getAge());

var a = foo();
console.log(a.getName());
console.log(a.name);

console.log(a.getName == obj.getName);