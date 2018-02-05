---
layout: post
title:  "没反刍，不生活！！！！！！！！！！！！！！！！！！！！"
categories: yinli
tags:  yinli chengyin
author: redHeart
---

* content
{:toc}




# core.js

```js
(function (w) {
    // 工厂
    function jQuery(selector) {
        return new jQuery.fn.init(selector)
    }

    // 替换原型 + 原型简称
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
    }

    // 给jQuery和原型分别添加extend方法
    jQuery.extend = jQuery.fn.extend = function (obj) {
        let i = 1
        let target = arguments[0]

        if (arguments.length === 1) {
            target = this
            i = 0
        }

        // 遍历得到后面所有的对象
        for (; i < arguments.length; i++) {
            // 遍历每一个对象所有的属性
            for (const key in arguments[i]) {
                target[key] = arguments[i][key]
            }
        }
        // 给谁混入返回谁
        return target
    }

    // 这是真正的构造函数，同时把构造函数放在了原型中
    const init = jQuery.fn.init = function (selector) {
        // null、undefined、NaN、0、false、''
        if (!selector) {
            return this
        }

        // function
        if (jQuery.isFunction(selector)) {
            // 打包给ready静态方法处理
            jQuery.ready(selector)
        }

        // string ==> ( html || selector )
        else if (jQuery.isString(selector)) {
            // 为了用户友好体验，先去掉首尾空白字符
            selector = jQuery.trim(selector)

            // html
            if (jQuery.isHTML(selector)) {
                // 利用一个临时的div来创建DOM，
                // 然后把创建好的DOM依次push给实例。
                const tempDiv = document.createElement('div')
                tempDiv.innerHTML = selector;
                [].push.apply(this, tempDiv.childNodes)
            }

            // selector
            else {
                try {
                    [].push.apply(this, document.querySelectorAll(selector))
                } catch (e) {
                    // 如果报错了，那么手动补一个length属性，代表没有获取到任何元素
                    this.length = 0
                }
            }
        }

        // array || likeArray
        else if (jQuery.isLikeArray(selector)) {
            [].push.apply(this, [].slice.call(selector))
        }

        // 其它
        else {
            this[0] = selector
            this.length = 1
        }
    }

    // 替换init的原型为工厂的原型，这样外界就可以通过工厂给实例扩展方法
    init.prototype = jQuery.fn

    // 暴露工厂和工厂的简称
    w.jQuery = w.$ = jQuery
    
}(window))
```

# static.js

```js
$.extend({

    // 遍历对象或类数组
    each(obj, fn) {
        
        if (jQuery.isLikeArray(obj)) {
            for (let i = 0, len = obj.length; i < len; i += 1) {
                if (fn.call(obj[i], i, obj[i]) === false) {
                    break
                }
            }
        } else {
            for (const key in obj) {
                if (fn.call(obj[key], key, obj[key]) === false) {
                    break
                }
            }
        }

        return obj
    },

    // map实现
    map(obj, fn) {
        
        const result = []

        if ('length' in obj) {
            for (let i = 0, len = obj.length; i < len; i += 1) {
                result.push(fn.call(obj[i], obj[i], i))
            }
        } else {
            for (const key in obj) {
                result.push(fn.call(obj[key], obj[key], key))
            }
        }

        return result
    },

    // 判断是不是html片段
    isHTML(html) {
        return !!html &&
            html.charAt(0) === '<' &&
            html.charAt(html.length - 1) === '>' &&
            html.length >= 3
    },

    // 判断是不是函数
    isFunction(fn) {
        return typeof fn === 'function'
    },

    // 判断是不是window
    isWindow(w) {
        return !!w && (w.window === w)
    },

    // 判断是不是对象
    isObject(obj) {
        return obj !== null &&
            (typeof obj === 'object' || typeof obj === 'function')
    },

    // 判断是不是字符串
    isString(str) {
        return typeof str === 'string'
    },

    // 判断是不是真数组或伪数组
    isLikeArray(arr) {
        
        // Function、window、!Object
        if (jQuery.isFunction(arr) || jQuery.isWindow(arr) || !jQuery.isObject(arr)) {
            return false
        }

        // 判断是不是真数组
        if (({}).toString.call(arr) === '[object Array]') {
            return true
        }

        // 判断是不是伪数组
        if ('length' in arr && (arr.length === 0 || arr.length - 1 in arr)) {
            return true
        }

        return false
    },

    ready(fn) {

        // DOM已经构造完毕，fn可以直接执行
        if (document.readyState === 'complete') {
            fn()
        } 

        // 主流浏览器
        else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn)
        } 
        
        // IE8
        else {
            document.attachEvent('onreadystatechange', () => {
                if (document.readyState === 'complete') {
                    fn()
                }
            })
        }
    },

    // 去掉首尾空白字符
    trim(str) {
        
        // null、undefined、NaN、0、false、''
        if (!str) {
            return str
        }

        // 优先使用原生的
        if (str.trim) {
            return str.trim()
        }

        return str.replace(/^\s+|\s+$/g, '')
    },
})

```

# dom.js

```js

```

# attr&style.js

```js

```

# event.js

```js

```

# ajax.js

```js

```

# animate.js

```js

```

# position.js

```js

```
