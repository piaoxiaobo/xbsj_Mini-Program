// pages/detail/detail.js
let datas =require('../../datas/list-data')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let index=options.id;
    let detailObj = datas.list_data[index];
    this.setData({
      detailObj,index
    })

    let collectionFlag = wx.getStorageSync('isCollected');
    if(!collectionFlag){
        collectionFlag = {}
        wx.setStorage({
          key: 'isCollected',
          data: collectionFlag
        })
    }else{
      let isCollected = collectionFlag[index]

      isCollected=isCollected?true:false;
      this.setData({isCollected})
    }
   
  },
  handleCollection(){
    let isCollected = !this.data.isCollected;
    // 修改状态值
    this.setData({ isCollected });

    let title=isCollected?'收藏成功':'取消收藏'
    wx.showToast({
      title,
      icon: 'success',
      duration: 2000
    })

    let collectionFlag = wx.getStorageSync('isCollected')
   
    let {index} = this.data;
    collectionFlag[index] = isCollected;
    wx.setStorage({
      key: 'isCollected',
      data: collectionFlag
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