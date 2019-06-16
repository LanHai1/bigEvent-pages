function $(id) {
    return document.getElementById(id)
}

let box = $("box")
let arr_box = $("arr")
let left_arr = $("left")
let right_arr = $("right")
let screenWidth = document.querySelector(".screen").offsetWidth
let ul_box = document.querySelector(".screen > ul")
let ol_box_list = document.querySelectorAll(".screen > ol  > li")
let timeId
timeId = setInterval(nextPage, 2000)

// 克隆
ul_box.appendChild(ul_box.children[0].cloneNode(true))


box.onmouseover = function() {
    clearInterval(timeId)
    arr_box.style.display = "block"
}

box.onmouseout = function() {
    timeId = setInterval(nextPage, 2000)
    arr_box.style.display = "none"
}

let index = 0
let pageIndex = 0
right_arr.onclick = function() {
    nextPage()
}


left_arr.onclick = function() {
    if (index == 0) {
        index = ul_box.children.length - 1
        ul_box.style.left = `${-index*screenWidth}px`
    }
    index--
    pageIndex--
    if (pageIndex == -1) {
        pageIndex = ul_box.children.length - 2
    }
    pageClass(ol_box_list, pageIndex)
    animation(ul_box, -index * screenWidth)
}

for (let i = 0; i < ol_box_list.length; i++) {
    ol_box_list[i].setAttribute("index", i)
    ol_box_list[i].onclick = function() {
        if (+this.getAttribute("index") == 4 && index == 5) {
            // 优化
        }
        index = pageIndex = +this.getAttribute("index")
        pageClass(ol_box_list, +this.getAttribute("index"))
        animation(ul_box, -index * screenWidth)
    }
}

// 页码样式
function pageClass(el, thisIndex) {
    for (let i = 0; i < el.length; i++) {
        el[i].className = ""
    }
    el[thisIndex].className = "current"
}

function nextPage() {
    if (index == ul_box.children.length - 1) {
        index = 0
        ul_box.style.left = 0
    }
    index++
    pageIndex++
    if (pageIndex == ul_box.children.length - 1) {
        pageIndex = 0
    }
    pageClass(ol_box_list, pageIndex)
    animation(ul_box, -index * screenWidth)
}

function animation(el, target) {
    clearInterval(el.timeId)
    el.timeId = setInterval(() => {
        let count = el.offsetLeft
        count += target > count ? 10 : -10
        count = Math.abs(target - count) > 10 ? count : target
        el.style.left = `${count}px`
        if (count == target) {
            clearInterval(el.timeId)
        }
    }, 10)
}