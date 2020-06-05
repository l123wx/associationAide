const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allAssociationLists: [],
    searchValue: '',
  },
  // 搜索框搜索时调用
  onSearch(){
    app.getAllAssociationLists(this.data.searchValue);
  },
  // 搜索框内容改变时调用
  onChange(e){
    this.setData({
      searchValue: e.detail,
    });
    if(this.data.searchValue == ''){
      app.getAllAssociationLists();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      allAssociationLists: app.globalData.allAssociationLists || []
    })
    app.AssociationListsReadyCallback = () => {
      this.setData({
        allAssociationLists: app.globalData.allAssociationLists || []
      })
    };
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