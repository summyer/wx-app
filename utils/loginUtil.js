//登录相关的函数，包括登录、找回密码、注册、退出
//目前注册时使用短信验证码注册
//登录使用密码登录，找回密码时使用短信验证码找回重新修改密码

const apiUrl = require('apiUrl.js');
const commonUtil = require('commonUtil.js');
const cookieUtil = require('cookieUtil.js');
//登录
const login = (param,callback) => {
  console.debug(param);
  wx.request({
    url: apiUrl.api.loginUrl,
    method: 'POST',
    header: cookieUtil.wrapperHeader({
      'content-type': 'application/json' 
    }),
    data: param,
    success(res) {
      if (res.data.code == 200) {
        let data = { isLogin: true, userInfo:res.data.data}
        commonUtil.storageInfo(data);
      }
      commonUtil.preCallBack(callback, res);
    }
  })
}

const test = (header, callback) => {
  wx.request({
    url: "http://192.168.28.178:3001/guest/test",
    method: 'POST',
    header: cookieUtil.wrapperHeader(header),
    success(res) {
      commonUtil.preCallBack(callback, res);
    }
  })
}
//登出
const logout = (callback) => {
  wx.request({
    url: apiUrl.api.logoutUrl,
    method: 'GET',
    header: cookieUtil.wrapperHeader({
      'content-type': 'application/json'
    }),
    success(res) {
      if (res.data.code == 200) {
        commonUtil.clearInfo();
      }
      commonUtil.preCallBack(callback, res);
    }
  })
}
//注册
const signUp = (param, callback) => {
  wx.request({
    url: apiUrl.api.signUpUrl,
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
//重置密码
const resetPw = (param, callback) => {
  wx.request({
    url: apiUrl.api.resetPwUrl,
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
//发送短信验证码
const sendMsg = (param, callback) => {
  wx.request({
    url: apiUrl.api.sendMsgUrl,
    method: 'get',
    header: cookieUtil.wrapperHeader({
      'content-type': 'application/json'
    }),
    data: param,
    success(res) {
      commonUtil.preCallBack(callback, res);
    }
  })
}

module.exports = {
  signUp: signUp,
  sendMsg: sendMsg,
  login:login,
  reset: resetPw,
  logout: logout
}
