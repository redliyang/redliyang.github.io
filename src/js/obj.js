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

function sum(n) {
    if (n == 1) {
        return 1;
    }
    //return 1+2+3
    //return 1+2
    console.log(n);
    console.log('-------------');
    return n + sum(n - 1);
}

var num = sum(5);
console.log(num);

//自己调用自己，称为递归调用

// 二、函数 + 变量

// 用递归 来求 5 的阶乘
// n! = n * (n-1)!

// 定义一个函数，用于求 n 的阶乘
function func(n) {
    if (n == 1) {
        return 1;
    }

    // func(n-1) 因为传递的参数是 n-1,那么就是求 (n-1) 的阶乘
    return n * func(n - 1);
}
// console.log(func(5));

// // 三、函数 + 函数

// //斐波拉契题(兔子生兔子题目)--从出生后第3个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问每个月的兔子对数为多少
// // 产量分析：1， 1， 2， 3， 5， 8， 13， 21 。。。
// // 第n个月的兔子总数  =  第n-1个月的兔子总数 + 第n-2个月的兔子总数
// // 问题： 求任意月兔子的总数

function func(n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return func(n - 1) + func(n - 2);
}

var a = func(5);
console.log(a);
