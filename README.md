# Auto.js

[官方文档](https://hyb1996.github.io/AutoJs-Docs/#/)

## 准备工作

1、手机安装auto.js

2、电脑安装vscode、 Auto.js-VSCodeExt 插件

3、电脑启动服务 vscode输入 `ctrl+shift+p` `Auto.js: Start Server` 

4、运行如下命令有正确结果

~~~javascript
toast("hello")
log("hello log");
~~~

5、手机端打开悬浮窗和音量上键结束所有脚本，防止死循环无法停止



## 语法

### js数据类型

> string		字符串
>
> number	 数字
>
> boolean	布尔
>
> null			空

原始类型：

> undefined			未定义
>
> Object：
>
> ​		Function		方法
>
> ​		Array			 数组
>
> ​		Date			  日期



### 声明变量

> var		变量
>
> const	常量
>
> let		块级作用域变量
>
> 全局变量

### 逻辑运算符

~~~
==		等于
===		全等于
!=		不等于
&&		与
||		或
!		非
~~~



### 转换逻辑与比较

~~~javascript
string + number = string
string - number = number		// 可以理解为 + 拼接  - 数字运算
string == number 	// 尝试把字符串转换成数字
boolean = string	// 转换成 Boolean		除了0和NaN数字类型都是true
Object != Object	// 对象比较，是引用比较
null == undefined
Object == string	// 尝试转换Object为string
Object == number	// 尝试转换Object为number

~~~



### 运算符优先级

js运算符优先级



### 类型监测

~~~javascript
typeof(y)		// 类型检测
instanceof		// 用于监测是否继承
Object.prototype.toString
constructor

~~~



### 语句

~~~javascript
{
    // 块
}

if..else..

for(i=0;i<n;i++){
    log(i)
}

switch (x) {
    case "male":
        log(x)
        break;
    case "female":
        break;
    default:
        break;
}

break
continue
return
while
function	// 函数
try..catch	// 捕异常获
for..in		// 遍历
delete		// 删除

~~~



### 对象

见案例代码



## API解析

### 控件的寻找与操作

页面中看到的元素

#### 常见单个控件

~~~
TextView		文本控件
ImageView		图片控件
CheckBox		勾选控件
EditText		输入控件
View			视图控件

看到的图片不一定是图片控件，可能是其他控件的背景
~~~



#### 常见容器控件

~~~shell
LinearLayout	线性布局容器
RelativeLayOut	相对布局容器
FrameLayout		帧布局
ListView		列表容器
RecyclerView	复用容器
ScrollView		滚动容器

容器之间可以相互嵌套
~~~



##### 布局范围分析

控件信息

<img src="https://raw.githubusercontent.com/j8130/picBed/master/img/20200705154351.png" style="zoom:67%;" />



在布局层次中查看

<img src="https://raw.githubusercontent.com/j8130/picBed/master/img/20200705155206.png" style="zoom:67%;" />



#### 控件寻找



==选择器==

UISelect	 https://hyb1996.github.io/AutoJs-Docs/#/widgetsBasedAutomation?id=uiselector 

常见寻找方式，选择器

~~~javascript
text	desc	id	className

匹配(可以与上面4个结合) idContains("")
Contains	包含
StartWith	开头
EndWith		结尾
Matches		正则

UiSelector.findOne()  // 返回一个UiObject		不建议 
该函数本来应该命名为untilFindOne()，但由于历史遗留原因已经无法修改。如果想要只在屏幕上搜索一次而不是一直搜索，请使用findOnce()。

找1s
id("ss").findOne(1000)

// className
className("ListView").findOnce()

~~~

父子控件

~~~javascript
zan = text("赞").findOne()
// 赞不可被点，找到赞的父控件
parentZan = zan.parent()
~~~





每一个控件都是一个UiObject

UiObject	 https://hyb1996.github.io/AutoJs-Docs/#/widgetsBasedAutomation?id=uiobject 



#### 控件操作

常见的单控件操作

~~~javascript
对象.属性		访问属性
click		   点击
longClick	   长按
scroll			滚动
setText			设置文本
children		遍历
find			子控件寻找

~~~

安卓中能滚动的控件基本上都是继承了 ListView、RecyclerView、ScrollView

[UiObject.scrollDown()](https://hyb1996.github.io/AutoJs-Docs/#/widgetsBasedAutomation?id=uiobjectscrolldown)

~~~javascript

// var name = text("徐智慧").findOnce()

// log(name)

// var nameId = name.id()
// log(nameId)

// boundsInScreen: Rect(166, 851 - 1040, 913)       左上右下 距离选择文本的位置

// 长按
// var img = id("hx").findOnce()
// log(img)

// img.longClick()

// 滚动控件
var gunDongKongJian = className("ListView").findOnce()
log(gunDongKongJian)

// gunDongKongJian.scrollDown()

var subGunDong = gunDongKongJian.children()
// log(subGunDong)
log("==============")
subGunDong.forEach(function (item,position){
    // log(item)
    log("===== 名字 ====")
    var name = item.findOne(className("TextView"))
    log(name)
    log(name.text())

})

// 设置文本
// var input = className("EditView").findOnce()
// log(input)
// input.setText("hello")

~~~



### 基于坐标的操作补充

对于不好通过控件找到的按钮，可以通过坐标寻找

[基于坐标的触摸模拟](https://hyb1996.github.io/AutoJs-Docs/#/coordinatesBasedAutomation?id=基于坐标的触摸模拟)

设置 -> 开发者选项 -> 指针位置 打开



> 以上就是今天基本要讲的内容，其中click，press，swipe是只有安卓7.0及以上才可以使用，现在大部分手机都到了吧..而且需要无障碍服务权限，不然运行会报错：无障碍服务权限未打开。然后程序直接运行结束，为了防止这种事情发生我们可以在代码开头加一行`auto.waitFor();`这句话的功能是，获取无障碍服务权限，如果已经有了，那就继续运行下面的代码，如果没有，就跳转到给无障碍服务权限的界面，并且等待给了权限，再继续运行下面的代码。在代码之前申请好运行的权限是一个好习惯。



微信附近的人遍历

~~~javascript
auto.waitFor();
do {
    click(530, 300)
    sleep(1000)
    back();
    sleep(1000);
    swipe(100, 600, 100, 400, 600)
    sleep(1000)
} while (true)
~~~



~~~javascript
// 手势
// gesture(4000,[100,400],[200,800],[400,500])
~~~



### 应用APP以及一般全局函数

#### [App](https://hyb1996.github.io/AutoJs-Docs/#/app?id=app)

启动微信

~~~javascript
// auto.waitFor();

// 启动微信
// var launchResult = app.launchApp("微信")
//启动微信
launch("com.tencent.mm");

// log(launchResult)
~~~



#### [全局变量与函数](https://hyb1996.github.io/AutoJs-Docs/#/globals?id=全局变量与函数)



~~~javascript
auto.waitFor();
var res = currentPackage()

log("当前包名-->" + res)

// 当前页面，可用于判断是否跳转
var ca = currentActivity()
log("ca-->"+ca)

// 气泡显示消息
toast("message")

// 相当于toast(message);log(message)。显示信息message并在控制台中输出
toastLog("message")

// 返回一个在[min...max]之间的随机数。例如random(0, 2)可能产生0, 1, 2。
random(min, max)
// 返回在[0, 1)的随机浮点数。
random()

// 加载jar包
// runtime.loadJar(path)


// 延迟运行
// log("我开始了")
// setTimeout(() => {
//     log("我运行了")
// }, 4000)

// 当前活动页面
currentActivity()

waitForPackage("com.tencent.mm", 2000)
toastLog("打开了微信")
click(random(100, 800), (800, 1000))
// 等待指定的Activity出现，period为检查Activity的间隔。
waitForActivity("com.tencent.mm.plugin.profile.ui.ContactInfoUI")
log("进入详情页")
exit()
click("打招呼")

~~~



### 图片与颜色的操作

[colors](https://hyb1996.github.io/AutoJs-Docs/#/images?id=colors)

### 本地数据的存储与文件

~~~javascript
// 存储路径  私有目录，只有这个应用可以看到，是临时目录，打包不会打进去
/data/data/pkg/shared_prefs/文件名

// 以键值对存储
var opt = storages.create("测试文件名")
opt.put("key", "value")
~~~





### 线程定时器与http请求



### 多媒体与传感器



### UI入门









































































