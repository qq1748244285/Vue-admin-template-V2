import request from '@/utils/request'

//获取Spu列表
export function reqPageSelectSpuList(page, limit, category3Id) { return request({ url: `/admin/product/${page}/${limit}`, params: { category3Id } }) }

//获取Spu信息
export function reqSpuInfo(spuId) { return request({ url: `/admin/product/getSpuById/${spuId}` }) }

//获取Spu品牌的信息
export function reqTradeMarkList() { return request({ url: `/admin/product/baseTrademark/getTrademarkList` }) }

//获取Sku图片
export function reqSpuImageList(spuId) { return request({ url: `/admin/product/spuImageList/${spuId}` }) }

//获取销售信息
export function reqSellSelectList() { return request({ url: `/admin/product/baseSaleAttrList` }) }