const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
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
    // 用户授权登录流程
    async onLogin() {
      wx.getUserProfile({
        desc: "完善会员信息",
        success: (res) => {
          const { encryptedData, iv, signature, userInfo, cloudID } = res
          app.globalData.userInfo = userInfo
          app.globalData.hasUserLogin = true
          this.triggerEvent('success', userInfo)
          wx.showToast({
            icon: "none",
            title: '授权登录成功',
          })
          // 用户信息上云
          wx.cloud.callFunction({
            name: "addUser",
            data: {
              encryptedData,
              iv,
              signature,
              cloudID,
              userInfo
            }
          })
        },
        fail() {
          wx.showToast({
            icon: "none",
            title: '登录失败, 请重新授权登录',
          })
        }
      })
    },

    // 关闭登录面板
    onClose() {
      this.triggerEvent('close')
    }
  }
})
