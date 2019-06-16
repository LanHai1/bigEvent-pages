/**
 * 根据id获取元素
 * @param {string} id 
 */
let $ = id => document.getElementById(id);

/**
 * 缓动动画
 * @param {element} el 
 * @param {json{key:value}} attrs 
 * @param {fn} callback 
 */
function animation_s(el, attrs, callback) {
    clearInterval(el.timeId);
    el.timeId = setInterval(() => {
        let flag = true;
        for (const key in attrs) {
            // 当前状态
            let current = parseInt(window.getComputedStyle(el)[key]);
            // 目标状态
            let target = attrs[key];
            // 每次移动状态
            let temp = target > current ? Math.ceil((target - current) / 10) : Math.floor((target - current) / 10);
            current += temp;
            el.style[key] = `${current}px`;
            if (target != current) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(el.timeId);
            if (callback instanceof Function) {
                callback();
            }
        }
    }, 10)
}

let cloud = $("cloud");
let navBar_list = $("navBar").children;
let navBar_list_width = +navBar_list[0].offsetWidth;


// cloud.onclick
let thisIndex = 0;
for (let i = 0; i < navBar_list.length; i++) {
    navBar_list[i].setAttribute("index", i)
    navBar_list[i].onmouseover = function() {
        let offLeft = +this.getAttribute("index") * navBar_list_width;
        animation_s(cloud, {
            left: offLeft
        })
    }
    navBar_list[i].onmouseout = function() {
        animation_s(cloud, {
            left: thisIndex * navBar_list_width
        })
    }
    navBar_list[i].onclick = function() {
        thisIndex = +this.getAttribute("index")
    }
}