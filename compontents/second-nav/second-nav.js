Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navItemLists: {
      type: Array
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      this.setData({
        activeIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent("navClick",e.currentTarget.dataset.index,{})
    }
  },
  observers: {
    navItemLists: function(){
      this.setData({
        activeIndex: 0
      })
    }
  },
  lifetimes: {
    ready() {
      const index = this.properties.index;
      this.setData({
        activeIndex: index
      })
    }
  }
})
