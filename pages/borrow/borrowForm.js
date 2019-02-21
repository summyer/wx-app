import WxValidate from "../../utils/WxValidate.js";
const networkUtil = require('../../utils/network.js');
//https://github.com/skyvow/wx-extend/blob/master/docs/components/validate.md
//https://github.com/skyvow/wx-extend/tree/master/src/assets/plugins/wx-validate
const rules={
  uname: {
    required: true,
    rangelength: [1, 10]
  },
  phone:{
    required: true,
    tel: true
  },
  idCard:{
    required: true,
    idcard: true
  },
  payNum:{
    required: true,
    rangelength: [5, 20]
  },
  mark:{
    required: true
  },
  money:{
    required: true,
    digits: true
  },
  company:{
    required: true,
    rangelength: [1, 20]
  },
  isAgree: {
    assistance: true,
  }
}

const messages = {
  uname: {
    required: '请输入姓名',
    rangelength:'姓名长度1~10'
  },
  phone: {
    required: '请输入手机号',
    tel: '请输入正确的手机号码'
  },
  idCard: {
    required: '请输入身份证号',
    idcard:'请输入正确的身份证号码'
  },
  payNum: {
    required: '请输入支付账号',
    rangelength: '支付账号5~20个字符'
  },
  mark: {
    required: '请输入借款原因'
  },
  money: {
    required: '请输入金额',
    digits: '金额需为数字类型'
  },
  company: {
    required: '请输入公司名',
    rangelength: '1~20字符'
  }
}

const addEvents = function (_this) {
  _this.WxValidate= new WxValidate(rules, messages);
  _this.WxValidate.addMethod('assistance', (value, param) => {
    return (value.length >= 1);
  }, '请勾选《相关条款》');

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
    let param={};
    param.uname = e.detail.value.uname;
    param.phone = e.detail.value.phone;
    param.idCard = e.detail.value.idCard;
    param.payType = e.detail.value.payType;
    param.payNum = e.detail.value.payNum;
    param.mark = e.detail.value.mark;
    param.money = e.detail.value.money;
    param.company = e.detail.value.company;
    console.log(param);
    networkUtil.borrowAuditPost(param,function(res){
      if(res.data.code==200){
        wx.showToast({
          title: '提交成功',
          image: '../../img/success.png',
          duration: 1000
        })
        //重置表单中的部分数据
        _this.setData({
          defaultValue:''
        });
      }
    });
  }
}

module.exports = {
  addEvents:addEvents
}