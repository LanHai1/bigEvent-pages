function $(id) {
    return document.getElementById(id)
}

// 最外层盒子
let box = $("box")
    // 箭头盒子
let arrBox = $("arr")
    // 左箭头
let left_arr = $("left")
    // 右箭头
let right_arr = $("right")
    // 显示区域盒子宽度
let screenWidth = document.querySelector(".screen").offsetWidth
    // 轮播ul
let ul_box = document.querySelector("ul")
    // 页码
let ol_box = document.querySelectorAll("ol>li")

// 定时器id
var timeId
    // 定时器函数
function setDSQ() {
    timeId = setInterval(lb, 2000)
}
// 开启定时器
setDSQ()

// 克隆 将图片第一张 克隆一份到最后
let newLi = ul_box.children[0].cloneNode(true)
ul_box.appendChild(newLi)

// 鼠标移入移除 箭头特效
box.onmouseover = function() {
    // 停止定时器
    clearInterval(timeId)
    arrBox.style.display = "block"
}
box.onmouseout = function() {
    // 开启定时器
    setDSQ()
    arrBox.style.display = "none"
}

// 轮播效果
// 存放图片索引值
let index = 0
    // 存放页码索引 
let currentIndex = 0
    // 点击+1 
right_arr.onclick = function() {
        // 判断是否已经到了最后一张(克隆的那一张)
        lb()
    }
    // 点击-1
left_arr.onclick = function() {
    if (index == 0) {
        index = ul_box.children.length - 1
            // 直接闪现回第一张
        ul_box.style.left = `${-index * screenWidth}px`
    }
    index--
    currentIndex--

    currentIndex = currentIndex == -1 ? (ul_box.children.length - 2) : currentIndex
    setCurrent(ol_box, currentIndex)
    animate(ul_box, (-index * screenWidth))
}

// 设置页码样式
function setCurrent(el, index) {
    for (let i = 0; i < el.length; i++) {
        // 排他 先清空所有的样式
        el[i].className = ""
    }
    // 对应页码设置样式
    el[index].className = "current"
}

// 页面点击
for (let i = 0; i < ol_box.length; i++) {
    // 设置自定义属性 保存下标
    ol_box[i].setAttribute("index", i)
    ol_box[i].onclick = function() {
        index = this.getAttribute("index")
        animate(ul_box, (-index * screenWidth))
        setCurrent(ol_box, index)
    }
}

// 动画效果
function animate(obj, target) {
    // 先清除定时器
    clearInterval(obj.timeId)
    let count = obj.offsetLeft
    obj.timeId = setInterval(function() {
        // 左走还是右走
        count += target > count ? 10 : -10
            // 一定到达目标地点
        count = Math.abs(target - count) > 10 ? count : target
        obj.style.left = `${count}px`
            // 到达目标地点 清除定时器
        if (count == target) {
            clearInterval(obj.timeId)
        }
    }, 10)
}



// 一直轮播
function lb() {
    if (index == ul_box.children.length - 1) {
        index = 0
            // 直接闪现回第一张
        ul_box.style.left = 0
    }
    index++
    currentIndex++

    currentIndex = currentIndex == (ul_box.children.length - 1) ? 0 : currentIndex
    setCurrent(ol_box, currentIndex)
    animate(ul_box, (-index * screenWidth))
}