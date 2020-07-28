// var videoUtil = require('../../utils/videoUtil.js')

const app = getApp()

Page({
    data: {
        cover: "cover",
        videoId: "",
        src: "",
        videoInfo: {},
        userLikeVideo: false,
        commentsPage: 1,
        commentsTotalPage: 1,
        commentsList: [],
        placeholder: "说点什么..."
    },
    onLoad(param) {
        let videoInfo = JSON.parse(param.videoInfo);
        this.setData({
            videoInfo: videoInfo,
            src: app.serverUrl + videoInfo.videoPath,
            videoId:videoInfo.id

        })
    }
})