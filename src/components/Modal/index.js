import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Wrapper from './Wrapper'

const modalRoot = document.getElementById('modal')

class Modal extends Component {
  el = document.createElement('div')

  componentDidMount () {
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount () {
    modalRoot.removeChild(this.el)
  }
  handleCloseModal = (e) => {
    if (e.target.dataset.area === 'background') {
      this.props.closeModal()
    }
  }
    render () {
    return ReactDOM.createPortal(
      <Wrapper data-area='background' onClick={this.handleCloseModal}>{this.props.children}</Wrapper>,
      this.el
    )
  }
}

export default Modal