// 语法
// 弹出提示hello
toast("hello")

// 打印日志
log("hello log");


// 数据类型
"aaa"   //字符串
124     // number
false, true  //bool
null        //监测对象是否存在
undefined   //变量是否存在

// ----------------- 对象 --------------
Object  //对象
var jsy = { "sex": "male", "hobbi": "female" }

// String 转 Number
var x = "123" - 0   // 123
// Number 转 String
var y = 123 + ""    // "123"

log(typeof (y))

switch (x) {
    case "male":
        log(x)
        break;
    case "female":
        break;
    default:
        break;
}

function method1() {
    var a = 1
    return a
}

// 对象 两种创建方式
var obj1 = {}
var obj2 = new Object()
// 赋值与取值
var obj3 = { x: 1, y: "female" }
obj3.z = "obj  z"
obj3["a"] = "jjj"

log(obj3.x)
log(obj3["x"]) // 常用于在for循环里面使用

log(obj3.z)
log(obj3.a)

obj3.v = "ppp"
// 判空
if (obj3 != null) { log("obj3 not null") }
if (obj3.v) {
    log("对象非空")
    log(obj3.v)
    log(obj3.v.a)
} else {
    log("对象为空")
}

// 删除
var flag = delete obj3.v
log(obj3.v)
log(flag)

// 判断是否存在
log(obj3.v)

// 判断 u 中是否存在 a 属性
var u = { a: 1, b: 2 }

log("a" in u)

if (u && u.a) {
    log(u.a)
}

// 枚举遍历
x = { a: 1, b: 2, c: 3, d: 4 }
// in可能不是按照顺序来的
for (key in x) {
    log("key --> " + key + "value  --> " + x[key])
}

// -------------- 数组 -------------------
// 创建
var arr = [1, "2", "c", 3, 4]
var arr2 = new Array()

log(arr[0])
// 添加 尾部
arr.push(5)
arr[arr.length] = 6
// 添加 头部
arr.unshift(0)

log(arr)

// 移除尾部
arr.pop()
// 移除头部
arr.shift()
log(arr)

// 遍历
for (i = 0; i < arr.length; i++) {
    log(arr[i])
}
// 无序
for (key in arr) {
    element = arr[key];
    log(element)
}

// 按--分割打印
log(arr.join("--"))

// 排序 默认字母排序
log(arr.sort())

arr.forEach(function(i,p,x){
    // i:具体的值
    // p:当前索引
    // x:数组本身
    log(i)
    log(p)
    log(x)
    log("====")
})

log(arr.indexOf("c"))   // 5
log(arr.indexOf("cf"))  // -1 找不到
if (arr.indexOf("c")){
    // 如果数组包含c，执行
}

// -------- 函数 ------------
function method(a, b) {
    log("这是函数体")
    return a + b
}

var res = method(2, 4)
log(res)

log("end")