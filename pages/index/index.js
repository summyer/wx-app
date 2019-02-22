//index.js

const networkUtil = require('../../utils/network.js');

Page({
  data: {
    currentPage:1,
    jobs:[],
    hidden:false
  },
  onLoad: function () {
    this.data.hidden=false;
    networkUtil.getJobs(this.setJobs,this.data.currentPage);
    this.data.hidden=true;
  },
  setJobs:function(res){
    let data=res.data.data;
    if(data.length>0){
      this.data.currentPage++;
    }
    this.setData({
      jobs: this.data.jobs.concat(data)
    })
  },
  toDetail: function (event){
    wx.navigateTo({
      url: '../jobDetail/jobDetail?id=' + event.currentTarget.dataset.id
    })
  },
  lower:function(){
    console.log(this.data.currentPage);
    this.setData({ hidden: false });
    networkUtil.getJobs(this.setJobs, this.data.currentPage);
    this.setData({ hidden: true });
  }
})
