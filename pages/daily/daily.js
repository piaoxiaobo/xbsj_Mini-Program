//index.js
//获取应用实例
const API_URL = 'https://www.itsolotime.com/images/wxapp/daily.json';
Page({
  data: {
    animationData: {},
    cardInfoList: []
  },
  //事件处理函数
  slidethis: function(e) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation= animation;
    this.animation.translateY(50).rotateY(180).translateX(-30).step();
    this.animation.translateY(62).translateX(30).rotateY(360).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function() {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },
  onLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 300
    })
    wx.request({
      url: API_URL,
      success: (res) => {
        this.setData({
          cardInfoList: res.data
        })
      }
    })
  }
})
