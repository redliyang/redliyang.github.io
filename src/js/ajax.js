// var xhr = new XMLHttpRequest();
// xhr.open('get', './test/test.js');
// xhr.onreadystatechange = function () {

//     // 等于4，证明请求完成了
//     if (xhr.readyState === 4) {

//         // status是200~299之间都算成功，
//         // 304走缓存也算成功。
//         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {

//             // 打印请求回来的数据(数据都是字符串)
//             console.log(xhr.responseText);
//             console.log(typeof xhr.responseText);
//         }

//         else {
//             console.log('请求失败了');
//         }
//     }
// };
// xhr.send();
// const xhr = new XMLHttpRequest()
// xhr.open('get', './test/test.js')
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//         if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
//             console.log(xhr.responseText)
//             console.log(typeof xhr.responseText)
//         } else {
//             console.log('请求失败了')
//         }
//     }
// }
// console.log(xhr)
// console.log(1)