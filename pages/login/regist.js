// pages/login/regist.js
const loginUtil=require('../../utils/loginUtil.js');
const commonUtil = require('../../utils/commonUtil.js');
const loginFormUtil = require('./registForm.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,         //默认按钮1显示，按钮2不显示
    sec: "60"　　　　　　　　//设定倒计时的秒数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    loginFormUtil.addEvents(this);
  },
  bindphone : function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  //发送短信验证码
  sendMsg:function(){
    if (typeof (this.data.phone) == 'undefined' || this.data.phone.length==0){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }else{
      if (!this.WxValidate.methods.tel(this.data.phone)) {
        wx.showToast({
          title: '手机号格式有误',
          icon: 'none',
          duration: 2000
        })
        return;
      }
    }
    var _this = this;　　　　//防止this对象的混杂，用一个变量来保存
    var time = _this.data.sec　　//获取最初的秒数
    commonUtil.getCode(_this, time);　　//调用倒计时函数
    loginUtil.sendMsg(
      {
        phone:this.data.phone
      },
      function(res){
        console.log(res);
      }
      );
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