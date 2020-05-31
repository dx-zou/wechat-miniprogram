//index.js
import { I18n , I18nPage, getI18nInstance } from '@miniprogram-i18n/core'

I18nPage({
  data: {
    avatarUrl: '',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
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
