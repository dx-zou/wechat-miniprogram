Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    hotList: ['vue', 'react', 'css'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 搜索框输入
  onChange(e) {
    const value = e.detail.trim()
    this.setData({
      searchValue: value,
      searchParams: {
        content: value
      }
    })
  },
  // 点击热搜词
  onHotSearch(e) {
    const { keyword } = e.currentTarget.dataset
    this.onChange({detail: keyword})
    this.onSearch({detail: keyword})
  },

  // 搜索
  async onSearch(e) {
    if(!e.detail) {
      wx.showToast({
        icon: 'none',
        title: '请输入关键词搜索',
      })
      return
    }
    const child = this.selectComponent('.doc-scroll-view')
    child.setData({
      current: 1
    })
    child.getDocListData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})