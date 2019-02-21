//sessionid生成原理
//如果请求中带有cookie,并且cookie中的session在服务器还存在，则使用此session,响应header中不带有set-cookie
//相反如果请求时不带cookie,或者服务器上对应的session已回收(服务器重启)，则响应header中带有set-cookie
//以上所说的cookie都是记录了一个JSESSIONID

const cookieKey="cookie";
//模拟cookie，现在cookie过期功能还为实现
const storageCookie=function(header){
  console.log(typeof(header["Set-Cookie"]) == "undefined");
  console.log("h:" + header["Set-Cookie"]);
  if (typeof(header["Set-Cookie"]) != "undefined"){
    wx.setStorageSync(cookieKey, header["Set-Cookie"]);
  }
}

const wrapperHeader=function(header){
  let cookie = wx.getStorageSync(cookieKey);
  if(cookie==''){
    console.log("cookie不存在");
  }else{
    console.log("cookie存在:"+cookie);
    header.cookie = cookie;
  }
  return header;
}


module.exports = {
  storageCookie: storageCookie,
  wrapperHeader: wrapperHeader
}