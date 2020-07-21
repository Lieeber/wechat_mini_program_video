Component({
    properties: {
        iHidden:{
            type:Boolean,
            value:true
        },
        iText:String,
        iIndex:{
            type:Number,
            value:3
        }
    },
    data: {
        aaa:"fdfdasfd",
        bbb:"=========",
    },
    methods: {
        clickText(event){
            this.setData({
                iText:"我是被點擊之後設置的值"
            })
            this.triggerEvent("clickText",{index:this.properties.iIndex});
        }
    }
});
