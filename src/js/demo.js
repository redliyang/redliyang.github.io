function foo() {
    var num = Math.random();
    function func() {
        return num;
    }
    return func;
}


var f = foo();
// f可以直接访问num，而且多次访问，访问的也是同一个，并不会返回新的num
var res1 = f();
var res2 = f();
console.log(res1)
console.log(res2)