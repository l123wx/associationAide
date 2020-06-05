const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
      {
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        statue: 'dnoe',
      },
    ],
  },
  afterRead(e) {
    const { file } = e.detail;
    console.log( file );
    let a = this.data.fileList;
    a.push({url:file.path,status:'done'});
    this.setData({
      fileList: a
    })

    wx.uploadFile({
      url: 'https://stzs.smtboy.com/api/community/testFormDataUpload', 
      filePath: file.path,
      name: 'file',
      header:{
        "token": "n6oPDtxL4P3tZSWg8PiCSg==",
        "Content-Type": "multipart/form-data"  
      },
      success: res => {
        // 上传完成需要更新 fileList
        // const { fileList = [] } = res.data;
        // fileList.push({ ...file, url: res.data });
        // this.setData({ fileList });
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    });
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