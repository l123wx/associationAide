import request from '../../service/network';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: -1,
    avatarUrl: '',
    // 昵称
    nickName: '',
    // 是否为管理员
    isAdmin: false,
    // 使用中操作的用户的身份
    userStatus: -1,
    associationUserInfo: {
      "department": {
        title: "部门",
        iconClass: "iconzuzhi",
        iconColor: "#ffa767",
        content: ""
      },
      "userStatus": {
        title: "当前状态",
        iconClass: "iconzaizhi",
        iconColor: "#49b45d",
        content: ""
      },
    },
    infoList: {
      "username": {
        title: "真实姓名",
        iconClass: "iconoffice-supplies",
        iconColor: "#61b6fd",
        content: ""
      },
      "stuNum": {
        title: "学号",
        iconClass: "iconbianhao",
        iconColor: "#44c2bf",
        content: ""
      },
      "gender": {
        title: "性别",
        iconClass: "iconxingbie",
        iconColor: "#ea68a2",
        content: ""
      },
      "college": {
        title: "学院",
        iconClass: "iconnamecard",
        iconColor: "#ffa767",
        content: ""
      },
      "profession": {
        title: "专业",
        iconClass: "iconcontacts",
        iconColor: "#6e7fff",
        content: ""
      },
      "grade": {
        title: "年级",
        iconClass: "icontongxunlu",
        iconColor: "#26c6ff",
        content: ""
      },
      "class": {
        title: "班级",
        iconClass: "iconjiaoshi_banji",
        iconColor: "#49b45d",
        content: ""
      },
      "phone": {
        title: "电话",
        iconClass: "iconmobile-phone",
        iconColor: "#efce16",
        content: ""
      },
    },
  },
  // 设为管理员/普通成员
  changeUserStatus(e){
    let msg = '';
    if(e.detail.value){
      msg = '将该成员设为管理员吗'
    }else{
      msg = '除去该成员的管理员身份吗'
    }
    wx.showModal({
      title: '提示',
      content: '确认要'+msg,
      success:res=>{
        console.log(res);
        if(res.confirm){
          wx.showLoading({title:'请稍后...'})
          request({
            url: '/community/managerUserStatus',
            method: 'post',
            data: {
              cId: app.globalData.associationInfo.id,
              dealUserId: this.data.userId,
              type: e.detail.value?1:0
            }
          }).then(res=>{
            console.log(res)
            if(res.msg=="操作成功！"){
              wx.showToast({
                title: '修改成功！'
              })
            }else{
              wx.showToast({
                title: '修改失败，请重试！',
                icon: 'none'
              })
            }
            this.getUserInfo();
          })
        }else{
          this.setData({
            isAdmin: !e.detail.value
          })
        }
      }
    })
  },
  // 删除用户
  deleteUser(){
    wx.showModal({
      title: '提示',
      content: '确认要删除这个成员吗',
      success:()=>{
        request({
          url: '/community/deleteNumber',
          method: 'post',
          data: {
            cId: app.globalData.associationInfo.id,
            dUserId: this.data.userId
          }
        }).then(res=>{
          console.log(res)
          if(res.msg=="删除成功"){
            wx.showToast({
              title: '已删除'
            })
            wx.navigateBack()
          }
        })
      }
    })
  },
  // 获取用户信息
  getUserInfo(){
    request({
      url: '/user/getNumberInfo',
      data: {
        showId: this.data.userId,
        cId: app.globalData.associationInfo.id
      }
    }).then(res=>{
      console.log(res)
      let infoList = this.data.infoList;
      console.log(infoList)
      infoList.username.content = res.data.stuName || '';
      infoList.stuNum.content = res.data.stuId || '';
      infoList.gender.content = res.data.gender==0?'未知':(res.data.gender==1?'男':'女');
      infoList.college.content = res.data.stuCollege || '';
      infoList.profession.content = res.data.stuMajor || '';
      infoList.grade.content = res.data.stuGrade || '';
      infoList.class.content = res.data.stuClass || '';
      infoList.phone.content = res.data.stuMobile || '';
      let associationUserInfo = this.data.associationUserInfo || '';
      associationUserInfo.department.content = res.data.departmentName || '';
      associationUserInfo.userStatus.content = function(){
        if(res.data.communityStatus==1||res.data.communityStatus==0){
          return '在职'
        }else{
          return '退休'
        }
      }();
      this.setData({
        infoList,
        associationUserInfo,
        nickName: res.data.nickName,
        avatarUrl: res.data.avatarUrl,
        isAdmin: res.data.communityStatus==1,
        userStatus: app.globalData.associationInfo.userStatus
      })
      // console.log(infoList,associationUserInfo)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userId = options.userId;
    this.getUserInfo();
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