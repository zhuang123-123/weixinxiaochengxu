

/* eslint-disable */
// 小程序开发api接口工具包，https://github.com/gooking/wxapi
var API_BASE_URL = 'https://api.it120.cc';
var subDomain = 'tz';

var request = function request(url, needSubDomain, method, data) {
  var _url = API_BASE_URL + (needSubDomain ? '/' + subDomain : '') + url;
  return new Promise(function (resolve, reject) {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (request) {
        resolve(request.data)
      },
      fail: function fail (error) {
        reject(error);
      },
      complete: function complete (aaa) {
        // 加载完成
      }
    });
  });
};

/**
 * 小程序的promise没有finally方法，自己扩展
*/
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(function (value) {
    Promise.resolve(callback()).then(function () {
      return value;
    })
  }, function (reason) {
    Promise.resolve(callback()).then(function () {
      throw reason;
    })
  })
};


module.exports = {
  init2: function init2(a, b) {
    API_BASE_URL = a;
    subDomain = b;
  },
  init: function init(b) {
    subDomain = b;
  },
  request: request,
  banners: function banners(data) {
    return request('/banner/list', true, 'get', data)
  },
  // notice-swiper
  noticeList: function noticeList (data) {
    return request('/notice/list', true, 'post', data);
  },
  // category-list
  goodsCategory: function goodsCategory() {
    return request('/shop/goods/category/all', true, 'get');
  },
  // 爆品推荐 -- 分类页-商品列表获取
  goods: function goods (data) {
    return request('/shop/goods/list', true, 'post', data)
  },
  // 砍价商品列表
  kanjiaSet: function kanjiaSet (goodsId) {
    return request('/shop/goods/kanjia/set/v2', true, 'get', {goodsId: goodsId})
  },

  // 分类页-商品菜单列表获取
  goodsCategory: function goodsCategory() {
    return request('/shop/goods/category/all', true, 'get');
  },

  // tools.js
  shippingCarInfo: function shippingCarInfo (token) {
    return request('/shopping-cart/info', true, 'get', {
      token: token
    })
  },
  // pay.js
  wxpay: function wxpay(data) {
    return request('/pay/wx/wxapp', true, 'post', data)
  },
  // category.js-商品存到购物车功能
  shippingCarInfoAddItem: function shippingCarInfoAddItem (token, goods, number, sku) {
    return request('/shopping-cart/add', true, 'post', {
      token: token, goodsId: goodsId, number: number, sku: JSON.stringify(sku)
    })
  },
  // category.js
  goodsDetail: function goodsDetail(id) {
    return request('/shop/goods/detail', true, 'get', {
      id: id
    })
  },
  // goods-details
  goodsReputation: function goodsReputation(data) {
    return request('/shop/goods/reputation', true, 'post', data);
  },
  // goods-details
  goodsFavList: function goodsFavList(data) {
    return request('/shop/goods/fav/list', true, 'post', data);
  },
  goodsFavCheck: function goodsFavCheck (token, goodsId) {
    return request('/shop/goods/fav/check', true, 'get', {
      token: token,
      goodsId: goodsId
    })
  },
  goodsFavDelete: function goodsFavDelete(token) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var goodsId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    return request('/shop/goods/fav/delete', true, 'post', {
      token: token,
      id: id,
      goodsId: goodsId
    })
  },
  goodsFavPut: function goodsFavPut(token, goodsId) {
    return request('/shop/goods/fav/add', true, 'post', {
      token: token,
      goodsId: goodsId
    })
  },
  kanjiaDetail: function kanjiaDetail(kjia, joiner) {
    return request('/shop/goods/kanjia/info', true, 'get', {
      kjid: kjid,
      joiner: joiner
    });
  },
  kanjiaHelpDetail: function kanjiaHelpDetail(token, kjid, joiner) {
    return request('/shop/goods/kanjia/myHelp', true, 'get', {
      kjid: kjid,
      joinerUser: joiner,
      token: token
    })
  },
  shopSubdetail: function shopSubdetail(id) {
    return request('/shop/subshop/detail/v2', true, 'get', {id: id });
  },
  pingtuanOpen: function pingtuanOpen(token, goodsId) {
    return request('/shop/goods/pingtuan/open', true, 'post', {
      goodsId: goodsId,
      token: token
    })
  },
  pingtuanList: function pingtuanList (data) {
    return request('/shop/goods/pingtuan/list/v2', true, 'post', data);
  },
  videoDetail: function videoDetail (videoId) {
    return request('/media/video/detail', true, 'get', {
      videoId: videoId
    });
  },
  kanjiaJoin: function kanjiaJoin(token, kjid) {
    return request('/shop/goods/kanjia/join', true, 'post', {
      kjid: kjid,
      token: token
    });
  },
  kanjiaHelp: function kanjiaHelp(token, kJid, joiner) {
    var remark = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    return request('/shop/goods/kanjia/help', true, 'post', {
      kjid: kjid,
      joinerUser: joiner,
      token: token,
      remark: remark
    })
  },
  wxaQrcode: function wxaQrcode (data) {
    return request('/qrcode/wxa/unlimit', true, 'post', data);
  },
  goodsPrice: function goodsPrice (goodsId, propertyChildIds) {
    return request('/shop/goods/price', true, 'post', {
      goodsId: goodsId,
      propertyChildIds: propertyChildIds
    })
  },
  bindMobileWxa: function bindMobileWxa(token, encryptedData, iv) {
    var pwd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    return request('/user/wxapp/bindMobile', true, 'post', {
      token: token, encryptedData: encryptedData, iv: iv, pwd: pwd
    })
  },
  userDetail: function userDetail(token) {
    return request('/user/detail', true, 'get', {
      token: token
    })
  },
  userAmount: function userAmount(token) {
    return request('/user/amout', true, 'get', {
      token: token
    })
  },
  cashLogsV2: function cashLogsV2 (data) {
    return request('/user/cashLog/v2', true, 'post', data);
  },
  withDrawLogs: function withDrawLogs(data) {
    return request('/user/withDraw/list', true, 'post', data);
  },
  depositList: function depositList(data) {
    return request('/deposit/list', true, 'post', data);
  },
  withDrawApply: function withDrawApply(token, money) {
    return request('/user/withDraw/apply', true, 'post', {
      money: money,
      token: token
    })
  },
  orderClose: function orderClose (token, orderId) {
    return request('/order/close', true, 'post', {
      orderId: orderId,
      token: token
    })
  },
  orderPay: function orderPay (token, orderId) {
    return request('/order/pay', true, 'post', {
      orderId: orderId,
      token: token
    })
  },
  orderStatistics: function orderStatistics(token) {
    return request('/order/statistics', true, 'get', {
      token: token
    })
  },
  orderList: function orderList(data) {
    return request('/order/list', true, 'post', data);
  },
  province: function province() {
    return request('/common/region/v2/province', false, 'get');
  },
  nextRegion: function nextRegion(pid) {
    return request('/common/region/v2/child', false, 'get', {
      pid: pid
    })
  },
  updateAddress: function updateAddress(data) {
    return request('/user/shipping-address/update', true, 'post', data);
  },
  addAddress: function addAddress(data) {
    return request('/user/shipping-address/add', true, 'post', data)
  },
  deleteAddress: function deleteAddress (token, id) {
    return request('/user/shopping-address/delete', true, 'post', {
      id: id,
      token: token
    });
  },
  fetchCoupons: function fetchCoupons(data) {
    return request('/discounts/fetch', true, 'post', data)
  },
  myCoupons: function myCoupons(data) {
    return request('/discounts/my', true, 'get', data);
  },
  payDeposit: function payDeposit(data) {
    return request('/deposit/pay', true, 'post', data);
  },
  fxApply: function fxApply(token, name, mobile) {
    return request('/saleDistribution/apply', true, 'post', { token: token, name: name, mobile: mobile });
  },
  fxApplyProgress: function fxApplyProgress(token) {
    return request('/saleDistribution/apply/progress', true, 'get', { token: token });
  },
  fxCommisionLog: function fxCommisionLog (data) {
    return request('/saleDistribution/commision/log', true, 'post', data);
  },
  fxMembers: function fxMembers(data) {
    return request('/saleDistribution/members', true, 'post', data);
  },
  invoiceApply: function invoiceApply (data) {
    return request('/invoice/apply', true, 'post', data);
  },
  payBillDiscounts: function payBillDiscounts() {
    return request('/payBill/discounts', true, 'get');
  },
  payBill: function payBill(token, money) {
    return request('/payBill/pay', true, 'post', { token: token, money, money});
  },
  noticeDetail: function noticeDetail (id) {
    return request('/notice/detail', true, 'get', {
      id: id
    })
  },
  refundApplyDetail: function refundApplyDetail (token,orderId) {
    return request('/order/refundApply/info', true, 'get', {
      token: token,
      orderId: orderId
    })
  },
  refundApplyCancel: function refundApplyCancel (token, orderId) {
    return request('/order/refundApply/cancel', true, 'post', {
      token: token,
      orderId: orderId
    });
  },
  refundApply: function refundApply (data) {
    return request('/order/refundApply/apply', true, 'post', data);
  },
  orderDetail: function orderDetail (token, id) {
    var hxNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    return request('/order/detail', true, 'get', {
      id: id,
      token: token,
      hxNumber: hxNumber
    });
  },
  orderDelivery: function orderDelivery(token, orderId) {
    return request('/order/delivery', true, 'post', {
      orderId: orderId,
      token: token
    });
  },
  orderReputation: function orderReputation(data) {
    return request("/order/reputation", true, 'post', data);
  },
  orderHX: function orderHX(hxNumber) {
    return request('/order/hx', true, 'post', {
      hxNumber: hxNumber
    })
  },
  orderCreate: function orderCreate(data) {
    return request('/order/create', true, 'post', data);
  },
  shippingCarInfoRemoveAll: function shippingCarInfoRemoveAll (token) {
    return request('/shopping-cart/empty', true, 'post', {
      token: token
    })
  },
  defaultAddress: function defaultAddress (token) {
    return request('/user/shipping-address/default/v2', true, 'get', {
      token: token
    });
  }
}
