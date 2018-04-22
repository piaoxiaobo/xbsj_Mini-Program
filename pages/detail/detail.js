// pages/detail/detail.js
const API_URL = 'https://www.itsolotime.com/images/wxapp/list.json';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected:false,
    isMusicPlay:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 300
    })
    wx.request({
      url: API_URL,
      success: (res) => {
        let index = options.id;
        let detailObj = res.data[index];
        this.setData({
          detailObj, index
        })
        let collectionFlag = wx.getStorageSync('isCollected');
        if (!collectionFlag) {
          collectionFlag = {}
          wx.setStorage({
            key: 'isCollected',
            data: collectionFlag
          })
        } else {
          let isCollected = collectionFlag[index]

          isCollected = isCollected ? true : false;
          this.setData({ isCollected })
        }
        //  判断当前页面的额音乐是否在播放
        let { isPlay, pageIndex } = app.data;
        if (isPlay && pageIndex === index) { // 是当前页面的音乐在播放
          this.setData({ isMusicPlay: true });
        }

        // 监听音乐播放和暂停
        wx.onBackgroundAudioPlay(() => {
          // 修改isMusicPlay的状态值
          this.setData({ isMusicPlay: true });
          // 将当前页面播放音乐的标识传入到app实例中
          app.data.isPlay = true;
          app.data.pageIndex = this.data.index;
        })

        wx.onBackgroundAudioPause(() => {
          this.setData({ isMusicPlay: false });
          // 将当前页面播放音乐的标识传入到app实例中
          app.data.isPlay = false;
        })
      }
    })
  
   
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

  musicPlay(){
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({isMusicPlay})
  },
  musicControl() {
    let isMusicPlay = !this.data.isMusicPlay;
    // 更新isMusicPlay状态值
    this.setData({ isMusicPlay });
    let { dataUrl, title } = this.data.detailObj.music
    // 控制音乐播放、暂停
    if (isMusicPlay) {
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
      // 将当前页面播放音乐的标识传入到app实例中
      app.data.isPlay = true;
      app.data.pageIndex = this.data.index;

    } else {
      wx.pauseBackgroundAudio()
      // 将当前页面播放音乐的标识传入到app实例中
      app.data.isPlay = true;

    }
  },
  toshare(){
    wx.showActionSheet({
      itemList: ['分享到微信', '分享到朋友圈', '分享给qq好友'],
      itemColor: '#666'
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