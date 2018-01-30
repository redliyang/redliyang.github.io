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
                console.log(dom)
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
})

// const json = {
//     name: '2',
//     val: 2,
// }
// const cssA = {
//     fontSize: '26px',
//     fontWeight: 'bold',
// }
console.log($('#ee').val('liyang nihao'))