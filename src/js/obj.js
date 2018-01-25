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


var div = document.getElementById("div1");

function huidiao(e) {
    console.log(e + "就是当前的事件对象")
    console.log(this + "就是当前你点击的对象");
    alert("我是div的点击事件，所有浏览器中，我的功能都是弹出来这句话！");
}

            //通用的
        //    div.onclick = huidiao;

            //ie9以上才支持
        //    div.addEventListener("click",huidiao)

            //ie9（不包括9）以下支持的
           div.attachEvent("onclick",function(){
               huidiao.call(div, window.event);


           })