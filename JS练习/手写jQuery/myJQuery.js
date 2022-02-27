window.$ = window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector)
    return {
        length: elements.length,

        addClassName(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className)
            }
            return this
        },
    }
}