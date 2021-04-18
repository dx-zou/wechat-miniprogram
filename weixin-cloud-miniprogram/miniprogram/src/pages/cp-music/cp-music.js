const {formatTime} = require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '/images/cover.jpg',
    animationData: {},
    list: ['/images/havana.mp3','/images/tong.mp3'],
    playing: false,
    currentTime: '00:00',
    duration: '',
    percent: 0,
    currentIndex: 0,
    isDragging: false,
    InnerAudioContext: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initPlayer()
  },
  onShow() {
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // this.initPlayer()
  },
  onHide() {
    // this.data.InnerAudioContext.pause()
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
    audio.loop = true
    this.setData({
      duration: formatTime(audio.duration),
    })
    // 自然播放结束
    audio.onEnded(() => {
      this.setData({
        playing: false,
        percent: 0,
        currentTime: '00:00'
      })
    })
    audio.onCanplay(() => {})
    // 播放
    audio.onPlay(() => {
      if (!this.data.isDragging) {
        this.setData({
          duration: formatTime(audio.duration),
        })
      }
    })
    audio.onSeeked(() => {})
    // 监听音频播放进度更新
    audio.onTimeUpdate(() => {
      console.log('update........')
      if (!this.data.isDragging) {
        const percent = audio.currentTime / audio.duration * 100
        this.setData({
          percent,
          currentTime: formatTime(audio.currentTime)
        })
      }
    })
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
    this.setData({
      isDragging: false
    })
    const audio = this.data.InnerAudioContext
    const seek = audio.duration * this.data.percent / 100
    audio.pause()
    audio.seek(seek)
    audio.play()
  },
  // 拖动进度
  handleDrag(e) {
    // 防止正常播放触发drag事件
    if (this.data.isDragging) {
      const currentTime = this.data.InnerAudioContext.duration * this.data.percent / 100
      this.setData({
        percent: e.detail.value,
        currentTime: formatTime(currentTime)
      })
    }
  },
  // 切歌
  handleCut(e) {
    const dir = e. currentTarget.dataset.dir
    const length = this.data.list.length - 1
    if (dir ==='pre') {
      this.data.currentIndex--
      this.data.currentIndex < 0 && (this.data.currentIndex = length)
    } else {
      this.data.currentIndex++
      this.data.currentIndex > length && (this.data.currentIndex = 0)
    }
    const audio = this.data.InnerAudioContext
    audio.src = this.data.list[this.data.currentIndex]
    this.setData({
      currentTime: '00:00',
      duration: audio.duration,
      playing: true
    })
    audio.pause()
    audio.seek(0)
    audio.play()

  }
})