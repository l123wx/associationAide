import request from '../../service/network';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navItemLists: [
      {
        title: "提醒",
        iconClass: "icontixing",
      },
      {
        title: "功能",
        iconClass: "icongengduo",
      },
      {
        title: "我的",
        iconClass: "iconwode",
      },
    ],
    activeIndex: 0,
    // 活动列表
    allCommunityActivityVos: [],
    // 提醒列表
    communityReminds: [],
    userInfoList: {}
  },
  
  //点击导航栏触发
  navClick(e) {
    this.setData({
      activeIndex: e.detail
    })
  },
  // 获取社团相关信息
  getAssociationInfo() {
    request({
      url: '/community/enterCommunityPanel',
      data: {cId:app.globalData.associationInfo.id}
    }).then(res=>{
      console.log(res)
      let userInfoList = {
        departement: res.data.departementName,
        userName: res.data.realName,
        status: res.data.status
      }
      this.setData({
        allCommunityActivityVos: res.data.allCommunityActivityVos,
        communityReminds: res.data.communityReminds,
        userInfoList
      })
      // 将该用户在该社团内的身份类型记录到全局变量
      app.globalData.associationInfo.userStatus = res.data.status;
      console.log()
      // console.log(allCommunityActivityVos,communityReminds)
      if(app.getAssociationInfoCallBack){
        app.getAssociationInfoCallBack();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title:app.globalData.associationInfo.name})
    this.getAssociationInfo();
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