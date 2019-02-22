var host = 'http://localhost:3001/';
host="http://192.168.28.178:3001/";
host = "http://192.168.94.54:3001/";//手机测试时使用   真机调试
const api= {
  //会员权限-------------/member
  //我要报名
  //我要借支
  borrowAuditUrl: host +"member/borrowAudit",
  //借支记录
  borrowAuditListUrl: host + "member/borrowAuditList",
  //我的报名申请
  //借支记录
  

  //游客权限-------------/guest
  //获取招聘信息
  getJobsUrl: host +"guest/jobs",
  getJobDetailUrl: host +"guest/jobDetail",
  //登陆
  loginUrl: host +"guest/login",
  //登出
  logoutUrl: host + "guest/logout",
  //注册
  signUpUrl: host +"guest/regist",
  //发送短信
  sendMsgUrl: host +"guest/sendMsg",
  //重置密码
  resetPwUrl: host +"guest/resetPasswd"
};
module.exports = {
  api: api
}