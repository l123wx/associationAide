const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 红点的通知数量
    tipsNum: {
      type: Number
    },
    // logo的路径
    logoSrc: {
      type: String
    },
    // 社团名称
    name: {
      type: String
    },
    // 社团简介
    intro: {
      type: String
    },
    aId: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 社团被点击时触发
    listClick() {
      console.log(this.properties.aId)
      app.globalData.associationInfo = {
        id:this.properties.aId,
        name:this.properties.name,
        logoUrl:this.properties.logoSrc
      }
      wx.navigateTo({
        url:"/pages/associationIndex-joined/associationIndex-joined"
      })
    }
  }
})
