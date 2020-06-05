import request from '../../service/network'; 
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
  },
  //点击导航栏触发
  navClick(e) {
    this.setData({
      activeIndex: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({title:options.name})
    request({
      url: '/community/enterCommunityPanel',
      data: {cId:options.id}
    }).then(res=>{
      console.log(res)
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