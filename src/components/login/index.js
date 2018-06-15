'use strict'
import React from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import Form from './form'
import PropTypes from 'prop-types';

import './index.scss'
import { clickToLogin } from '../../actions/login';


@connect(state => ({
    clickToLoginInfo: state.loginReducer.clickToLoginInfo,
}), (dispatch => ({
    clickToLogin: (moblie, password) => {
        dispatch(clickToLogin(moblie, password))
    }
})))

class Login extends React.Component {
    //数据类型检测
    static propTypes = {
        clickToLoginInfo: PropTypes.object
    };
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {

    }

    render() {
        const { clickToLoginInfo, clickToLogin } = this.props;

        console.log('数据结果为', clickToLoginInfo)


        return (
            <div className="loginOut">
                <div className='formOut'>
                    <Form loginHandle={clickToLogin} />
                </div>
            </div>
        )
    }
}

export default Login;

