import request from '../../service/network'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 简介
    intro: '',
    // 社团负责人手机
    phone: '',
    // 社团负责人微信
    weChat: '',
    // 社团头像url
    avatarUrl: '',
    // 社团图片
    associationPhotoList: [],
    // 社团展示信息
    associationContact: {
      wechatPublicCode: '',
      email: '',
      phone: '',
      qqGroup: '',
      weChat: '' 
    },
    // 社团展示文章
    article: '',
    // 记录内容是否被修改过
    contentUpdate: {
      article: false,
      avatarUrl: false,
      associationPhotoList: false,
      introAndContact: false
    },
    // 记录删除的照片
    deletePhotoList: []
  },
  // 社团简介改变时触发
  introChange(e){
    this.data.intro = e.detail
    this.data.contentUpdate.introAndContact = true;
  },
  // 社团负责人联系方式
  // 手机号码输入框输入时触发
  changePhone(e){
    this.data.phone = e.detail
    this.data.contentUpdate.introAndContact = true;
  },
  // 社团负责人微信号输入框输入时触发
  changeWeChat(e){
    this.data.weChat = e.detail
    this.data.contentUpdate.introAndContact = true;
  },

  // 社团联系方式
  // 社团负责人微信号输入框输入时触发
  changeWeChatPublicCode_a(e){
    this.data.associationContact.wechatPublicCode = e.detail
    this.data.contentUpdate.introAndContact = true;
  },
  // 新生QQ群输入框输入时触发
  changeQqGroup_a(e){
    this.data.associationContact.qqGroup = e.detail
    this.data.contentUpdate.introAndContact = true;
  },
  // 社团负责人邮箱输入框输入时触发
  changeMail_a(e){
    this.data.associationContact.email = e.detail
    this.data.contentUpdate.introAndContact = true;
  },
  // 社团负责人手机号输入框输入时触发
  changePhone_a(e){
    this.data.associationContact.phone = e.detail
    this.data.contentUpdate.introAndContact = true;
  },
  // 社团负责人微信号输入框输入时触发
  changeWeChat_a(e){
    this.data.associationContact.weChat = e.detail
    this.data.contentUpdate.introAndContact = true;
  },

  // 选择社团头像
  chooseAvatar(e){
    console.log(e)
    this.setData({
      avatarUrl: [{url: e.detail.file.path}]
    })
    this.data.contentUpdate.avatarUrl = true;
  },
  // 删除社团头像
  deleteAvatar(e){
    this.setData({
      avatarUrl: []
    })
    this.data.contentUpdate.avatarUrl = true;
  },
  // 选择社团照片
  chooseAssociationPhoto(e){
    console.log(e)
    let array = this.data.associationPhotoList;
    for(let i in e.detail.file){
      array.push({
        url: e.detail.file[i].path
      })
    }
    this.setData({
      associationPhotoList: array
    })
    this.data.contentUpdate.associationPhotoList = true;
  },
  // 删除社团照片
  deleteAssociationPhoto(e){
    console.log(e)
    let array = this.data.associationPhotoList;
    if(array[e.detail.index].id){
      this.data.deletePhotoList.push(array[e.detail.index].id)
    }
    console.log(this.data.deletePhotoList)
    array.splice(e.detail.index,1);
    this.setData({
      associationPhotoList: array
    })
    this.data.contentUpdate.associationPhotoList = true;
  },
  // 点击编辑展示文章时触发
  updateActicle(){
    wx.navigateTo({
      url: '/pages/editor/editor',
    })
    this.data.contentUpdate.article = true
  },
  // 点击确定按钮
  updateAssociationInfo(){
    if(this.data.intro==''){
      Notify({ type: 'danger', message: '请填写社团简介' });
    }else if(this.data.phone==''||this.data.weChat==''){
      Notify({ type: 'danger', message: '请填写负责人联系方式' });
    }else if(this.data.avatarUrl==''){
      Notify({ type: 'danger', message: '请选择社团头像' });
    }else{
      let articleRequestFinish = false;
      let avatarRequestFinish = false;
      let associationPhotoRequestFinish = false;
      let introAndContactRequestFinish = false;
      const checkRequest = () =>{
        if(articleRequestFinish&&avatarRequestFinish&&associationPhotoRequestFinish&&introAndContactRequestFinish){
          Notify({
            type: 'success', 
            message: '修改成功'
          });
          setTimeout(()=>{
            wx.navigateBack()
          },1000)
        }
      }
      // 如果联系方式或者简介修改了
      if(this.data.contentUpdate.introAndContact){
        this.updateContentText().then(res=>{
          introAndContactRequestFinish = true;
          checkRequest();
        })
      }else{
        introAndContactRequestFinish = true;
        checkRequest();
      }
      // 如果社团头像修改了
      if(this.data.contentUpdate.avatarUrl){
        console.log("社团头像修改了")
        this.updateAvatar().then(res=>{
          avatarRequestFinish = true;
          checkRequest();
        })
      }else{
        avatarRequestFinish = true;
        checkRequest();
      }
      // 如果社团图片修改了
      if(this.data.contentUpdate.associationPhotoList){
        console.log("社团图片修改了")
        this.updatePhoto().then(res=>{
          associationPhotoRequestFinish = true;
          checkRequest();
        })
      }else{
        associationPhotoRequestFinish = true;
        checkRequest();
      }
      // 如果展示文章修改了
      if(this.data.contentUpdate.article){
        console.log("展示文章修改了")
        this.updateArticle().then(res=>{
          articleRequestFinish = true;
          checkRequest();
        })
      }else{
        articleRequestFinish = true;
        checkRequest();
      }
    }
  },

  //////请求/////////
  // 修改社团头像
  updateAvatar(){
    return new Promise((resolve,reject)=>{
      wx.showLoading({
        title: '请稍后...',
      })
      wx.uploadFile({
        filePath: this.data.avatarUrl[0].url,
        name: 'logoFile',
        formData: {
          cId: app.globalData.associationInfo.id
        },
        header:{
          "token": wx.getStorageSync('token'),
          "Content-Type": "multipart/form-data"
        },
        url: 'https://stzs.smtboy.com/api/community/changeLogo',
        success: res=>{
          console.log(res)
          resolve(res)
          wx.hideLoading()
        }
      })
    })
  },
  // 修改文字内容 简介 各种联系方式
  updateContentText(){
    return new Promise((resolve,reject)=>{
      wx.showLoading({
        title: '请稍后...',
      })
      request({
        url: '/community/changeTextInfo',
        method: 'post',
        data: {
          cId: app.globalData.associationInfo.id,
          introduction: this.data.intro,
          headPhone: this.data.phone,
          headWechatCode: this.data.weChat,
          publicWechatPublicCode: this.data.associationContact.wechatPublicCode,
          publicQqGroup: this.data.associationContact.qqGroup,
          publicMail: this.data.associationContact.email,
          publicPhone: this.data.associationContact.phone,
          publicWechatCode: this.data.associationContact.weChat,
        }
      }).then(res=>{
        wx.hideLoading()
        resolve(res)
      })
    })
  },
  // 修改社团展示文章
  updateArticle(){
    return new Promise((resolve,reject)=>{
      wx.showLoading({
        title: '请稍后...',
      })
      request({
        url: '/community/changeArticle',
        method: 'post',
        data: {
          cId: app.globalData.associationInfo.id,
          content: this.data.article
        }
      }).then(res=>{
        wx.hideLoading()
        resolve(res)
      })
    })
  },
  // 修改社团图片
  updatePhoto(){
    return new Promise((resolve,reject)=>{
      wx.showLoading({
        title: '请稍后...',
      })
      const updatePhoto = (photoList) =>{
        if(photoList.length){
          if(!photoList[0].id){
            wx.uploadFile({
              url: 'https://stzs.smtboy.com/api/community/addPhotos',
              filePath: photoList[0].url,
              name: 'photoFiles',
              formData: {
                cId: app.globalData.associationInfo.id
              },
              header:{
                "token": wx.getStorageSync('token'),
                "Content-Type": "multipart/form-data"
              },
              success: res=>{
                console.log(res)
                photoList.splice(0,1)
                updatePhoto(photoList)
              }
            })
          }else{
            photoList.splice(0,1)
            updatePhoto(photoList)
          }
        }else{
          wx.hideLoading()
          resolve();
        }
      }
      const deletePhoto = (deleteList) =>{
        console.log(deleteList.length)
        if(deleteList.length){
          request({
            url: '/community/deletePhoto',
            method: 'post',
            data: {
              cId: app.globalData.associationInfo.id,
              photoId: deleteList[0]
            }
          }).then(res=>{
            deleteList.splice(0,1)
            deletePhoto(deleteList)
          })
        }else{
          updatePhoto(this.data.associationPhotoList)
        }
      }
      deletePhoto(this.data.deletePhotoList)
    })
  },
  // 获取负责人联系方式
  getAdminContact(){
    request({
      url: '/community/getOneHeadInfo',
      data: {
        cId: app.globalData.associationInfo.id
      }
    }).then(res=>{
      console.log(res)
      if(res.data.headPhone&&res.data.headWechat){
        this.setData({
          phone: res.data.headPhone || '',
          weChat: res.data.headWechat || '',
        })
      }
    })
  },
  // 获取社团信息
  getAssociationInfo(){
    request({
      url: '/community/getOneCommunityInfo',
      data: {
        cId: app.globalData.associationInfo.id
      }
    }).then(res=>{
      console.log(res)
      const associationContact = {
        wechatPublicCode: res.data.publicWechatPublicCode || '',
        email: res.data.publicMail || '',
        phone: res.data.publicPhone || '',
        qqGroup: res.data.publicQqGroup || '',
        weChat: res.data.publicWechatCode || ''
      }
      const associationPhotoList = function(){
        let array = [];
        for(var i in res.data.communityPhotos){
          if(i>2){
            break;
          }
          array.push({
            id: res.data.communityPhotos[i].id,
            url: res.data.communityPhotos[i].photoUrl
          })
        }
        return array;
      }()
      this.setData({
        intro: res.data.introduction || '',
        avatarUrl: [{url:res.data.logoUrl} || ''],
        associationPhotoList,
        associationContact,
        article: res.data.communityArticle.content
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAssociationInfo();
    this.getAdminContact();
    console.log(this.data.article);
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