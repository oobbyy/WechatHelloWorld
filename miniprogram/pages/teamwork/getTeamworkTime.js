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
    wx.cloud.callFunction({ // 要调用的云函数名称            
      name: 'crud', // 传递给云函数的event参数            
      data: {
        workdate: e.detail.value.inputvalue,
        managers: [{
            name: "aa",
            employees: [{
                name: "11",
                chooseby: "aa"
              },
              {
                name: "22",
                chooseby: "bb"
              },
              {
                name: "33",
                chooseby: null
              }
            ]
          },
          {
            name: "bb",
            employees: [{
                name: "11",
                chooseby: "aa"
              },
              {
                name: "22",
                chooseby: "bb"
              },
              {
                name: "33",
                chooseby: null
              }
            ]
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