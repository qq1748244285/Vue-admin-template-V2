//统一管理Api接口  method不写 默认为get请求
import r from './request';

//三级联动接口
export const GetThreeList = () => r({ url: '/product/getBaseCategoryList' })

//轮播图数据 from mock
export const GetBannerList = () => r({ url: '/banner' })

//floor数据 from mock
export const GetFloorList = () => r({ url: '/floor' });

//获取search数据 
export const GetSearchInfo = (data = {}) => r({ url: 'list', method: 'post', data })

//获取详情页商品数据
export const GetGoodsInfo = (skuid) => r({ url: `/item/${skuid}` })

//更新购物车产品
export const AddOrUpdateShopCart = (skuId, skuNum) => r({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表数据
export const GetCartList = () => r({ url: '/cart/cartList' });

//删除商品
export const DelGoods = (skuId) => r({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//更改商品选中状态
export const ChangeGoodsCheck = (skuId, isChecked) => r({ url: `/cart/checkCart/${skuId}/${isChecked}` })

//获取验证码
export const getCode = (phone) => r({ url: `/user/passport/sendCode/${phone}` });

//用户注册
export const registerUser = (data) => r({ url: '/user/passport/register', method: "post", data })

//用户登录
export const userLogin = (data) => r({ url: '/user/passport/login', method: 'post', data })

//自动登录
export const autoLogin = () => r({ url: '/user/passport/auth/getUserInfo' })

//退出登录
export const loginOut = () => r({ url: '/user/passport/logout' })

//获取用户收货地址
export const GetAddressInfo = () => r({ url: '/user/userAddress/auth/findUserAddressList' })

//获取商品清单
export const GetOrderInfo = () => r({ url: '/order/auth/trade' })

//提交订单
export const suBmitOrder = (tradeNo, data) => r({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })

//获取订单支付信息
export const GetPayInfo = (orderId => r({ url: `/payment/weixin/createNative/${orderId}` }))

//获取当前订单支付结果
export const GetPayStatus = (orderId) => r({ url: `/payment/weixin/queryPayStatus/${orderId}` });