const app = getApp()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		swiperList: [
			{
				imgUrl: '/images/1.png',
				url: "/pages/doc-list/index?label=JavaScript",
			},
			{
				imgUrl: '/images/2.png',
				url: "/pages/collection/index"
			},
			{
				imgUrl: '/images/3.png',
				url: "/pages/doc-list/index?label=Vue"
			}
		],
		list: [
			{
				text: 'JavaScript',
				label: 'JavaScript',
				img: '/images/icons/javaScript.png',
			},
			{
				text: 'CSS',
				label: 'CSS',
				img: '/images/icons/css.png',
			},
			{
				text: 'HTML',
				label: 'HTML',
				img: '/images/icons/html.png',
			},
			{
				text: 'Vue',
				label: 'Vue',
				img: '/images/icons/vue.png',
			},
			{
				text: 'React',
				label: 'React',
				img: '/images/icons/react.png',
			},
			{
				text: 'Node',
				label: 'Node',
				img: '/images/icons/node.png',
			}
		],
		tips: `人生苦短，我们学了前端，祝您前程似锦，玩耍愉快。`,
		currentIndex: 0,
		navbarPaddingTop: "",
		indexViewPaddingTop: "",
		animationData: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		const {height, top} = app.globalData.menuButtonPosition ;
		this.setData({
			navbarPaddingTop: top + "px",
			indexViewPaddingTop: top + height + 15 + "px"
		})
	},
	toSearch() {
		wx.navigateTo({
			url: '/pages/search/index',
		})
	},
	// 轮播图切换
	onChange(e) {
		const currentIndex = e.detail.current;
		this.setData({
			currentIndex,
		});
	},
	onNavigate(e) {
		const {url} = e.target.dataset
		if(!url) {
			return
		}
		wx.navigateTo({
			url,
		})
	},
	// 点击banner图片
	onBannerClick() {
		wx.navigateTo({
			url: '/pages/collection/index',
		});
	},
	// 点击宫格请求对应的文档
	async onGridClick(e) {
		wx.navigateTo({
			url: `/pages/doc-list/index?label=${e.target.dataset.label}`,
		});
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
	
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () { },

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () { },

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () { },
});
