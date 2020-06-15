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
    // 活动相关通知列表
    notifyList: [],
    // 留言列表
    messageList: [],
    // 功能列表
    functions: [
      {
        name: "创建通知",
        iconClass: "icontongzhi",
        iconColor: "linear-gradient(to right, #5f98ff 0%, #5f98ff 100%)"
      },{
        name: "创建签到",
        iconClass: "iconqiandao",
        iconColor: "linear-gradient(to right, #a06fdf 0%, #a06fdf 100%)"
      },{
        name: "创建收集",
        iconClass: "iconshangchuanyunduan",
        iconColor: "linear-gradient(to right, #ff5d76 0%, #ff5d76 100%)"
      },{
        name: "编辑活动总结",
        iconClass: "iconbianji",
        iconColor: "linear-gradient(to right, #efce16 0%, #efce16 100%)"
      },
    ],
    // 活动的id
    aId: -1,
    // 用户的类型 0 普通成员、 1 管理员
    userStatus: -1,
    // 是否展示所有留言
    showAllMessage: false,
  },
  // 上传照片
  updatePhoto(){
    wx.chooseImage({
      count: 9,
      success: res=>{
        console.log(res.tempFilePaths)
        this.uploadFile(res.tempFilePaths)
      }
    })
  },
  uploadFile(urlArray){
    wx.showLoading({
      title: '上传中...',
    })
    if(urlArray.length){
      wx.uploadFile({
        url: 'https://stzs.smtboy.com/api/communityActivity/addPhotos',
        filePath: urlArray[0],
        name: 'activityPhotos',
        formData: {
          cId: app.globalData.associationInfo.id,
          aId: this.data.aId
        },
        header:{
          "token": wx.getStorageSync('token') || '',
          "Content-Type": "multipart/form-data"  
        },
        complete:(res)=>{
          urlArray.splice(0,1)
          this.uploadFile(urlArray);
        }
      })
    }else{
      wx.showToast({
        title: '上传成功！'
      })
    }
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
  // 点击查看全部活动相关
  toAllActivityNotify(){
    wx.navigateTo({
      url: '/pages/activity-notify/activity-notify?id='+this.data.aId,
    })
  },
  // 点击任一功能时触发
  functionClick(e) {
    console.log(e.currentTarget.dataset.name)
    if(e.currentTarget.dataset.name=="创建通知"){
      wx.navigateTo({
        url: '/pages/notify-create/notify-create?aId='+this.data.aId,
      })
    }else if(e.currentTarget.dataset.name=="创建签到"){
      wx.navigateTo({
        url: '/pages/signIn-create/signIn-create?aId='+this.data.aId,
      })
    }else if(e.currentTarget.dataset.name=="创建收集"){
      wx.navigateTo({
        url: '/pages/collection-create/collection-create?aId='+this.data.aId,
      })
    }
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
      url: '/communityActivity/getOneActivityAllInfo',
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
        albumList: res.data.activityPhotoVoList,
        notifyList: res.data.activityRelatedList,
        messageList: res.data.activityWordVoList,
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