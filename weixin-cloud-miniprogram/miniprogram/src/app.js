//app.js
/**
 * API promise化
 */
// import { promisifyAll } from 'miniprogram-api-promise';
// const wxp = {}
// promisifyAll(wx, wxp)

/**
 * 初始化i18n
 */
import { initI18n } from '@miniprogram-i18n/core';
initI18n('zh-CN');
App({
	towxml: require('/towxml/index'),
	onLaunch() {
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力');
		} else {
			wx.cloud.init({
				// env 参数说明：
				//   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
				//   此处请填入环境 ID, 环境 ID 可打开云控制台查看
				//   如不填则使用默认环境（第一个创建的环境）
				env: 'dx-feng',
				traceUser: true,
			});
		}
		// const res = wx.getMenuButtonBoundingClientRect();
		// const systemInfo = wx.getSystemInfoSync();
	},
	globalData: {},
});