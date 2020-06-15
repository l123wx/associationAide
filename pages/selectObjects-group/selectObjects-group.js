import request from '../../service/network';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 部门列表
    departmentList: [],
    departmentChecked: {},
    // 年级列表
    gradeList: [],
    gradeChecked: {},
    checkedAllPeople: false,
    checkedAllAdmin: false
  },
  checkedAllPeople(){
    this.setData({
      checkedAllPeople: !this.data.checkedAllPeople
    })
  },
  checkedAllAdmin(){
    this.setData({
      checkedAllAdmin: !this.data.checkedAllAdmin
    })
  },
  // 点击部门列表中的选项时触发
  clickDepartmentList(e){
    console.log(e)
    const id = e.currentTarget.dataset.id;
    let obj = this.data.departmentChecked;
    if(obj[id]){
      delete obj[id]
    }else{
      obj[id] = '0'
    }
    console.log(obj)
    this.setData({
      departmentChecked: obj
    })
  },
  // 点击年级列表中的选项时触发
  clickGradeList(e){
    console.log(e)
    const grade = e.currentTarget.dataset.grade;
    let obj = this.data.gradeChecked;
    if(obj[grade]){
      delete obj[grade]
    }else{
      obj[grade] = '0'
    }
    console.log(obj)
    this.setData({
      gradeChecked: obj
    })
  },
  // 获取部门
  getDepartment(){
    request({
      url: '/community/getOneCommunityDepartment',
      data: {
        cId: app.globalData.associationInfo.id
      }
    }).then(res=>{
      console.log(res)
      if(res.status==0){
        this.setData({
          departmentList: res.data
        })
      }
    })
  },
  // 获取年级分布
  getGrade(){
    request({
      url: '/community/getPersonGrade',
      data: {
        cId: app.globalData.associationInfo.id
      }
    }).then(res=>{
      console.log(res)
      if(res.status==0){
        this.setData({
          gradeList: res.data
        })
      }
    })
  },
  // 通过选中的分组，将对应的人添加到选中列表中
  checkPeople(){
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    const userLists = prevPage.data.userLists;
    const obj = prevPage.data.checkedArray;
    console.log(userLists);
    if(this.data.checkedAllPeople){
      // 如果把全部成员都选中了，就不用看其他的选项了
      for(var i in userLists){
        obj[userLists[i].id] = '0';
      }
    }else{
      for(var i in userLists){
        // 判断是否选中全部管理员，如果选中的话就判断这个人是不是管理员
        if(this.data.checkedAllAdmin&&userLists[i].communityStatus==1){
          obj[userLists[i].id] = '0';
        }
        if(this.data.gradeChecked[userLists[i].stuGrade]){
          obj[userLists[i].id] = '0';
        }
        if(this.data.departmentChecked[userLists[i].departmentId]){
          obj[userLists[i].id] = '0';
        }
      }
    }
    console.log(obj)
    prevPage.setData({
      checkedArray: obj
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDepartment();
    this.getGrade();
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
    this.checkPeople();
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