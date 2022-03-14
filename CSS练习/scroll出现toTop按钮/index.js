const main = document.querySelector('main')
const toTop = document.querySelector('a')
window.addEventListener('scroll', e => {
    console.log(scrollY);
    if (scrollY >= 200) {
        toTop.style.display = 'block'
    }
    else {
        toTop.style.display = 'none'
    }
})