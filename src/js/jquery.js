(function (w) {

    // 工厂
    function jQuery(selector) {
        return new jQuery.fn.init(selector);
    }

    // 替换原型 + 原型简称
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
    }

    // 给jQuery和原型分别添加extend方法
    jQuery.extend = jQuery.fn.extend = function (obj) {
        var i = 1, 
            key,
            arg = arguments,
            target = arg[0],
            argLen = arg.length;

        if (argLen === 1) {
            target = this;
            i = 0;
        }

        // 遍历得到后面所有的对象
        for (; i < argLen; i++) {

            // 遍历每一个对象所有的属性
            for (key in arg[i]) {
                target[key] = arg[i][key];
            }
        }

        // 给谁混入返回谁
        return target;
    }

    // 给jQuery添加一些静态方法
    jQuery.extend({

        // 遍历对象或类数组
        each: function (obj, fn) {
            var i, len, key;

            if (jQuery.isLikeArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    if (fn.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (key in obj) {
                    if (fn.call(obj[key], key, obj[key]) === false) {
                        break;
                    }
                }
            }

            return obj;
        },

        // map实现
        map: function (obj, fn) {

            var i, len, key, result = [];

            if ('length' in obj) {
                for (i = 0, len = obj.length; i < len; i++) {
                    result.push(fn.call(obj[i], obj[i], i));
                }
            } else {
                for (key in obj) {
                    result.push(fn.call(obj[key], obj[key], key));
                }
            }

            return result;
        },

        // 去掉首尾空白字符
        trim: function (str) {

            // null、undefined、NaN、0、false、''
            if (!str) {
                return str;
            }

            // 优先使用原生的
            if (str.trim) {
                return str.trim();
            }

            return str.replace(/^\s+|\s+$/g, '');

        },

        // 判断是不是html片段
        isHTML: function (html) {

            // null、undefined、NaN、0、false、''
            if (!html) {
                return false;
            }

            // <.>
            if (html.charAt(0) === '<' &&
                html.charAt(html.length - 1) === '>' &&
                html.length >= 3) 
            {
                return true;
            }

            return false;
        },

        // 判断是不是html片段
        _isHTML: function (html) {
            return !!html &&
                html.charAt(0) === '<' &&
                html.charAt(html.length - 1) === '>' &&
                html.length >= 3;
        },

        // 判断是不是函数
        isFunction: function (fn) {
            if (typeof fn === 'function') {
                return true;
            }
            return false;
        },

        // 判断是不是函数
        _isFunction: function (fn) {
            return typeof fn === 'function';
        },

        // 判断是不是window
        isWindow: function (w) {

            // null、undefined、NaN、0、false、''
            if (!w) {
                return false;
            }

            if (w.window === w) {
                return true;
            }

            return false;
        },

        // 判断是不是window
        _isWindow: function (w) {
            return !!w && w.window === w;
        },

        // 判断是不是对象
        isObject: function (obj) {

            // 防止typeof对null的误判
            if (obj === null) {
                return false;
            }

            // 如果是object或function，那就是对象
            if (typeof obj === 'object' || typeof obj === 'function') {
                return true;
            }

            return false;
        },

        // 判断是不是字符串
        isString: function (str) {
            if (typeof str === 'string') {
                return true;
            }
            return false;
        },

        // 判断是不是字符串
        _isString: function (str) {
            return typeof str === 'string';
        },

        // 判断是不是真数组或伪数组
        isLikeArray: function (arr) {

            // Function、window、!Object
            if (jQuery.isFunction(arr) || jQuery.isWindow(arr) || !jQuery.isObject(arr)) {
                return false;
            }

            // 判断是不是真数组
            if (({}).toString.call(arr) === '[object Array]') {
                return true;
            }

            // 判断是不是伪数组
            if ('length' in arr && (arr.length === 0 || arr.length - 1 in arr)) {
                return true;
            }

            return false;
        },

        ready: function (fn) {

            // DOM已经构造完毕，fn可以直接执行
            if (document.readyState === 'complete') {
                fn();
            }

            // 如果DOM没有构造完毕，那么判断addEventListener是否兼容
            else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', fn);
            }

            // 如果不兼容addEventListener，那么采取attachEvent的方式，
            else {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState === 'complete') {
                        fn();
                    }
                });
            }
        }
    });

    // 这是真正的构造函数，同时把构造函数放在了原型中
    var init = jQuery.fn.init = function (selector) {

        // null、undefined、NaN、0、false、''
        if (!selector) {
            return this;
        }

        // function
        if (jQuery.isFunction(selector)) {

            // 打包给ready静态方法处理
            jQuery.ready(selector);
        }

        // string ==> ( html || selector )
        else if (jQuery.isString(selector)) {

            // 为了用户友好体验，先去掉首尾空白字符
            selector = jQuery.trim(selector);

            // html
            if (jQuery.isHTML(selector)) {

                // 利用一个临时的div来创建DOM，
                // 然后把创建好的DOM依次push给实例。
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = selector;
                [].push.apply(this, tempDiv.childNodes);

            }

            // selector
            else {

                try {
                    [].push.apply(this, document.querySelectorAll(selector));
                } catch (e) {
                    // 如果报错了，那么手动补一个length属性，代表没有获取到任何元素
                    this.length = 0;
                }
            }
        }

        // array || likeArray
        else if (jQuery.isLikeArray(selector)) {
            [].push.apply(this, [].slice.call(selector));
        }

        // 其它
        else {
            this[0] = selector;
            this.length = 1;
        }
    };

    // 替换init的原型为工厂的原型，这样外界就可以通过工厂给实例扩展方法
    init.prototype = jQuery.fn;

    // 暴露工厂和工厂的简称
    w.jQuery = w.$ = jQuery;

}(window));