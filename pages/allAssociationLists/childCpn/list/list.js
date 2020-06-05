// pages/allAssociation/childCpn/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    // 级别名称
    collegeName: {
      type: String
    },
    // 分类
    tagsName: {
      type: String
    },
    // 人数
    personCount: {
      type: Number
    },
    // 社团id
    aid: {
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
    // 点击社团时触发
    listItemClick() {
      wx.navigateTo({
        url:"/pages/associationIndex-unjoined/associationIndex-unjoined?id="+this.properties.aid,
      })
    },
  }
})
