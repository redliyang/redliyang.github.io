$.fn.extend({

    // 获取指定下标的元素，获取的是原生DOM
    get(i) {
        /*
         * 1、如果传入null或undefined，那么转换为数组返回
         * 2、如果传入的是正数，按照指定的下标获取元素返回
         * 3、如果传入的是负数，按照下标倒着( this.length + 负数 )获取元素返回
         * */
        if (i == null) {
            return this.toArray()
        }
        return i >= 0 ? this[i] : this[this.length + i]
    },

    // 获取指定下标的元素，对get(i)进行包装，获取的是jQuery类型的实例对象。
    eq(i) {
        return i == null ? jQuery() : jQuery(this.get(i))
    },

    // 获取实例中的第一个元素，是jQuery类型的实例对象。
    first() {
        return this.eq(0)
    },

    // 获取实例中的最后一个元素，是jQuery类型的实例对象。
    last() {
        return this.eq(-1)
    },
})
