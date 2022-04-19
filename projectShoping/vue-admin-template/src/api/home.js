import request from '@/utils/request'

export function getChartsList() {
  return request({
    url: '/dev-api/home/list',
    method: 'get',
  })
}