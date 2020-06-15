// pages/applyingList/childCpn/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarUrl: {
      type: String
    },
    name: {
      type: String
    },
    applyContent: {
      type: String,
      value: "没填呢没填呢没填呢没填呢没填呢没填呢"
    },
    userId: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    listActive: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击三个点 更多按钮 时触发
    moreBtn(){
      this.setData({
        listActive: !this.data.listActive
      })
    },
    // 点击按钮时触发
    btnClick(e){
      this.triggerEvent('btnClick',{
        index: e.currentTarget.dataset.index,
        id: this.properties.userId
      },{})
    },
  }
})
