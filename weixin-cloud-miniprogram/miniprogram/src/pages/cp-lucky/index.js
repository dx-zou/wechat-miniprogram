Page({
	data: {
		lucksData: [],
	},

	onLoad() {
		const lucksData = [
			{
				key: 'baofu',
				name: '晋升CEO',
				indexli: 1,
			},
			{
				key: 'facai',
				name: '1个月工资',
				indexli: 2,
			},
			{
				key: 'one',
				name: '财务自由',
				indexli: 3,
			},
			{
				key: 'byebye',
				name: '谢谢惠顾',
				indexli: 8,
			},
			{
				key: 'start_btn',
				name: '抽奖',
				indexli: -1,
			},
			{
				key: 'byebye',
				name: '谢谢惠顾',
				indexli: 4,
			},
			{
				key: 'bonus',
				name: '1年奖金',
				indexli: 7,
			},
			{
				key: 'car',
				name: '一辆轿车',
				indexli: 6,
			},
			{
				key: 'tendays',
				name: '7天年假',
				indexli: 5,
			},
		];
		this.setData({
			lucksData,
		});
	},

	/**
	 * 结果回调函数
	 * @param {*} e
	 */
	onLuckResult(e) {
		if (e.detail) {
			this.setData({
				luck_num: e.detail,
			});
		}
	},
});
