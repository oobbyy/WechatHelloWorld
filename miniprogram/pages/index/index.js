//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  getTeamworkTime: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        //匡微信ID
        if(res.result.openid == "opV-_4oKtBxwOaBIvxfpm02hmW6s" || res.result.openid == "opV-_4j65WESWyYJl2CpfgEHit_Y" || res.result.openid == "opV-_4jNx1wAX0tAAfoGTxrOYcYM" || res.result.openid == "opV-_4gbuoWst4l25jMHo9m8FXJ4" || res.result.openid == "opV-_4u1QIrbUOOW5ukWy3XdMgfI"){
        wx.navigateTo({
          url: '../teamwork/getTeamworkTime',
        })}else{
          wx.showToast({
            title: '没有该功能权限',
            icon: 'none',
            duration: 2000//持续的时间
       
          })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  createTeamwork: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        if(res.result.openid == "opV-_4j65WESWyYJl2CpfgEHit_Y"){
        wx.navigateTo({
          url: '../teamwork/createTeamwork',
        })}else{
          wx.navigateTo({
            url: '../userConsole/userConsole5',
          })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  updateTeamwork: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        if(res.result.openid == "opV-_4oKtBxwOaBIvxfpm02hmW6s" || res.result.openid == "opV-_4j65WESWyYJl2CpfgEHit_Y" || res.result.openid == "opV-_4jNx1wAX0tAAfoGTxrOYcYM" || res.result.openid == "opV-_4gbuoWst4l25jMHo9m8FXJ4" || res.result.openid == "opV-_4u1QIrbUOOW5ukWy3XdMgfI" || res.result.openid == "opV-_4kw8rgcODyjRvypOm8FBa2s"){
        wx.navigateTo({
          url: '../teamwork/createTeamwork',
        })}else{
          wx.showToast({
            title: '没有该功能权限',
            icon: 'none',
            duration: 2000//持续的时间
       
          })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  updateTeamworkB: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        if(res.result.openid == "opV-_4oKtBxwOaBIvxfpm02hmW6s" || res.result.openid == "opV-_4j65WESWyYJl2CpfgEHit_Y" || res.result.openid == "opV-_4jNx1wAX0tAAfoGTxrOYcYM" || res.result.openid == "opV-_4gbuoWst4l25jMHo9m8FXJ4" || res.result.openid == "opV-_4u1QIrbUOOW5ukWy3XdMgfI" || res.result.openid == "opV-_4qk9mTk9pSZhymjGwiIipWM"){
        wx.navigateTo({
          url: '../teamwork/createTeamworkB',
        })}else{
          wx.showToast({
            title: '没有该功能权限',
            icon: 'none',
            duration: 2000//持续的时间
       
          })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  showTeamwork: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../teamwork/showTeamwork',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  showEmpWork: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        //匡微信ID
        if(true){
        wx.navigateTo({
          url: '../teamwork/showEmpWork',
        })}else{
          // wx.showToast({
          //   title: '没有该功能权限',
          //   icon: 'none',
          //   duration: 2000//持续的时间
       
          // })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  info: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../teamwork/info',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
