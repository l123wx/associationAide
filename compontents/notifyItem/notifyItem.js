import { getlatelyDate } from "../../utils/util"
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
    // 是否已读
    isRead: {
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
    nId: {
      type: String
    },
    // 用户类型 1管理员 0普通成员
    userType: {
      type: Number
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
      console.log("id为"+this.properties.nId+"的通知被点了");
    }
  },
  lifetimes: {
    ready() {
      const time = getlatelyDate(this.properties.beginTime);
      this.setData({time}) 
    }
  }
})
