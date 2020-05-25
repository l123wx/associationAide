// pages/associationIndex-unjoined/childCpn/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickBtn(e){
      this.setData({
        activeIndex:e.target.dataset.index
      })
      this.triggerEvent('navClick', e.target.dataset.index, {})
    }
  }
})
