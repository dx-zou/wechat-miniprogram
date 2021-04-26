const app = getApp()

Page({


  /**
   * 页面的初始数据
   */
  data: {
    searchParams: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({ title: `我的收藏` })
    this.getUserFavorites()
  },

  // 获取用户收藏的文档
  async getUserFavorites() {
    const res = await wx.cloud.callFunction({
      name: 'getUserInfo',
      data: {
        userId: app.globalData.userInfo._id,
        field: 'favorites'
      }
    })
    this.setData({
      searchParams: {
        favorites: res.result.data.favorites
      }
    })
    const child = this.selectComponent('.doc-scroll-view')
    child.getDocListData()
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