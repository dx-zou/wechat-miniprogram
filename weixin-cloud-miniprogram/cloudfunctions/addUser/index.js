// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
/**
 * 用户信息上云
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
  const {
    encryptedData,
    iv,
    signature,
    cloudID,
    userInfo
  } = event;
  const res = await db.collection("users").add({
    data: {
      _openid: wxContext.OPENID,
      iv,
      encryptedData,
      signature,
      cloudID,
      ...userInfo
    }
  })
  return {
    data: res.data,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}