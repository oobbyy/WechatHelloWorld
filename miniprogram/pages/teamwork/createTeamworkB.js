// miniprogram/pages/teamwork/createTeamwork.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workdate: "",
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
        that.setData({teamwork:res.data[0],workdate:res.data[0].workdate,hiddenName:false})
        console.log(res.data)
      }
      
    })
 
  },

  selectEmployee: function (e) {
    var that=this
    var okflag = true
    const db = wx.cloud.database()
    const _ = db.command

    const employees = this.data.teamwork.employees

    db.collection('todos').where({
      workdate: this.data.workdate
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的一条记录的数组
        const employeeOld = res.data[0].employees
        var teamB = new Array();
        console.log(employeeOld)
        var teamBIndex = 0;
        for (let i = 0, lenI = employeeOld.length; i < lenI; ++i) {
          if (employeeOld[i].chooseby === "经理A") {
            teamB[teamBIndex++] = employeeOld[i].name;
          }
        }

        for (let i = 0, lenI = employees.length; i < lenI; ++i) {
          if(employees[i].chooseby === "经理B"){
            for (let j = 0, lenJ = teamB.length; j < lenJ; ++j) {
              if (employees[i].name === teamB[j]) {
                console.log("应该弹出"+teamB[j])
                okflag = false
                wx.showToast({
                  title: teamB[j]+'刚刚已被另一边安排工作，请点击"查看"刷新',
                  icon: 'none',
                  duration: 3000//持续的时间
                })
                
              }
            }
          }
        }
        if(okflag){
            wx.cloud.callFunction({ // 要调用的云函数名称            
              name: 'update', // 传递给云函数的event参数            
              data: {
                "workdate": this.data.workdate,
                "employees": this.data.teamwork.employees
              },
              success: res => {
                wx.showToast({
                  title: '设置成功',
                  icon: 'success',
                  duration: 2000
                })
                console.log("云函数调用成功", res)
              },
              fail: err => {
                wx.showToast({
                  title: '设置失败，请联系管理员',
                  icon: 'success',
                  duration: 2000
                })
                console.error("云函数调用失败", err)
              },
            })
        }

      }
    })
    
    

  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const teamwork = this.data.teamwork
    const employees = teamwork.employees
    const values = e.detail.value
    for (let i = 0, lenI = employees.length; i < lenI; ++i) {
      if(values.length == 0){
        employees[i].chooseby = null
      }
      if(employees[i].chooseby === "经理A"){
        continue
      }
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (employees[i].name === values[j]) {
            employees[i].chooseby = "经理B"
            break
        }else{
          employees[i].chooseby = null
        }
      }
    }

    this.setData({
      teamwork
    })
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that=this;
    // const db = wx.cloud.database()
    // db.collection('todos').doc
    // ('2e31d63f5f1fd8b000038aa85d1e35cb').get({
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({teachers:res.data});
    //   }
    // })

    // wx.cloud.callFunction({            // 要调用的云函数名称            
    //   name: 'crud',            // 传递给云函数的event参数            
    //   data: {              
    //   },            
    //   success: res => {              
    //     console.log("云函数调用成功", res)
    //   },            
    //   fail: err => {              
    //     console.error("云函数调用失败", err)                         
    //    },          
    // })
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