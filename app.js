//app.js
App({
    serverUrl: "http://192.168.199.169:8080",

    setGlobalUserInfo: function (user) {
        wx.setStorageSync("userInfo", user);
    },
    setCookie(cookie) { //保存用户登录的cookie
        wx.setStorageSync("user_cookie", cookie)
    },
    getCookie() {
        return wx.getStorageSync("user_cookie");
    },
    getGlobalUserInfo: function () {
        return wx.getStorageSync("userInfo")
    },
    onLaunch: function () {
    },
})
