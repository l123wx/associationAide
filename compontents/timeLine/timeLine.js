// compontents/timeLine/timeLine.js
import {activityClassify} from "../../utils/util";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activityLists: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activityListsFormat: []
  },
  observers: {
    activityLists(newVal) {
      if( newVal && newVal != [] ){
        // 从社团信息中把活动列表的格式整理一下
        const activityListsFormat = activityClassify(newVal);
        this.setData({
          activityListsFormat
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
