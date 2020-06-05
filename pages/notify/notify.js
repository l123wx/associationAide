import request from "../../service/network";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 一级导航栏目录
    firstNavItemLists:[
      {
        "title": "我的通知"
      },
      {
        "title": "全部通知"
      }
    ],
    // 二级导航栏目录 普通用户
    secondNavItemLists:[
      {
        "title": "全部"
      },
      {
        "title": "未读"
      },
      {
        "title": "已读"
      }
    ],
    // 二级导航栏目录 管理员
    secondNavItemLists_admin:[
      {
        "title": "全部"
      },
      {
        "title": "进行中"
      },
      {
        "title": "已结束"
      }
    ],
    // 一级导航栏选中项index
    firstNavIndex: 0,
    // 二级导航栏选中项index
    secondNavIndex: 0,
    // 用户状态 0普通成员 1管理员
    userStatus: 1,
    // 作为普通成员的通知列表
    userNoticeList: [],
    // 作为管理员的通知列表
    managerNoticeList: [],
    // 社团id
    id: -1,
  },
  // 点击一级导航栏时触发
  firstNavClick(e) {
    const index = e.detail;
    this.setData({
      firstNavIndex: index,
      secondNavIndex: 0
    })
  },
  // 点击二级导航栏时触发
  secondNavClick(e) {
    this.setData({
      secondNavIndex: e.detail
    })
  },
  // 点击添加按钮时触发
  addBtnClick() {
    console.log("发布新通知")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url: "/communityNotice/getUserAllNoticeInCommunity",
      data: {cId:options.id}
    }).then(res=>{
      this.setData({
        userStatus: res.data.userStatus,
        managerNoticeList: res.data.managerNoticeList,
        userNoticeList: res.data.userNoticeList,
        id: options.id
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