// function Marray(arr) {
//     this.arr = arr;
// }
// Marray.prototype = {
//     constructor: Marray,
//     push: function (params) {
//         this.arr[this.arr.length] = params;
//         return this.arr.length;
//     },
//     pop: function () {
//         var temp = this.arr[this.arr.length - 1];
//         this.arr.length--;
//         return temp;
//     }
// }
// 
//


//1
//        var age = 38;
//        var obj = {
//            age: 18,
//            getAge: function() {
//                console.log(this.age);
//            }
//        };

// //        var a = obj.getAge();  //18
//        var getAge = obj.getAge;
//        getAge();


// //2
//        var age = 38;
//        var obj = {
//            age: 18,
//            getAge: function() {

//             //    console.log(this.age);

//                function foo() {
//                    console.log(this.age); //
//                }
//                foo();
//            }
//        };

//        obj.getAge();

//3
//
function Person(name, age) {
    var o = {
        name: name,
        age: age,
        sayHello: function () {

        }
    }
    return o;
}

var p = Person("张三", 18);
console.log(p);

function Person3(name, age) {
    var o = {
        name: name,
        age: age,
        sayHello: function () {

        }
    }
    return o;
}

var p1 = new Person3();
console.log(p1);