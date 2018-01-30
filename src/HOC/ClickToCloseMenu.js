import React, { Component } from 'react'
import styled from 'styled-components'

const Background = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 99;
`
const ClickToCloseMenu = (Wrapcomponent) => {
  return class extends Component {
    closeMenu = (e) => {
      if (e.target.dataset.area === 'background') {
        this.props.closeMenu()
      }
    }
    render () {
      return (
        <Background data-area='background' onClick={this.closeMenu}>
          {this.props.bottom ? <Wrapcomponent bottom>{this.props.children}</Wrapcomponent> : <Wrapcomponent top>{this.props.children}</Wrapcomponent>}
        </Background>
      )
    }
  }
}

export default ClickToCloseMenu