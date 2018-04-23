// pages/list/list.js
const API_URL = 'https://www.itsolotime.com/images/wxapp/list.json';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    wx.request({
      url: API_URL,
      success: (res) => {
        console.log(res.data)
        this.setData({
          list: res.data
        })
      }
    })
  },
  toDetail(event){
    let id = event.currentTarget.dataset.detail
    wx.navigateTo({
      url:`/pages/detail/detail?id=${id}`
    })
  },
  carouselToDetail(event){
    let id = event.target.dataset.detailid
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})