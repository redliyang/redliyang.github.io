$.fn.extend({
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
    show() {
        return this.css('display', 'block')
    },
    hide() {
        return this.css('display', 'none')
    },
    animate: function animate(json, fn) {
        const ele = this[0]
        // 先清定时器
        clearInterval(ele.timer)
        ele.timer = setInterval(() => {
            // 开闭原则
            let bool = true
            // 遍历属性和值，分别单独处理json
            // attr == k(键)    target == json[k](值)
            jQuery.each(json, (attr, target) => {
                // 四部
                let leader = (attr === 'opacity') ?
                    (jQuery.getStyle(ele, attr) * 100 || 1) :
                    (parseInt(jQuery.getStyle(ele, attr), 10) || 0)
                // 判断如果属性为opacity的时候特殊获取值
                // if (attr === 'opacity') {
                //     leader = jQuery.getStyle(ele, attr) * 100 || 1
                // } else {
                //     leader = parseInt(jQuery.getStyle(ele, attr)) || 0
                // }
                // 1.获取步长
                let step = (target - leader) / 10
                // 2.二次加工步长
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
                leader += step
                // 3.赋值
                // 特殊情况特殊赋值
                if (attr === 'opacity') {
                    ele.style[attr] = leader / 100
                    // 兼容IE678
                    ele.style.filter = `alpha(opacity=${leader})`
                    // 如果是层级，一次行赋值成功，不需要缓动赋值
                    // 为什么？需求！
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

})
