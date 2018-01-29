$.fn.extend({
    empty: function () {
        // for (var i = 0; i < this.length; i++) {
        //    this[i].innerHTML = '';
        // }
        this.each(function () {
            this.innerHTML = ''
        })
        return this
    },
    remove: function () {
        // for (var i = 0; i < this.length; i++) {
        //    this[i].parentNode.removeChild(this[i]);
        // }
        this.each(function () {
            this.parentNode.removeChild(this)
        })
        return this
    },
    html: function (html) {
        if (arguments.length === 0) {
            return this[0].innerHTML
        } else if (arguments.length >= 1) {
            // for (var i = 0; i < this.length; i++) {
            //    this[i].innerHTML = html;
            // }
            this.each(function () {
                this.innerHTML = html
            })
        }
        return this
    },
    text: function (text) {
        let result = ''
        if (arguments.length === 0) {
            // for (var i = 0, len = this.length; i < len; i++) {
            //    result += this[i].innerText;
            // }
            this.each(function () {
                result += this.innerText
            })
            return result
        } else {
            // for (var i = 0, len = this.length; i < len; i++) {
            //    this[i].innerText = text;
            // }
            this.each(function () {
                this.innerText = text
            })
        }
        return this
    },
    appendTo: function (selector) {
        let result = []
        let tempNode = null
        let $selector = $(selector)
        // for (var i = 0, len = this.length; i < len; i++) {
        //    for (var j = 0, jLen = $selector.length; j < jLen; j++) {
        //       if (j === 0) {
        //           tempNode = this[i];
        //           $selector[j].appendChild(this[i]);
        //           result.push(this[i]);
        //       } else {
        //           tempNode = this[i].cloneNode(true);
        //           $selector[j].appendChild(tempNode);
        //           result.push(tempNode);
        //       }
        //    }
        // }
        this.each(function () {
            let self = this
            $selector.each(function (i) {
                tempNode = (i === 0 ? self : self.cloneNode(true))
                this.appendChild(tempNode)
                result.push(tempNode)
            })
        })
        return jQuery(result)
    },
    append: function (context) {
        let $context = $(context)
        if (jQuery.isString(context)) {
            // for (var i = 0, len = this.length; i < len; i++) {
            //    this[i].innerHTML += context;
            // }
            this.each(function () {
                this.innerHTML += context
            })
        } else {
            $context.appendTo(this)
        }
        return this
    },
    prependTo: function (selector) {
        let result = []
        let tempNode = null
        let $selector = $(selector)
        // for (var i = 0, len = this.length; i < len; i++) {
        //    for (var j = 0, jLen = $selector.length; j < jLen; j++) {
        //     tempNode = (j === 0 ? this[i] : this[i].cloneNode(true));
        //     $selector[j].insertBefore(tempNode, $selector[j].firstChild);
        //     result.push(tempNode);
        //    }
        // }
        this.each(function () {
            let self = this
            $selector.each(function (i) {
                tempNode = (i === 0 ? self : self.cloneNode(true))
                this.insertBefore(tempNode, this.firstChild)
                result.push(tempNode)
            })
        })
        return jQuery(result)
    },
    prepend: function (context) {
        let $context = $(context)
        if (jQuery.isString(context)) {
            // for (var i = 0, len = this.length; i < len; i++) {
            //    this[i].innerHTML = context + this[i].innerHTML;
            // }
            this.each(function () {
                this.innerHTML = context + this.innerHTML
            })
        } else {
            $context.prependTo(this)
        }
        return this
    }
})
