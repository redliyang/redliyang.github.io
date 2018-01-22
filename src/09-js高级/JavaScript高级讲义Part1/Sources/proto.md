# 对象的`__proto__`属性

## 1、标识符命名规则

* 区分大小写,`Name`和`name`是两个不同的变量

* 标识符可以以下划线`_`,美元符`$`或者字母开头，但是不能是数字

* 标识符可以由下划线`_`，美元符`$`，字母，数字组成



## 2.神秘对象的访问

### 构造函数的`prototype`属性

之前我们访问神秘对象的时候，使用的是`原型属性` `prototype`

```js
function Person(){}

//通过构造函数的原型属性prototype可以直接访问原型

Person.prototype;

```

在之前是无法通过构造函数创建出来的对象访问原型的

```js

function Person(){}

var p = new Person();

//以前不能直接通过p来访问神秘对象

```



### 实例对象的`__proto__`属性

`__proto__`属性最早是火狐浏览器引入的，用以通过实例对象来访问原型，这个属性在早期是非标准的属性

有了`__proto__`属性，就可以通过构造函数创建出来的对象直接访问神秘对象

```js

function Person(){}

var p = new Person();

//实例对象的__proto__属性可以方便的访问到原型对象

p.__proto__;


//既然使用构造函数的`prototype`和实例对象的`__proto__`属性
//都可以访问原型对象
//就有如下结论
p.__proto__ === Person.prototype;

```



## 3.`__proto__`属性的用途

* 可以用来访问原型

* 在实际开发中除非有特殊的需求，不要轻易的使用实例对象的`__proto__`属性去修改原型的成员，

* 在调试过程中，可以轻易的查看原型的成员

>tips:

早期如何通过实例对象访问原型？



可以使用实例对象访问构造函数属性`constuctor`

```js
var p = new Person();
p.constructor.prototype;

```

4.给实例继承自原型的属性赋值需要注意的问题

```js

function Person(){};
Person.prototype.name = "周华健";
var o1 = new Person();
var o2 = new Person();
o1.name = "李宗盛"; //这里修改的不是原型对象的name属性，而是给o1自己新增了一个name属性，进行了赋值


//我们可以对比一下o1和o2的name值

console.log(o1.name , o2.name);

```




