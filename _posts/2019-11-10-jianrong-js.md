---
layout: post
title:  "jianrong"
categories: jianrong
tags:  countdown jianrong
author: redHeart
---

* content
{:toc}

js 兼容





## 高度

window.document.body.scrollTop | window.pageYOffset | document.documentElement.scrollTop | document.body.scrollTop;




```

| 随机数取值范围 | 随机数 |        原始数据 | 结果          |
|:---------------|:-------|----------------:|:--------------|
|                |        | 1 2 3 4 5 6 7 8 |               |
| 1-8            | 6      |   1 2 3 4 5 7 8 | 6             |
| 1-7            | 2      |     1 7 3 4 5 8 | 2 6           |
| 1–6            | 6      |       1 7 3 4 5 | 8 2 6         |
| 1–5            | 1      |         5 7 3 4 | 1 8 2 6       |
| 1–4            | 3      |           5 7 4 | 3 1 8 2 6     |
| 1–3            | 3      |             5 7 | 4 3 1 8 2 6   |
| 1–2            | 1      |               7 | 5 4 3 1 8 2 6 |

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

var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;

```