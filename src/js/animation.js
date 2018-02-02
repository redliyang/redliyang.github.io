$.fn.extend({
    height: '',
    display: '',
    opacity: '', // 兼容IE678 值取 10 - 100
    animate: function animate(json, fn) {
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
                // 4.清除定时器
                // 判断: 目标值和当前值的差大于步长，就不能跳出循环
                // 不考虑小数的情况：目标位置和当前位置不相等，就不能清除清除定时器。
                if (target !== leader) {
                    bool = false
                }
            })
            console.log(1)
            // 只有所有的属性都到了指定位置，bool值才不会变成false；
            if (bool) {
                clearInterval(ele.timer)
                // 所有程序执行完毕了，现在可以执行回调函数了
                // 只有传递了回调函数，才能执行
                if (fn) {
                    fn()
                }
            }
        }, 25)
        return this
    },
    show() {
        const self = this
        return self.css('display', $.fn.display)
    },
    hide() {
        const self = this
        // 使用原型属性 保存DOM原来对 display模式
        $.fn.display = self.css('display')
        return self.css('display', 'none')
    },
    toggle() {
        const self = this
        return self.css('display') === 'none' ?
            self.show() : self.hide()
    },
    slideDown() {
        const self = this
        if (self.css('display') === 'block') {
            return self
        }
        self.show()
        self.animate({ height: $.fn.height }, () => self)
        return self
    },
    slideUp() {
        const self = this
        if (self.css('display') === 'none') {
            return self
        }
        // 使用原型属性 保存DOM原来对 height(不加px)
        $.fn.height = parseInt(self.css('height'), 10)
        self.animate({ height: 0 }, () => {
            self.hide()
        })
        return self
    },
    slideToggle() {
        return this.css('display') === 'none' ?
            this.slideDown() : this.slideUp()
    },
    fadeIn() {
        const self = this
        if (self.css('display') === 'none') {
            return self
        }
        // 使用原型属性 保存DOM原来对 兼容IE678 值取 10 - 100
        $.fn.opacity = self.css('opacity') * 100
        self.animate({ opacity: 0 }, () => {
            self.hide()
        })
        return self
    },
    fadeOut() {
        const self = this
        if (self.css('display') === 'block') {
            return self
        }
        self.show()
        self.animate({ opacity: $.fn.opacity }, () => self)
        return self
    },
    fadeTo(val, fn) {
        return this.animate({ opacity: val }, fn)
    },
    fadeToggle() {
        return this.css('display') === 'none' ?
            this.fadeOut() : this.fadeIn()
    },
    say(blinkDom, content = '大家好！我是李阳', time = 400) {
        let num = 0
        let str = ''
        const self = this
        const $blinkDom = $(blinkDom)
        const arr = content.split('')
        $blinkDom.css('display', 'inline')
        const timer = setInterval(() => {
            if (arr[num] === undefined) {
                clearInterval(timer)
                $('.typedCursor')[0].style.display = 'none'
            } else {
                str += arr[num]
                self.text(str)
                num += 1
            }
        }, time)
        //  display: none; opacity: 1; animation: blink .7s infinite;
        //  @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
    },
})

const json1 = {
    left: 300,
    top: 200,
    width: 500,
    height: 200,
    opacity: 30,
    zIndex: 1,
}

$('#a1').click(() => {
    console.log($('div').fadeIn(json1))
    // $('button').slideDown()
})
$('#a2').click(() => {
    console.log($('div').fadeOut(json1))
    // $('button').slideDown()
})
$('#a3').click(() => {
    console.log($('div').fadeToggle(json1))
    // $('button').slideDown()
})
$('#a4').click(() => {
    console.log($('div').fadeTo(100))
    // $('button').slideDown()
})
// console.log($('button').hide().show())
// // $('button').slideDown()
// console.log(1)
