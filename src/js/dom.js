$.fn.extend({
    empty() {
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.innerHTML = ''
        })
        return this
    },
    remove() {
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.parentNode.removeChild(self)
        })
        return this
    },
    html(html) {
        if (arguments.length === 0) {
            return this.get(0).innerHTML
        }
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.innerHTML = html
        })
        return this
    },
    text(text) {
        let result = ''
        if (arguments.length === 0) {
            jQuery.each(this, (key, dom) => {
                const self = dom
                result += self.innerText
            })
            return result
        }
        jQuery.each(this, (key, dom) => {
            const self = dom
            self.innerText = text
        })
        return this
    },
    appendTo(selector) {
        const result = []
        const $selector = $(selector)
        let tempNode = null
        jQuery.each(this, (key, dom) => {
            const self = dom
            jQuery.each($selector, (k, parentDom) => {
                const parent = parentDom
                tempNode = (k === 0 ? self : self.cloneNode(true))
                parent.appendChild(tempNode)
                result.push(tempNode)
            })
        })
        return jQuery(result)
    },
    append(context) {
        if (jQuery.isString(context)) {
            jQuery.each(this, (key, dom) => {
                const self = dom
                self.innerHTML += context
            })
        } else {
            $(context).appendTo(this)
        }
        return this
    },
    prependTo(selector) {
        const result = []
        const $selector = $(selector)
        let tempNode = null
        jQuery.each(this, (key, dom) => {
            const self = dom
            jQuery.each($selector, (k, parentDom) => {
                const parent = parentDom
                tempNode = (k === 0 ? self : self.cloneNode(true))
                parent.insertBefore(tempNode, parent.firstChild)
                result.push(tempNode)
            })
        })
        return jQuery(result)
    },
    prepend(context) {
        if (jQuery.isString(context)) {
            jQuery.each(this, (key, dom) => {
                const self = dom
                self.innerHTML = context + self.innerHTML
            })
        } else {
            $(context).prependTo(this)
        }
        return this
    },
})
