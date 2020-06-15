import request from '../../service/network'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户列表
    userLists:[],
    // 名字首字母列表
    genderInitArray: [],
    // 用户按照首字母分类的列表
    userListByGenderInit: {},
    // 选中的用户的id 这里为了方便查询 直接用用户的id做key了
    checkedArray: {}
  },
  // 选择一个组
  chooseGroup(){
    wx.navigateTo({
      url: '/pages/selectObjects-group/selectObjects-group',
    })
  },
  clickUserLists(e){
    let obj = this.data.checkedArray;
    if(obj[e.currentTarget.dataset.id]){
      delete obj[e.currentTarget.dataset.id]
    }else{
      obj[e.currentTarget.dataset.id] = '0';
    }
    this.setData({
      checkedArray: obj
    })
  },
  // 获取用户列表
  getUserList(){
    request({
      url: '/community/getPersonAddressBook',
      data: {cId:app.globalData.associationInfo.id}
    }).then(res=>{
      this.data.userLists = res.data;
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
      this.setData({
        userListByGenderInit: obj,
        genderInitArray
      })
    })
  },
  // 从上一个页面获取已选择的通知对象
  getCheckedArray(){
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    let obj = {};
    if(prevPage.data.notifyObject.length!=0){
      const userList = prevPage.data.notifyObject;
      for(var i in userList){
        obj[userList[i]] = '0'
      }
      console.log(obj)
      this.setData({
        checkedArray: obj
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCheckedArray();
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
    // 将checkedArray的数据传到创建页面
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    const obj = this.data.checkedArray;
    console.log(obj)
    if(Object.keys(obj).length!=0){
      const array = Object.keys(obj);
      console.log(array)
      prevPage.setData({
        notifyObject: array
      })
    }
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