const app = getApp()

Page({
    data: {
        audioItem: [],
        bgmList: [],
        serverUrl: app.serverUrl,
        videoParams: {}
    },

    onLoad: function (params) {
        const me = this;
        wx.showLoading({
            title: '正在加载背景音乐列表'
        })
        wx.request({
            url: app.serverUrl + "/bgm/list",
            method: "GET",
            success(res) {
                wx.hideLoading();
                if (res.data.status === 200) {
                    const bgmList = res.data.data;
                    me.setData({
                        bgmList: bgmList,
                    })
                }
            }
        })
    },
    tapDisplay: function (e) {
        for (let i = 0; i < this.data.audioItem.length; i++) {
            console.log(this.data.audioItem[i].id +"====="+e.target.id)
            if (this.data.audioItem[i].id !== e.target.id) {
                this.data.audioItem[i].pauseAudio(false)
            }
        }
    },
    IAudioReady: function (e) {
        let id = e.target.id;
       let myaudio  = this.selectComponent("#"+id)
        this.data.audioItem.push(myaudio);
    }
})

