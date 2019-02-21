//app.js
App({
  data:{
    isLogin:false,
    userInfo:{}
  },
  onLaunch: function () {
    //获取登录用户信息
    var data = wx.getStorageSync('session');
    if(data!=''){
      this.data = data;
    }
  }
})