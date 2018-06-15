'use strict';
import React from 'react'
import { connect } from 'react-redux'
import './index.scss'
import {Icon} from 'antd';

@connect(state => ({
    commonloading: state.adminReducer.commonloading
}))

class Component extends React.Component {
  constructor(props) {
    super(props)

  }
  // _renderLoad(){
  //   let {loadStore} = this.props
  //   let loadStyle = style.loadHide
  //   if(loadStore.state){loadStyle =  style.loadShow}
  //   return loadStyle
  // }
  componentWillMount() {}
  render() {
    let {commonloading} = this.props


    // console.log('loadStore',this.props)
      return (
          <div className='loadingContainer'>
              <div className="loadingIcon">
                <Icon type='loading' style={{fontSize: 20}} />
              </div>
              <div className="loadingText">
                <span>加载中...</span>
              </div>
          </div>

      )
  }
}
export default Component
