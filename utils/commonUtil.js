//公共工具层
const cookieUtil = require('cookieUtil.js');
const InfoKey="session"

//接口响应调用回调之前执行,用来模拟浏览器cookie操作
const preCallBack = function (callback, res) {
  console.log(res.header);
  cookieUtil.storageCookie(res.header);
  //可以在此处处理未登录访问高级接口的异常，跳入登录页面
  if(res.data.code==509){//未登录访问
    clearInfo();
    wx.showToast({
      title: '请先登录',
      image: '../../img/cry.png',
      duration: 1000,
      success() {
        setTimeout(function () {
          wx.navigateTo({
            url: '../../pages/login/login'
          });
        }, 1000) //延迟时间
      }
    })
    return;
  }
  callback(res);
}

const storageInfo=function(value){
  wx.setStorageSync(InfoKey, value);
}
const clearInfo = function () {
  wx.removeStorageSync(InfoKey);
}

//短信验证码
function getCode(_this, num) {
  _this.setData({
    isShow: true                    //按钮1隐藏，按钮2显示
  })
  var remain = num;             //用另外一个变量来操作秒数是为了保存最初定义的倒计时秒数，就不用在计时完之后再手动设置秒数
  var time = setInterval(function () {
    if (remain == 1) {
      clearInterval(time);
      _this.setData({
        sec: num,
        isShow: false
      })
      return false      //必须有
    }
    remain--;
    _this.setData({
      sec: remain
    })
  }, 1000)
}
const getCurrentDate=function(){
  let now = new Date();
  return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}
const getCurrentTime=function(){
  let now = new Date();
  return now.getHours() + ":" + now.getMinutes();
}

module.exports = {
  preCallBack: preCallBack,
  storageInfo: storageInfo,
  clearInfo: clearInfo,
  getCode: getCode,
  getCurrentDate: getCurrentDate,
  getCurrentTime: getCurrentTime
}

