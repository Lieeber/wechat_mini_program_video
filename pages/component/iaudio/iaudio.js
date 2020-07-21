// pages/component/iaudio.js
Component({
    properties: {
        src: String,
        songName: String,
        singer: String,
        duration: String
    },
    data: {
        myMp3: {},
        isPlaying: false,
        ico: "play"
    },
    ready: function () {
        let myMp3 = wx.createInnerAudioContext();
        myMp3.autoplay = false;
        myMp3.src = this.data.src;
        this.setData({
            myMp3: myMp3
        })
        this.triggerEvent("onIAudioReady", {

        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        display() {
            const me = this;
            const isPlaying = this.data.isPlaying;
            if (!isPlaying) {
                me.playAudio(true);
            } else {
                me.pauseAudio(true);
            }
        }, playAudio(trigger) {
            this.data.myMp3.play();
            this.setData({
                isPlaying: true,
                ico: "pause"
            })
            if (trigger) {
                this.triggerEvent("tapDisplay", {
                });
            }
        }, pauseAudio(trigger) {
            this.data.myMp3.pause();
            this.setData({
                isPlaying: false,
                ico: "play"
            })
            if (trigger) {
                this.triggerEvent("tapDisplay", {
                });
            }
        }
    }
})