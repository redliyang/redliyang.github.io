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


// console.log(String.fromCharCode(97));
// console.log('-----------');

var ad = '0123456789';
var ad = 'asd';

// console.log(ad.slice(1,4));
// console.log(ad.split(''));
// console.log(ad.substr(3,2));
// console.log(ad.substring(1,4));
// console.log(ad.toUpperCase());
// console.log(ad.toLocaleUpperCase());
// var ad = 'SDF';
// console.log(ad.toLowerCase());
// console.log(ad.toLocaleLowerCase());
console.log(ad.valueOf());



console.log(ad === ad.valueOf());

function func(s, n) {
　 return s.replace(/([^x00-xff])/g, "$1a").slice(0, n).replace(/([^x00-xff])a/g, "$1");
}


function func(s, n) {
　return s.slice(0, n).replace(/([^x00-xff])/g, "$1a").slice(0, n).replace(/([^x00-xff])a/g, "$1");
}


// test：测试string是否包含有匹配结果，包含返回true，不包含返回false。 
    var str = "bbs.byr.cn";  
    var reg = /b/;  
    var ret = reg.test(str);  
    alert(ret); //true  
// match：根据pattern进行正则匹配,如果匹配到,返回匹配结果,如匹配不到返回null
    var str = "ThIS isn't me";   
    var reg = /is/ig;  
    var ret = str.match(reg);  
    alert(ret); //IS, is  
    console.log(ret); //["IS", "is"]   
// search ：根据pattern进行正则匹配,如果匹配到一个结果,则返回它的索引数;否则返回-1 
    var str = "This isn't me";  
    var reg = /is/;  
    var ret = str.search(reg);  
    alert(ret);//2  
// replace：根据pattern进行正则匹配,把匹配结果替换为replacement 
    var str = "i love china!";  
    var pattern = /i/g;  
    var ret = str.replace(pattern, "I");  
    alert(ret); //I love chIna!  
// split：根据pattern进行正则分割,返回一个分割的数组
    var  str = 'http://www.baidu.com/';  
    var  reg = /\W/;  
    var  ret = str.split(reg);  
    console.log(ret); //["http", "", "", "www", "baidu", "com", ""]   
// exec：对string进行正则处理,并返回匹配结果.array[0]为原字符串,array[i]为匹配在整个被搜索字符串中的位置。
    var str = "i love china!";   
    var reg = /i\B/g;   
    var ret = reg.exec(str);   
    alert(ret); // i  
    console.log(ret); //["i", index: 9, input: "i love china!"]

