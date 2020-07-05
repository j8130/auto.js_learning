// 找到控件
var comment = desc("评论").findOne()

log(comment)
// 点击
comment.click()
// 等待弹窗
sleep(1000)

zan = text("赞").findOne()
// 赞不可被点，找到赞的父控件
parentZan = zan.parent()

parentZan.click()
