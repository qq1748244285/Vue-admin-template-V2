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