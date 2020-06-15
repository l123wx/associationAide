const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 用来控制窗口display的参数 true display:none
    isShow: false,
    // 用来控制显示动画的参数
    showAnimation: false
  },
  observers: {
    show(newVal) {
      if(newVal){
        this.setData({
          isShow: true
        })
        setTimeout(res=>{
          this.setData({
            showAnimation: true
          })
        },100)
      }else{
        this.setData({
          showAnimation: false,
          isShow: false
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 一键登录按钮被点击时触发
    btnClick() {
      app.checkLogin();
      this.triggerEvent('hidden',{},{})
    },
    hidden() {
      this.triggerEvent('hidden',{},{})
    },
    catch(){}
  },
})
