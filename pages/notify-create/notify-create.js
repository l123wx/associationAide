import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import request from '../../service/network'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    intro: '',
    beginTime: '',
    beginTimeShow: '',
    place: '',
    popupIsShow: false,
    // 时间选择器初始时间
    timePickerValue: '',
    minDate: '',
    maxDate: '',
    notifyObject: [],
    // 活动列表
    activityList: [],
    // 选中的活动
    activityChecked: {}
  },
  // 点击选择开始时间
  chooseBeginTime(){
    this.setData({
      popupIsShow: true
    })
    this.initTimePicker();
  },
  // 标题输入的时候触发
  titleChange(e){
    console.log(e)
    this.data.title = e.detail
  },
  introChange(e){
    this.data.intro = e.detail
  },
  placeChange(e){
    this.data.place = e.detail
  },
  // 初始化时间选择器的参数
  initTimePicker(){
    const today = new Date();
    this.setData({
      timePickerValue: today.getTime(),
      minDate: today.setFullYear(today.getFullYear()-1),
      maxDate: today.setFullYear(today.getFullYear()+2)
    })
  },
  // 点击选择器的确认按钮
  chooseTime(e){
    console.log(e)
    const date = new Date(e.detail);
    const beginTimeShow = function(){
      return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes();
    }()
    this.setData({
      popupIsShow: false,
      beginTimeShow,
      beginTime: date.getTime()
    })
  },
  // 点击选择器的取消按钮
  chooseCancel(){
    this.setData({
      popupIsShow: false
    })
  },
  // 点击选择通知对象
  chooseNotifyObj(){
    wx.navigateTo({
      url: '/pages/selectObjects/selectObjects',
    })
  },
  // 获取活动列表
  getActivityList(){
    request({
      url: '/communityActivity/getActivityNoEnd',
      data: {
        cId: app.globalData.associationInfo.id
      }
    }).then(res=>{
      this.setData({
        activityList: res.data
      })
    })
  }, 
  // 归属活动选择
  pickerChange(e){
    this.setData({
      activityChecked: this.data.activityList[e.detail.value]
    })
  },
  // 点击发布通知
  createNotify(){
    console.log("发布通知")
    console.log(this.data.activityChecked)
    if(this.data.title!=""&&this.data.notifyObject.length){
      request({
        url: '/communityNotice/addNotic',
        method: 'post',
        header:{
          "content-type":"application/json"
        },
        data: JSON.stringify({
          "cid": app.globalData.associationInfo.id,
          "title": this.data.title,
          "content": this.data.intro,
          "place": this.data.place,
          "beginTime": this.data.beginTime,
          "userCount": this.data.notifyObject.length,
          "aid": this.data.activityChecked.aid,
          "userId": this.data.notifyObject
        })
      }).then(res=>{
        console.log(res)
        if(res.msg="创建通知成功！"){
          wx.showToast({
            title: '创建成功',
            success(){
              wx.navigateBack()
            }
          })
        }
      })
    }else{
      Notify({ type: 'danger', message: '请将信息填写完整！' });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.aId){
      this.data.activityChecked.aid = options.aId
    }
    this.getActivityList()
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