//四个模块统一引入
import role from './role'
import * as user from './user'
import permission from './permission'

//对外暴露
export default {
    role,
    user,
    permission
}