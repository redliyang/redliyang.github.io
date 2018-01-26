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


for (var i = 0; i < 10; i++) {
//    console.log(i);
setTimeout(function () {
    console.log(i);
    
},0)
   setTimeout(function (j) {
       console.log(j);
       
   }(i),0)
}
