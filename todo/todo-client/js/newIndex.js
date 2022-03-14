let taskItems = document.querySelector('.matters').children
for (let i = 0; i < taskItems.length; i++) {
    const item = taskItems[i]
    item.addEventListener('click', showTaskDetail)
}
const mask = document.querySelector('.mask')
const taskDetail=document.querySelector('.task-detail')

mask.addEventListener('click', function (e) {
    mask.style.display = 'none'
    taskDetail.style.transform='translateX(100%)'
})

function showTaskDetail(e) {
    mask.style.display = 'block'
    taskDetail.style.transform='translateX(0)'
    taskDetail.style.display='flex'
}

