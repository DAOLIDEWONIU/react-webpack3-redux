'use strict';
/**常量*/
export const CLICKTOLOGIN = 'CLICKTOLOGIN';
export const CLICKTOLOGINRES = 'CLICKTOLOGINRES';

/**ActionCreator*/
//登录
const clickToLogin = (loginData) => {
    return {
        type: CLICKTOLOGIN,
        loginData
    };
}
const clickToLoginRes = (clickToLoginInfo) => {
    return {
        type: CLICKTOLOGINRES,
        clickToLoginInfo
    };
}

export {
    clickToLogin,
    clickToLoginRes
}