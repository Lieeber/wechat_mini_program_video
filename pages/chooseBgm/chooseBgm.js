const app = getApp()

Page({
    data: {
      audioItem:[],
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
        method:"GET",
        success(res){
          // console.log("bgm====="+JSON.stringify(res.data))
          wx.hideLoading();
          if(res.data.status === 200){
            const bgmList = res.data.data;
            me.setData({
              bgmList:bgmList,
            })
          }
        }
      })
    },
    tapDisplay: function(e){
        var currentIAudio = e.target
        for (let i = 0; i <this.data.audioItem.size; i++) {
            let newVar = this.data.audioItem.get(i);
            if (currentIAudio !== newVar) {
                newVar.myMp3.pause()
            }
        }
    },
    IAudioReady: function(e){
       var iaudio = e.target
        this.data.audioItem.put(iaudio)
        console.log("获取到了这个iaudio==============:"+JSON.stringify(iaudio))
    },

    upload: function(e) {
    }
})

