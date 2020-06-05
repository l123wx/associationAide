Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // icon类名
    iconClass: {
      type: String,
      value: "icontishi"
    },
    // icon背景色
    iconBgColor: {
      type: String,
      value: ""
    },
    // 标题
    title: {
      type: String,
      value: "标题"
    },
    // 内容
    content: {
      type: String,
      value: "内容"
    },
    // 是否显示状态
    showStatus: {
      type: Boolean
    },
    // 状态的内容
    statusContent: {
      type: String,
      value: "状态"
    },
    // 时间
    time: {
      type: String,
      value: "时间"
    },
    // 是否显示已读人数
    showReadedNum: {
      type: Boolean
    },
    // 已读人数内容
    readedNum: {
      type: String,
      value: "未读"
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

  }
})
