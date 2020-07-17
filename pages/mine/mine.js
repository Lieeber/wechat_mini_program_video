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
        me.setData({
          faceUrl: tempFilePaths
        })
        console.log(tempFilePaths)
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: app.serverUrl + "/user/upload_avatar?userToken=" + app.getGlobalUserInfo().userToken,
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(url + "====================")
            const data = res.data
            console.log(data)
          }
        })
      }
    })
  }
})