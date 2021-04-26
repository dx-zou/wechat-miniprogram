// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const {userId, docId} = event
  // 查询当前用户信息
  const f = await db.collection('users').doc(userId).get()
  const arr = f.data.favorites || []
  const index = arr.findIndex(item => item === docId)
  if(index === -1) {
    arr.push(docId)
  } else {
    arr.splice(index,1)
  }
  // 更新用户收藏的文档
  const res = await db.collection('users').doc(userId).update({
    data: {
      favorites: arr
    },
  })
  // 更新文档被收藏数
  await db.collection('docs').doc(docId).update({
    data: {
      liked: _.inc(index === -1 ? 1 : -1)
    }
  })
  return {
    data: res.data,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}