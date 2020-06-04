//index.js
import { I18nPage } from '@miniprogram-i18n/core'

I18nPage({
  data: {
    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
  },

  onLoad() {
    this.onLocaleChange((locale) => {
      console.log('current locale:', this.getLocale(), locale)
    })
    this.setLocale('en-US')
    const title = this.getLocale() === 'zh-CN' ? '我的小程序' : 'my miniprogram'
    wx.setNavigationBarTitle({
      title
    })
  },
   onReady() {
    // this.addBarrage()
  },
   handlePlay() {},
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
  /**
   * @description 切换语言
   *
   */
  toggleLocale() {
    this.setLocale(
      this.getLocale() === 'zh-CN' ? 'en-US' : 'zh-CN'
    )
  },
  onAddTodo() {
    const todos = wx.cloud.database().collection('todos')
    const todo = todos.doc('4d5a19345ed2764f000b8080712a4da3').get().then(res => {
      console.log(res)
    })
  }
})
