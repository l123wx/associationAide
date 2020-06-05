// compontents/emptyHint/emptyHint.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //  状态文字
    statusText: {
      type: String
    },
    // 按钮的文字
    buttonText: {
      type: String
    },
    // 背景图类型 1书信 2ufo
    bgType: {
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
    // 按钮被点击后触发
    click() {
      this.triggerEvent('emptyHintBtnClick',{},{});
    }
  }
})
