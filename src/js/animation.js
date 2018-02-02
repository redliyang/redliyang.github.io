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
