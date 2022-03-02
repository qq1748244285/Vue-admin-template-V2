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
export const ChangeGoodsCheck = (skuId, isChecked) => r({ url: `/cart/checkCart/${skuId}/${isChecked}`})