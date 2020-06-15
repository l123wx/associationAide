const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myAssociationLists: [],
    logined: false
  },
  toLogin() {
    app.checkLogin();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.userInfo!={})
    this.setData({
      myAssociationLists : app.globalData.userInfo.userCommunityVos||[],
      logined: !!app.globalData.userInfo.nickName
    })
    app.myAssociationListsReadyCallback = () =>{
      this.setData({
        myAssociationLists : app.globalData.userInfo.userCommunityVos||[],
        logined: !!app.globalData.userInfo.nickName
      })
      console.log(this.data.logined,this.data.myAssociationLists)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.associationInfo.userStatus = -1;
    console.log(app.globalData.associationInfo.userStatus)
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

  }
})