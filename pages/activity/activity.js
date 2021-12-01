import request from "../../service/network";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户状态 0普通成员 1管理员
    userStatus: 0,
    // 活动列表
    allCommunityActivityLists: []
  },
  // 点击添加按钮时触发
  addBtnClick() {
    wx.navigateTo({
      url: '/pages/activity-create/activity-create',
    })
  },
  // 获取活动信息
  getActivityInfo(){
    request({
      url: "/communityActivity/getUserAllActivityInCommunity",
      data: {cId:app.globalData.associationInfo.id}
    }).then(res=>{
      console.log(res)
      this.setData({
        userStatus: res.data.userStatus,
        allCommunityActivityLists: res.data.allCommunityActivityVos
      })
      wx.stopPullDownRefresh();
    })
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getActivityInfo();
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
    this.getActivityInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})