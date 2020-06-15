import request from '../../../../service/network';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex: {
      type: Number
    },
    // 活动列表
    allCommunityActivityVos: {
      type: Array
    },
    // 提醒列表
    communityReminds: {
      type: Array
    },
    userInfoList:{
      type: Object
    }
  },
  observers: {
    userInfoList(newVal){
      const obj = this.data.infoList;
      obj.userName.content = newVal.userName;
      obj.departement.content = newVal.departement;
      if(newVal.status == 0){
        obj.condition.content = "成员"
        obj.status.content = "在职"
      }else if(newVal.status == 1){
        obj.condition.content = "管理员"
        obj.status.content = "在职"
      }else if(newVal.status == 2){
        obj.condition.content = "成员"
        obj.status.content = "退休"
      }
      this.setData({
        infoList: obj
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    infoList: {
      "userName": {
        title: "真实姓名",
        iconClass: "iconoffice-supplies",
        iconColor: "#61b6fd",
        content: "",
        inputType: ""
      },
      "condition": {
        title: "身份",
        iconClass: "icon235yonghu_shenfen5",
        iconColor: "#44c2bf",
        content: "",
        inputType: ""
      },
      "departement": {
        title: "部门",
        iconClass: "iconzuzhi",
        iconColor: "#ffa767",
        content: "",
        inputType: "pick",
        columns: []
      },
      "status": {
        title: "当前状态",
        iconClass: "iconzaizhi",
        iconColor: "#49b45d",
        content: "",
        inputType: "pick",
        columns: [
          {
            text: "在职",
            id: 0
          },{
            text: "退休",
            id: 2
          },
        ]
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 功能被点击
    functionClick() {
      wx.navigateTo({
        url: '/pages/notify/notify',
      })
    },
    // 点击个人信息的list时触发的方法
    infoListClick(e) {
      const type = e.currentTarget.dataset.type; //输入内容的类型
      if(type == "pick"){
        const title = e.currentTarget.dataset.title;
        const index = e.currentTarget.dataset.index;//infoList里的属性名
        // 选框
        let pickerInput = this.selectComponent("#pickerInput");
        const infoList = this.data.infoList;
        pickerInput.setData({
          show: true,
          columns: infoList[index].columns,
          title: title,
          index: index
        })
      }
    },
    // 点击 选择器 确认按钮后触发
    pickerConfirm(e){
      console.log(e)
      const index = e.detail.index;
      const value = e.detail.value;
      if(this.data.infoList[index].content != value.text){
        const title = e.detail.title;
        if(title=='部门'){
          request({
            url: '/community/changeUserDepartment',
            data: {
              cId: app.globalData.associationInfo.id,
              departentId: value.id
            },
            method: 'post'
          }).then(res=>{
            const obj = this.data.infoList;
            obj.departement.content = value.text;
            this.setData({
              infoList: obj
            })
          })
        }else if(title=='当前状态'){
          request({
            url: '/community/changeUserStatus',
            data: {
              cId: app.globalData.associationInfo.id,
              type: value.id
            },
            method: 'post'
          }).then(res=>{
            const obj = this.data.infoList;
            obj.status.content = value.text;
            this.setData({
              infoList: obj
            })
          })
        }
      }
    },
    // 获取社团内的部门列表
    getDepartmentList(){
      request({
        url: '/community/getOneCommunityDepartment',
        data: {
          cId: app.globalData.associationInfo.id
        }
      }).then(res=>{
        const obj = this.data.infoList;
        for(var i in res.data){
          obj.departement.columns.push({
            text: res.data[i].name,
            id: res.data[i].id
          })
        }
        this.setData({
          infoList: obj
        })
      })
    }
  },
  lifetimes:{
    ready(){
      this.getDepartmentList();
    }
  }
})
