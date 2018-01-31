$.extend({
    // 遍历对象或类数组
    each(obj, fn) {
        let i
        let len
        let key

        if (jQuery.isLikeArray(obj)) {
            for (i = 0, len = obj.length; i < len; i += 1) {
                if (fn.call(obj[i], i, obj[i]) === false) {
                    break
                }
            }
        } else {
            for (key in obj) {
                if (fn.call(obj[key], key, obj[key]) === false) {
                    break
                }
            }
        }

        return obj
    },

    // map实现
    map(obj, fn) {
        let i
        let len
        let key
        let result = []

        if ('length' in obj) {
            for (i = 0, len = obj.length; i < len; i++) {
                result.push(fn.call(obj[i], obj[i], i))
            }
        } else {
            for (key in obj) {
                result.push(fn.call(obj[key], obj[key], key))
            }
        }

        return result
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
        // 如果DOM没有构造完毕，那么判断addEventListener是否兼容
        // 如果不兼容addEventListener，那么采取attachEvent的方式，
        // 同时事件变为了onreadystatechange，为了防止这个事件多次触发造成的fn多次执行，
        // 所以需要一个包装函数来进行过滤。
        if (document.readyState === 'complete') {
            fn()
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn)
        } else {
            document.attachEvent('onreadystatechange', () => {
                if (document.readyState === 'complete') {
                    fn()
                }
            })
        }
    },
})
