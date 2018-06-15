/**
 * Created by Administrator on 2017-10-09.
 */
'use strict';
import * as loginAction from '../../actions/login';

const initialState = {
    clickToLoginInfo: null,//登录结果

};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginAction.CLICKTOLOGINRES:
            return {
                ...state,
                clickToLoginInfo: action.clickToLoginInfo,
            };
        default:
            return state;
    }
};


export default loginReducer;