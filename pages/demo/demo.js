Page({
    data: {
        todolist: [false, false, true, true],
        show: false,
        list: ["fdfd", 233, true, {bb: "我是对象"}],
        iValue: "默認數據"
    },
    onLoad: function (options) {
    },
    clickView2: function (e) {
        // this.data.show = !this.data.show;
        // console.log(this.data.show)
        // this.setData({
        //     show: this.data.show
        // })
        const query = wx.createSelectorQuery()
        console.log(query.select("#view1"))
        query.select('#view1').boundingClientRect()
        query.selectViewport().scrollOffset()

        query.exec(function (res) {

            console.log(res) //res中有该节点的详细信息

        })
    },
    clickItem(event) {
        for (let i = 0; i < this.data.todolist.length; i++) {
            this.data.todolist[i] = true
        }
        this.data.todolist[event.detail.index] = false
        this.setData({
            todolist: this.data.todolist
        })
        console.log("我是通過組件觸發的" + event.detail.index)

    }
});