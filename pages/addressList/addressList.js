import request from '../../service/network'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    genderInitArray: [],
    userList: {},
    isAdmin: false
  },
  // 邀请成员
  toInvite(){
    wx.navigateTo({
      url: '/pages/msgPage/msgPage?type=2',
    })
  },
  // 跳转到加入社团申请页
  toApplyingList(){
    wx.navigateTo({
      url: '/pages/applyingList/applyingList',
    })
  },
  // 点击通讯录里面的用户时触发
  userClick(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/userInfo-details/userInfo-details?userId='+e.currentTarget.dataset.id,
    })
  },
  // 获取用户列表
  getUserList(){
    request({
      url: '/community/getPersonAddressBook',
      data: {cId:app.globalData.associationInfo.id}
    }).then(res=>{
      console.log(res)
      let obj = {'A':[],'B':[],'C':[],'D':[],'E':[],'F':[],'G':[],'H':[],'I':[],'J':[],'K':[],'L':[],'M':[],'N':[],'O':[],'P':[],'Q':[],'R':[],'S':[],'T':[],'U':[],'V':[],'W':[],'X':[],'Y':[],'Z':[],'#':[]}
      let genderInitArray = [];
      for(var i in res.data){
        // 往对应的首字母数组内填入人物信息
        if(obj[res.data[i].nameFirstLetter]){
          obj[res.data[i].nameFirstLetter].push(res.data[i])
        }else{
          obj['#'].push(res.data[i])
        }
      }
      // 筛选出有数据的首字母
      for(var i in obj){
        if(obj[i].length!=0){
          genderInitArray.push(i)
        }
      }
      
      console.log(obj,genderInitArray)
      this.setData({
        userList: obj,
        genderInitArray
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.associationInfo.userStatus)
    if(app.globalData.associationInfo.userStatus==1){
      wx.setNavigationBarTitle({
        title: '成员管理'
      })
    }
    this.setData({
      isAdmin: app.globalData.associationInfo.userStatus==1
    })
    this.getUserList();
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