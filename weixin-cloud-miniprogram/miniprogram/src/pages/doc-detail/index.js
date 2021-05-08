const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doc: {},
    loading: true,
    liked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    const { id } = options;
    this.getDocData(id)
    this.updateDocRead(id)
  },

  // 解析markdown文档
  async getDocData(id) {
    this.setData({
      loading: true
    })
    const res = await wx.cloud.callFunction({
      name: 'getDocs',
      data: {
        id,
        current: 1
      }
    })
    const data = res.result.data[0]
    const c = app.towxml(data.content, 'markdown', {
      events: {
        // 为元素绑定的事件方法
        tap: e => {
          const { tag , attrs } = e.currentTarget.dataset.data
          if(tag === 'img') {
            wx.previewImage({
              urls: [attrs.src],
            })
          }
        },
      },
    });
    data.content = c;
    // 判断当前用户是否收藏了文档
    const openid = app.globalData.userInfo._openid
    const liked = (data.likedUsers || []).findIndex(item => item.openid === openid) === -1 ? false : true
    // 更新解析数据
    this.setData({
      liked,
      doc: data,
      loading: false
    });
  },

  // 更新文章阅读量
  async updateDocRead(id) {
    await wx.cloud.callFunction({
      name: 'updateDocRead',
      data: {
        id
      }
    })
  },

  // 文章点赞
  async onLike() {
    this.setData({
      liked: !this.data.liked
    })
    const openid = app.globalData.userInfo._openid
    this.data.doc.liked = this.data.liked
      ? this.data.doc.likedUsers.push(openid)
      : this.data.doc.likedUsers.pop()
    this.setData({
      doc: this.data.doc
    })
    wx.showToast({
      icon: 'none',
      title: this.data.liked ? '收藏成功' : '取消收藏'
    })
    await wx.cloud.callFunction({
      name: 'updateUserFavorites',
      data: {
        docId: this.data.doc._id,
      }
    })
  },

  toTop() {
    wx.pageScrollTo({
      duration: 300,
      scrollTop: 0
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    // return {
    //   title: `${this.data.searchParams.label}文档 - 必知必会`,
    //   path: `/pages/doc-list/index?label=${this.data.searchParams.label}`
    // }
  }
})