const app = getApp()
const { getSaveUserInfo } = require("../../utils/utils")

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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail() {
      // 没有授权登录的情况
      if (!app.globalData.hasUserLogin) {
        wx.showModal({
          title: "登录提示",
          content: "您尚未登录，请点击授权登录解锁宝盒全部功能",
          confirmText: "授权登录",
          confirmColor: "#07c160",
          success(res) {
            if (res.confirm) {
              getSaveUserInfo()
            }
          }
        })
        return
      }
      const { _id} = this.data.item;
      wx.navigateTo({
        url: `/pages/doc-detail/index?id=${_id}`,
      })
    }
  }
})
