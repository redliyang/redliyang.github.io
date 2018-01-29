// 给原型扩展CORE操作方法，这样jQ实例就可以使用了
$.fn.extend({

    // 获取版本号
    jquery: version,

    // 代表所有实例默认的选择器，也代表实例是一个jQuery类型的对象
    selector: '',

    // 代表所有实例默认的长度
    length: 0,

    // 把实例转换为数组返回
    toArray: function () {
        return [].slice.call(this);
    },

    // 获取指定下标的元素，获取的是原生DOM
    get: function (i) {
        /*
         * 1、如果传入null或undefined，那么转换为数组返回
         * 2、如果传入的是正数，按照指定的下标获取元素返回
         * 3、如果传入的是负数，按照下标倒着( this.length + 负数 )获取元素返回
         * */

        // null、undeinfed
        if (i == null) {
            return this.toArray();
        }

        // 其他
        if (i >= 0) {
            return this[i];
        } else {
            return this[this.length + i];
        }
    },

    _get: function (i) {
        return i == null ?
            this.toArray() :
            (i >= 0 ? this[i] : this[this.length + i]);
    },

    // 遍历实例
    each: function (fn) {
        return jQuery.each(this, fn);
    },

    // 通过实例得到一个新数组
    map: function (fn) {
        return jQuery.map(this, fn);
    },

    // 截取实例的部分元素，构成一个新的jQuery实例返回
    slice: function () {
        /*
         * 1、通过数组的slice截取部分元素(slice返回的是数组)，
         * 2、把截取到的元素转换为实例对象返回。
         * */

        // 因为slice的参数会有变化，所以需要是arguments，
        // 我们要把arguments中的每一项传给数组的slice，所以需要借用apply平铺传递过去，
        // 最后把slice返回数组，通过jQuery工厂保证成实例返回。
        var nodes = [].slice.apply(this, arguments);
        return jQuery(nodes);
    },

    _slice: function () {
        // 因为slice的参数会有变化，所以需要是arguments，
        // 我们要把arguments中的每一项传给数组的slice，所以需要借用apply平铺传递过去，
        // 最后把slice返回数组，通过jQuery工厂保证成实例返回。
        return jQuery([].slice.apply(this, arguments));
    },

    // 获取指定下标的元素，获取的是jQuery类型的实例对象。
    eq: function (i) {
        /*
         * 1、如果传入null或undefined，返回一个新实例，
         * 2、如果传入的是正数，按照指定的下标获取元素，再包装成新实例返回
         * 3、如果传入的是负数，按照下标倒着( this.length + 负数 )获取元素，再包装成新实例返回
         * */

        // null、undefined得到新实例
        if (i == null) {
            return jQuery();
        }

        if (i >= 0) {
            return jQuery(this[i]);
        } else {
            return jQuery(this[this.length + i]);
        }
    },

    _eq: function (i) {
        return i == null ? jQuery() : jQuery(this.get(i));
    },

    // 获取实例中的第一个元素，是jQuery类型的实例对象。
    first: function () {
        return this.eq(0);
    },

    // 获取实例中的最后一个元素，是jQuery类型的实例对象。
    last: function () {
        return this.eq(-1);
    },

    // 原型上的方法供实例调用，
    // 即实例.push，在调用过程中，push内的this就指向了实例，
    // 所以这里不需要通过call和apply改变this指向即可借用数组的方法
    push: [].push,
    sort: [].sort,
    splice: [].splice
});