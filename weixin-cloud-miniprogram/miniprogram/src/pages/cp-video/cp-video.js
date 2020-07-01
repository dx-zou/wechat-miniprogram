const getRandomColor = function () {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    danmuList: [{
      text: '嘿嘿嘿',
      color: '#ff0000',
      time: 1
    }, {
      text: '呵呵呵',
      color: '#ff00ff',
      time: 2
    }],
    value: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) { },
  onReady() {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  handleChange(e) {
    this.data.value = e.detail
  },
  handleSendDanmu() {
    if (!this.data.value) return
    this.videoContext.sendDanmu({
      text: this.data.value,
      color: getRandomColor()
    })
  },
  handlePlay() { },
  addBarrage() {
    const barrageComp = this.selectComponent('.barrage')
    this.barrage = barrageComp.getBarrageInstance({
      font: 'bold 16px sans-serif',
      duration: 10,
      lineHeight: 2,
      mode: 'separate',
      padding: [10, 0, 10, 0],
      tunnelShow: false
    })
    this.barrage.open()
    const data = {
      color: '#000000', // 默认黑色
      content: '这是一条弹幕哦', // 弹幕内容
    }
    this.barrage.addData(data)
  },
  statechange(e) {
    console.log('live-pusher code:', e.detail.code)
  }
})