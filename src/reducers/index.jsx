'use strict';
import { combineReducers } from 'redux';// 利用combineReducers 合并reducers
import loginReducer from './login';

export default combineReducers({
    loginReducer
});