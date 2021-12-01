// pages/associationIndex-unjoined/childCpn/content/content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageIndex: {
      type: Number
    },
    // 社团信息
    associationInfo: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    picUrlLists: [],
    classLists: []
  },
  observers: {
    associationInfo(newVal){
      // 从社团信息中把相册url拿出来放到数组里
      let picUrlLists = [];
      for(var item in newVal.communityPhotos){
        picUrlLists.push(newVal.communityPhotos[item].photoUrl);
      }
      // 从社团信息中把部门信息拿出来放到数组里
      let classLists = [];
      for(var item in newVal.communityDepartments){
        classLists.push(newVal.communityDepartments[item].name);
      }
      this.setData({
        picUrlLists,
        classLists
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onEditorReady() {
      const that = this
      this.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
        that.editorCtx.setContents({
          html: that.data.associationInfo.communityArticle.content
        })
    }).exec()
    },
  },
})
