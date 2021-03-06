// pages/index/index.js
const API_URL = 'https://www.itsolotime.com/images/wxapp/main.json';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'访问小泊随記',
    notcie:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      //withCredentials: true,
      success: (res) => {
        let user = res.userInfo;
        this.setData({
          user
        })
      }
    }),
      wx.request({
        url: API_URL,
        success: (res) => {
          this.setData({
            notice:res.data[0].notice
          })
        }
      })	
  },
  gotolist(){
    wx.switchTab({
      url: '/pages/list/list'
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