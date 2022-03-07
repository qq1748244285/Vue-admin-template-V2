export const GetToken = () => {
    return localStorage.getItem('TOKEN');
}

export const SetToken = (token) => {
    localStorage.setItem('TOKEN', token);
}

export const RemoveToken = ()=>{
    localStorage.removeItem('TOKEN');
}