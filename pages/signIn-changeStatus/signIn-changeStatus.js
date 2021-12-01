import request from "../../service/network";
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: -1,
    isSignIn: '-1',
    leaceContent: '',
    sId: -1,
    // 判断是否做出了修改
    isChange: false
  },
  // 单选框发送变化
  onChange(event) {
    if(!this.data.isChange){
      this.setData({
        isChange:true
      })
    }
    console.log(event)
    this.data.isSignIn = event.detail.value;
  },
  // 输入框内容发送改变后触发
  inputValueChange(e){
    if(!this.data.isChange){
      this.setData({
        isChange:true
      })
    }
    console.log(e)
    this.data.leaceContent = e.detail.value
  },
  // 确认修改
  upDateClick() {
    if(this.data.isChange){
      request({
        url: '/communitySignIn/managerSignType',
        method: 'post',
        data: {
          cId: app.globalData.associationInfo.id,
          signId: this.data.sId,
          userSignId: this.data.userId,
          type: this.data.isSignIn,
          content: this.data.leaceContent||''
        }
      }).then(res=>{
        if(res.msg=="操作成功！"){
          wx.navigateBack()
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    // 监听getUserList事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('getInfo', data=>{
      console.log(data)
      this.setData({
        userId: data.userId,
        isSignIn: data.isSignIn,
        leaveContent: data.leaveContent,
        sId: data.sId
      })
    })
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