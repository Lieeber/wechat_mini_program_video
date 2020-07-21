Page({
    data: {},
    onLoad: function (options) {

    },
    clickView2: function (e) {
        let selectorQuery = wx.createSelectorQuery();
        let nodesRef1 = selectorQuery.select("#view1");
        console.log("======" + nodesRef1.dataset.text)
        debugger
    }
});