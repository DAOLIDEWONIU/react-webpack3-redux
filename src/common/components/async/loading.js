'use strict'
import React from 'react';
import { connect } from 'react-redux';
import './index.scss'
import { Icon } from 'antd';
class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

  render() {
    return (
        <div>
            <div className="showbox">
                <div className="loader">
                    <svg className="circular" viewBox="25 25 50 50">
                        <circle className="path" cx="50" cy="50" r="11" fill="none" strokeWidth="3" strokeMiterlimit="10"/>
                    </svg>
                </div>
            </div>
            <div className="loadingOut">
                <div className="loadingIcon">
                    <Icon type="loading" style={{ fontSize: 46, color: '#08c' }}/>
                </div>
                <div className="loadingText">
                    <span>加载中...</span>
                </div>
            </div>
        </div>

    )
  }
} 

export default Loading;
