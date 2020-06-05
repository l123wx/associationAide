const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断用户是否登陆
    userLogined: true,
    // 用户信息栏目列表
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
    // 功能栏目列表
    settingList: {
      "about": {
        title: "关于小助手",
        iconClass: "iconprompt",
        iconColor: "#61b6fd",
        content: ""
      },
      "feedback": {
        title: "意见反馈",
        iconClass: "iconsuggest",
        iconColor: "#44c2bf",
        content: ""
      },
      "contactUs": {
        title: "联系我们",
        iconClass: "icontrust",
        iconColor: "#ffa767",
        content: ""
      },
      "help": {
        title: "使用帮助",
        iconClass: "iconhelp",
        iconColor: "#6e7fff",
        content: ""
      },
      "updateLog": {
        title: "更新日志",
        iconClass: "iconemail",
        iconColor: "#26c6ff",
        content: ""
      },
    },
    // 用户名
    username:'',
    // 头像地址
    avatarUrl:'',
    buttons: [
      {
          type: 'default',
          className: '',
          text: '辅助操作',
          value: 0
      },
      {
          type: 'primary',
          className: '',
          text: '主操作',
          value: 1
      }
    ] 
  },
  // 用户点击“点击授权登陆”按钮时触发
  login() {
    // 调用app.js中的登陆方法
    app.login(this.userInfoReadyCallback);
  },
  setUserInfo() {
    let infoLists = this.data.infoList;
    infoLists.username.content = app.globalData.userInfo.stuName;
    infoLists.stuNum.content = app.globalData.userInfo.stuId;
    infoLists.gender.content = function(){
      if(app.globalData.userInfo.gender==1){
        return "男"
      }else if(app.globalData.userInfo.gender==2){
        return "女"
      }else{
        return "未知"
      }
    }();
    infoLists.college.content = app.globalData.userInfo.stuCollege;
    infoLists.profession.content = app.globalData.userInfo.stuMajor;
    infoLists.grade.content = app.globalData.userInfo.stuGrade;
    infoLists.class.content = app.globalData.userInfo.stuClass;
    infoLists.phone.content = app.globalData.userInfo.stuMobile;
    console.log(infoLists)
    this.setData({
      username : app.globalData.userInfo.nickName,
      avatarUrl : app.globalData.userInfo.avatarUrl,
      infoList : infoLists,
      userLogined : true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //如果路由中的userLogin存在 说明用户未授权
    if( options.userLogined != undefined ){
      this.setData({
        userLogined: Boolean(options.userLogined*1) //将url上的字符串转成数字再转成Boolean再赋值
      })
    } else {
      this.setUserInfo();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 用户信息请求完成后，传递到页面的函数
    app.userInfoReadyCallback= () =>{
      console.log("userInfoReadyCallback回调")
      // 可以在this.gobalData.userInfo 里面获取用户信息了
      this.setUserInfo();
    }
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