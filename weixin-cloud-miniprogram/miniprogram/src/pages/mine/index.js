const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickName: "",
    hasUserLogin: false,
    showLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {},

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

  // 登录成功
  onSuccess(e) {
    const {nickName, avatarUrl } = e.detail
    this.setData({
      hasUserLogin: true,
      showLogin: false,
      nickName,
      avatarUrl
    })
  },

  // 没有登录时
  onUnLogin() {
    this.setData({
      showLogin: true
    })
  },

  // 关闭登录
  onCloseLogin() {
    this.setData({
      showLogin: false
    })
  },

  // 我的收藏
  toFavorites() {
    if(!this.data.hasUserLogin) {
      this.setData({
        showLogin: true
      })
      return 
    }
    wx.navigateTo({
      url: '/pages/favorites/index',
    })
  }
})