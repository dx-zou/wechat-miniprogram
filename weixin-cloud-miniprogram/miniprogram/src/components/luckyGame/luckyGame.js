// components/luckyGame/luckyGame.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        lastPrizeIndex: 0,
        canStart: true,
        rotateDeg: 0,
        initSkew: 0,
        list: ['1111','2222','3333','6666','5555','7777','8888','9999'],
        animationData: {}
    },
    lifetimes: {
        attached() {
            // 初始状态斜切角度
            this.setData({
                initSkew: this.initSkewDeg()
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 初始状态斜切角度
        initSkewDeg() {
            const len = this.data.list.length;
            if (len === 2) {
                return 0;
            } else if (len === 3) {
                return 30;
            } else {
                return 90 - 360 / len;
            }
        },
        start() {
            // 物品数量
            const count = this.data.list.length;
            // 随机获奖物品
            const prizeIndex = Math.floor(Math.random() * count);
            // 固定旋转度数
            const rotateNums = 360 * 30;
            // 每个扇区角度
            const rotateDegEach = count === 2 ? 180 : 360 / count;

            if (this.data.canStart) {
                // 按钮置为不可点击状态
                this.setData({
                    canStart: false
                })
                if (this.data.rotateDeg === 0) {
                    let rest =
                        count === 3 || count === 2 ? rotateDegEach : rotateDegEach / 2;
                    this.data.rotateDeg = rotateNums - rotateDegEach * prizeIndex + 90 - rest;
                } else {
                    this.data.rotateDeg =
                        this.data.rotateDeg +
                        rotateNums -
                        rotateDegEach * (prizeIndex - this.data.lastPrizeIndex);
                }
                // 保存当前奖品号
                this.setData({
                    lastPrizeIndex: prizeIndex,
                    rotateDeg: this.data.rotateDeg
                })
            }
        },
        onTransitionend() {
            wx.showModal({
                title: '幸运结果',
                content: this.data.list[this.data.lastPrizeIndex],
                showCancel: false
            });
            this.setData({
                canStart: true
            })
        }
    }
})