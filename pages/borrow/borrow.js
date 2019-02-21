//borrow.js
const app = getApp();
const commonUtil = require('../../utils/commonUtil.js');
const borrorFormUtil = require('./borrowForm.js');
Page({
  data: {
    types: ['银行卡', '微信', '支付宝'],
    payType: 0,
    isLogin: app.data.isLogin,
    userInfo:app.data.userInfo
  },
  onLoad: function () {
    borrorFormUtil.addEvents(this);
  },
  onShow:function(){
    this.setData({
      isLogin: app.data.isLogin,
      userInfo: app.data.userInfo
    });
  }
})
