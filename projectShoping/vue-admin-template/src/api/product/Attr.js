import request from '@/utils/request'

//平台属性管理模块

//获取1级选择菜单
export function GetCategorySelect1() {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get',
  })
}

//获取2级选择菜单
export function GetCategorySelect2(category1Id) {
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get',
  })
}

//获取3级选择菜单
export function GetCategorySelect3(category2Id) {
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get',
  })
}

//获取商品属性列表
export function GetShopTypeList(category1Id, category2Id, category3Id) {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

//新增属性
export function addAttribute(data) {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method:'post',
    data
  })
}

//删除
export function DeleteAttribute(attrId){
  return request({
    url:`/admin/product/deleteAttr/${attrId}`,
    method:'delete'
  })
}


