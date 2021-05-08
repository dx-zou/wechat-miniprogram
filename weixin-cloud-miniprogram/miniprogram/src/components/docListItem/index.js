const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 1
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showLogin: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    toDetail() {
      // 没有授权登录的情况
      if (!app.globalData.hasUserLogin) {
        this.setData({
          showLogin: true
        })
        return
      }
      const { _id} = this.data.item;
      wx.navigateTo({
        url: `/pages/doc-detail/index?id=${_id}`,
      })
    },

    // 登录成功
    onSuccess(e) {
      app.globalData.userInfo = e.detail
      app.globalData.hasUserLogin = true
      this.setData({
        showLogin: false
      })
    },

    onCloseLogin() {
      this.setData({
        showLogin: false
      })
    }
  }
})
