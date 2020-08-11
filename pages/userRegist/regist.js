import commonUtil from '../../utils/CommonUtil'

const app = getApp()

Page({
    data: {
        defaultUserName: "imooc",
        defaultPassword: "imooc"
    },
    doRegister: function (e) {
        const formObject = e.detail.value;
        const username = formObject.username;
        const password = formObject.password;
        if (username.length === 0 || password.length === 0) {
            commonUtil.showToast('用户名或密码不能为空')
        } else {
            const serverUrl = app.serverUrl;
            commonUtil.showLoading('请等待');
            wx.request({
                url: serverUrl + '/user/register',
                method: "POST",
                data: {
                    username,
                    password
                },
                success: function (res) {
                    console.log(res.data);
                    commonUtil.hideLoading();
                    const status = res.data.code;
                    if (status === 200) {
                        commonUtil.showToast("用户注册成功~！！！")
                        app.setGlobalUserInfo(res.data.data);
                        app.setCookie(res.header['Set-cookie'])
                        // 页面跳转
                        wx.redirectTo({
                            url: '../mine/mine',
                        })
                    } else if (status === 500) {
                        commonUtil.showToast(res.data.message)
                    } else {
                        commonUtil.showToast('未知错误')

                    }
                }
            })
        }
    },

    goLoginPage: function () {
        wx.redirectTo({
            url: '../userLogin/login',
        })
    }
})
