const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formats: {},
    placeholder: '可以在这个页面介绍社团的相关信息，比如社团简介、部门介绍、招新信息、所获荣誉等。支持插入图片，可以直接截取公众号推文展示',
    value: ''
  },
  onEditorReady() {
    const that = this
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({ html: prevPage.data.article || ''})
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    const that = this
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
        that.editorCtx.scrollIntoView()
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'photo',
          formData: {
            cId: app.globalData.associationInfo.id
          },
          header:{
            "token": wx.getStorageSync('token'),
            "Content-Type": "multipart/form-data"
          },
          url: 'https://stzs.smtboy.com/api/community/uploadArticlePhoto',
          success: res=>{
            that.editorCtx.insertImage({
              src: JSON.parse(res.data).data,
              width: '100%'
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  undo() {
    this.editorCtx.undo();
  },
  redo() {
    this.editorCtx.redo();
  },
  changeEditor(e){
    this.data.value = e.detail.html
    console.log(this.data.value)
  },
  // 点击完成编辑按钮
  finishedBtn(){
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    prevPage.data.article = this.data.value;
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  }
})