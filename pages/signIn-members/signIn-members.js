import {getMonthAndDay,getHoursAndMinutes} from "../../utils/util";
import request from "../../service/network";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户列表
    userList: {
      readed: [],
      unread: []
    },
    sId: '',
    navItemList: [
      {
        "title": "已签到"
      },
      {
        "title": "未签到"
      }
    ],
    navActiveIndex: 0,
  },
  // 点击导航栏触发
  navClick(e) {
    const index = e.detail;
    this.setData({
      navActiveIndex: index
    })
  },
  // 点击成员列表的更多按钮
  moreBtn(e){
    console.log(e.currentTarget)
    wx.navigateTo({
      url: '/pages/signIn-changeStatus/signIn-changeStatus',
      success: res => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('getInfo',{ 
          userId: e.currentTarget.dataset.id,
          isSignIn: e.currentTarget.dataset.issignin,
          leaveContent: e.currentTarget.dataset.leavecontent,
          sId: this.data.sId,
        })
      }
    })
  },
  // 获取用户列表
  getUserlist(){
    request({
      url: '/communitySignIn/getSignInJoinInUserMessage',
      data: {
        cId: app.globalData.associationInfo.id,
        signId: this.data.sId
      }
    }).then(res=>{
      console.log(res)
      let obj = {readed:[],unread:[]}
      for(var i in res.data){
        res.data[i].readTime = getMonthAndDay(res.data[i].readTime)+" "+getHoursAndMinutes(res.data[i].readTime)
        if(res.data[i].isSignIn != 1){
          obj.unread.push(res.data[i])
        }else{
          obj.readed.push(res.data[i])
        }
      }
      const navItemList = this.data.navItemList;
      navItemList[0].title = "已签到("+ obj.readed.length +")";
      navItemList[1].title = "未签到("+ obj.unread.length +")";
      console.log(obj)
      this.setData({
        userList: obj,
        navItemList
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.sId = options.sId;
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
    this.getUserlist();
    this.setData({
      navActiveIndex: 0
    })
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