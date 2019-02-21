import WxValidate from "../../utils/WxValidate.js";
const loginUtil = require('../../utils/loginUtil.js');
const app = getApp();

const rules = {
  username: {
    required: true,
    rangelength: [1, 20]
  },
  password: {
    required: true,
    rangelength: [8, 16]
  }
}

const messages = {
  username: {
    required: '请输入账号或手机号',
    rangelength: '账号或手机号长度1~20'
  },
  password: {
    required: '请输入密码',
    tel: '密码8-16位字符'
  }
}

const addEvents = function (_this) {
  _this.WxValidate = new WxValidate(rules, messages);

  _this.checkParam = function (e) {
    if (!this.WxValidate.checkForm(e.detail.value)) {
      const error = this.WxValidate.errorList[0];
      wx.showToast({
        title: error.msg,
        icon: 'none',
        duration: 2000
      });
      return false
    }
    return true;
  }

  _this.formSubmit = function (e) {
    if (!this.checkParam(e)) {
      return;
    }
    let param = {};
    param.username = e.detail.value.username;
    param.password = e.detail.value.password;
    loginUtil.login(param,
      function (res) {
        if (res.data.code == 200) {
          app.data.isLogin = true;
          app.data.userInfo = res.data.data;
          wx.showToast({
            title: '成功',
            image: '../../img/success.png',
            duration: 2000,
            success() {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000) //延迟时间
            }
          })
        } else {
          wx.showToast({
            title: res.data.message,
            image: '../../img/cry.png',
            duration: 5000
          })
        }

      }
    );
  }
}

module.exports = {
  addEvents: addEvents
}