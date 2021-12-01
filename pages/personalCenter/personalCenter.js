const app = getApp();
import request from '../../service/network';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
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
        content: "",
        inputType: "text"
      },
      "stuNum": {
        title: "学号",
        iconClass: "iconbianhao",
        iconColor: "#44c2bf",
        content: "",
        inputType: "text"
      },
      "gender": {
        title: "性别",
        iconClass: "iconxingbie",
        iconColor: "#ea68a2",
        content: "",
        inputType: "pick",
        columns: [
          {
            text: "男",
            id: 1
          },
          {
            text: "女",
            id: 2
          }
        ]
      },
      "college": {
        title: "学院",
        iconClass: "iconnamecard",
        iconColor: "#ffa767",
        content: "",
        inputType: "pick",
        columns: [],
      },
      "profession": {
        title: "专业",
        iconClass: "iconcontacts",
        iconColor: "#6e7fff",
        content: "",
        inputType: "pick",
        columns: [
          {"text":"请先选择对应的学院", disabled: true},
          {"text":"空",id:-1}
        ]
      },
      "grade": {
        title: "年级",
        iconClass: "icontongxunlu",
        iconColor: "#26c6ff",
        content: "",
        inputType: "pick",
        columns: []
      },
      "class": {
        title: "班级",
        iconClass: "iconjiaoshi_banji",
        iconColor: "#49b45d",
        content: "",
        inputType: "pick",
        columns: [
          {text: "01"},
          {text: "02"},
          {text: "03"},
          {text: "04"},
          {text: "05"},
        ]
      },
      "phone": {
        title: "电话",
        iconClass: "iconmobile-phone",
        iconColor: "#efce16",
        content: "",
        inputType: "text"
      },
    },
    // 功能栏目列表
    settingList: {
      // "about": {
      //   title: "关于小助手",
      //   iconClass: "iconprompt",
      //   iconColor: "#61b6fd",
      //   content: ""
      // },
      "createAssociation": {
        title: "创建社团",
        iconClass: "icontianjia11",
        iconColor: "#ea68a2",
        content: ""
      },
      "help": {
        title: "使用帮助",
        iconClass: "iconhelp",
        iconColor: "#6e7fff",
        content: ""
      },
      // "updateLog": {
      //   title: "更新日志",
      //   iconClass: "iconemail",
      //   iconColor: "#26c6ff",
      //   content: ""
      // },
    },
    // 用户名
    username:'',
    // 头像地址
    avatarUrl:'',
    // 加入的社团数量
    joinedNum: 0,
    // 可管理的社团数量
    manageNum: 0,
    // 学院id
    collegeId: -1,
  },
  // 用户点击“点击授权登陆”按钮时触发
  login() {
    // 调用app.js中的登陆方法
    app.login();
  },
  // 绑定用户信息到data
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
    // 记录学院id
    this.data.collegeId = app.globalData.userInfo.stuCollegeId;
    // 获取专业列表
    this.getMajor();
    console.log(infoLists)
    const joinedNum = app.globalData.userInfo.userCommunityVos.length;
    const manageNum = function() {
      let num = 0;
      for(var i in app.globalData.userInfo.userCommunityVos){
        if(app.globalData.userInfo.userCommunityVos[i].status==1){
          num ++;
        }
      }
      return num;
    }()
    this.setData({
      username : app.globalData.userInfo.nickName,
      avatarUrl : app.globalData.userInfo.avatarUrl,
      infoList : infoLists,
      userLogined : true,
      joinedNum,
      manageNum
    })
  },
  // 点击下面的相关操作时触发 关于小助手 创建社团 使用帮助 更新日志
  listClick(e){
    console.log(e.currentTarget.dataset.title)
    if(e.currentTarget.dataset.title=="关于小助手"){
      wx.navigateTo({
        url: '/pages/about/about',
      })
    }else if(e.currentTarget.dataset.title=="创建社团"){
      wx.navigateTo({
        url: '/pages/association-create/association-create',
      })
    }else if(e.currentTarget.dataset.title=="使用帮助"){
      wx.navigateTo({
        url: '/pages/usinghelp/usinghelp',
      })
    }else if(e.currentTarget.dataset.title=="更新日志"){

    }
  },
  // 点击个人信息的list时触发的方法
  infoListClick(e) {
    console.log(e)
    const title = e.currentTarget.dataset.title;
    const index = e.currentTarget.dataset.index;//infoList里的属性名
    const type = e.currentTarget.dataset.type; //输入内容的类型 
    // 输入类型 输入框 选框
    if(type=="text"){
      // 输入框
      let dialogInput = this.selectComponent("#dialogInput");
      const infoList = this.data.infoList;
      console.log(infoList[index])
      dialogInput.setData({
        show: true,
        value: infoList[index].content,
        title: e.currentTarget.dataset.title,
        index: index
      })
    }else if(type=="pick"){
      // 选框
      let pickerInput = this.selectComponent("#pickerInput");
      const infoList = this.data.infoList;
      pickerInput.setData({
        show: true,
        columns: infoList[index].columns,
        title: e.currentTarget.dataset.title,
        index: index
      })
    }
  },
  // 点击 文字输入 弹窗确认按钮后触发
  inputConfirm(e){
    console.log(e)
    const index = e.detail.index;
    const value = e.detail.value;
    if(this.data.infoList[index].content != value){
      const title = e.detail.title;
      if(title=="真实姓名"){
        this.upDateUserInfoRequest('name',value)
      }else if(title=='学号'){
        this.upDateUserInfoRequest('stuId',value)
      }else if(title=='电话'){
        this.upDateUserInfoRequest('phone',value)
      }
    }
  },
  // 点击 选择器 确认按钮后触发
  pickerConfirm(e){
    console.log(e)
    const index = e.detail.index;
    const value = e.detail.value;
    if(this.data.infoList[index].content != value.text){
      const title = e.detail.title;
      if(title=="性别"){
        this.upDateUserInfoRequest('gender',value.id)
      }else if(title=='学院'){
        this.data.collegeId = value.id;
        this.upDateUserInfoRequest('collegeId',value.id)
      }else if(title=='专业'){
        if(value.id!=-1){
          this.upDateUserInfoRequest('majorId',value.id)
        }
      }else if(title=='年级'){
        this.upDateUserInfoRequest('grades',value.text)
      }else if(title=='班级'){
        this.upDateUserInfoRequest('class',value.text)
      }
    }
  },
  // 修改用户信息的方法--请求
  upDateUserInfoRequest(title,value) {
    request({
      url: '/user/changeStuMessage',
      method: 'post',
      data: {
        type: title,
        value,
      }
    }).then(res=>{
      console.log(res)
      if(res.msg=="修改成功"){
        Notify({ type: 'success', message: '修改成功' });
        this.reloadUserInfo();
      }else{
        Notify({ type: 'danger', message: '修改失败，请重试' })
      }
    })
  },
  // 刷新用户信息 
  reloadUserInfo(){
    app.checkLogin();
    app.userInfoReadyCallback=()=>{
      this.setUserInfo()
    }
  },
  // 获取学院列表
  getCollegeList() {
    request({
      url: '/college/getAllCollege'
    }).then(res=>{
      let array = []
      for(var i in res.data){
        array.push({
          text: res.data[i].name,
          id: res.data[i].id
        })
      }
      this.data.infoList.college.columns = array;
    })
  },
  // 获取学院对应的专业列表
  getMajor(){
    console.log(this.data.collegeId)
    if(this.data.collegeId!=-1){
      request({
        url: '/college/getCollegeMajor',
        data: {
          id: this.data.collegeId
        }
      }).then(res=>{
        console.log(res)
        let array = []
        for(var i in res.data){
          array.push({
            text: res.data[i].name,
            id: res.data[i].id
          })
        }
        this.data.infoList.profession.columns = array;
      })
    }else{
      Notify({ type: 'danger', message: '请先选择学院' });
    }
  },
  // 获取年级列表
  getGradesLists(){
    const date = new Date();
    let array = []
    for(var i = 0; i < 5; i++){
      array.push({
        text: date.getFullYear() - i
      })
    }
    this.data.infoList.grade.columns = array;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.upDateUserInfoRequest('name','123123')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCollegeList();
    this.getGradesLists();
    // 用户信息请求完成后，传递到页面的回调函数
    app.userInfoReadyCallback= () =>{
      console.log("userInfoReadyCallback回调")
      // 可以在this.gobalData.userInfo 里面获取用户信息了
      this.setUserInfo();
      this.setData({
        userLogined: true
      })
    }
    //全局变量里的userInfo为空对象 说明用户未授权
    if( !app.globalData.userInfo.nickName ){
      this.setData({
        userLogined: false
      })
    } else {
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

  }
})