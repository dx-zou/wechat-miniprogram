Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:"",
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(e) {
    this.setData({
      searchValue: e.detail
    })
  },
  async onSearch(e) {
    if(!e.detail) {
      wx.showToast({
        icon:"none",
        title: '请输入关键字搜索',
      })
      return;
    }
    
    wx.showLoading({
      title: '搜索中',
    })
    const res= await wx.cloud.callFunction({
      name:"getDocs",
      data:{
        content: e.detail
      }
    })
    this.setData({
      list: res.result.data
    })
    wx.hideLoading()
  },
  onCancel() {

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