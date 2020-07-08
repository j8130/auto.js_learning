console.show()
unlockPhase()
openPhase()
readPhase()
reportPhase()
cleanPhase()
console.hide()

function unlockPhase() {//上划解锁屏幕 unlock screen
  var password = '1234'
  if (!device.isScreenOn()) {
    device.wakeUpIfNeeded()
  }
  sleep(2000)
  小米锁屏上滑动作()
  sleep(300)
  for (var i = 0; i < password.length; i++) {
    a = password.charAt(i)
    log(a)
    sleep(200)
    b = text(a).findOne().bounds()
    click(b.centerX(), b.centerY())
  }
  function 小米锁屏上滑动作() {
    var xyArr = [220]
    var x0 = device.width / 2
    var y0 = device.height / 4 * 3
    var angle = 0
    var x = 0
    var y = 0
    for (let i = 0; i < 30; i++) {
      y = x * tan(angle)
      log(y)
      if ((y0 - y) < 0) {
        break
      }
      var xy = [x0 + x, y0 - y]
      xyArr.push(xy)
      x += 5;
      angle += 3
    }
    gesture.apply(null, xyArr)
    function tan(angle) {
      return Math.tan(angle * Math.PI / 180);
    }
  }
}

function openPhase() {//打开书架上第一本书 
  var startUp = app.launch("com.ophone.reader.ui")
  images.requestScreenCapture() // 请求截图权限，并不会截图
  sleep(10 * 1000) //等待广告过后完全启动

  var navbar = id("bottom_navigation_bar_item_container").findOne(1 * 1000)
  log(navbar)
  navbar.child(0).click()

  sleep(1 * 1000)
  id("book_shelf_item_layout").findOne(10 * 1000).click()
}

function readPhase(time) {//翻页读书 可输入时间（分）
  var min = time || 20
  log("阅读阶段:" + min + "分钟开始...")
  for (var i = 0; i < min; i++) {
    var dif = (Math.random() * 2000) | 0
    var y1 = (device.height / 2 + dif % 11) | 0
    var x1 = (device.width - 50 + dif % 11) | 0
    log("阅读中还剩" + (min - i) + "分钟。")

    sleep(20 * 1000 - dif)
    click(x1, y1)

    sleep(20 * 1000 + dif)
    click(x1, y1)

    sleep(20 * 1000)
    click(x1, y1)
  }

  console.log("阅读阶段结束...")
  back()
}

function reportPhase() {//搜索活动页并签到
  sleep(2 * 1000)
  className("android.widget.TextView").id("btn_bookshelf_search").findOne().click()
  //搜索天天爱阅读
  sleep(2 * 1000)
  var inputBox = className("android.widget.EditText").id("etSearch").findOne()
  inputBox.setText("天天爱阅读")

  text("搜索").findOne().click()
  //点击活动
  text("%E6%90%9C%E7%B4%A2%E5%8F%A3%E4%BB%A4%E5%9B%BE").findOne().click()

  sleep(2 * 1000)
  var checkoutBtn = text("签到").find()
  for (var it of checkoutBtn) {
    it.click()
  }
  sleep(3 * 1000)

  if (checkoutBtn.length >= 2) {
    back()
    sleep(1 * 1000)
  }

  //判断成功与否并记录
  var taskComplete = text("已完成").find()
  var fullDate = new Date().toLocaleString()
  var date = new Date().toLocaleDateString()
  if (taskComplete.length === 2) {
    var screenShotPath = "/sdcard/脚本/" + date + "咪咕打卡.png"
    log(fullDate + "咪咕签到成功✅\n截图文件保存在" + screenShotPath + "\n")
    sleep(500)
    images.captureScreen(screenShotPath)
    toast("咪咕签到成功✅")
  } else {
    log(fullDate + "咪咕签到失败💢\n⚠请自行检查⚠")
  }
  sleep(8 * 1000)
}

function cleanPhase() {//杀进程 Clean memory
  home()
  sleep(2 * 1000)
  recents()

  sleep(2 * 1000)
  click(550, 2200)
}



// function readPhase(time){//翻页读书 可输入时间（分）
//   var min = time || 18
//   log("阅读阶段:" + min + "分钟开始...")
//   for(var i = 0; i < min; i++){
//       log("阅读中...还剩" + (min-i) + "分钟。")

//       for(var j = 0; j < 4; j++){
//         var delay = randomInt(15 * 1000, 20 * 1000)
//         var x = randomInt(device.width * .85 | 0, device.width * .95 | 0)
//         var y = randomInt(device.height * .5 | 0, device.height * .9 | 0)
//         sleep(delay)
//         gesture(pressTime, [x, y], [x, y])
//       }
//   }

//   log("阅读阶段结束...")
//   back()
// }

// function randomInt(start, end){
//   return start  + ((Math.random() * (end - start + 1)) | 0) 
// }