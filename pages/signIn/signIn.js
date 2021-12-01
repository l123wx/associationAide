import request from "../../service/network";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 一级导航栏目录
    firstNavItemLists:[
      {
        "title": "我的签到"
      },
      {
        "title": "全部签到"
      }
    ],
    // 二级导航栏目录 普通用户
    secondNavItemLists:[
      {
        "title": "全部"
      },
      {
        "title": "未签"
      },
      {
        "title": "已签"
      },
      {
        "title": "已过期"
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
    // 作为普通成员的签到列表
    userSignInList: [],
    // 作为管理员的签到列表
    managerSignInList: []
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
    wx.navigateTo({
      url: '/pages/signIn-create/signIn-create',
    })
  },
  // 获取签到列表信息
  getSignInList(){
    request({
      url: "/communitySignIn/getUserAllSignInCommunity",
      data: {cId:app.globalData.associationInfo.id}
    }).then(res=>{
      // 在签到列表中添加 是否开始 和 是否结束 的属性
      console.log(res)
      const today = new Date();
      const managerSignInList = function(){
        for(var i in res.data.managerSignInList){
          let beginDate = new Date(res.data.managerSignInList[i].beginTime.substr(0, 19));
          beginDate.setHours(beginDate.getHours()+8);
          let endDate = new Date(res.data.managerSignInList[i].endTime.substr(0, 19));
          endDate.setHours(endDate.getHours()+8);
          res.data.managerSignInList[i].isStarted = beginDate<=today;
          res.data.managerSignInList[i].isEnded = endDate<today;
        }
        return res.data.managerSignInList
      }()
      const userSignInList = function(){
        for(var i in res.data.userSignInList){
          let beginDate = new Date(res.data.userSignInList[i].beginTime.substr(0, 19));
          beginDate.setHours(beginDate.getHours()+8);
          let endDate = new Date(res.data.userSignInList[i].endTime.substr(0, 19));
          endDate.setHours(endDate.getHours()+8);
          res.data.userSignInList[i].isStarted = beginDate<=today;
          res.data.userSignInList[i].isEnded = endDate<today;
        }
        return res.data.userSignInList
      }()
      this.setData({
        userStatus: res.data.userStatus,
        managerSignInList,
        userSignInList
      })
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
    this.getSignInList();
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

  }
})