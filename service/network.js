export default function request(options) {  //导出此方法
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https:stzs.smtboy.com' + options.url,
      method: options.method || 'GET', //如果options.method无值则为GET
      data: options.data || {},	//如果options.data无值则为{}
      success: resolve,	//请求成功调用回调函数resolve
      fail: reject			//请求失败调用回调函数reject
    })
  })
}