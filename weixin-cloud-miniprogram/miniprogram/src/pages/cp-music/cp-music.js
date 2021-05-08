const { formatTime } = require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '/images/cover.jpg',
    animationData: {},
    list: [
      'https://6478-dx-feng-1300037391.tcb.qcloud.la/audio/%E9%99%88%E4%B8%80%E5%8F%91%E5%84%BF%20-%20%E7%AB%A5%E8%AF%9D%E9%95%87.mp3?sign=1f7577cbc7bdfe2c0e9c721963530f4c&t=1620458133',
      'https://6478-dx-feng-1300037391.tcb.qcloud.la/audio/Havana.mp3?sign=1995eacf040c2c904f21aba53a0f2ae2&t=1620458251'
    ],
    playing: false,
    currentTime: '00:00',
    duration: 0,
    percent: 0,
    currentIndex: 0,
    isDragging: false,
    InnerAudioContext: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.initPlayer()
  },
  onShow() {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.initPlayer()
  },
  onHide() {
    this.data.InnerAudioContext.pause()
    // this.data.InnerAudioContext.stop()
  },
  onUnload() {
    // this.data.InnerAudioContext.pause()
    this.data.InnerAudioContext.stop()
  },
  // 初始化播放器
  initPlayer() {
    const audio = wx.createInnerAudioContext()
    this.data.InnerAudioContext = audio
    audio.src = this.data.list[this.data.currentIndex]
    audio.loop = false
    this.setData({
      duration: formatTime(audio.duration || 0),
    })
    // 自然播放结束
    audio.onEnded(() => {
      this.handleCut({
        currentTarget: {
          dataset: {
            dir: 'next'
          }
        }
      })
    })
    audio.onCanplay(() => {
      console.log(audio.paused)
    })
    // 播放
    audio.onPlay(() => {
      if (!this.data.isDragging) {
        this.setData({
          playing: true,
          // duration: formatTime(audio.duration),
        })
      }
    })
    // 监听音频加载中事件
    audio.onWaiting(() => { })
    // 监听音频完成跳转操作的事件
    audio.onSeeked(() => { })
    // 监听音频播放进度更新
    audio.onTimeUpdate(() => {
      if (!this.data.isDragging) {
        const percent = audio.currentTime / audio.duration * 100
        this.setData({
          percent,
          currentTime: formatTime(audio.currentTime)
        })
      }
    })
  },
  // 切歌
  handleCut(e) {
    if (this.data.timer) {
      clearTimeout(this.data.timer)
    }
    const { dir } = e.currentTarget.dataset
    const length = this.data.list.length - 1
    if (dir === 'pre') {
      --this.data.currentIndex
      this.data.currentIndex < 0 && (this.data.currentIndex = length)
    } else {
      ++this.data.currentIndex
      this.data.currentIndex > length && (this.data.currentIndex = 0)
    }
    console.log(this.data.currentIndex)

    const audio = this.data.InnerAudioContext
    audio.src = this.data.list[this.data.currentIndex]
    audio.seek(0)
    audio.play()
    this.setData({
      currentTime: '00:00',
      percent: 0,
      playing: true,
    })
    this.data.timer = setTimeout(() => {
      this.setData({
        duration: formatTime(audio.duration)
      })
    }, 0);
  },
  // 手动播放暂停
  startPlay() {
    this.data.playing = !this.data.playing
    this.data.playing ? this.data.InnerAudioContext.play() : this.data.InnerAudioContext.pause()
    this.setData({
      playing: this.data.playing
    })
  },
  // 拖动开始
  handleDragstart() {
    this.setData({
      isDragging: true
    })
  },
  // 拖动结束
  handleDragend() {
    const audio = this.data.InnerAudioContext
    const seek = audio.duration * this.data.percent / 100
    audio.seek(seek)
    this.setData({
      isDragging: false,
    })
  },
  // 拖动进度
  handleDrag(e) {
    // 防止正常播放触发drag事件
    if (this.data.isDragging) {
      const current = this.data.InnerAudioContext.duration * e.detail.value / 100
      this.setData({
        percent: e.detail.value,
        currentTime: formatTime(current)
      })
    }
  }
})