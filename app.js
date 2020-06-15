//app.js
import request from '/service/network' //导入request
App({
  // 用户登录的方法 在已经授权获取用户信息的前提使用
  login() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.userInfo.wxCode = res.code;
        console.log(res.code)
        wx.getUserInfo({
          lang: 'zh_CN',
          success: res => {
            this.globalData.userInfo.encryptedData = res.encryptedData;
            this.globalData.userInfo.iv = res.iv;
            this.globalData.userInfo.rawData = res.rawData;
            this.globalData.userInfo.signature = res.signature;
            request({
              url: '/user/loginOrRegister',
              method: 'post',
              data: {
                //注意这里后端接口data的key错打成encrytedData了 少了个p
                encrytedDate: this.globalData.userInfo.encryptedData,
                iv: this.globalData.userInfo.iv, 
                wxCode: this.globalData.userInfo.wxCode,
                rawData: String(this.globalData.userInfo.rawData),
                signature: this.globalData.userInfo.signature
              }
            }).then(res => {
              console.log("登陆成功")
              //在token成功获取后将token保存下来，以便下次使用
              wx.setStorageSync("token",res.data.token)
              // 将后端返回的用户信息储存到全局变量中
              this.globalData.userInfo = res.data;
              // 如果是从其他页面调用的此方法，调用回调函数
              if(this.userInfoReadyCallback){
                this.userInfoReadyCallback()
              }
              if(this.myAssociationListsReadyCallback){
                this.myAssociationListsReadyCallback();
              }
            }).catch(err => {
              // 登陆失败，叫用户重新登陆
              console.log("请求失败")
              wx.showToast({
                title: '请求失败，请重试',
                icon: 'none',
                mask: true
              })
              if( this.loginFailCallback ){
                this.loginFailCallback();
              }
            })
          }
        })
      }
    })
  },
  //检测用户是否授权用户信息
  checkUserInfo() {
    // 判断用户是否授权用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户已经授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.login();
        } else {
          console.log("用户未授权")
          // 没有授权，跳到个人信息页面，提示授权登陆
          // wx.reLaunch({
          //   url: '/pages/personalCenter/personalCenter?userLogined=0'
          // })
          // 登陆失败的回调
          if( this.loginFailCallback ){
            this.loginFailCallback();
          }
        }
      }
    })
  },
  //检测本地是否有token token是否过期
  checkLogin() {
    if( wx.getStorageSync('token') ){
      console.log("本地有token")
      request({
        url: '/user/autoLogin',
        method: 'post'
      }).then(res => {
        // console.log(res)
        if( res.msg == "登陆成功" ) {
          console.log("本地token未过期")
          // 将后端返回的用户信息储存到全局变量中
          this.globalData.userInfo = res.data;
          console.log(this.globalData.userInfo)
          // // 跳转到我的社团页面
          // wx.switchTab({
          //   url: '/pages/myAssociationLists/myAssociationLists'
          // })
          if(this.userInfoReadyCallback){
            console.log("用户信息回调函数")
            this.userInfoReadyCallback();
          }
          if(this.myAssociationListsReadyCallback){
            this.myAssociationListsReadyCallback();
          }
        } else {
          console.log("本地token已过期")
          // 登陆失败 说明token已过期
          this.checkUserInfo();
        }
      })
    } else {
      console.log("本地没有token")
      // 本地没有token
      this.checkUserInfo();
    }
  },
  // 请求所有社团的方法
  getAllAssociationLists(word) {
    request({
      url: '/community/getAllCommunity',
      data: {keyWord: word || ''}
    }).then(res => {
      this.globalData.allAssociationLists = res.data;
      if(this.AssociationListsReadyCallback){
        this.AssociationListsReadyCallback();
      }
    })
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.getAllAssociationLists();
    this.checkLogin();
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log(options)
    if(options.query.cId){
      this.globalData.associationInfo.id = options.query.cId;
    }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    // 用户信息
    userInfo: {},
    // 所有社团的列表
    allAssociationLists: [],
    // 现在所在的社团的信息
    associationInfo: {
      id: 200,
      userStatus: 1
    },
  }
})