import request from '../../service/network'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 社团名称
    name: '',
    intro: '',
    // 部门列表
    departmentList: [],
    // 社团类别列表
    associationKindList: [],
    associationKindChecked: {},
    // 学院列表
    collegeList: [],
    collegeChecked: {},
    // 社团负责人手机
    phone: '',
    // 社团负责人微信
    weChat: '',
    // 社团头像url
    avatarUrl: '',
    // 社团图片
    associationPhotoList: [],
    //  社团凭证
    voucherList: []
  },
  // 社团名称改变时触发
  nameChange(e){
    console.log(e)
    this.data.name = e.detail
  },
  // 社团简介改变时触发
  introChange(e){
    this.data.intro = e.detail
  },
  // 点击添加部门
  addDepartment(){
    let array = this.data.departmentList;
    array.push({"name":''})
    this.setData({
      departmentList: array
    })
  },
  // 填写部门名称
  departmentInputChange(e){
    this.data.departmentList[e.currentTarget.dataset.index].name = e.detail.value
  },
  // 删除部门
  deleteDepartment(e){
    const index = e.currentTarget.dataset.index;
    let array = this.data.departmentList;
    array.splice(index,1);
    this.setData({
      departmentList: array
    })
  },
  // 获取社团类别
  getAssociationKind(){
    request({
      url: '/communityTag/getAllCommunityTags',
    }).then(res=>{
      this.setData({
        associationKindList: res.data
      })
    })
  },
  // 获取学校学院列表
  getCollege(){
    request({
      url: '/college/getAllCollege'
    }).then(res=>{
      res.data.splice(0,0,{
        id: 0,
        name: '校级'
      })
      this.setData({
        collegeList: res.data
      })
    })
  },
  // 选择社团类别
  chooseAssociationKind(e){
    console.log(e)
    this.setData({
      associationKindChecked: this.data.associationKindList[e.detail.value]
    })
  },
  // 选择社团归属单位
  chooseCollege(e){
    console.log(e)
    this.setData({
      collegeChecked: this.data.collegeList[e.detail.value]
    })
  },
  // 手机号码输入框输入时触发
  changePhone(e){
    this.data.phone = e.detail
  },
  // 微信输入框输入时触发
  changeWeChat(e){
    this.data.weChat = e.detail
  },
  // 选择社团头像
  chooseAvatar(e){
    console.log(e)
    this.setData({
      avatarUrl: [{url: e.detail.file.path}]
    })
  },
  // 选择社团头像
  deleteAvatar(e){
    this.setData({
      avatarUrl: []
    })
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
  },
  // 删除社团照片
  deleteAssociationPhoto(e){
    console.log(e)
    let array = this.data.associationPhotoList;
    array.splice(e.detail.index,1);
    this.setData({
      associationPhotoList: array
    })
  },
  // 选择凭证照片
  chooseVoucher(e){
    console.log(e)
    let array = this.data.voucherList;
    for(let i in e.detail.file){
      array.push({
        url: e.detail.file[i].path
      })
    }
    this.setData({
      voucherList: array
    }) 
  },
  // 删除凭证照片
  deleteVoucher(e){
    console.log(e)
    let array = this.data.voucherList;
    array.splice(e.detail.index,1);
    this.setData({
      voucherList: array
    })
  }, 
  // 点击确定按钮
  createAssociation(){
    let avatarUrl = '';
    let associationPhotoList = [];
    let voucherList = [];
    // console.log(this.data.collegeChecked.id!=undefined)
    if(this.data.name&&this.data.intro&&this.data.associationKindChecked.id
      &&this.data.collegeChecked.id!=undefined&&this.data.phone&&this.data.weChat
      &&this.data.avatarUrl&&this.data.voucherList.length){
        wx.showLoading({
          title: '请稍后...',
        })
        // 上传头像
        this.updateAvatar().then(res=>{
          console.log(res)
          avatarUrl = res;
          if(this.data.associationPhotoList.length){
            this.updatePhoto().them(res=>{
              associationPhotoList = res
              this.updateVoucher().then(res=>{
                voucherList = res;
                this.createRequest(avatarUrl,associationPhotoList,voucherList);
              })
            })
          }else{
            this.updateVoucher().then(res=>{
              voucherList = res;
              this.createRequest(avatarUrl,associationPhotoList,voucherList);
            })
          }
        });
      }else{
        Notify({ type: 'danger', message: '请将内容填写完整' });
      }
    // this.updateVoucher().then(res=>{
    //   console.log(res)
    // })
  },
  createRequest(avatarUrl,associationPhotoList,voucherList){
    // 将部门对象中的name取出来，并合成一个数组
    let departmentList = [];
    for(var i in this.data.departmentList){
      departmentList.push(this.data.departmentList[i].name)
    }
    request({
      url: '/community/createCommunity',
      method: 'post',
      data:{
        name: this.data.name,
        introduction: this.data.intro,
        collegeId: this.data.collegeChecked.id,
        collegeName: this.data.collegeChecked.name,
        tagsId: this.data.associationKindChecked.id,
        tagsName: this.data.associationKindChecked.name,
        headPhone: this.data.phone,
        headWechatCode: this.data.weChat,
        logoPhoto: avatarUrl,
        communityPhotos: associationPhotoList || [],
        communityAuditPhotos: voucherList,
        departmentName: departmentList || [],
      }
    }).then(res=>{
      console.log(res)
      if(res.msg == "申请成功"){
        wx.hideLoading();
        wx.reLaunch({
          url: '/pages/msgPage/msgPage?type=',
        })
      }else{
        Notify({ type: 'danger', message: '发送申请失败，请稍后重试' });
      }
    })
  },
  // 上传社团头像，返回网络链接
  updateAvatar(){
    return new Promise((resolve, reject)=>{
      console.log(this.data.avatarUrl[0].url)
      wx.uploadFile({
        filePath: this.data.avatarUrl[0].url,
        name: 'logoFile',
        url: 'https://stzs.smtboy.com/api/community/uploadLogo',
        header:{
          "token": wx.getStorageSync('token'),
          "Content-Type": "multipart/form-data"  
        },
        success:res=>{
          res.data = JSON.parse(res.data)
          console.log(res.data.data)
          resolve(res.data.data)
        }
      })
    })
  },
  // 上传社团图片，返回网络链接数组
  updatePhoto(){
    return new Promise((reslove,reject)=>{
      let beforeArray = this.data.associationPhotoList;
      let afterArray = [];
      const upload = (array)=>{
        wx.uploadFile({
          filePath: array[0].url,
          name: 'photoFiles',
          url: 'https://stzs.smtboy.com/api/community/uploadPhotos',
          header:{
            "token": wx.getStorageSync('token'),
            "Content-Type": "multipart/form-data"
          },
          success:res=>{
            res.data = JSON.parse(res.data)
            afterArray.push(res.data.data)
            beforeArray.splice(0,1);
            console.log(afterArray)
            if(beforeArray.length){
              upload(beforeArray);
            }else{
              reslove(afterArray)
            }
          }
        })
      }
      upload(beforeArray);
    })
  },
  // 上传凭证，返回网络链接数组
  updateVoucher(){
    return new Promise((resolve, reject)=>{
      let beforeArray = this.data.voucherList;
      let afterArray = [];
      const upload = (array)=>{
        wx.uploadFile({
          filePath: array[0].url,
          name: 'photoFiles',
          url: 'https://stzs.smtboy.com/api/community/uploadAuditPhotos',
          header:{
            "token": wx.getStorageSync('token'),
            "Content-Type": "multipart/form-data"
          },
          success:res=>{
            res.data = JSON.parse(res.data)
            afterArray.push(res.data.data)
            beforeArray.splice(0,1);
            console.log(afterArray)
            if(beforeArray.length){
              upload(beforeArray);
            }else{
              resolve(afterArray)
            }
          } 
        })
      }
      upload(beforeArray);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAssociationKind();
    this.getCollege();
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