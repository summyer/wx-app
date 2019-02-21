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
  username: {
    required: true,
    rangelength: [1, 20]
  },
  nickName: {
    required: true,
    rangelength: [1, 20]
  },
  password1: {
    required: true,
    rangelength: [8, 16]
  },
  password2: {
    required: true,
    rangelength: [8, 16],
    equalTo: 'password1'
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
    digits:'验证码必须是数字'
  },
  username: {
    required: '请输入用户名',
    rangelength:'用户名1-20个字符'
  },
  nickName: {
    required: '请输入昵称',
    rangelength: '昵称1-20个字符'
  },
  password1: {
    required: '请输入密码',
    rangelength: '密码长度8-16'
  },
  password2: {
    required: '请输入密码',
    rangelength: '密码长度8-16',
    equalTo:'两次密码不一致'
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
    param.username = e.detail.value.username;
    param.password = e.detail.value.password1;
    param.nickName = e.detail.value.nickName;
    loginUtil.signUp(
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
        } else {
          wx.showToast({
            title: res.data.message,
            image: '../../img/cry.png',
            duration: 1000
          })
        }
      }
    );
  }
}

module.exports = {
  addEvents: addEvents
}