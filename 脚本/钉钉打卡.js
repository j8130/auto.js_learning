
startDaka()
cleanStage()

function startDaka() {
    if (device.isScreenOn()) {
        dakaStage()
    } else {
        unlockStage()
        dakaStage()
    }
}

function unlockStage() {//上划解锁屏幕 unlock screen
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
        sleep(100)
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

function dakaStage() {
    app.launch("com.alibaba.android.rimet")
    sleep(10 * 1000) //等待10s
    back()

}

function cleanStage() {//杀进程 Clean memory
    home()
    sleep(2 * 1000)
    recents()

    sleep(2 * 1000)
    click(550, 2200)
}

