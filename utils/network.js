//获取招聘信息
const apiUrl = require('apiUrl.js');
const commonUtil = require('commonUtil.js');
const cookieUtil = require('cookieUtil.js');
//工作列表
const getJobs= (callback,pageNo) => {
  wx.request({
    url: apiUrl.api.getJobsUrl,
    method:'GET',
    header: cookieUtil.wrapperHeader({
      'content-type': 'application/json'
    }),
    data:{
      pageNumber: pageNo
    },
    success(res) {
      commonUtil.preCallBack(callback,res);
    }
  })
}
//工作详情
const getJobDetail = (callback, id)=>{
  wx.request({
    url: apiUrl.api.getJobDetailUrl,
    method: 'GET',
    header: cookieUtil.wrapperHeader({
      'content-type': 'application/json'
    }),
    data: {
      id: id
    },
    success(res) {
      commonUtil.preCallBack(callback, res);
    }
  })
}
//我要借支
const borrowAuditPost = (param, callback) => {
  wx.request({
    url: apiUrl.api.borrowAuditUrl,
    method: 'POST',
    header: cookieUtil.wrapperHeader({
      'content-type': 'application/json'
    }),
    data: param,
    success(res) {
      commonUtil.preCallBack(callback, res);
    }
  })
}


//-----------------------下面接口暂时无用

//进行登陆  code2session
const doLogin=(callback)=>{
  wx.login({
    success(res) {
      if (res.code) {
        console.log("登陆code:"+res.code);
        //获取微信用户信息
        wx.getUserInfo({
          success(res){
            const userInfo = res.userInfo
          },
          fail:function(res){
            console.log(res);
          }
        })
        wx.request({
          url: apiUrl.api.loginUrl,
          data: {
            code: res.code
          },
          success(res){
            callback(res.data);
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}
//获取敏感数据
const getEncryData = (param,callback)=>{
  wx.request({
    url: apiUrl.api.getEncryDataUrl,
    method: 'GET',
    header: {
      'content-type': 'application/json' // 默认值
    },
    data: param,
    success(res) {
      callback(res.data);
    }
  })
}
//checkSession 检测登陆状态
const checkLogin=(callback)=>{
  wx.checkSession({
    success() {
      // session_key 未过期，并且在本生命周期一直有效
      callback(0);//成功
    },
    fail() {
      // session_key 已经失效，需要重新执行登录流程
      callback(1);//失败
    }
  })
}

module.exports = {
  getJobs: getJobs,
  getJobDetail: getJobDetail,
  doLogin:doLogin,
  checkLogin: checkLogin,
  getEncryData: getEncryData,
  borrowAuditPost: borrowAuditPost
}