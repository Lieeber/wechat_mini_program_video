import commonUtil from '../../utils/CommonUtil'

const app = getApp()

Page({
    data: {
        defaultUserName: "imooc",
        defaultPassword: "imooc"
    },

    onLoad: function (params) {
        const me = this;
        let redirectUrl = params.redirectUrl;
        // debugger;
        if (redirectUrl != null && redirectUrl !== '') {
            redirectUrl = redirectUrl.replace(/#/g, "?");
            redirectUrl = redirectUrl.replace(/@/g, "=");

            me.redirectUrl = redirectUrl;
        }
    },

    // 登录
    doLogin: function (e) {
        const me = this;
        const formObject = e.detail.value;
        const username = formObject.username;
        const password = formObject.password;
        // 简单验证
        if (username.length === 0 || password.length === 0) {
            commonUtil.showToast('用户名或密码不能为空')
        } else {
            var serverUrl = app.serverUrl;
            commonUtil.showLoading('请等待...')
            wx.request({
                url: serverUrl + '/user/login',

                method: "POST",
                data: {
                    username: username,
                    password: password
                },
                success: function (res) {
                    console.log("=======", res);
                    commonUtil.hideLoading()
                    if (res.data.code === 200) {
                        commonUtil.showToast('登录成功')
                        app.setGlobalUserInfo(res.data.data);
                        app.setCookie(res.header['Set-Cookie']);
                        // 页面跳转
                        const redirectUrl = me.redirectUrl;
                        if (redirectUrl != null && redirectUrl !== '') {
                            wx.redirectTo({
                                url: redirectUrl,
                            })
                        } else {
                            wx.redirectTo({
                                url: '../mine/mine',
                            })
                        }

                    } else if (res.data.code === 500) {
                        commonUtil.showToast(res.data.message)
                    } else {
                        commonUtil.showToast('未知错误')
                    }
                }
            })
        }
    },

    goRegistPage: function () {
        wx.redirectTo({
            url: '../userRegist/regist',
        })
    }
})
