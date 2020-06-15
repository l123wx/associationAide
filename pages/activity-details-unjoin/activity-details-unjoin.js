import request from '../../service/network';
import {getMonthAndDay,getHoursAndMinutes} from '../../utils/util'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 活动相关信息
    activityInfo: {},
    // 相册列表
    albumList: [],
    // 留言列表
    messageList: [],
    // 活动的id
    aId: -1,
    // 用户的类型 0 普通成员、 1 管理员
    userStatus: -1,
    // 是否展示所有留言
    showAllMessage: false,
  },
  // 预览图片
  previewImage(e){
    let array = [];
    for(var i in this.data.albumList){
      array.push(this.data.albumList[i].photoUrl)
    }
    wx.previewImage({
      urls: array,
      current: e.currentTarget.dataset.url
    })
  },
  // 点击查看更多留言&收起留言
  changeMessageShowStatus() {
    this.setData({
      showAllMessage: !this.data.showAllMessage
    })
  },
  // 获取活动相关信息
  getActivityInfo(){
    request({
      url: '/communityActivity/getOneActivityBaseInfo',
      data: {
        cId: app.globalData.associationInfo.id,
        aId: this.data.aId
      }
    }).then(res=>{
      // 设置导航栏的标题
      wx.setNavigationBarTitle({
        title: res.data.title
      })
      const activityInfo = {
        beginTime: res.data.beginTime,
        content: res.data.content,
        createTime: res.data.createTime,
        endTime: res.data.endTime,
        id: res.data.id,
        isPublic: res.data.isPublic,
        place: res.data.place,
        summary: res.data.summary,
        title: res.data.title,
        uname: res.data.uname
      }
      // 修改发起时间格式
      activityInfo.createTime = getMonthAndDay(activityInfo.createTime)
      // 添加开始时间到结束时间的时间格式
      activityInfo.time = function(){
        const beginTime = activityInfo.beginTime;
        const endTime = activityInfo.endTime;
        return getMonthAndDay(beginTime)+" "+getHoursAndMinutes(beginTime)+" — "+getMonthAndDay(endTime)+" "+getHoursAndMinutes(endTime);
      }()
      for(var i in res.data.activityWordVoList){
        res.data.activityWordVoList[i].time = getMonthAndDay(res.data.activityWordVoList[i].createTime)
      }
      this.setData({
        activityInfo,
        albumList: res.data.activityPhotoVos,
        messageList: res.data.activityWordVos,
        userStatus: app.globalData.associationInfo.userStatus
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      aId: options.aId
    })
    this.getActivityInfo();
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

  }
})