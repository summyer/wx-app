import WxValidate from "../../utils/WxValidate.js";
const loginUtil = require('../../utils/loginUtil.js');

const rules = {
  phone: {
    required: true,
    tel: true
  },
  code: {
    required: true,
    rangelength: [6, 6],
    digits: true
  },
  password: {
    required: true,
    rangelength: [8, 16]
  }
}

const messages = {
  phone: {
    required: '请输入手机号',
    tel: '手机号格式不对'
  },
  code: {
    required: '请输入验证码',
    rangelength: '验证码必须是六位',
    digits: '验证码必须是数字'
  },
  password: {
    required: '请输入密码',
    rangelength: '密码长度8-16'
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
    param.phone = e.detail.value.phone;
    param.code = e.detail.value.code;
    param.password = e.detail.value.password;
    loginUtil.reset(
      param,
      function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '成功',
            image: '../../img/success.png',
            duration: 1000,
            success() {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000) //延迟时间
            }
          })
        }
      }
    );
  }
}

module.exports = {
  addEvents: addEvents
}