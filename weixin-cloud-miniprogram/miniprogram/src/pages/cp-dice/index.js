// miniprogram/src/pages/cp-dice/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        diceNums: 1,
        activeIndex: 0,
        animationData: {
            1: {},
            2: {},
            3: {},
            4: {},
            5: {}
        },
        rotateDeg: {
            1: {
                x: 0,
                y: 0,
                z: 0
            },
            2: {
                x: -90,
                y: 0,
                z: 0
            },
            3: {
                x: 0,
                y: -90,
                z: 0
            },
            4: {
                x: 0,
                y: 90,
                z: 0
            },
            5: {
                x: 90,
                y: 0,
                z: 0
            },
            6: {
                x: 0,
                y: 180,
                z: 0
            }
        },
        canStart: true,
        transNums: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    onShow() {
        for (let i = 0; i < 5; i++) {
            this[`animation${i + 1}`] = wx.createAnimation({
                duration: 100,
                timingFunction: 'ease'
            });
        }
    },

    onChange(e) {
        const { index } = e.currentTarget.dataset
        if (!this.data.canStart) {
            return;
        }
        this.setData({
            diceNums: index + 1,
            activeIndex: index
        })
        // 生成初始状态
        for (let j = 0; j < this.data.activeIndex + 1; j++) {
            this[`animation${j + 1}`]
                .rotateX(-30)
                .rotateY(-30)
                .rotateZ(-20)
                .step({
                    duration: 50
                });
            this.setData({
                animationData: {
                    [j+1]: this[`animation${j + 1}`].export()
                } 
            })
        }
    },

    onStart() {
        if (!this.data.canStart) {
            return;
        }
        this.setData({
            canStart: false
        })
        const timer = setTimeout(() => {
            clearTimeout(timer);
            this.setData({
                canStart: true,
                animationData: {
                    1: {},
                    2: {},
                    3: {},
                    4: {},
                    5: {}
                }
            })
        }, 5000);
        // 生成随机点数即是最终结果
        const randoms = {
            1: Math.floor(Math.random() * 6 + 1),
            2: Math.floor(Math.random() * 6 + 1),
            3: Math.floor(Math.random() * 6 + 1),
            4: Math.floor(Math.random() * 6 + 1),
            5: Math.floor(Math.random() * 6 + 1)
        };
        // 随机旋转
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < this.data.activeIndex + 1; j++) {
                this[`animation${j + 1}`]
                    .translateX(Math.floor(Math.random() * 150 - 50))
                    .translateY(Math.floor(Math.random() * 100 - 10))
                    .translateZ(Math.floor(Math.random() * 200 - 100))
                    .rotateY(Math.floor(Math.random() * 1000 + 30))
                    .rotateZ(-Math.floor(Math.random() * 1000 + 100))
                    .rotateX(Math.floor(Math.random() * 600 + 30))
                    .step();
            }
        }
        // 停止旋转，初始到随机点数对应的角度
        for (let j = 0; j < this.data.activeIndex + 1; j++) {
            const r = this.data.rotateDeg[randoms[j + 1]];
            this[`animation${j + 1}`]
                .translateZ(0)
                .translateX(0)
                .translateY(0)
                .rotateX(r.x)
                .rotateY(r.y)
                .rotateZ(r.z)
                .step({
                    duration: 500,
                    timingFunction: 'ease-in-out'
                });
            this.setData({
                animationData: {
                    [j+1]: this[`animation${j + 1}`].export(),
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})