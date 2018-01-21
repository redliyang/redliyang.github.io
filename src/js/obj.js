function Marray(arr) {
    this.arr = arr;
}
Marray.prototype = {
    constructor : Marray,
    push : function (params) {
        this.arr[this.arr.length] = params;
        return this.arr.length;
    },
    pop : function () {
        var temp = this.arr[this.arr.length - 1];
        this.arr.length--;
        return temp;
    }
}

       function Person(){
           this.name = "王九"
       }

       Person.prototype.name = "张三";

       var p = new Person();
       console.log(p.valueOf());