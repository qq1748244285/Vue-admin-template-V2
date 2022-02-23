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
