// pages/associationIndex-unjoined/childCpn/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 初始化时的页面index
    index: {
      type: Number
    }
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
  },
  lifetimes: {
    ready() {
      let index = this.properties.index;
      this.setData({
        activeIndex: index
      })
    }
  }
})
