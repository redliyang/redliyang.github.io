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
            const selfEventCache = self.$_event_cache
            if (!selfEventCache[type]) {
                selfEventCache[type] = []
                selfEventCache[type].push(fn)
                jQuery.addEvent(self, type, (e) => {
                    jQuery.each(selfEventCache[type], (k, fun) => {
                        fun.call(self, e)
                    })
                })
            } else {
                selfEventCache[type].push(fn)
            }
        })
        return this
    },
    off(type, fn) {
        jQuery.each(this, (key, dom) => {
            const self = dom
            if (!this.$_event_cache) {
                // return false
            } else if (arguments.length === 0) {
                for (var key in this.$_event_cache) {
                    this.$_event_cache[key] = []
                }
            } else if (arguments.length === 1) {
                self.$_event_cache[type] = []
            } else {
                for (let i = this.$_event_cache[type].length - 1; i >= 0; i--) {
                    if (this.$_event_cache[type][i] === fn) {
                        this.$_event_cache[type].splice(i, 1)
                    }
                }
            }
            // jQuery.removeEvent(self, type, fn)
        })
        return this

        // var argLen = arguments.length;
        // this.each(function () {
        //     // 没有绑定过任何事件，就不用处理了
        //     if (!this.$_event_cache) {
        //         return;
        //     }
        //     // 如果绑过事件，需要进一步处理
        //     else {

        //         // 如果没有传参，遍历所有的事件数组，分别清空
        //         if (argLen === 0) {
        //             for (var key in this.$_event_cache) {
        //                 this.$_event_cache[key] = [];
        //             }
        //         }

        //         // 如果传如一个参数，则清空指定事件类型的数组
        //         else if (argLen === 1) {
        //             this.$_event_cache[type] = [];
        //         }

        //         // 如果传入多个参数，则清空指定事件类型数组中指定的回调函数
        //         else {

        //             // 遍历对应事件类型的数组，得到每一个回调
        //             for (var i = this.$_event_cache[type].length - 1; i >= 0; i--) {

        //                 // 依次和传入的回调比较，如果相等，则从数组中剔除
        //                 if (this.$_event_cache[type][i] === fn) {
        //                     this.$_event_cache[type].splice(i, 1);
        //                 }
        //             }
        //         }
        //     }
    },
})
function clickHandle() {
    alert('span')
    console.log(this.value)
}
function clickHandle2() {
    alert('spanspanspanspan')
}
$('input').on('click', clickHandle).on('click', clickHandle2).on('click', clickHandle2)
    .off()
// const arr = []
// arr.push(clickHandle)
// arr.push(clickHandle)
// arr.push(clickHandle2)
// console.log(arr)
