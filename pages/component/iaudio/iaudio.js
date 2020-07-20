// pages/component/iaudio.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src: String,
        songName: String,
        singer: String,
        duration: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        myMp3: {},
        isPlaying: false,
        ico: "play"
    },
    ready: function () {
        var myMp3 = wx.createInnerAudioContext();
        myMp3.autoplay = false;
        myMp3.src = this.data.src;
        this.setData({
            myMp3: myMp3
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        display() {
            const isPlaying = this.data.isPlaying;
            if (!isPlaying) {
                this.data.myMp3.play();
                this.setData({
                    isPlaying: true,
                    ico: "pause"
                })
            } else {
                this.data.myMp3.pause();
                this.setData({
                    isPlaying: false,
                    ico: "play"
                })
            }
        }
    }
})