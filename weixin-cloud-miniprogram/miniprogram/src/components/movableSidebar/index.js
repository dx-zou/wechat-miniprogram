const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {
    attached() {
      const { windowHeight } = app.globalData.systemInfo
      this.setData({
        moveAreaHeight: `${windowHeight - 200}px`
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
