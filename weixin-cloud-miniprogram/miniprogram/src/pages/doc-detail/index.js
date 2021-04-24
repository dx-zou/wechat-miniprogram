const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    label:"",
    content: "",
    loading: true,
    liked: false,
    moveAreaHeight: 600
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {id,title,label} = options;
    const { windowHeight } = app.globalData.systemInfo
    wx.setNavigationBarTitle({
      title: label,
    })
    this.setData({
      title,
      label,
      moveAreaHeight: `${ windowHeight - 150}px`
    })
    this.toMarkdown(id, label)
    this.updateDocRead(id)

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 解析markdown文档
  async toMarkdown(id, label) {
    this.setData({
      loading: true
    })
    const res = await wx.cloud.callFunction({
      name: 'getDocs',
      data: {
        id,
        label,
        current: 1
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
  },

  // 更新文章阅读量
  async updateDocRead(id) {
    const res = await wx.cloud.callFunction({
      name: 'updateDocRead',
      data: {
        id
      }
    })
    console.log(res)
  },

  // 文章点赞
  onLike() {
    this.setData({
      liked: !this.data.liked
    })
    wx.showToast({
      icon: 'none',
      title: this.data.liked ? '收藏成功' : '取消收藏'
    })
  },

  onShare() {

  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(e) {
    console.log(e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(e) {
    console.log(e)
  }
})