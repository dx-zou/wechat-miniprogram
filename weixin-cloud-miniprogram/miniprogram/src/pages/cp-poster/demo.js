const wxml = `
<view class="container" >
  <view class="item-box red">
  </view>
  <view class="item-box green" >
    <text class="text">yeah!</text>
  </view>
  <view class="item-box blue">
      <image class="img" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3582589792,4046843010&fm=26&gp=0.jpg"></image>
  </view>
</view>
`

const style = {
  container: {
    width: 360,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  posterImg: {
    width: 360,
    height: 300,
  },
  posterText: {
    // height: 35,
    // lineHeight: 35,
    padding: 15,
    textAlign: 'right'
  },
  text: {
    width: 300,
    height: 35,
    lineHeight: 35,
  },
  posterBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  imgCode: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  divider: {
    border: '1px solid #ebedf0'
  },
  imgCode: {
    width: 100,
    height: 100,
    borderRadius: 20,
  }
}

module.exports = {
  wxml,
  style
}
