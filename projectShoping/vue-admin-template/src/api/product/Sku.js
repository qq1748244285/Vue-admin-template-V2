import request from '@/utils/request'

//获取图片
export function reqImageList(spuId) {
  return request({ url: `/admin/product/spuImageList/${spuId}` })
}

export function reqSaleList(spuId) {
  return request({ url: `/admin/product/spuSaleAttrList/${spuId}` })
}

export function reqProductInfo(category1Id, category2Id, category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  })
}

//保存sku
export function saveAddSkuInfo(data) {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: 'post',
    data
  })
}

//查看Sku列表 dialog
export function getSkuList(spuId) {
  return request({
    url: `/admin/product/findBySpuId/${spuId}`
  })
}

//获取Sku列表 
export function reqSkuListTable(page, limit) {
  return request({
    url: `/admin/product/list/${page}/${limit}`
  })
}

//更改商品上下架状态
export function ChangeSaleState(skuId, type) {
  if (type) {
    return request({ url: `/admin/product/onSale/${skuId}` })
  } else {
    return request({ url: `/admin/product/cancelSale/${skuId}` })
  }
}

//获得Sku详情
export function reqSkuInfo(skuId) {
  return request({
    url: `/admin/product/getSkuById/${skuId}`
  })
}