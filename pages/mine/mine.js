const app = getApp()

Page({
  data: {
    faceUrl: "../../resource/images/noneface.png",
    isMe: true
  },
  onLoad: function () {
    var me = this;
    var user = app.getGlobalUserInfo();
    if (user != null && user.nickname != null) {
      if (user.faceImage != null && user.faceImage != undefined && user.faceImage != '') {
        me.setData({
          faceUrl: app.serverUrl + user.faceImage,
        })
      }
      me.setData({
        fansCounts: user.fansCounts,
        followCounts: user.followCounts,
        receiveLikeCounts: user.receiveLikeCounts,
        nickname: user.nickname
      })
    } else {
      wx.showLoading({
        title: '请等待',
      });
      wx.request({
        url: app.serverUrl + "/user/query?userId=" + user.id + "&userToken=" + user.userToken,
        method: 'GET',
        success: function (res) {
          wx.hideLoading()
          console.log("queryUserInfo======" + JSON.stringify(res.data))
          if (res.data.status === 200) {
            var userInfo = res.data.data;
            app.setGlobalUserInfo(userInfo)
            var faceUrl = '../../resource/images/noneface.png';
            if (userInfo.faceImage != null && userInfo.faceImage != '' && userInfo.faceImage != undefined) {
              faceUrl = app.serverUrl + userInfo.faceImage;
              me.setData({
                faceUrl: faceUrl,
                fansCounts: userInfo.fansCounts,
                followCounts: userInfo.followCounts,
                receiveLikeCounts: userInfo.receiveLikeCounts,
                nickname: userInfo.nickname
              })
            }
          }
        }
      })
    }




  },
  changeFace: function () {
    var me = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      ourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // me.setData({
        //   faceUrl: tempFilePaths
        // })
        console.log(tempFilePaths)
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: app.serverUrl + "/user/upload_avatar?userToken=" + app.getGlobalUserInfo().userToken,
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            //返回的数据是string，必须先转成json
            var data = JSON.parse(res.data);
            console.log(data);
            wx.hideLoading()
            if (data.status === 200) {
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              });
              var imageUrl = data.data;
              me.setData({
                faceUrl: app.serverUrl + imageUrl
              })
            } else if (data.status === 500) {
              wx.showToast({
                title: data.msg,
                icon: 'error'
              })
            }
          }
        })
      }
    })
  },
  uploadVideo: function () {
    var me = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 20,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        var duration = res.duration;
        if (duration > 21) {
          wx.showToast({
            title: '视频长度不能超过20s',
            icon: 'error'
          })
        } else if (duration < 1) {
          wx.showToast({
            title: '视频长度不能小于1s',
            icon: 'error'
          })
        } else {
          wx.navigateTo({
            url: '../chooseBgm/chooseBgm',
          })
        }
      }
    })
  }
})