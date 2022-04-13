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

//修改添加Spu 通过是否携带id区分
export function reqAddOrUpdateSpu(data) {
    if (data.id) {
        return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data })
    } else {
        return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data })
    }
}

//删除Spu
export function deleteSpu(spuId) { return request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' }) }