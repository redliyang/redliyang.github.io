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
})

