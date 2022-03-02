import { v4 as uuidv4 } from 'uuid';
//生成随机字符串且持久存储 如果当前local中已存在 则不在生成
export const Get_Uuid = () => {
    let uuid_token = localStorage.getItem('uuid_token');
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem('uuid_token', uuid_token);
    }
    return uuid_token

}