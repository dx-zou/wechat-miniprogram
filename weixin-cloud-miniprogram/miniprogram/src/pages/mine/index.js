const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickName: "",
    hasUserLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const { avatarUrl, nickName } = app.globalData.userInfo
    // this.setData({
    //   avatarUrl,
    //   nickName,
    //   hasUserLogin: app.globalData.hasUserLogin
    // })
  },
  // 用户授权登录流程
  async toLogin() {
    wx.getUserProfile({
      desc: "完善会员信息",
      success: (res) => {
        const { encryptedData, iv, signature, userInfo, cloudID } = res
        app.globalData.userInfo = userInfo
        app.globalData.hasUserLogin = true
        this.setData({
          hasUserLogin: true,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        })
        wx.showToast({
          icon: "none",
          title: '授权登录成功',
        })
        // 用户信息上云
        wx.cloud.callFunction({
          name: "addUser",
          data: {
            encryptedData,
            iv,
            signature,
            cloudID,
            userInfo
          }
        })
      },
      fail() {
        wx.showToast({
          icon: "none",
          title: '登录失败, 请重新授权登录',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const { avatarUrl, nickName } = app.globalData.userInfo
    this.setData({
      avatarUrl,
      nickName,
      hasUserLogin: app.globalData.hasUserLogin
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})