import { getMonthAndDay } from "../../utils/util"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    content: {
      type: String
    },
    // 用户总量
    userCount: {
      type: Number
    },
    // 已读用户数目
    userReadCount: {
      type: Number
    },
    // 是否已交
    isCollect: {
      type: Number
    },
    // 开始时间
    beginTime: {
      type: String
    },
    // 结束时间
    endTime: {
      type: String
    },
    // 通知id
    cId: {
      type: String
    },
    // 用户类型 1管理员 0普通成员
    userType: {
      type: Number
    },
    // 是否开始
    isStarted: {
      type: Boolean
    },
    // 是否已结束
    isEnded: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    notifyItemClick() {
      console.log("id为"+this.properties.cId+"的收集被点了");
      wx.navigateTo({
        url: '/pages/collection-details/collection-details?collectId='+this.properties.cId
      })
    }
  },
  lifetimes: {
    ready() {
      if( this.properties.endTime=="" || this.properties.beginTime==this.properties.endTime ){
        const time = getMonthAndDay(this.properties.beginTime);
        this.setData({time})
      }else{
        const time = getMonthAndDay(this.properties.beginTime)+" - "+getMonthAndDay(this.properties.endTime);
        this.setData({time})
      }
    }
  }
})
