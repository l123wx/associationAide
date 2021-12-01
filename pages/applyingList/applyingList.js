import request from '../../service/network';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    button: [{
      text: '普通',
      src: '/page/weui/cell/icon_love.svg', // icon的路径
    },{
      text: '普通',
      extClass: 'test',
      src: '/page/weui/cell/icon_star.svg', // icon的路径
    },{
      type: 'warn',
      text: '警示',
      extClass: 'test',
        src: '/page/weui/cell/icon_del.svg', // icon的路径
    }]
  },
  // 点击人物列表弹出的按钮 index：0 通过 1拒绝
  btnClick(e){
    console.log(e)
    request({
      url: '/community/dealApplyJoinInCommunity',
      data: {
        cId: app.globalData.associationInfo.id,
        dealId: e.detail.id,
        type: e.detail.index==0?'0':'4'
      },
      method: 'post'
    }).then(res=>{
      console.log(res)
      if(res.msg=="操作成功！"){
        this.getApplyingList();
        Notify({ type: 'success', message: '操作成功！' });
      }else{
        Notify({ type: 'danger', message: '操作失败，请重试' });
      }
    })
  },
  // 获取请求列表
  getApplyingList() {
    request({
      url: '/community/getApplyJoinUser',
      data: {
        cId: app.globalData.associationInfo.id
      }
    }).then(res=>{
      this.setData({
        userList: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApplyingList();
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