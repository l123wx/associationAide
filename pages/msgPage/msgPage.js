const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面类型 0 导出成功页；1 社团创建成功页
    type: 0,
    // 下载链接地址
    link: '',
    // 社团名称
    associationName: '',
    // 社团头像地址
    logoUrl: '',
    // 社团id
    cId: ''
  },
  // 导出成功页面，点击复制下载链接
  copyLink() {
    wx.setClipboardData({
      data: this.data.link
    })
  },
  // 返回首页
  toHome(){
    wx.switchTab({
      url: '/pages/myAssociationLists/myAssociationLists'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type==0){
      wx.setNavigationBarTitle({
        title: '导出成功',
      })
    }else if( options.type==1 ){
      wx.setNavigationBarTitle({
        title: '创建成功',
      })
    }else if( options.type==2 ){
      wx.setNavigationBarTitle({
        title: '邀请成员',
      })
    }else if( options.type==3 ){
      wx.setNavigationBarTitle({
        title: '申请成功',
      })
    }
    this.setData({
      type: options.type || '',
      link: options.link || '',
      associationName: app.globalData.associationInfo.name || '',
      logoUrl: app.globalData.associationInfo.logoUrl || ''
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if(this.data.type == 2){
      return {
        title: "邀请你加入  "+this.data.associationName,
        path: '/pages/association-apply/association-apply?cId='+app.globalData.associationInfo.id+"&name="+app.globalData.associationInfo.name
      }
    }
  }
})