Page({

  /**
   * 页面的初始数据
   */
  data: {
    docList: [],
    current: 1,
    totalPage: 0,
    label: "",
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { label } = options
    wx.setNavigationBarTitle({ title: `${label}必知必会` })
    this.data.label = label
    this.getListData()
  },

  async getListData(params) {
    if (!params) {
      // 下拉上拉刷新不显示加载动画
      wx.showLoading({
        title: '加载中'
      })
    }
    if (params === 'bottomRefresh') {
      this.setData({
        loading: true
      })
    }
    const { label, current } = this.data;
    const res = await wx.cloud.callFunction({
      name: 'getDocs',
      data: {
        label,
        current,
      },
    });
    const { data, totalPage } = res.result
    // 上拉加载才合并数组
    const list = params === 'bottomRefresh' ? this.data.docList.concat(data) : data
    this.setData({
      docList: list,
      totalPage
    })
    if (params === 'pullRefresh') {
      wx.stopPullDownRefresh()
      // 下拉刷新操作
      wx.showToast({
        icon: "none",
        title: '刷新成功',
      })
    } else if (params === 'bottomRefresh') {
      // 上拉加载
      this.setData({
        loading: false
      })
    } else {
      wx.hideLoading()
    }

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      current: 1
    })
    this.getListData('pullRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    const { current, totalPage } = this.data;
    if (current >= totalPage) {
      return
    }
    ++this.data.current
    this.setData({
      current: this.data.current
    })
    this.getListData('bottomRefresh')
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})