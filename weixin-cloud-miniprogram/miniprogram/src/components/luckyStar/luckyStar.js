Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		lucksData: {
			type: Array,
			value: [],
		},
	},
	/**
	 * 组件的初始数据
	 */
	data: {
		maxIndex: 8, // 奖项的全部数量
		currentIndex: 0, // 当前滚动位置
		luckIndex: 0, //  开奖位置！
		lastIndex: 0, // 滚动结束的位置
		rollSpeed: 300, // 速度，速度值越大，则越慢 初始化为300
		maxSpeed: 40, // 滚盘的最大速度
		rollTurns: 8, // 最小的滚动圈数
		currentSteps: 0, // 当前已跑步数
		timer: '', // 定时器
		startFlag: true, // 开始滚动
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		// 开始滚动
		startRolling() {
			// roll点
			if (this.data.startFlag === true) {
				const random = parseInt(Math.random() * 8 + 1);
				this.setData({
					luckIndex: random,
					startFlag: false,
				});
				// 初始化步数
				this.data.currentSteps = 0;
				this.onRolling();
			}
		},
		// 滚动轮盘的动画效果
		onRolling() {
			this.data.timer = setTimeout(() => {
				this.onRolling();
			}, this.data.rollSpeed);
			this.data.currentSteps++; // 已经跑步数加一
			this.data.currentIndex++; // 当前的加一
			// 计算总步数
			const totalSteps =
				this.data.rollTurns * this.data.maxIndex +
				this.data.luckIndex -
				this.data.lastIndex;
			// 上升期间
			if (this.data.currentSteps <= (totalSteps / 3) * 2) {
				this.data.rollSpeed -= 30; //加速
				if (this.data.rollSpeed <= this.data.maxSpeed) {
					this.data.rollSpeed = this.data.maxSpeed; //最高速度为40；
				}
			} else if (totalSteps - this.data.currentSteps <= 10) {
				//下降期间
				this.data.rollSpeed += 20;
			} else {
				this.data.rollSpeed += 10;
				if (this.data.rollSpeed >= 100) {
					this.data.rollSpeed = 100; //最低速度为100；
				}
			}
			if (this.data.currentSteps >= totalSteps) {
				// 抽奖结束
				clearInterval(this.data.timer);
				this.setData({
					lastIndex: this.data.currentIndex,
					startFlag: true,
					rollSpeed: 300,
				});
				this.triggerEvent('onResult', this.data.luckIndex);
			}
			if (this.data.currentIndex > this.data.maxIndex) {
				//判定！是否大于最大数
				this.data.currentIndex = 1;
			}
			this.setData({
				currentIndex: this.data.currentIndex,
			});
		},
	},
});
