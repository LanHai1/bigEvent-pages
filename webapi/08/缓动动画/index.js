let btn = document.getElementById("btn")
let btn1 = document.getElementById("btn1")
let box = document.querySelector(".box")

// 为按钮添加点击事件
btn.onclick = function() {
    animation(box, {
        width: 400,
        height: 900
    })
}
btn1.onclick = function() {
    animation(box, {
        left: 400,
        opacity: 0.3,
        backgroundColor: "#000",
        zIndex: 99
    }, function() {
        console.log("diao")
        animation(box, {
            width: 100,
            opacity: 1,
            height: 300,

        })
    })
}


/**
 * 动画函数
 * @param {element} el 
 * @param {json => 存放属性名和目标属性值} attrs 
 * @param {fn} callback 
 */
function animation(el, attrs, callback) {
    // 先清理定时器 避免多次点击 
    clearInterval(el.timeId)

    // 将定时器id给移动元素 id唯一化 互不影响
    el.timeId = setInterval(() => {
        // 记录是否各个属性都已到达目标点
        let flagTimeId = true

        for (const key in attrs) {

            // 处理透明度
            if (key == "opacity") {

                let current = window.getComputedStyle(el)[key] * 100

                // 判断是否往左右走  右走向上取整 左走向下取整
                current += attrs[key] > current ? Math.ceil((attrs[key] * 100 - current) / 10) : Math.floor((attrs[key] * 100 - current) / 10)

                // 设置样式值
                el.style[key] = `${current / 100}`

                // 还原之前的当前值 为了后面清除定时器
                current = current / 100

                // 判断是否还有属性未达到目标点
                if ((current) != attrs[key]) {
                    flagTimeId = false
                }
            } else if (key == "background-color" || key == "backgroundColor") {
                // 判断是否为颜色 处理 直接赋值
                el.style[key] = attrs[key]
            } else if (key == "zIndex") {
                // 层级
                el.style[key] = attrs[key]
            } else {
                let current = parseInt(window.getComputedStyle(el)[key])

                // 判断是否往左右走  右走向上取整 左走向下取整
                current += attrs[key] > current ? Math.ceil((attrs[key] - current) / 10) : Math.floor((attrs[key] - current) / 10)

                // 设置样式值
                el.style[key] = `${current}px`
                    // 判断是否还有属性未达到目标点
                if ((current) != attrs[key]) {
                    flagTimeId = false
                }
            }

        }

        // 全部达到目标点
        if (flagTimeId) {
            // 清除定时器
            clearInterval(el.timeId)

            // 回调函数 继续执行后续代码
            // 判断是否传入的是函数
            if (callback instanceof Function) {
                console.log("ok")
                console.log(callback)
                callback()
            }
        }
    }, 20)
}