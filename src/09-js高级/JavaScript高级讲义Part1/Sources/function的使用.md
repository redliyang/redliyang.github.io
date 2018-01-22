## Function 的使用

### 语法:
```js
//Function函数所有的参数全都是字符串
//Function函数的作用就是将所有的参数组合起来，变成一个函数
//1、如果只传一个参数，那么这个函数必然是函数体
//2、如果传多个参数，那么最后一个参数表示函数体，前面的参数代表将要创建的函数的参数
//3、如果不传参数，表示创建一个空函数
new Function(arg1, arg2, arg3, ..., argN, body);
```

### 创建一个打印一句话的函数

```js
//传统的方式
function foo(){
    console.log("你好");
}

//使用Function
var func = new Function("console.log('你好');");

```

这里两种方式创建出来的函数功能是一样的。



### 创建一个空函数

```js
//传统的方式
function foo(){}

//Function
var func = new Function();
```



### 创建一个有参数的函数

```js
//传统的方式
function foo(num){
    console.log(num);
}

//Function

var func = new Function(){"num", "console.log(num);"};
```



### 练习: 利用 Function 创建一个函数, 要求传入两个数字, 打印其和

```js
var func = new Function(
    'num1',
    'num2',
    'console.log( num1 + num2 );'
);
```



### 练习: 利用 Function 创建一个函数, 要求允许函数调用时传入任意个数参数, 并且函数返回这些数字中最大的数字. 练习: 利用 Function 创建一个求三个数中最大数的函数.

```js
// 传统
function foo ( a, b, c ){
    var res = a > b ? a : b;
    res = res > c ? res : c;
    return res;
}

// Function

var func = new Function( 'a',
    'b',
    'c',
    'var res = a > b ? a : b;res = res > c ? res : c;return res;' )

```


