const app = getApp();
import request from "../../service/network";
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cId: -1,
    name: '',
    applyContent: '',
    loginShow: false
  },
  onChange(e) {
    this.data.applyContent = e.detail
  },
  loginHidden(){
    console.log("123")
    this.setData({
      loginShow: false
    })
  },
  // 点击发送申请后触发
  sendApplying(){
    if(app.globalData.userInfo.nickName){
      // 如果登陆了 发送请求
      request({
        url: '/community/applyJoinInCommunity',
        method: 'post',
        data: {
          cId: this.data.cId,
          applyContent: this.data.applyContent
        }
      }).then(res=>{
        console.log(res)
        if(res.msg == "申请成功！"){
          wx.navigateTo({
            url: '/pages/msgPage/msgPage?type=3',
          })
        }else{
          Notify({ type: 'danger', message: '申请失败，请勿重复发送申请！' });
        }
      })
    }else{
      // 如果没登录
      this.setData({
        loginShow: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.cId = options.cId;
    this.setData({
      name: options.name
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    if(!app.globalData.userInfo.nickName){
      this.setData({
        loginShow: true
      })
    }
    app.userInfoReadyCallback=()=>{
      this.setData({
        loginShow: false
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
  onShareAppMessage: function () {

  }
})