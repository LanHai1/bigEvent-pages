/**
 * 根据id获取元素
 * @param {string} id 
 */
let $ = id => document.getElementById(id);

// 联想数据
var keywords = ["林利群", "林利群为什么很黑", "林利群的经纪人是周林林吗", "林利群是谁", "广东人", "广东人爱吃", "广东人爱吃福建人", "林丹的生平", "JavaScript",
    "Java", "王思聪", "王健林", "社会王", "隔壁老王", "林绿群", "你打球像蔡徐坤", 'aaa', 'bbb', '王祖蓝', '你打球王祖蓝'
];

// 键盘抬起联想
$("txt").onkeyup = () => {
    // 未输入不联想
    if ($("txt").value.length == 0) {
        $("ul_box").innerHTML = ""
        return
    }
    // 先清空之前联想的数据
    $("ul_box").innerHTML = "";
    // 循环遍历数据
    for (let i = 0; i < keywords.length; i++) {
        // 判断是否有联想数据
        if (keywords[i].indexOf($("txt").value) > -1) {
            let li = document.createElement("li");
            li.innerHTML = keywords[i];
            $("ul_box").appendChild(li);
            li.onmouseover = function() {
                this.style.backgroundColor = "#ccc"
            }
            li.onmouseout = function() {
                this.style.backgroundColor = ""
            }
        }
    }
}

// 历史记录提示功能
// 保存用户输入的记录
$("search").onclick = function() {
    // 获取之前数据
    let oldData = localStorage.getItem("search_data") || "";
    // 判断是否未输入 判断是否数据已存在
    if ($("txt").value.length == 0 || oldData.indexOf($("txt").value) > -1) {
        return
    }
    // 判断是否有数据 逗号拼接
    let newData = oldData ? `${oldData},${$("txt").value}` : $("txt").value;

    localStorage.setItem("search_data", newData);
}

// 文本框 获取光标时 显示历史记录
$("txt").onfocus = function() {
    // 先清空之前联想的数据
    $("ul_box").innerHTML = "";
    // 获取之前数据
    let oldData = localStorage.getItem("search_data") || "";
    let arr_newData = oldData.split(",");
    for (let i = 0; i < arr_newData.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = arr_newData[i];
        $("ul_box").appendChild(li);
        li.onmouseover = function() {
            this.style.backgroundColor = "#ccc"
        }
        li.onmouseout = function() {
            this.style.backgroundColor = ""
        }
        li.onclick = function() {
            $("txt").value = this.innerHTML
        }
    }
}

// 失去光标
$("txt").onblur = function() {
    setTimeout(() => {
        $("ul_box").innerHTML = "";
    }, 10)
}