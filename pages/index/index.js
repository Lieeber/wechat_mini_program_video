//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        songList: [
            {
                src: app.serverUrl + "/bgm/Phantom_Sage_-_When_I’m_Gone.mp3",
                songName: "江南",
                singer: "林俊杰",
                duration: "2:30"
            }, {
                src: app.serverUrl + "/bgm/Prismo_-_Hold_On.mp3",
                songName: "江南",
                singer: "林俊杰",
                duration: "2:30"
            }, {
                src: app.serverUrl + "/bgm/Prismo_-_Stronger_Raiko_Remix.mp3",
                songName: "江南",
                singer: "林俊杰",
                duration: "2:30"
            }
        ]
    },

    onLoad: function () {

    }
})
