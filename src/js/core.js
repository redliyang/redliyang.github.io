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

console.log(1)