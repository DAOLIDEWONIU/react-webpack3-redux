'use strict'
import React from 'react'
import './index.scss'
class Error extends React.Component {
  constructor(props) {
    super(props)
    this._handleBack = this._handleBack .bind(this)
    this._handleRef = this._handleRef .bind(this)
  }
  _handleBack(){
    let {history} = this.props
    history.goBack()
  }
  _handleRef(){
    window.location.reload()
  }
  _renderBtn(){
    let error = this.props.error || 404
    if(error == 101){
      return (
        <div className='backButton' onClick={this._handleRef}>刷新</div>
      )
    }
  }
  render() {
    let text = this.props.text || "404找不到页面"
    console.log('.text 页面错误', this.props)
    return (
        <div className='errorBox'>
          <div className='ErrorText'>{text}</div>
          <div className='ErrorButton'>
            <div className='backButton' onClick={this._handleBack}>返回上一页</div>
            {this._renderBtn()}
          </div>
        </div>
    )
  }
}

export default Error
