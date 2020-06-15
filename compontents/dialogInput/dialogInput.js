// compontents/dialogInput/dialogInput.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
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
    title: "",
    value: "",
    show: false,
    index: ''
  },
  // observers:{
  //   show(newVal){
  //     console.log(newVal)
  //     if(newVal){
  //       if(this.data.isTabBarPage)
  //         wx.hideTabBar();
  //     }else{
  //       if(this.data.isTabBarPage){
  //         setTimeout(()=>{
  //           wx.showTabBar()
  //         },400)
  //       }
  //     }
  //   }
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    inputChange(e) {
      console.log(e)
      this.data.value = e.detail.value
    },
    confirmBtnClick() {
      this.triggerEvent('confirm',{
        value: this.data.value,
        title: this.data.title,
        index: this.data.index
      },{})
      this.data.value = ""
    }
  }
})
