import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.p`
  outline: none;
  &:empty::before {
    color: #777;
    content: attr(data-placeholder);
  }
`

class Text extends Component {
  componentDidMount = () => {
    if (this.props.focus) {
      this.text.focus()
    }
  }
  handleOnFocus = () => {
    this.props.setFocus(this.props.id)
  }
  render () {
    return (
      <Container innerRef={c => this.text = c} contentEditable {...this.props} onFocus={this.handleOnFocus}/>
    )
  }
}

export default Text