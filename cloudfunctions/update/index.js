// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try{
    console.log(111111)
    db.collection('todos').where({
      workdate: event.workdate
    }).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        employees: event.employees
      },
      success: console.log,
      fail: console.error
    })
  }catch (e) {    
    console.error(e)  
  }

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
  
}