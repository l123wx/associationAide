import {activityClassify} from '../../../../utils/util';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 活动列表
    allCommunityActivityVos: {
      type: Array
    },
    // 提醒列表
    communityReminds: {
      type: Array
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 查看全部活动
    moreActivity(){
      wx.navigateTo({
        url: '/pages/activity/activity',
      })
    },
    toAllReminds(){
      wx.navigateTo({
        url: '/pages/allRemind/allRemind',
      })
    }
  }
})
