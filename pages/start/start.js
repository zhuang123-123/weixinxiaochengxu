// pages/start/start.js
const WXAPI = require('apifm-wxapi')
// 获取应用实例
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      banners: [
        {picUrl: 'https://dcdn.it120.cc/2020/01/07/c3183558-55e8-4589-9ea7-81670004941a.jpg'},
        {picUrl: 'https://dcdn.it120.cc/2020/01/07/b7471e4f-dc0d-4245-afb7-b64fbd9bb29a.jpg'},
        {picUrl: 'https://dcdn.it120.cc/2020/01/07/5425289c-fb82-4ab4-a193-933ddba71496.jpg'}
      ],
      swiperMaxNumber: 0,
      swiperCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName'),
    })
  },

  // 轮播图切换
  swiperchange: function (e) {
    console.log(e)
    if (e.detail.current === 2) {
      this.setData({
        swiperCurrent: 2
      })
    } else {
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },
  // 点击进入店铺-进入页面
  goToIndex: function (e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 轮播图切换
  imgClick(e) {
   wx.showToast({
     title: '向左滑进',
     icon: 'none'
   })
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