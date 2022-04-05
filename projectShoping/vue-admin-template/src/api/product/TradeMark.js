import request from '@/utils/request'

//获取分页列表
export function getTradeMarkList(page, limit) {
    return request({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: 'get',
    })
}

