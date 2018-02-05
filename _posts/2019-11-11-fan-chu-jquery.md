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
$.fn.extend({
    empty() {
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.innerHTML = ''
        })
        return this
    },
    remove() {
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.parentNode.removeChild(self)
        })
        return this
    },
    html(html) {
        if (arguments.length === 0) {
            return this.get(0).innerHTML
        }
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.innerHTML = html
        })
        return this
    },
    text(text) {
        let result = ''
        if (arguments.length === 0) {
            jQuery.each(this, (key, dom) => {
                const self = dom
                result += self.innerText
            })
            return result
        }
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.innerText = text
        })
        return this
    },
    appendTo(selector) {
        const result = []
        const $selector = $(selector)
        let tempNode = null
        jQuery.each(this, (key, dom) => {
            const self = dom
            jQuery.each($selector, (k, parentDom) => {
                const parent = parentDom
                tempNode = (k === 0 ? self : self.cloneNode(true))
                parent.appendChild(tempNode)
                result.push(tempNode)
            })
        })
        return jQuery(result)
    },
    append(context) {
        if (jQuery.isString(context)) {
            jQuery.each(this, (key, dom) => {
                const self = dom
                self.innerHTML += context
            })
        } else {
            $(context).appendTo(this)
        }
        return this
    },
    prependTo(selector) {
        const result = []
        const $selector = $(selector)
        let tempNode = null
        jQuery.each(this, (key, dom) => {
            const self = dom
            jQuery.each($selector, (k, parentDom) => {
                const parent = parentDom
                tempNode = (k === 0 ? self : self.cloneNode(true))
                parent.insertBefore(tempNode, parent.firstChild)
                result.push(tempNode)
            })
        })
        return jQuery(result)
    },
    prepend(context) {
        if (jQuery.isString(context)) {
            jQuery.each(this, (key, dom) => {
                const self = dom
                self.innerHTML = context + self.innerHTML
            })
        } else {
            $(context).prependTo(this)
        }
        return this
    },
})
```

# attr&style.js

```js
$.extend({
    getStyle(dom, style) {
        // 优先判断支不支持现代样式的获取方式 否则 IE8兼容处理
        return window.getComputedStyle ? window.getComputedStyle(dom)[style]
            : dom.currentStyle[style]
    },
})
$.fn.extend({

    // 设置或者获取元素的属性节点值
    attr(attr, val) {
        // 不是字符串 也不是对象 或者三个及以上实参，直接返回this
        if (!jQuery.isString(attr) && !jQuery.isObject(attr) && arguments.length >= 3) {
            return this
        }
        // 传入 一个实参，还是两个实参
        if (arguments.length === 1) {
            // 是字符串 还是对象
            if (jQuery.isString(attr)) {
                return this[0].getAttribute(attr)
            } else if (jQuery.isObject(attr)) {
                jQuery.each(attr, (k, v) => {
                    jQuery.each(this, (thisK, thisV) => {
                        thisV.setAttribute(k, v)
                    })
                })
            }
        } else if (arguments.length === 2) {
            jQuery.each(this, (thisK, thisV) => {
                thisV.setAttribute(attr, val)
            })
        }
        return this
    },
    // 删除元素的属性节点值
    removeAttr(attr) {
        this.attr(attr, '')
    },
    prop(attr, bool) {
        // 不是字符串 也不是对象 或者三个及以上实参，直接返回this
        if (!jQuery.isString(attr) && !jQuery.isObject(attr) && arguments.length >= 3) {
            return this
        }
        // 传入 一个实参，还是两个实参
        if (arguments.length === 1) {
            // 是字符串 还是对象
            if (jQuery.isString(attr)) {
                return this[0][attr]
            } else if (jQuery.isObject(attr)) {
                jQuery.each(attr, (k, v) => {
                    jQuery.each(this, (thisK, thisV) => {
                        const dom = thisV
                        dom[k] = v
                    })
                })
            }
        } else if (arguments.length === 2) {
            jQuery.each(this, (thisK, thisV) => {
                const dom = thisV
                dom[attr] = bool
            })
        }
        return this
    },
    css(styleName, style) {
        // 不是字符串 也不是对象 或者三个及以上实参，直接返回this
        if (!jQuery.isString(styleName) && !jQuery.isObject(styleName) && arguments.length >= 3) {
            return this
        }
        // 传入 一个实参，还是两个实参
        if (arguments.length === 1) {
            // 是字符串 还是对象
            if (jQuery.isString(styleName)) {
                return jQuery.getStyle(this[0], styleName)
            } else if (jQuery.isObject(styleName)) {
                jQuery.each(styleName, (k, v) => {
                    jQuery.each(this, (thisK, thisV) => {
                        const dom = thisV
                        dom.style[k] = v
                    })
                })
            }
        } else if (arguments.length === 2) {
            jQuery.each(this, (thisK, thisV) => {
                const dom = thisV
                dom.style[styleName] = style
            })
        }
        return this
    },
    val(value) {
        return (arguments.length === 0) ? this.prop('value') : this.prop('value', value)
    },
    hasClass(className) {
        let has = false
        if (typeof className === 'string') {
            jQuery.each(this, (thisK, thisV) => {
                const dom = thisV
                if ((` ${dom.className} `).indexOf(` ${className} `) > -1) {
                    has = true
                    return false
                }
                return true
            })
        }
        return has
    },
    addClass(classNames) {
        const classNameArr = jQuery.trim(classNames).split(' ')
        jQuery.each(this, (key, dom) => {
            const $self = jQuery(dom)
            jQuery.each(classNameArr, (index, val) => {
                if (!$self.hasClass(val)) {
                    $self[0].className += ` ${val}`
                    $self[0].className = jQuery.trim($self[0].className)
                }
            })
        })
        return this
    },
    removeClass(classNames) {
        if (arguments.length === 0) {
            jQuery.each(this, (key, dom) => {
                const self = dom
                self.className = ''
            })
        } else {
            const classNameArr = jQuery.trim(classNames).split(' ')
            jQuery.each(this, (key, dom) => {
                const self = dom
                jQuery.each(classNameArr, (index, val) => {
                    self.className = self.className.replace(new RegExp(`\\b${val}\\b`), '')
                    self.className = jQuery.trim(self.className)
                })
            })
        }
        return this
    },
    toggleClass(classNames) {
        const classNameArr = jQuery.trim(classNames).split(' ')
        jQuery.each(this, (key, dom) => {
            const $self = jQuery(dom)
            jQuery.each(classNameArr, (index, val) => {
                if ($self.hasClass(val)) {
                    $self.removeClass(val)
                } else {
                    $self.addClass(val)
                }
            })
        })
        return this
    },
})
```

# event.js

```js
$.extend({
    // 兼容添加事件
    addEvent(ele, type, fn) {
        if (!ele.nodeType || !jQuery.isString(type) || !jQuery.isFunction(fn)) {
            const json = { err: 'err', le: 2 }
            throw json
        }
        if (ele.addEventListener) {
            ele.addEventListener(type, fn)
        } else {
            ele.attachEvent(`on${type}`, fn)
        }
    },
    // 兼容添加事件
    removeEvent(ele, type, fn) {
        if (!ele.nodeType || !jQuery.isString(type) || !jQuery.isFunction(fn)) {
            const json = { err: 'err', le: 2 }
            throw json
        }
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn)
        } else {
            ele.detachEvent(`on${type}`, fn)
        }
    },
})
$.fn.extend({
    on(type, fn) {
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.$_event_cache = self.$_event_cache || {}
            if (!self.$_event_cache[type]) {
                self.$_event_cache[type] = []
                self.$_event_cache[type].push(fn)
                jQuery.addEvent(self, type, (e) => {
                    jQuery.each(self.$_event_cache[type], (k, fun) => {
                        fun.call(self, e)
                    })
                })
            } else {
                self.$_event_cache[type].push(fn)
            }
        })
        return this
    },
    off(type, fn) {
        const argLen = arguments.length
        jQuery.each(this, (key, dom) => {
            const self = dom
            if (!self.$_event_cache) {
                // return this
            } else if (argLen === 0) {
                for (const key in self.$_event_cache) {
                    self.$_event_cache[key] = []
                }
            } else if (argLen === 1) {
                self.$_event_cache[type] = []
            } else if (argLen === 2) {
                for (let i = self.$_event_cache[type].length - 1; i >= 0; i -= 1) {
                    if (self.$_event_cache[type][i] === fn) {
                        self.$_event_cache[type].splice(i, 1)
                    }
                }
            }
        })
        return this
    },
    hover(fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
    },
})
const events = 'blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' ')
jQuery.each(events, (index, eventName) => {
    const self = eventName
    $.fn[self] = function (fn) {
        return this.on(self, fn)
    }
})
```

# ajax.js

```js
$.extend({
    // 默认的配置
    ajaxSettings: {
        url: location.href, // 默认的url为本地地址
        type: 'GET', // 默认请求的方法为GET
        async: true, // 默认为异步请求
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', // POST发送数据时设置头信息时候要使用
        timeout: null, // 默认不看延迟事件
        dataType: 'JSON', // 默认认为请求的数据是JSON
        success() { },
        error() { },
        complete() { },
    },
    // 把对象转换为url参数形式的字符串
    urlStringify(data) {
        let result = ''

        // 传入的不是对象，就直接返回空字符串
        if (!jQuery.isObject(data)) {
            return result
        }

        // 为了防止IE发送的汉字路乱码，所以需要统一编码一下
        for (const key in data) {
            result += `${window.encodeURIComponent(key)}=${window.encodeURIComponent(data[key])}&`
        }
        // 从0截取到倒数第一个字符串返回,剔除结尾的 &
        return result.slice(0, -1)
    },
    // 加工options
    processOptions(options) {
        // 合并用户和默认的配置项，得到一份新的
        const optionsNew = {}
        jQuery.extend(optionsNew, jQuery.ajaxSettings, options)

        // 对data进行加工处理
        optionsNew.data = jQuery.urlStringify(options.data)

        // 把type统一转换为大写，防止意外
        optionsNew.type = optionsNew.type.toUpperCase()

        // 如果是GET请求，把数据加到URL中
        if (optionsNew.type === 'GET') {
            optionsNew.url += `?${optionsNew.data}`
            optionsNew.data = null
        }
        // 返回加工后的配置
        return optionsNew
    },
    // ajax封装
    ajax(options) {
        let timer
        let result
        // 加工得到一份处理好的配置项
        const optionsNew = jQuery.processOptions(options)
        // 创建xhr对象，发送请求
        const xhr = new XMLHttpRequest()
        xhr.open(optionsNew.type, optionsNew.url, optionsNew.async)
        // 如果为post请求，添加一个请求头
        // console.log(optionsNew)
        if (optionsNew.type === 'POST') {
            xhr.setRequestHeader('Content-Type', optionsNew.contentType)
        }
        xhr.onreadystatechange = () => {
            // 先判断请求是否完成，完成就执行complate方法
            if (xhr.readyState === 4) {
                // 在指定时间内完成了请求，那么清除定时器
                clearTimeout(timer)
                optionsNew.complete()
                // 判断请求是否成功，成功过就执行successs方法，失败执行error方法
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    // 根据预期的dataType对数据进行处理
                    switch (optionsNew.dataType) {
                    case 'JSON':
                        result = JSON.parse(xhr.responseText)
                        break
                    case 'script':
                        eval(xhr.responseText)
                        result = xhr.responseText
                        break
                    case 'style':
                        $('<style></style>').html(xhr.responseText).appendTo('head')
                        result = xhr.responseText
                        break
                    default:
                        result = xhr.responseText
                        break
                    }
                    optionsNew.success(result)
                } else {
                    optionsNew.error(xhr.status)
                }
            }
        }
        // 如果设置了超时，那么开始一个定时器
        if (optionsNew.timeout) {
            // 在指定的时间内，请求还没有完成，
            // 那么直接调用error方法报错
            timer = setTimeout(() => {
                // 超时执行error
                optionsNew.error('超时')
                // error执行了，事件回调就没有必要执行了
                xhr.onreadystatechange = null
            }, optionsNew.timeout)
        }
        xhr.send(optionsNew.data)
    },
    get(url, data, fn) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function () { }
        jQuery.ajax({
            url,
            data,
            success: fn,
        })
    },

    post(url, data, fn) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function () { }
        jQuery.ajax({
            type: 'POST',
            url,
            data,
            success: fn,
        })
    },

    // 加载JSON数据
    getJSON(url, data, fn) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function () { }
        jQuery.ajax({
            dataType: 'JSON',
            url,
            data,
            success: fn,
        })
    },

    // 加载js脚本
    getScript(url, data, fn) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function () { }
        jQuery.ajax({
            dataType: 'script',
            url,
            data,
            success: fn,
        })
    },

    // 加载样式
    getCss(url, data, fn) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function () { }
        jQuery.ajax({
            dataType: 'style',
            url,
            data,
            success: fn,
        })
    },
})
```

# animate.js

```js
$.extend({
    isShow(dom) {
        if (dom.style.display === 'none') {
            return false
        }
        return true
    },
})
$.fn.extend({
    height: '',
    display: 'block',
    opacity: '100', // 兼容IE678 值取 10 - 100
    animate: function animate(json, fn) {
        // 第一步：处理json
        if ('display' in json) {
            this.css('display', json.display)
        } else {
            const ele = this[0]
            // 先清定时器
            clearInterval(ele.timer)
            ele.timer = setInterval(() => {
                let bool = true
                // attr == k(键)    target == json[k](值)
                jQuery.each(json, (attr, target) => {
                    // opacity 乘100 方便运算
                    let leader = (attr === 'opacity') ?
                        (jQuery.getStyle(ele, attr) * 100 || 1) :
                        (parseInt(jQuery.getStyle(ele, attr), 10) || 0)
                    // 1.获取步长
                    let step = (target - leader) / 10
                    // 2.二次加工步长
                    step = step > 0 ? Math.ceil(step) : Math.floor(step)
                    leader += step
                    // 3.赋值
                    // 分别对 opacity zIndex 特殊处理
                    // opacity ÷100 zIndex一次性赋值
                    if (attr === 'opacity') {
                        ele.style[attr] = leader / 100
                        // 兼容IE678
                        ele.style.filter = `alpha(opacity=${leader})`
                    } else if (attr === 'zIndex') {
                        ele.style.zIndex = target
                    } else {
                        ele.style[attr] = `${leader}px`
                    }
                    // 4.清除定时器（目标位置和当前位置不相等，就不能清除清除定时器。）
                    if (target !== leader) {
                        bool = false
                    }
                })
                console.log(1)
                // 只有所有的属性都到了指定位置，bool值才不会变成false；
                if (bool) {
                    clearInterval(ele.timer)
                }
            }, 25)
        }

        // 第二步，处理回掉函数
        if (fn) {
            fn()
        }

        // 第三步，返回this
        return this
    },
    show(fn) {
        const json = {
            display: $.fn.display,
        }
        return this.animate(json, fn)
    },
    hide(fn) {
        // 使用原型属性 保存DOM原来对 display模式
        $.fn.display = this.css('display')
        const json = {
            display: 'none',
        }
        return this.animate(json, fn)
    },
    toggle(fn) {
        return this.css('display') === 'none' ?
            this.show(fn) :
            this.hide(fn)
    },
    slideDown(fn) {
        const json = {
            height: $.fn.height,
        }
        return this.animate(json, fn)
    },
    slideUp(fn) {
        // 使用原型属性 保存DOM原来对 height(不加px)
        $.fn.height = parseInt(this.css('height'), 10)
        const json = {
            height: 0,
        }
        return this.animate(json, fn)
    },
    slideToggle(fn) {
        return parseInt(this.css('height'), 10) === 0 ?
            this.slideDown(fn) :
            this.slideUp(fn)
    },
    fadeOut(fn) {
        const json = {
            opacity: $.fn.opacity,
        }
        return this.animate(json, fn)
    },
    fadeIn(fn) {
        // 使用原型属性 保存DOM原来对 兼容IE678 值取 10 - 100
        $.fn.opacity = this.css('opacity') * 100
        const json = {
            opacity: 0,
        }
        return this.animate(json, fn)
    },
    fadeTo(val, fn) {
        return this.animate({ opacity: val }, fn)
    },
    fadeToggle(fn) {
        return this.css('opacity') === '0' ?
            this.fadeOut(fn) :
            this.fadeIn(fn)
    },
    // say(blinkDom, content = '大家好！我是李阳', time = 400) {
    //     let num = 0
    //     let str = ''
    //     const self = this
    //     const $blinkDom = $(blinkDom)
    //     const arr = content.split('')
    //     $blinkDom.css('display', 'inline')
    //     const timer = setInterval(() => {
    //         if (arr[num] === undefined) {
    //             clearInterval(timer)
    //             $('.typedCursor')[0].style.display = 'none'
    //         } else {
    //             str += arr[num]
    //             self.text(str)
    //             num += 1
    //         }
    //     }, time)
    //     //  display: none; opacity: 1; animation: blink .7s infinite;
    //     //  @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
    // },
})
```

# position.js

```js

```
