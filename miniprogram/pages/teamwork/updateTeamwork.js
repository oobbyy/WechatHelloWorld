// miniprogram/pages/teamwork/updateTeamwork.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    employees: [{
        value: '1',
        name: '美国'
      },
      {
        value: '2',
        name: '中国'
      },
      {
        value: '3',
        name: '巴西'
      },
      {
        value: '4',
        name: '日本'
      },
      {
        value: '5',
        name: '英国'
      },
      {
        value: '6',
        name: '法国'
      }
    ],
    teachers: null

  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const employees = this.data.employees
    const values = e.detail.value
    for (let i = 0, lenI = employees.length; i < lenI; ++i) {
      employees[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (employees[i].value === values[j]) {
          employees[i].checked = true
          break
        }
      }
    }

    this.setData({
      employees
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const db = wx.cloud.database()
    db.collection('todos').doc
    ('2e31d63f5f1fd8b000038aa85d1e35cb').get({
      success: function (res) {
        console.log(res.data)
        that.setData({teachers:res.data});
      }
    })

    wx.cloud.callFunction({            // 要调用的云函数名称            
      name: 'crud',            // 传递给云函数的event参数            
      data: {              
      },            
      success: res => {              
        console.log("云函数调用成功", res)
      },            
      fail: err => {              
        console.error("云函数调用失败", err)                         
       },          
    })
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