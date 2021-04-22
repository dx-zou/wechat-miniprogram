Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		imgUrls: [
			{
				url: '/images/1.png',
			},
			{
				url: '/images/2.png',
			},
			{
				url: '/images/3.png',
			},
		],
		list: [
			{
				text: 'JavaScript',
				url: '',
				img: '/images/icons/javaScript.png',
			},
			{
				text: 'CSS',
				url: '',
				img: '/images/icons/css.png',
			},
			{
				text: 'HTML',
				url: '',
				img: '/images/icons/html.png',
			},
			{
				text: 'Vue',
				url: '',
				img: '/images/icons/vue.png',
			},
			{
				text: 'React',
				url: '',
				img: '/images/icons/react.png',
			},
			{
				text: 'Node',
				url: '',
				img: '/images/icons/node.png',
			},
		],
		tips: `1.在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准，2.技术是开发它的人的共同灵魂。`,
		currentIndex: 0,
		article: `# demo`,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},
	// 轮播图切换
	onChange(e) {
		const currentIndex = e.detail.current;
		this.setData({
			currentIndex,
		});
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
			url: `/pages/docList/index?label=${e.target.dataset.label}`,
		});		
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
