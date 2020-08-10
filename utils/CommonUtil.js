function showToast(msg) {
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: 3000
    });
}


function showLoading(msg) {
    wx.showLoading({
        title: msg,
    });
}

function hideLoading() {
    wx.hideLoading();
}

module.exports = {
    showToast,
    showLoading,
    hideLoading
}
