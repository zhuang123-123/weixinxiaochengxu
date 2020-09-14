//index.js
const WXAPI = require('apifm-wxapi')
//获取应用实例
const app = getApp()

Page({
  data: {
    categories: [
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/f89753a227d26a3fe9ccc6f975857bb6.png', name: '上装'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/5bfffd6ad0d4483870f024a3ed936528.png', name: '裤装'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/8d32c254e2cb86d2d42c99b768d136b6.png', name: '特价区'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/d800327091f216e2c83db8af7b6be306.png', name: '裙装'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/cfee29650d6ae58a4bb1f84a3d899450.png', name: '套装'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/6b3136cda73c99453ac93a1c5a9deebf.png', name: '外套'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/9a7356187fce687ce568ba7381685299.png', name: '秒杀'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/7773b4c204280ba194514594f7070ac9.png', name: '内裤'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/60f41bf042d201b48a7115d22344320f.png', name: '袜子'},
      {icon: 'https://cdn.it120.cc/apifactory/2019/04/09/cdb16ac9c66bc211b82bd947452526f4.png', name: '鞋'},
    ],
    inputVal: '',  // 搜索框内容
    goodsRecommend: [],  // 推荐商品
    kanjiaList: [],  // 砍价商品列表
    pingtuanList: [],  // 平团商品列表

    loadingHidden: false,  // loading
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],

    scrollTop: 0,
    loadingMoreHidden: true,

    coupons: [],

    curPage: 1,
    pageSize: 20,
    cateScrollTop: 0
  },
  onLoad: function () {
    const that = this;
    this.initBanners();
    this.getNotice();
    this.categories();
    WXAPI.goods({
      recommendStatus: 1
    }).then(function (res) {
      if (res.code == 0) {
        that.setData({
          goodsRecommend: res.data
        })
      }
    })
    this.kanjiaGoods();
  },
  async initBanners() {
    const _data = {}
    // 获取头部轮播图
    const res1 = await WXAPI.banners({
      type: 'index'
    })
    if (res1.code == 700) {
      wx.showModal({
        title: '提示',
        content: '请再后台添加 banner轮播图片, 自定义类型填写index',
        showCancel: false
      })
    } else {
      _data.banners = res1.data
    }
    // 获取首页广告位
    const res2 = await WXAPI.banners({
      type: 'indexAD'
    })
    if (res2.code == 0) {
      _data.adInfo = res2.data[0]
    }
    this.setData(_data)
  },
  // notice_swiper
  getNotice: function () {
    var that = this;
    WXAPI.noticeList({pageSize: 5}).then(function (res) {
      if (res.code == 0) {
        that.setData({
          noticeList: res.data
        })
      }
    })
  },
  // category-list
  async categories() {
    const res = await WXAPI.goodsCategory()
    let categories = [];
    if (res.code == 0) {
      const _categories = res.data.filter(ele => {
        return ele.level == 1
      })
      categories = _categories
    }
    this.setData({
      categories: categories,
      activeCategoryId: 0,
      curPage: 1
    });
    this.getGoodsList(0)
  },
  // category-点击
  tabClick: function (e) {
    wx.setStorageSync('_categoryId', e.currentTarget.id)
    wx.switchTab({
      url: '/pages/category/category',
    })
  },
  //  砍价商品列表
  async kanjiaGoods() {
    const res = await WXAPI.goods({
      kanjia: true
    });
    if (res.code == 0) {
      const kanjiaGoodsIds = []
      res.data.forEach(ele => {
        kanjiaGoodsIds.push(ele.id)
      })
      const goodsKanjiaSetRes = await WXAPI.kanjiaSet(kanjiaGoodsIds.join())
      if (goodsKanjiaSetRes.code == 0) {
        res.data.forEach(ele => {
          const _process = goodsKanjiaSetRes.data.find(_set => {
            return _set.goodsId == ele.id
          })
          if (_process) {
            ele.process = 100 * _process.numberBuy / _process.number
          }
        })
        this.setData({
          kanjiaList: res.data
        })
      }  
    }
  },
  // 获取拼团购商列表
  pingtuanGoods() {
    const _this = this;
    WXAPI.goods({
      pingtuan: true
    }).then(res => {
      if (res.code === 0) {
        _this.setData({
          pingtuanList: res.data
        })
      }
    })
  },
  // 获取商品列表
  async getGoodsList(categoryId, append) {
    console.log(categoryId)
    if (categoryId == 0) {
      categoryId = '';
    }
    wx.showLoading({
      "mask": true
    })
    const res = await WXAPI.goods({
      categoryId: categoryId,
      nameLink: this.data.inputVal,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    })
    wx.hideLoading()
    if (res.code == 404 || res.code == 700) {
      let newData = {
        loadingMoreHidden: false
      }
      if (!append) {
        newData.goods = []
      }
      this.setData(newData);
      return
    }
    let goods = [];
    if (append) {
      goods = this.data.goods
    }
    for (var i = 0; i < res.data.length; i++) {
      goods.push(res.data[i]);
    }
    this.setData({
      loadingMoreHidden: true,
      goods: goods
    })
  },
  // 页面上拉触底事件
  onReachBottom: function () {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getGoodsList(this.data.activeCategoryId, true)
  },
  // 页面相关事件处理函数-监听用户下拉动作
  onPullDownRefresh: function () {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId)
    wx.stopPullDownRefresh()
  },
  // 爆品推荐-点击
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: '/pages/goods-details/index?id=' + e.currentTarget.dataset.id,
    })
  },
  // 轮播图-点击
  tapBanner: function (e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: url,
      })
    }
  }
})
