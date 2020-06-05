const app = getApp();
import request from '../../service/network' //导入request
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 定位现在的页面：简介：0 | 展示：1 | 活动：2
    pageIndex: 0,
    // 社团信息
    associationInfo: {},
  },
  // 点击导航栏的按钮触发
  navClick(e) {
    this.setData({
      pageIndex: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: '/community/getOneCommunityInfo',
      data: {cId:options.id}
    }).then(res=>{
      this.setData({
        associationInfo: res.data
      })
      wx.setNavigationBarTitle({
        title: res.data.name
      })
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

  }
})