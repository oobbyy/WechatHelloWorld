// miniprogram/pages/teamwork/getTeamworkTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  submitform: function (e) {
    if( e.detail.value.inputvalue == null ||  e.detail.value.inputvalue == ""){
      wx.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var okflag = true;
    var that=this;
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('todos').where({
      workdate: e.detail.value.inputvalue
    })
    .get({
      success: function(res) {
       
        console.log(res.data)
        if(res.data.length > 0)
        okflag = false
        if(okflag){
          console.log(1111)
          wx.cloud.callFunction({ // 要调用的云函数名称            
            name: 'crud', // 传递给云函数的event参数            
            data: {
              "workdate": e.detail.value.inputvalue,
              "employees": [{
                    "name": "盛建华",
                    "chooseby": null
                  },
                  {
                    "name": "苗威威",
                    "chooseby": null
                  },
                  {
                    "name": "许坤",
                    "chooseby": null
                  },
                  {
                    "name": "陈尚丰",
                    "chooseby": null
                  },
                  {
                    "name": "盛长炯",
                    "chooseby": null
                  },
                  {
                    "name": "纪献降",
                    "chooseby": null
                  },
                  {
                    "name": "邓德华",
                    "chooseby": null
                  },
                  {
                    "name": "苏国清",
                    "chooseby": null
                  },
                  {
                    "name": "王留涛",
                    "chooseby": null
                  },
                  {
                    "name": "张维招",
                    "chooseby": null
                  },
                  {
                    "name": "刘理团",
                    "chooseby": null
                  },
                  {
                    "name": "阮军",
                    "chooseby": null
                  },
                  {
                    "name": "王检查",
                    "chooseby": null
                  },
                  {
                    "name": "解福海",
                    "chooseby": null
                  },
                  {
                    "name": "陈建国",
                    "chooseby": null
                  },
                  {
                    "name": "鲍经贺",
                    "chooseby": null
                  },
                  {
                    "name": "赵玉友",
                    "chooseby": null
                  },
                  {
                    "name": "董铁忠",
                    "chooseby": null
                  }
              ]
            },
            success: res => {
              wx.showToast({
                title: '创建成功',
                icon: 'success',
                duration: 2000
              })
              console.log("云函数调用成功", res)
            },
            fail: err => {
              wx.showToast({
                title: '创建失败，请联系管理员',
                icon: 'success',
                duration: 2000
              })
              console.error("云函数调用失败", err)
            },
          })
        }else{
          wx.showToast({
            title: '当天已发布工作团队，请在"查看工作团队"菜单中确认',
            icon: 'none',
            duration: 3000//持续的时间
          })
        }
      }
      
    })

    


    
    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     console.log('[云函数] [login] user openid: ', res.result.openid)
    //     app.globalData.openid = res.result.openid
    //     if(res.result.openid == "opV-_4gbuoWst4l25jMHo9m8FXJ4"){
    //     wx.navigateTo({
    //       url: '../teamwork/getTeamworkTime',
    //     })}else{
    //       wx.navigateTo({
    //         url: '../userConsole/getTeamworkTime',
    //       })
    //     }
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //     wx.navigateTo({
    //       url: '../deployFunctions/deployFunctions',
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})