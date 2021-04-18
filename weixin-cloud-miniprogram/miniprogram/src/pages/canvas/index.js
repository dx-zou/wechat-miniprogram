// miniprogram/src/pages/canvas/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasNode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        this.data.canvasNode = canvas;
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        ctx.fillStyle('blue')
        ctx.fillRect(0, 0, 300, 200)
      })
  },

  previewImg() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: 'myCanvas',
      canvas: this.data.canvasNode,
      success(res) {
        console.log(res);
        wx.previewImage({
          urls: [res.tempFilePath],
        })
      },
      fail(err) {
        console.log(err);
      }
    }) 
   
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