//统一管理Api接口  method不写 默认为get请求
import r from './request';

//三级联动接口
export const GetThreeList = () => r({ url: '/product/getBaseCategoryList' })