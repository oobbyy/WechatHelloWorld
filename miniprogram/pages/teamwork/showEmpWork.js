// miniprogram/pages/teamwork/createTeamwork.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workdate: [],
    workdayCnt: "",
    teamwork: "",
    hiddenName:true,
    array: [],
    year: 0,
    month: 0,
    weekdate: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    todayIndex: 0,
    index:"",
    date:""

  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value
    })
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
    var that=this;
    const db = wx.cloud.database()
    const _ = db.command
    var dateTmp = that.data.date.split("-")
    var yearTmp = dateTmp[0]
    var monthTmp = dateTmp[1]
    console.log(that.data.array[that.data.index])
    db.collection('todos').where({
      workdate: {
        $regex: that.data.date+'.*'
        },
      employees: 
        _.elemMatch({
        chooseby: _.or('唐喆','孙颢铭'),
        name: that.data.array[that.data.index]
        })

    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的一条记录的数组
        console.log(res.data)
        if(res.data.length == 0){
          that.setData({
            hiddenName:true,
            workdayCnt: ""
          })
          wx.showToast({
            title: '该员工本月没有排班',
            icon: 'none',
            duration: 2000
          })
        }else{
          that.setData({hiddenName:false})
          that.dateInit(yearTmp,monthTmp)
          var workdayCntTmp = 0;
          for (let i = 0, lenI = res.data.length; i < lenI; ++i) {
            var workdateArrayTmp = res.data[i].workdate.split('-')
            var workdateTmp = '' + workdateArrayTmp[0] + parseInt(workdateArrayTmp[1]) + parseInt(workdateArrayTmp[2])
            for (let j = 0, lenJ = that.data.dateArr.length; j < lenJ; ++j) {
              if(workdateTmp === that.data.dateArr[j].isToday){
                that.data.dateArr[j].isWorkday = true;
                workdayCntTmp++;
              }
            }
          }

          

          var yearmonth = that.data.date.split("-")
          let now = new Date()
          let year = yearmonth[0]
          let month = yearmonth[1]

          that.setData({
            year: year,
            month: month,
            hiddenName:false,
            textmsg: "",
            dateArr: that.data.dateArr,
            workdayCnt: "该员工本月被分配天数为："+workdayCntTmp+"天"
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
      if(employees[i].chooseby === "唐喆"){
        continue
      }
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (employees[i].name === values[j]) {
            employees[i].chooseby = "孙颢铭"
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
    var that=this;
    const db = wx.cloud.database()
    db.collection('basic').where({"table": "workselection"}).get({
      success: function (res) {
        that.setData({array:res.data[0].empselections});
      }
    })



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

  dateInit: function (setYear, setMonth) {
    setMonth = setMonth - 1
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];                       //需要遍历的日历数组数据
    let arrLen = 0;                         //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth();                 //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + ',' + (month + 1) + ',' + 1).getDay();                          //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate();               //获取目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: '' + year + (month+1) + num,
          dateNum: num,
          weight: 5,
          isWorkday: false
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
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