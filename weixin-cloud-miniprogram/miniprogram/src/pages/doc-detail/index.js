const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    label:"",
    content: "",
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id,title,label} = options;
    this.setData({
      title,
      label
    })
    this.toMarkdown(id, label)
  },

  async toMarkdown(id, label) {
    // wx.showLoading({
    //   title: '加载中',
    // })
    this.setData({
      loading: true
    })
    const res = await wx.cloud.callFunction({
      name: 'getDocs',
      data: {
        id,
        label
      }
    })
    const data = res.result.data
    if(!data.length) {
      wx.hideLoading()
      return
    } 
    const c = app.towxml(data[0].content, 'markdown', {
      events: {
        // 为元素绑定的事件方法
        tap: e => {
          console.log('tap', e);
        },
      },
    });
    // 更新解析数据
    this.setData({
      content: c,
      title: this.data.title,
      label: this.data.label
    });
    this.setData({
      loading: false
    })
    // wx.hideLoading()
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
  onReachBottom: function (e) {
    console.log(e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})