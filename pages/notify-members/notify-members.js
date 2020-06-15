import request from '../../service/network';
import {getMonthAndDay,getHoursAndMinutes} from "../../utils/util"
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
    nId: '',
    navItemList: [
      {
        "title": "已读"
      },
      {
        "title": "未读"
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
  // 获取参与人列表
  getUserlist(){
    request({
      url: '/communityNotice/getNoticeJoinInUserMessage',
      data: {
        cId: app.globalData.associationInfo.id,
        nId: this.data.nId
      }
    }).then(res=>{
      console.log(res)
      let obj = {readed:[],unread:[]}
      for(var i in res.data){
        res.data[i].readTime = getMonthAndDay(res.data[i].readTime)+" "+getHoursAndMinutes(res.data[i].readTime)
        if(res.data[i].isRead == 0){
          obj.unread.push(res.data[i])
        }else{
          obj.readed.push(res.data[i])
        }
      }
      const navItemList = this.data.navItemList;
      navItemList[0].title = "已读("+ obj.readed.length +")";
      navItemList[1].title = "未读("+ obj.unread.length +")";
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
    console.log(options)
    this.data.nId = options.id
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