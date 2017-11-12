---
layout: post
title:  "兼容"
categories: jianrong
tags:  countdown jianrong
author: redHeart
---

* content
{:toc}

兼容总结




## JS

### 高度

```js

IE6/7/8：
doctype：
window.pageYOffset：undefined
document.documentElement.scrollTop:100
document.body.scrollTop：0
无doctype：
window.pageYOffset：undefined
document.documentElement.scrollTop:0
document.body.scrollTop：100
Safari/Chrome:
window.pageYOffset：100
document.documentElement.scrollTop:0
document.body.scrollTop：100
Firefox/Opera:
doctype：
window.pageYOffset：100
document.documentElement.scrollTop:100
document.body.scrollTop：0
无doctype：
window.pageYOffset：100
document.documentElement.scrollTop:0
document.body.scrollTop：100

var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

```

##CSS