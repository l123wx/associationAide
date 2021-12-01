const app = getApp();
import request from '../../service/network'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aId: -1,
    notifyList: []
  },
  // 获取相关信息列表
  getNotifyList(){
    request({
      url: '/communityActivity/getOneRelated',
      data: {
        cId: app.globalData.associationInfo.id,
        aId: this.data.aId
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        notifyList: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.aId = options.id;
    this.getNotifyList();
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