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
    const { label } = options
    wx.setNavigationBarTitle({ title: `${label}必知必会` })
    this.setData({
      searchParams: {
        label
      }
    })
  },

  onShareAppMessage() {
   
  }
})