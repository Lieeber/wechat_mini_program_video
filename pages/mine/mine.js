const app = getApp()

Page({
  data: {
    faceUrl: "../../resource/images/noneface.png",
    isMe: true
  },
  changeFace: function (params) {
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
            //返回的数据是string，必须先转成json
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
            }else if(data.status === 500){
              wx.showToast({
                title: data.msg,
                icon: 'error'
              })
            }
          }
        })
      }
    })
  }
})