import request from '../../service/network';
import {getMonthAndDay,getHoursAndMinutes} from '../../utils/util'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 通知信息
    notifyInfo: {},
    // 相关人员列表 已读 未读
    userLists: [],
    // 已读人员列表
    readedUserLists: [],
    // 功能列表
    functions: [
      {
        name: "导出记录",
        iconClass: "icondaochu",
        iconColor: "linear-gradient(to right, #efce16 0%, #efce16 100%)"
      }
    ],
    // 通知的id
    nId: -1,
    // 用户的类型
    userStatus: -1,
    // 是否显示登陆弹窗
    showLoginBox: false,
  },
  // 点击任一功能时触发
  functionClick(e) {
    console.log(e.currentTarget.dataset.name)
    // 如果点击的是导出记录
    if(e.currentTarget.dataset.name=="导出记录"){
      this.export();
    }
  },
  // 查看参与人员列表
  toReaderList() {
    wx.navigateTo({
      url: '/pages/notify-members/notify-members?id='+this.data.nId
    })
  },
  // 导出记录
  export() {
    request({
      url: '/communityNotice/export',
      method: 'post',
      data: {
        cId: app.globalData.associationInfo.id,
        noticeId: this.data.nId
      }
    }).then(res=>{
      console.log(res)
      if(res.status==0){
        wx.navigateTo({
          url: '/pages/msgPage/msgPage?type=0&link='+res.data
        })
      }
    })
  },
  //  隐藏登陆窗口
  hiddenLoginBox() {
    this.setData({
      showLoginBox: false
    })
  },
  // 已读这条通知
  readNotify() {
    request({
      url: '/communityNotice/readNotice',
      method: 'post',
      data: {
        cId: app.globalData.associationInfo.id,
        nId: this.data.nId
      }
    }).then(res=>{
      console.log(res)
    })
  },
  getNotifyInfo() {
    console.log("获取相关信息")
    // 获取相关信息
    request({
      url: '/communityNotice/getNoticeMessage',
      data: {
        cId: app.globalData.associationInfo.id,
        nId: this.data.nId
      }
    }).then(res=>{
      // 判断是否已读
      if(res.data.isRead==0){
        this.readNotify();
      }
      // 设置导航栏的标题
      wx.setNavigationBarTitle({
        title: res.data.communityNotice.title
      })
      console.log(res)
      // 修改发起时间格式
      res.data.communityNotice.createTime = getMonthAndDay(res.data.communityNotice.createTime)
      // 添加开始时间到结束时间的时间格式
      res.data.communityNotice.time = function(){
        const beginTime = res.data.communityNotice.beginTime;
        return getMonthAndDay(beginTime)+" "+getHoursAndMinutes(beginTime);
      }()
      // 筛选出已读的用户
      let readedUserArray = [];
      for(var i in res.data.noticeUserVos){
        if(res.data.noticeUserVos[i].isRead==1){
          readedUserArray.push(res.data.noticeUserVos[i])
        }
      }
      this.setData({
        notifyInfo: res.data.communityNotice,
        userLists: res.data.noticeUserVos,
        userStatus: app.globalData.associationInfo.userStatus,
        readedUserLists: readedUserArray
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      nId: options.nId
    })
    console.log(!app.globalData.userInfo.nickName)
    if(app.globalData.userInfo.nickName){
      this.getNotifyInfo();
    }
    app.userInfoReadyCallback = () => {
      this.getNotifyInfo();
    }
    app.loginFailCallback=()=>{
      this.setData({
        showLoginBox: true
      })
    }
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
  onShareAppMessage: function (res) {
    console.log(res)
    return {
      title: this.data.notifyInfo.title,
      path: 'pages/notify-details/notify-details?cId='+app.globalData.associationInfo.id+"&nId="+this.data.nId
    }
  }
})