// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
/**
 * 每次点击文章，阅读数加1
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const res = await db.collection('docs').doc(event.id).update({
    data: {
      // 指示数据库将字段自增 1
      read: _.inc(1)
    },
  })

  return {
    data: res.data,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}