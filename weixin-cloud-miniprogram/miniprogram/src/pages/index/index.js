const app = getApp()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		swiperList: [
			{
				imgUrl: 'cloud://dx-feng.6478-dx-feng-1300037391/1.png',
				url: "/pages/doc-list/index?label=JavaScript",
			},
			{
				imgUrl: 'cloud://dx-feng.6478-dx-feng-1300037391/2.png',
				url: "/pages/collection/index"
			},
			{
				imgUrl: 'cloud://dx-feng.6478-dx-feng-1300037391/3.png',
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
			},
			{
				text: '小程序组件',
				label: 'Components',
				img: '/images/icons/component.png',
				url: '/pages/collection/index'
			},
		],
		notices: `欢迎来到前端宝盒，专注前端程序员学习成长进阶交流`,
		currentIndex: 0,
		navbarPaddingTop: "",
		indexViewPaddingTop: "",
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

		// const res = wx.cloud.callFunction({
		// 	name: 'openapi',
		// 	data: {
		// 		action: 'sendSubscribeMessage',
		// 		templateId: 'yqZDqT5s4eP388H_ONK2kpvzXo7vdnxUn2_g1eJapQQ'
		// 	}
		// })
	},

	toSearch() {
		wx.navigateTo({
			url: '/pages/search/index',
		})
	},

	// 打卡提醒
	async toCheckIn() {
		// wx.requestSubscribeMessage({
		// 	tmplIds: ['yqZDqT5s4eP388H_ONK2kpvzXo7vdnxUn2_g1eJapQQ'],
		// 	success: (res) => {
		// 		console.log(res)
		// 	}
		// })
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
		const {label, url} = e.target.dataset
		if(url) {
			wx.navigateTo({
				url,
			});
			return
		}
		wx.navigateTo({
			url: `/pages/doc-list/index?label=${label}`,
		});
	}
});
