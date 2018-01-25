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


function Person() {
    this.name = "张莎";
    this.age = 18;
}

function Student() {
    var stu = this;
    Person.apply(stu);
}

var stu = new Student();
console.log(stu);