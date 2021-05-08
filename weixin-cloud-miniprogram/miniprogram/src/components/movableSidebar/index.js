const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 55
    },
  },
  lifetimes: {
    attached() {
      const { windowHeight } = app.globalData.systemInfo
      this.setData({
        moveAreaHeight: `${windowHeight - 300}px`
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    moveAreaHeight: "600px",
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
