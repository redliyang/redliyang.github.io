// nodeType 节点的类型， Node有很多类型， 元素节点， 属性节点， 文本节点， 注释节点等， 通过NodeType区分， 常见的有
// 节点类型 NodeType
// 元素element 1
// 属性attr 2
// 文本text 3
// 注释comments 8
// 文档document 9
// Element继承了Node类， 也就是说Element是Node多种类型中的一种， 即当NodeType为1时Node即为ElementNode，
//  另外， Element拓展了Node， Element用有id、 class、 children等属性。
//     <
//     div id = "div1" >
//     <
//     p id = "p1"
// class = "class1" > 我是第一个P < /p> <
//     p id = "p2"
// class = "class2" > 我是第二个P < /p> <
//     /div>

window.onload = function () {
    var node1 = document.querySelector(".class2");
    console.log(node1.parentNode.innerHTML);
    //输出<p id="p1" class="class1">我是第一个P</p><p id="p2" class="class2">我是第二个P</p>

    var nodelist = document.getElementById("div1");
    var arr = nodelist.childNodes;
    console.log(arr); //[text, p#p1.class1, text, p#p2.class2, text]
    //   0      1           2       3         4
    //0,2,4就是空白文本节点
    console.log(arr[1].innerHTML + " - " + arr[3].innerHTML);
    //输出 我是第一个P - 我是第二个P 为什么是1,3呢？因为本方法文本节点也会获取也就是说0,2,4是文本节点
}

// 下面我简单做下修改， 把他们放在一起， 不留空格

//     <
//     div id = "div1" > < p id = "p1"
// class = "class1" > 我是第一个P < /p> <p id="p2" class="class2">我是第二个P</p > < /div >

window.onload = function () {
    var node1 = document.querySelector(".class2");
    alert(node1.parentNode.innerHTML);

    var nodelist = document.getElementById("div1");
    var arr = nodelist.childNodes;
    console.log(arr) //[p#p1.class1, p#p2.class2]
    //      0              1
    console.log(arr.nodeValue)
}

{ /* 在我们开发过程中， 像上面写html是不现实的。 所以呢， 可以做如下处理， 在定义去空白文本节点。 */ } { /* 如下： */ }

function cleanWhiteSpace(element) {
    for (var i = 0; i < element.childNodes.length; i++) {
        var node = element.childNodes[i];
        if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
            node.parentNode.removeChild(node);
        }
    }
}
cleanWhiteSpace(document.getElementById(element))


{ /* 下面这个是根据NodeType来判断 */ }

{
    /* <
        div id = "div1" >
        空白文本1 <
        p id = "p1"
    class = "class1" >
        我是第一个P < /p >
    空白文本2
        <
        p id = "p2"
    class = "class2" >
        我是第二个P < /p >
    空白文本3
        <
        /div > */
}

window.onload = function () { //依次输出，空白文本1，我是第一个P，空白文本2，我是第二个P，空白文本3
    var node = document.getElementById("div1");
    for (var i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType == 1) {
            console.log(node.childNodes[i].innerHTML);
        } else if (node.childNodes[i].nodeType == 3) {
            console.log(node.childNodes[i].nodeValue);
        }
    }
}