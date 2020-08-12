import commonUtil from '../../utils/CommonUtil';
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
        me.setData({
            duration: params.duration,
            videoHeight: params.videoHeight,
            videoWidth: params.videoWidth,
            videoUrl: params.videoUrl,
        })
        commonUtil.showLoading('正在加载背景音乐列表')
        wx.request({
            url: app.serverUrl + "/bgm/list",
            method: "GET",
            success(res) {
                commonUtil.hideLoading()
                if (res.data.code === 200) {
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
            console.log(this.data.audioItem[i].id + "=====" + e.target.id)
            if (this.data.audioItem[i].id !== e.target.id) {
                this.data.audioItem[i].pauseAudio(false)
            }
        }
    },
    IAudioReady: function (e) {
        let id = e.target.id;
        let myaudio = this.selectComponent("#" + id)
        this.data.audioItem.push(myaudio);
    },
    uploadVideo(e) {
        let me = this;
        commonUtil.showLoading('视频上传中，请稍等')
        console.log("bgmId:" + e.detail.value.bgmId)
        console.log("desc:" + e.detail.value.desc)
        console.log(app.getGlobalUserInfo().userToken)
        console.log(e.detail.value.bgmId)
        console.log(me.data.videoWidth)
        console.log(me.data.videoHeight)
        console.log(e.detail.value.desc)
        console.log(me.data.duration)
        wx.uploadFile({
            url: app.serverUrl + "/video/upload",
            filePath: this.data.videoUrl,
            name: 'file',
            header: {
                'content-type': 'application/json',
                "cookie": app.getCookie()
            },
            formData: {
                bgmId: e.detail.value.bgmId,
                videoWidth: me.data.videoWidth,
                videoHeight: me.data.videoHeight,
                desc: e.detail.value.desc,
                duration: me.data.duration
            },
            success(res) {
                commonUtil.hideLoading()
                console.log(res.data)
                let data = JSON.parse(res.data)
                if (data.code === 200) {
                    commonUtil.showToast('视频上传成功')
                    wx.redirectTo({
                        url: '../mine/mine?isMe=true',
                    })
                } else if (data.code === 500) {
                    console.log(res);
                    commonUtil.showToast(data.message);
                }
            }
        })
    }

})

