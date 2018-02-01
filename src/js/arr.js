$.fn.extend({
    // 遍历实例
    each(fn) {
        return jQuery.each(this, fn)
    },
    // 通过实例得到一个新数组
    map(fn) {
        return jQuery.map(this, fn)
    },
    // 截取实例的部分元素，构成一个新的jQuery实例返回
    slice() {
        return jQuery([].slice.apply(this, arguments))
    },
    // 把实例转换为数组返回
    toArray() {
        return [].slice.call(this)
    },
    // 原型上的方法供实例调用，
    // 即实例.push，在调用过程中，push内的this就指向了实例，
    // 所以这里不需要通过call和apply改变this指向即可借用数组的方法
    push: [].push,
    sort: [].sort,
    splice: [].splice,
})
