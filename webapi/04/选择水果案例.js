// 左边区域
let left_ul = $("ul_left")

// 右边区域
let right_ul = $("ul_right")

// 按钮
let allRight = $("btn1")
let allLeft = $("btn2")
let oneRight = $("btn3")
let oneLeft = $("btn4")

function $(id) {
    return document.getElementById(id)
}

// 全部 从左到右
// allRight.onclick = function() {
//     right_ul.innerHTML += left_ul.innerHTML
//     left_ul.innerHTML = ""
// }
allRight.addEventListener('click', function() {
    right_ul.innerHTML += left_ul.innerHTML
    left_ul.innerHTML = ""
}, false)

// 全部 从右到左
allLeft.addEventListener('click', function() {
    left_ul.innerHTML += right_ul.innerHTML
    right_ul.innerHTML = ""
}, false)


// 鼠标移入每个li
for (let i = 0; i < left_ul.children.length; i++) {
    left_ul.children[i].addEventListener("mouseover", function() {
        clearStyleBGC(left_ul.children)
        this.style.backgroundColor = `rgba(${randomBGC()},${randomBGC()},${randomBGC()},0.5)`
    }, false)
}



// 鼠标移出ul
left_ul.onmouseout = () => {
    clearStyleBGC(left_ul.children)
}

// 清除ul样式
function clearStyleBGC(el) {
    for (let i = 0; i < el.length; i++) {
        el[i].removeAttribute("style")
    }
}

// 随机颜色
function randomBGC() {
    return parseInt(Math.random() * 255)
}