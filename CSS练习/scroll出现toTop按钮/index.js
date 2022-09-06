const main = document.querySelector('main')
const toTop = document.querySelector('a')
window.addEventListener('scroll', e => {
    console.log(scrollY);
    if (scrollY >= 200) {
        toTop.style.opacity = 1
        toTop.style.height = '100px'
    }
    else {
        toTop.style.opacity = 0
        toTop.style.height = '0px'
    }
})