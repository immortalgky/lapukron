import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 0;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`

class Portal extends Component {

  componentWillMount = () => {
    const body = document.querySelector('body')
    const div = document.createElement('div')
    div.setAttribute('id', 'unsplash-portal')
    body.appendChild(div)
  }

  componentWillUnmount = () => {
    const div = document.querySelector('#unsplash-portal')
    document.querySelector('body').removeChild(div)
  }

  handleOverlayOnClick = (e) => {
    if (e.target.dataset.overlay) {
      this.props.unsubscribe()
    }
  }

  render () {
    return (
      this.props.subscribe
      ?
        ReactDOM.createPortal(
            <Overlay
            data-overlay='true'
            onClick={this.handleOverlayOnClick}
            >
              {this.props.children}
            </Overlay>,
            document.querySelector('#unsplash-portal')
        )
      : null
    )
  }
}

export default Portal