const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: 'https://6478-dx-feng-1300037391.tcb.qcloud.la/wxacode.jpeg?sign=32cda8567a3830cd080c8cfd4493d211&t=1620445711',
    poster: 'https://6478-dx-feng-1300037391.tcb.qcloud.la/poster-bg.jpg?sign=b372b9e2a7129399264a85c7ab3ccbec&t=1620445750',
    src: '',
    show: false,
    height: '',
    width: '',
    canvas: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // const { windowHeight, windowWidth} = app.globalData.systemInfo
    // this.setData({
    //   width: windowWidth,
    //   height: windowHeight
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const { windowHeight, windowWidth } = app.globalData.systemInfo
    this.setData({
      width: windowWidth,
      height: windowHeight - 200
    })
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        this.setData({
          canvas,
        })
        const ctx = canvas.getContext('2d')
        const dpr = app.globalData.systemInfo.pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        // 背景
        ctx.fillStyle = '#f6f6f6'
        ctx.fillRect(0, 0, windowWidth, windowHeight - 100)
        // 绘制图片
        const img = canvas.createImage();
        img.src = this.data.poster
        img.onload = () => {
          ctx.drawImage(img, 0, 0, windowWidth, 260)
          ctx.save()
        }

        // 绘制文字
        const text = '哪里会有人喜欢孤独，不过是不喜欢失望。'
        const name = '—— 村上春树'
        ctx.fillStyle = '#333'
        ctx.font = "16px sans-serif"
        ctx.fillText(text, windowWidth - ctx.measureText(text).width - 30, 300)
        ctx.fillText(name, windowWidth - ctx.measureText(name).width - 30, 330)
        ctx.save()

        // 绘制横线
        ctx.lineWidth = 1
        ctx.strokeStyle='#ebedf0'
        ctx.moveTo(0, 360);
        ctx.lineTo(windowWidth, 360);
        ctx.stroke()

        ctx.fillText('前端宝盒，等你揭秘', 15, 460)

        const img1 = canvas.createImage();
        img1.src = this.data.code
        img1.onload = () => {
          ctx.drawImage(img1, windowWidth - 150, 380, 130, 130)
        }
      })
  },

  renderToCanvas() {
    wx.showLoading({
      title: '海报生成中...',
    })
    wx.canvasToTempFilePath({
      canvas: this.data.canvas,
      success: (res) => {
        this.setData({
          src: res.tempFilePath,
          show: true
        })
        wx.hideLoading()
      }
    })
  },

  onSave() {
    wx.getSetting({
      withSubscriptions: true,
      success: (res) => {
        if (res.authSetting['scope.writePhotosAlbum']) {
          wx.saveImageToPhotosAlbum({
            filePath: this.data.src,
          })
        } else {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
              wx.saveImageToPhotosAlbum({
                filePath: this.data.src
              })
            },
            fail: () => {
              wx.showToast({
                icon: 'none',
                title: '请点击右上角，打开设置，授权相册功能',
                duration: 3000
              })
            }
          })
        }
      }
    })
  },

  onClose() { },
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