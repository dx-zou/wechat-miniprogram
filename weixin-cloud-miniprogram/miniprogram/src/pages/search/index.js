Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    showEmpty: false,
    list: [],
    hotList: ['vue', 'react', 'css'],
    current: 1,
    totalPage: 0,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  onClickHot(e) {
    const { keyword } = e.currentTarget.dataset
    this.setData({
      searchValue: keyword,
      current: 1
    })
    this.onSearch({detail: keyword})
  },
  onChange(e) {
    this.setData({
      searchValue: e.detail
    })
  },
  async onSearch(e) {
    if (!e.detail) {
      wx.showToast({
        icon: "none",
        title: '请输入关键字搜索',
      })
      return;
    }
    wx.showLoading({
      title: '搜索中',
    })
    const res = await wx.cloud.callFunction({
      name: "getDocs",
      data: {
        content: e.detail,
        current: this.data.current
      }
    })
    const {data , totalPage} = res.result
    this.setData({
      list: data,
      showEmpty: data.length === 0,
      totalPage
    })
    wx.hideLoading()
  },

  // 滚动到底部，加载下一页
  async onScrolltolower() {
    const { current, totalPage, searchValue } = this.data;
    if (current >= totalPage) {
      return
    }
    this.setData({
      loading: true
    })
    ++this.data.current
    this.setData({
      current: this.data.current
    })
    const res = await wx.cloud.callFunction({
      name: "getDocs",
      data: {
        content: searchValue,
        current: this.data.current
      }
    })
    const {data} = res.result
    this.setData({
      list: this.data.list.concat(data),
      showEmpty: data.length === 0, 
      loading: false,
      totalPage: res.result.totalPage
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