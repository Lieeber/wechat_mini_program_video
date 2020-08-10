import commonUtils from '../../utils/CommonUtil';

const app = getApp()

Page({
    data: {
        faceUrl: '../../resource/images/noneface.png',
        isMe: true
    },
    onLoad: function () {
        const me = this;
        const user = app.getGlobalUserInfo();
        // if (user != null && user.nickname != null) {
        //     if (user.faceImage != null && user.faceImage !== '') {
        //         me.setData({
        //             faceUrl: app.serverUrl + user.faceImage,
        //         })
        //     }
        //     me.setData({
        //         fansCounts: user.fansCounts,
        //         followCounts: user.followCounts,
        //         receiveLikeCounts: user.receiveLikeCounts,
        //         nickname: user.nickname
        //     })
        // } else {
            commonUtils.showLoading("请等待")
        app.getCookie();
        debugger
            wx.request({
                url: app.serverUrl + "/user/query?userId=" + "180425CFA4RB6T0H",
                method: 'GET',
                header: {
                    'cookie': app.getCookie()
                },
                success: function (res) {
                    commonUtils.hideLoading()
                    if (res.data.code === 200) {
                        const userInfo = res.data.data;
                        app.setGlobalUserInfo(userInfo)
                        let faceUrl = '../../resource/images/noneface.png';
                        if (userInfo.faceImage != null && userInfo.faceImage !== '' && userInfo.faceImage !== undefined) {
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
        // }
    },
    changeFace: function () {
        const me = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths)
                commonUtils.showLoading('上传中')
                wx.uploadFile({
                    filePath: tempFilePaths[0],
                    name: 'file',
                    url: app.serverUrl + "/user/upload_avatar?userToken=" + app.getGlobalUserInfo().userToken,
                    success(res) {
                        //返回的数据是string，必须先转成json
                        const data = JSON.parse(res.data);
                        console.log(data);
                        wx.hideLoading()
                        if (data.code === 200) {
                            commonUtils.showToast('上传成功')
                            const imageUrl = data.data;
                            me.setData({
                                faceUrl: app.serverUrl + imageUrl
                            })
                        } else if (data.code === 500) {
                            commonUtils.showToast(data.msg)
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
                const duration = res.duration;
                let videoHeight = res.height;
                let videoWidth = res.width;
                let videoUrl = res.tempFilePath;
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
                        url: '../chooseBgm/chooseBgm?videoUrl='
                            + videoUrl + "&duration=" + duration + "&videoHeight="
                            + videoHeight + "&videoWidth=" + videoWidth,
                    })
                }
            }
        })
    }
})
