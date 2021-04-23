// components/commonScrollView/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 查询参数
    searchParams: {
      type: Object,
      value: {}
    },
    // 容器高度
    height: {
      type: String,
      value: '100vh'
    },
    // 是否在生命周期中自动请求数据
    autoFetch: {
      type: Boolean,
      vlaue: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    docList: [],
    current: 1,
    totalPage: 0,
    loading: false,
    refreshing: false
  },

  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
      // 自动请求数据
      this.data.autoFetch && this.getDocListData()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取文档列表数据
    async getDocListData(params) {
      if (!params) {
        // 下拉上拉刷新不显示加载动画
        wx.showLoading({
          title: '加载中'
        })
      }
      if (params === 'bottomRefresh') {
        this.setData({
          loading: true
        })
      }
      const { label, content } = this.data.searchParams
      const { current } = this.data;

      const res = await wx.cloud.callFunction({
        name: 'getDocs',
        data: {
          label,
          content,
          current,
        },
      });

      const { data, totalPage } = res.result
      // 上拉加载才合并数组
      const list = params === 'bottomRefresh' ? this.data.docList.concat(data) : data
      this.setData({
        docList: list,
        totalPage
      })
      if (params === 'pullRefresh') {
        this.setData({
          refreshing: false
        })
        // 下拉刷新操作
        wx.showToast({
          icon: "none",
          title: '刷新成功',
        })
      } else if (params === 'bottomRefresh') {
        // 上拉加载
        this.setData({
          loading: false
        })
      } else {
        wx.hideLoading()
      }
    },

    // 上拉加载
    onScrolltolower() {
      const { current, totalPage } = this.data;
      if (current >= totalPage) {
        return
      }
      this.setData({
        loading: true
      })
      ++this.data.current
      this.setData({
        current: this.data.current
      })
      this.getDocListData('bottomRefresh')
    },

    // 下拉刷新
    onScrollRefresh() {
      const { content, label } = this.data.searchParams
      if (!content && !label) {
        this.setData({
          refreshing: false
        })
        return
      }
      this.setData({
        current: 1,
        refreshing: true
      })
      this.getDocListData('pullRefresh')
    }
  }
})
