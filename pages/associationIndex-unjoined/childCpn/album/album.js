// pages/associationIndex-unjoined/childCpn/album/album.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    picUrlLists: {
      type: Array
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
    previewImage(e){
      wx.previewImage({
        current: e.target.dataset.url,
        urls: this.properties.picUrlLists
      })
    }
  }
})
