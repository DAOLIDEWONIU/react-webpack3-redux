'use strict';

import {delay} from 'redux-saga'//takeLatest
import {takeLatest ,call, put} from 'redux-saga/effects';
import * as loginAction from '../../actions/login';
import fetch from '../../common/lib/fetch';
import history from '../../common/lib/history';
import { message } from 'antd'
const success = (info) => {
    message.success(info);
};
const error = (info) => {
    message.error(info)
};
/**work*/  
function* clickToLogin(action) {
    //正在登陆提示
    yield delay(1000);
    //验证是否成功登陆
    try {
        const data = yield call(fetch.post, '/index/portal/login', action.loginData);
        success(data.msg)
        yield put(loginAction.clickToLoginRes(data));
    }catch (e) {
        error(e.msg)
    }
}




/**watch*/
export default function* watchLoginAsync() {
    yield takeLatest(loginAction.CLICKTOLOGIN, clickToLogin);
}