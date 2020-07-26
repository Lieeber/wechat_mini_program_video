//app.js
App({
// serverUrl: "http://192.168.199.229:8080",
  serverUrl:"http://192.168.199.243:8080",
  userInfo: null,
  setGlobalUserInfo: function (user) {
    wx.setStorageSync("userInfo", user);
  },
  getGlobalUserInfo: function () {
    var info = wx.getStorageSync("userInfo");
    return info
  },

  onLaunch: function () {
  },
})