const app = getApp()


Page({
    data: {
        screenWidth: 750,
        serverUrl: app.serverUrl,
        videoList: [{
            coverPath: "",
            nickName: "",
            faceImage: ""
        }]
    },

    onLoad(query) {
        let screenWidth = wx.getSystemInfoSync().screenWidth;
        this.setData({
            screenWidth: screenWidth
        })
        this.getAllVideos()

    },
    getAllVideos() {
        let me = this
        wx.request({
            url: app.serverUrl + "/video/showAll",
            method: "GET",
            success(res) {
                if (res.data.status === 200) {
                    let data = res.data.data;
                    me.setData({
                        videoList: data.rows
                    })
                }
            }
        })
    },
    showVideoInfo(event) {
        console.log("=====" + event)
        let index = event.target.dataset.arrindex;
        let videoObj = this.data.videoList[index]
        let videoStr = JSON.stringify(videoObj);
        wx.navigateTo({
            url: "../videoinfo/videoinfo?videoInfo=" + videoStr
        })
    }

})
