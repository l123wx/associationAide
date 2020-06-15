import request from '../../service/network';
import {getMonthAndDay,getHoursAndMinutes} from '../../utils/util';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 签到信息
    signInInfo: {},
    // 相关人员列表 已读 未读
    userLists: [],
    // 已读人员列表
    readedUserLists: [],
    // 功能列表
    functions: [
      {
        name: "分享到群聊",
        iconClass: "iconzhuanfa",
        iconColor: "linear-gradient(to right, #49b45d 0%, #49b45d 100%)"
      },{
        name: "导出记录",
        iconClass: "icondaochu",
        iconColor: "linear-gradient(to right, #efce16 0%, #efce16 100%)"
      },{
        name: "出示二维码",
        iconClass: "iconerweima",
        iconColor: "linear-gradient(to right, #ffa767 0%, #ffa767 100%)"
      },
    ],
    // 签到的id
    sId: -1,
    // 用户的类型
    userStatus: -1,
    // 是否已经签到
    isSignIn: false,
    // 二维码链接
    ERcodeUrl: '',
  },
  // base64解码
  base64_decode: function (input) {
    const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    } // Whend 
    output = this._utf8_decode(output);
    return output;
  },
  _utf8_decode: function (utftext) {
    var string = "";
    var i = 0;
    var c, c1, c2, c3;
    c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    } // Whend 
    return string;
  },
  // 查看参与人员列表
  toReaderList() {
    wx.navigateTo({
      url: '/pages/signIn-members/signIn-members?sId='+this.data.sId
    })
  },
  // 点击任一功能时触发
  functionClick(e) {
    console.log(e.currentTarget.dataset.name)
    // 如果点击的是导出记录
    if(e.currentTarget.dataset.name=="导出记录"){
      this.export();
    }else if(e.currentTarget.dataset.name=="出示二维码"){
      this.showERcode();
    }
  },
  // 出示二维码
  showERcode(){
    if(this.data.ERcodeUrl){
      wx.previewImage({
        urls: [this.data.ERcodeUrl],
      })
    }else{
      request({
        url: '/communitySignIn/getQrCode',
        method: 'post',
        data: {
          cId: app.globalData.associationInfo.id,
          signId: this.data.sId
        }
      }).then(res=>{
        this.data.ERcodeUrl = res.data
        wx.previewImage({
          urls: [res.data],
        })
      })
    }
  },
  // 导出记录
  export() {
    request({
      url: '/communitySignIn/export',
      method: 'post',
      data: {
        cId: app.globalData.associationInfo.id,
        signId: this.data.sId
      }
    }).then(res=>{
      console.log(res)
      if(res.status==0){
        wx.navigateTo({
          url: '/pages/msgPage/msgPage?type=0&link='+res.data
        })
      }
    })
  },
  // 扫码签到
  scanCode() {
    if(app.globalData.userInfo.nickName){
      this.getSignInInfo();
      wx.scanCode({
        success: (res)=>{
          console.log(JSON.parse(this.base64_decode(res.result)))
          const result = JSON.parse(this.base64_decode(res.result))
          console.log(result.signId,this.data.sId)
          console.log(result.cId,app.globalData.associationInfo.id)
          if(result.signId==this.data.sId&&result.cId==app.globalData.associationInfo.id){
            request({
              url: '/communitySignIn/signIn',
              method: 'post',
              data: {
                cId: app.globalData.associationInfo.id,
                signId: this.data.sId
              }
            }).then(res=>{
              console.log(res)
              if(res.msg=="签到成功！"){
                wx.showToast({
                  title: '签到成功！',
                  success:()=>{
                    this.getSignInInfo()
                  }
                })
              }else if(res.msg=="不在签到时间"){
                Notify({ type: 'danger', message: '不在签到时间！' });
              }
            })
          }else{
            Notify({ type: 'danger', message: '无效的二维码，请重试' });
          }
        }
      })
    }else{
      this.setData({
        showLoginBox: true
      })
    }
  },
  getSignInInfo(){
    // 获取相关信息
    request({
      url: '/communitySignIn/getSignInMessage',
      data: {
        cId: app.globalData.associationInfo.id,
        signId: this.data.sId
      }
    }).then(res=>{
      // 设置导航栏的标题
      wx.setNavigationBarTitle({
        title: res.data.communitySignIn.title
      })
      console.log(res)
      // 修改发起时间格式
      res.data.communitySignIn.createTime = getMonthAndDay(res.data.communitySignIn.createTime)
      // 添加开始时间到结束时间的时间格式
      res.data.communitySignIn.time = function(){
        const beginTime = res.data.communitySignIn.beginTime;
        const endTime = res.data.communitySignIn.endTime;
        return getMonthAndDay(beginTime)+" "+getHoursAndMinutes(beginTime)+" — "+getMonthAndDay(endTime)+" "+getHoursAndMinutes(endTime);
      }()
      // 筛选出已签到的用户
      let readedUserArray = [];
      for(var i in res.data.signInUserVos){
        if(res.data.signInUserVos[i].isSignIn==1){
          readedUserArray.push(res.data.signInUserVos[i])
        }
      }
      this.setData({
        signInInfo: res.data.communitySignIn,
        userLists: res.data.signInUserVos,
        userStatus: app.globalData.associationInfo.userStatus,
        readedUserLists: readedUserArray,
        isSignIn: (res.data.isSignIn==1)
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  //  隐藏登陆窗口
  hiddenLoginBox() {
    this.setData({
      showLoginBox: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sId: options.sId
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
    if(app.globalData.userInfo.nickName){
      this.getSignInInfo();
    }
    app.userInfoReadyCallback = () => {
      this.getSignInInfo();
    }
    app.loginFailCallback=()=>{
      this.setData({
        showLoginBox: true
      })
    }
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
  onShareAppMessage: function (res) {
    console.log(res)
    return {
      title: this.data.signInInfo.title,
      path: '/pages/signIn-details/signIn-details?cId='+app.globalData.associationInfo.id+"&sId="+this.data.sId
    }
  }
})