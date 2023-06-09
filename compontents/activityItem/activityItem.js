import {getMonthAndDay} from '../../utils/util';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 活动标题
    title: {
      type: String
    },
    // 内容
    content: {
      type: String
    },
    // 开始时间
    beginTime: {
      type: String
    },
    // 结束时间
    endTime: {
      type: String
    },
    // 月份
    month: {
      type: String
    },
    // 年份
    year: {
      type: String
    },
    // 是否显示时间
    showTime: {
      type: Boolean
    },
    // 活动id
    aId: {
      type: String
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 格式化后的时间
    dateFormat: ''
  },
  observers: {
    'beginTime,endTime'(beginTime,endTime){
      const beginTimeFormat = getMonthAndDay(beginTime)
      const endTimeFormat = getMonthAndDay(endTime)
      this.setData({
        dateFormat: beginTimeFormat+" - "+endTimeFormat
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到活动详情
    toActivityDetails(e){
      console.log(e)
      if(!app.globalData.associationInfo.userStatus||app.globalData.associationInfo.userStatus==-1){
        wx.navigateTo({
          url: '/pages/activity-details-unjoin/activity-details-unjoin?aId='+e.currentTarget.dataset.id,
        })
      }else{
        wx.navigateTo({
          url: '/pages/activity-details/activity-details?aId='+e.currentTarget.dataset.id,
        })
      }
    }
  }
})
