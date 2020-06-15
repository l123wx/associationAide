import request from '../../service/network';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import {getMonthAndDay,getHoursAndMinutes} from '../../utils/util'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 签到信息
    collectInfo: {},
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
      }
    ],
    // 收集的id
    cId: -1,
    // 用户的类型
    userStatus: -1,
    // 是否已经提交收集
    isCollect: false,
    // 是否正在编辑（修改）
    isUpdating: false,
    //记录信息是否修改了，如果没有修改点击确认修改就不提交了
    isChanged: false,
  },
  // 点击任一功能时触发
  functionClick(e) {
    console.log(e.currentTarget.dataset.name)
    // 如果点击的是导出记录
    if(e.currentTarget.dataset.name=="导出记录"){
      this.export();
    }else if(e.currentTarget.dataset.name=="分享到群聊"){
      this.onShareAppMessage();
    }
  },
  // 导出记录
  export() {
    request({
      url: '/communityCollect/export',
      method: 'post',
      data: {
        cId: app.globalData.associationInfo.id,
        collectId: this.data.cId
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
  // 查看参与人员列表
  toReaderList() {
    wx.navigateTo({
      url: '/pages/collection-members/collection-members?id='+this.data.cId
    })
  },
  // 输入框内容发生变化时触发
  onChange(e){
    this.data.collectInfo.collectContent[e.currentTarget.dataset.index].value = e.detail;
    console.log(this.data.collectInfo.collectContent)
    this.data.isChanged = true;//修改isChanged参数，记录修改过信息
  },
  
  // 点击修改提交内容的按钮
  updateCollection(){
    if(!this.data.isUpdating){
      console.log("不可编辑的状态")
      // 如果是不可编辑的状态，转换为可编辑的状态
      this.setData({
        isUpdating: true
      })
    }else{
      console.log("可编辑的状态")
      // 如果处于可编辑的状态，提交编辑后的内容
      this.setData({
        isUpdating: false
      })
      if(this.data.isChanged){
        // 如果内容修改过了才会发送请求
        request({
          url: '/communityCollect/alterCollect',
          method: 'post',
          data: JSON.stringify({
            cid: app.globalData.associationInfo.id,
            collectId: this.data.cId,
            collectItemVos: this.data.collectInfo.collectContent
          }),
          header:{
            "content-type":"application/json"
          }
        }).then(res=>{
          console.log(res);
          if(res.status == 0){
            Notify({ type: 'success', message: '修改成功' });
          }
        })
      }else{
        Notify({ type: 'success', message: '未做出任何修改' });
      }
    }
  },
  // 点击提交收集内容
  collectionBtn(){
    // 判断是否登陆
    if(app.globalData.userInfo.nickName){
      if(this.data.isChanged){
        // 如果内容修改过了才会发送请求
        request({
          url: '/communityCollect/completeCollect',
          method: 'post',
          data: JSON.stringify({
            cid: app.globalData.associationInfo.id,
            collectId: this.data.cId,
            collectItemVos: this.data.collectInfo.collectContent
          }),
          header:{
            "content-type":"application/json"
          }
        }).then(res=>{
          if( res.status == 0 ){
            Notify({ type: 'success', message: '提交成功' });
            this.getCollectionInfo();
          }else{
            Notify({ type: 'danger', message: '出错了，请稍后再试' });
          }
        })
      }
    }else{
      this.setData({
        showLoginBox: true
      })
    }
  },
  // 点击选择图片
  choosePhoto(e){
    const obj = this.data.collectInfo;
    console.log(e)
    console.log(app.globalData.associationInfo.id)
    wx.chooseImage({
      count: 1,
      type: 'image',
      success:res=>{
        console.log(res,"选择成功了")
        const path = res.tempFiles[0].path
        console.log(path)
        // 显示加载弹窗
        wx.showLoading({
          title: '加载中...',
        })
        // 将选择的图片上传到服务器
        wx.uploadFile({
          url: 'https://stzs.smtboy.com/api/communityCollect/uploadCollectPhoto',
          filePath: path,
          name: 'collectPhoto',
          formData: {
            cId: app.globalData.associationInfo.id,
            collectId: this.data.cId,
            itemName: obj.collectContent[e.currentTarget.dataset.index].title
          },
          header:{
            "token": wx.getStorageSync('token'),
            "Content-Type": "multipart/form-data"  
          },
          success:res=>{
            res.data = JSON.parse(res.data)
            obj.collectContent[e.currentTarget.dataset.index].value = res.data.data;
            this.setData({
              collectInfo: obj
            })
            // 隐藏加载弹窗
            wx.hideLoading()
            console.log(this.data.collectInfo.collectContent)
            this.data.isChanged = true;//修改isChanged参数，记录修改过信息
          }
        })
      }
    })
  },
  // 点击删除图片
  deletePhoto(e){
    if(this.data.isUpdating){
      wx.showModal({
        title: '提示',
        content: '确定要删除这张图片吗',
        success: res=>{
          if (res.confirm) {
            console.log('用户点击确定')
            const obj = this.data.collectInfo;
            obj.collectContent[e.currentTarget.dataset.index].value = "";
            this.setData({
              collectInfo: obj
            })
            this.data.isChanged = true;//修改isChanged参数，记录修改过信息
          } else if (res.cancel) {
            
          }
        }
      })
    }
  },
  //  隐藏登陆窗口
  hiddenLoginBox() {
    this.setData({
      showLoginBox: false
    })
  },
  getCollectionInfo() {
    // 获取相关信息
    request({
      url: '/communityCollect/getCollectMessage',
      data: {
        cId: app.globalData.associationInfo.id,
        collectId: this.data.cId
      }
    }).then(res=>{
      // 设置导航栏的标题
      wx.setNavigationBarTitle({
        title: res.data.communityCollect.title
      })
      console.log(res)
      // 修改发起时间格式
      res.data.communityCollect.createTime = getMonthAndDay(res.data.communityCollect.createTime)
      // 添加开始时间到结束时间的时间格式
      res.data.communityCollect.time = function(){
        const beginTime = res.data.communityCollect.beginTime;
        const endTime = res.data.communityCollect.endTime;
        return getMonthAndDay(beginTime)+" "+getHoursAndMinutes(beginTime)+" — "+getMonthAndDay(endTime)+" "+getHoursAndMinutes(endTime);
      }()
      // 添加是否已过期的字段
      res.data.communityCollect.isEnded = function(){
        let endDate = new Date(res.data.communityCollect.endTime.substr(0, 19));
        endDate.setHours(endDate.getHours()+8);
        return endDate < new Date();
      }()
      console.log(res.data.communityCollect.isEnded)
      // 筛选出已签到的用户
      let readedUserArray = [];
      for(var i in res.data.collectUserVos){
        if(res.data.collectUserVos[i].isCollect==1){
          readedUserArray.push(res.data.collectUserVos[i])
        }
      }
      res.data.communityCollect.collectContent = JSON.parse(res.data.communityCollect.collectContent);
      this.setData({
        collectInfo: res.data.communityCollect,
        userLists: res.data.collectUserVos,
        userStatus: app.globalData.associationInfo.userStatus,
        readedUserLists: readedUserArray,
        isCollect: (res.data.isCollect==1)
      })
      console.log(this.data.collectInfo)
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.cId = options.collectId
    if(app.globalData.userInfo.nickName){
      this.getCollectionInfo();
    }
    app.userInfoReadyCallback = () => {
      this.getCollectionInfo();
    }
    app.loginFailCallback=()=>{
      this.setData({
        showLoginBox: true
      })
    }
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
  onShareAppMessage: function (res) {
    console.log(res)
    return {
      title: this.data.collectInfo.title,
      path: '/pages/collection-details/collection-details?cId='+app.globalData.associationInfo.id+"&collectId="+this.data.cId
    }
  }
})