//index.js
import { I18nPage } from '@miniprogram-i18n/core';

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
				url: '../canvas/index',
				name: '绘图',
			},
			{
				url: '../cp-lucky/index',
				name: '抽奖',
			},
			{
				url: '../cp-poster/index',
				name: '海报分享'
			}
		],
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
	onReady() {
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline'],
		});
	},
	onClickLeft() {
		wx.navigateBack();
	},
	/**
	 * @description 切换语言
	 *
	 */
	toggleLocale() {
		this.setLocale(this.getLocale() === 'zh-CN' ? 'en-US' : 'zh-CN');
	},
});
