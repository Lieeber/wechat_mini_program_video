Page({
    data: {
        show: false,
        list:["fdfd",233,true,{bb:"我是对象"}]
    },
    onLoad: function (options) {

    },
    clickView2: function (e) {
        this.data.show = !this.data.show;
        console.log(this.data.show)
        this.setData({
            show: this.data.show
        })
    }
});