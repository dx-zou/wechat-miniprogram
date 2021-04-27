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
    // 查询用户收藏的文档
    this.setData({
      searchParams: {
        likedUsers: true
      }
    })
  }
})