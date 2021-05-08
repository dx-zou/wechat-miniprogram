//index.js
import { I18nPage } from '@miniprogram-i18n/core';
const app = getApp()

I18nPage({
	data: {
		list: [
			{
				url: '../im/room',
				name: '聊天室',
			},
			{
				url: '../cp-video/cp-video',
				name: '视频弹幕',
			},
			{
				url: '../cp-music/cp-music',
				name: '音频播放',
			},
			{
				url: '../cp-map/cp-map',
				name: '地图',
			},
			{
				url: '../cp-lucky/index',
				name: '抽奖',
			},
			{
				url: '../cp-poster/index',
				name: '海报分享'
			},
			{
				url: '../cp-charts/index',
				name: 'echarts'
			}
		],
		showLogin: false
	},

	onLoad() {
		// this.onLocaleChange(locale => {
		// 	console.log('current locale:', this.getLocale(), locale);
		// });
		// this.setLocale('en-US');
		// const title =
		// 	this.getLocale() === 'zh-CN' ? '我的小程序' : 'my miniprogram';
		// wx.setNavigationBarTitle({
		// 	title,
		// });
	},

	onNavigate(e) {
		// 没有授权登录的情况
		if (!app.globalData.hasUserLogin) {
			this.setData({
				showLogin: true
			})
			return
		}
		wx.navigateTo({
			url: e.currentTarget.dataset.url,
		})
	},

	// 关闭登录
	onCloseLogin() {
		this.setData({
			showLogin: false
		})
	},

	// 登录成功
	onSuccess(e) {
		app.globalData.userInfo = e.detail
		app.globalData.hasUserLogin = true
		this.setData({
			showLogin: false
		})
	},

	onReady() {
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline'],
		});
	},

	/**
	 * @description 切换语言
	 *
	 */
	toggleLocale() {
		this.setLocale(this.getLocale() === 'zh-CN' ? 'en-US' : 'zh-CN');
	},
});
