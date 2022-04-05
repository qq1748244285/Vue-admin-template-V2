import request from '@/utils/request'

//获取分页列表
export function getTradeMarkList(page, limit) {
    return request({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: 'get',
    })
}

//新增|修改 品牌
export function addOrUpdateTradeMark(data) {
    //传入id 则判断为修改品牌
    if (data.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data })
    }
}

//删除品牌
export function deleteTradeMark(id) {
    return request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
}

