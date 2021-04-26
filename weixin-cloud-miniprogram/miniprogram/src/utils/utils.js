const formatTime = date => {
  const hour = Math.floor(date / 60 / 60)
  const minute = Math.floor(date / 60)
  const second = Math.floor(date % 60)
  const list = hour === 0 ? [minute, second] : [hour, minute, second]
  return list.map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取保存用户信息
 * @param {*} res 
 */
const getSaveUserInfo = () => {
  const app = getApp()
  wx.getUserProfile({
    desc: "完善会员信息",
    success(res) {
      const { encryptedData, iv, signature, userInfo, cloudID } = res
      app.globalData.userInfo = userInfo
      app.globalData.hasUserLogin = true
      // 用户信息上云
      wx.cloud.callFunction({
        name: "addUser",
        data: {
          encryptedData,
          iv,
          signature,
          cloudID,
          userInfo,
          favorites: []
        }
      })
      wx.showToast({
        icon: "none",
        title: '授权登录成功',
      })
    },
    fail() {
      wx.showToast({
        icon: "none",
        title: '登录失败, 请重新授权登录',
      })
    }
  })
}
module.exports = {
  formatTime,
  getSaveUserInfo
}