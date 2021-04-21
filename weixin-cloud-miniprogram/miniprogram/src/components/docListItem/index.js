Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    },
    index: {
      type: Number,
      value: 1
    },
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
    toDetail() {
      const {_id,title,label} = this.data.item;
      wx.navigateTo({
        url: `/pages/doc-detail/index?id=${_id}&title=${title}&label=${label}`,
      })
    }
  }
})
