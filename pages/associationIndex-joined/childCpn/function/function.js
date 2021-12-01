const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userStatus: -1,
    functionsLists: [
      {
        title: "常用功能",
        functions: [
          {
            name: "签到",
            iconClass: "iconqiandao",
            iconColor: "linear-gradient(to right, #8067d8 0%, #a370e0 50%, #c67ae8 100%)",
            path: "/pages/signIn/signIn"
          },{
            name: "通知",
            iconClass: "icontongzhi",
            iconColor: "linear-gradient(to right, #6484ff 0%, #5e9cff 50%, #59b2ff 100%)",
            path: "/pages/notify/notify"
          },{
            name: "收集",
            iconClass: "iconshangchuanyunduan",
            iconColor: "linear-gradient(to right, #ff6f6a 0%, #ff6578 50%, #ff5e89 100%)",
            path: "/pages/collection/collection"
          },{
            name: "活动",
            iconClass: "iconhuodong",
            iconColor: "linear-gradient(to right, #b8f3ff 0%, #9cd9fd 50%, #9bc5fc 100%)",
            path: "/pages/activity/activity"
          },
        ]
      },{
        title: "管理社团",
        userStatus: '1',
        functions: [
          {
            name: "编辑社团",
            iconClass: "iconguanliwodeshetuan",
            iconColor: "linear-gradient(to right, #6e7fff 0%, #6e7fff 50%, #6e7fff 100%)",
            path: "编辑社团"
          },{
            name: "成员管理",
            iconClass: "iconchengyuanguanli",
            iconColor: "linear-gradient(to right, #ffa767, #ffa767)",
            path: "成员管理"
          }
        ]
      },{
        title: "社团相关",
        functions: [
          {
            name: "通讯录",
            iconClass: "icontongxunlu1",
            iconColor: "linear-gradient(to right, #efce16, #efce16)",
            path: "通讯录"
          },{
            name: "邀请",
            iconClass: "iconyaoqingchengyuan1",
            iconColor: "linear-gradient(to right, #49b45d, #49b45d)",
            path: "邀请"
          },
        ]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    functionClick(e){
      console.log(e.currentTarget.dataset.path)
      const name = e.currentTarget.dataset.name
      if(name=="签到"||name=="通知"||name=="收集"||name=="活动"){
        wx.navigateTo({
          url: e.currentTarget.dataset.path
        })
      }else if(name=="编辑社团"){
        wx.navigateTo({
          url: '/pages/associationInfo-update/associationInfo-update',
        })
      }else if(name=="通讯录"||name=="成员管理"){
        wx.navigateTo({
          url: '/pages/addressList/addressList',
        })
      }else if(name=="邀请"){
        wx.navigateTo({
          url: '/pages/msgPage/msgPage?type=2'
        })
      }
    }
  },
  lifetimes:{
    ready(){
      this.setData({
        userStatus: app.globalData.associationInfo.userStatus
      })
      app.getAssociationInfoCallBack=()=>{
        console.log("!23")
        this.setData({
          userStatus: app.globalData.associationInfo.userStatus
        })
      }
    }
  }
})
