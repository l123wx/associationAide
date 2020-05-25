// pages/associationIndex-unjoined/childCpn/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String
    },
    intro: {
      type: String
    },
    logoSrc: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    introShowAll: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      this.setData({
        introShowAll: true
      })
    },
    closeMore() {
      this.setData({
        introShowAll: false
      })
    }
  }
})
