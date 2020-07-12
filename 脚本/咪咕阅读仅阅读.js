// 仅阅读

var time = randomInt(15, 25)

readPhase(time)

function readPhase(time) {//翻页读书 可输入时间（分）
    var min = time || 18
    log("阅读阶段:" + min + "分钟开始...")
    var readTime = 0.0
    for (; readTime < parseFloat(min);) {
        log("阅读中...还剩" + (min - readTime) + "分钟。") // i代表分钟

        var pressTime = randomInt(100, 400)
        var delay = randomInt(15 * 1000, 30 * 1000)
        var x = randomInt(device.width * .85 | 0, device.width * .95 | 0)
        var y = randomInt(device.height * .5 | 0, device.height * .9 | 0)
        sleep(delay)
        readTime = floatAdd(readTime, (delay / (60 * 1000)).toFixed(2))
        var tmp = random()
        if (tmp > 0.6) {
            gesture(pressTime, [x, y], [x - 300 * random(0.5, 1), y + 400 * random(-1, 0.4)])
        } else {
            gesture(pressTime, [x, y], [x, y])
        }
    }
    log("阅读阶段结束...")
}
//float加法
function floatAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    return parseInt(Math.round(arg1 * m) + Math.round(arg2 * m)) / m;
}
function randomInt(start, end) {
    return start + ((Math.random() * (end - start + 1)) | 0)
}
