// compontents/pickerInput/pickerInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTabBarPage: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    columns: [],
    title: "",
    index: ""
  },
  // observers:{
  //   show(newVal) {
  //     if(newVal){
  //       if(this.data.isTabBarPage)
  //         wx.hideTabBar();
  //     }else{
  //       if(this.data.isTabBarPage){
  //         setTimeout(()=>{
  //           wx.showTabBar();
  //         },400)
  //       }
  //     }
  //   }
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    onConfirm(e){
      this.closeClick();
      console.log(e)
      this.triggerEvent('confirm',{
        value: e.detail.value,
        title: this.data.title,
        index: this.data.index
      },{})
    },
    closeClick(){
      this.setData({
        show: false
      })
    }
  }
})
