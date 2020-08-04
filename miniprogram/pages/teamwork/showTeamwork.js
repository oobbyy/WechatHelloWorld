// miniprogram/pages/teamwork/getTeamworkTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamwork: "",
    hiddenName:true
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  submitform: function (e) {
    var that=this;
    const db = wx.cloud.database()
    const _ = db.command

    db.collection('todos').where({
      workdate: e.detail.value.inputvalue
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的一条记录的数组
        that.setData({teamwork:res.data[0],hiddenName:false})
        console.log(res.data)
      }
      
    })
 
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