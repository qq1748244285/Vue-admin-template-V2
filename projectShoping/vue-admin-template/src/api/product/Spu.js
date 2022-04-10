import request from '@/utils/request'

export function reqPageSelectSpuList(page,limit,category3Id){
  return request({
    url:`/admin/product/${page}/${limit}`,
    params:{
      category3Id
    }
  })
}



export function reqbaseSaleAttrList(data) {
  return request({
    url: '/admin/product/baseSaleAttrList',
    data
  })
}
 