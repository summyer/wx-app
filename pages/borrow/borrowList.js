// pages/borrow/borrowList.js
const networkUtil = require('../../utils/network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    list: [],
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hidden:false
    });
    networkUtil.borrowAuditList(this.setList, this.data.currentPage);
    this.setData({
      hidden: true
    });
  },
  setList: function (res) {
    let data = res.data.data;
    if (data.length > 0) {
      this.data.currentPage++;
    }
    this.setData({
      list: this.data.list.concat(data)
    })
  },
  toDetail: function (event) {
    //详情暂不做
    /*wx.navigateTo({
      url: '../jobDetail/jobDetail?id=' + event.currentTarget.dataset.id
    })*/
  },
  lower: function () {
    this.setData({ hidden: false});
    networkUtil.borrowAuditList(this.setList, this.data.currentPage);
    this.setData({ hidden: true});
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