export default function request(options) {  //导出此方法
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    wx.request({
      url: 'https://stzs.smtboy.com/api' + options.url,
      method: options.method || 'GET', //如果options.method无值则为GET
      data: options.data || {},	//如果options.data无值则为{}
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token') || ''
      },
      success: res => {
        //请求成功 关闭提示窗  调用回调函数resolve
        wx.hideLoading();
        resolve(res.data)
      },
      fail: err => {
        wx.showToast({
          mask: true,
          icon: none,
          title: "请求出错"
        })
        //请求失败调用回调函数reject
        reject(err.data)
      }			
    })
  })
}