// pages/person/person.js
const app = getApp()
const networkUtil = require('../../utils/network.js');
const loginUtil = require('../../utils/loginUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLogin: app.data.isLogin,
      userInfo: app.data.userInfo
    });
  },
  //点击登陆
  login:function(){
    wx.navigateTo({
      url: '../../pages/login/login'
    })
  },

  logout:function(){
    let ctx=this;
    loginUtil.logout(function(res){
      wx.showToast({
        title: '成功',
        image: '../../img/success.png',
        duration: 1000,
        success() {
          setTimeout(function () {
            app.data.isLogin = false;
            app.data.userInfo = {};
            ctx.setData({
              isLogin:false,
              userInfo:{}
            });
          }, 1000) //延迟时间
        }
      })
    });
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
    this.setData({
      isLogin: app.data.isLogin,
      userInfo: app.data.userInfo
    });
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