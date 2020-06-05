// compontents/timeLine/timeLine.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activityLists: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  observars: {
    activityLists(newVal){
      console.log(newVal)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
