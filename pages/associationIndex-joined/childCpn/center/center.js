// pages/associationIndex-joined/childCpn/center/center.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex: {
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
    functionClick() {
      wx.navigateTo({
        url: '/pages/notify/notify',
      })
    }
  }
})
