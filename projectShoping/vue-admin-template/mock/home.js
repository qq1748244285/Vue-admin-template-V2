const Mock = require('mockjs')
const data = require('./data.json');


module.exports = [
    {
        url: '/dev-api/home/list',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data
            }
        }
    }
]
