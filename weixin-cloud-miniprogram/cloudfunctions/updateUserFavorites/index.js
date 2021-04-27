// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 文档收藏
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const {docId} = event
  // 查询文档是否被当前用户收藏
  const f = await db.collection('docs').doc(docId).get()
  const arr = f.data.likedUsers || []
  const index = arr.findIndex(item => item.openid === wxContext.OPENID)
  if(index === -1) {
    arr.push({
      openid: wxContext.OPENID,
      createTime: new Date()
    })
  } else {
    arr.splice(index,1)
  }

  // 更新文档收藏数据
  const res = await db.collection('docs').doc(docId).update({
    data: {
      likedUsers: arr
    }
  })
  return {
    data: res.data
  }
}