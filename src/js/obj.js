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






function f3() {
    var aa = this;
    // for(var a in aa){
    //     console.log(a + '--' + aa[a]);
    // }
    console.log(aa);
}
f3()
// console.log(f3());