import React, { Component } from 'react'
import styled from 'styled-components'

const Img = styled.img`
  background-color: lightgrey;
  height: auto;
  width: 100%;
`

class Image extends Component {
  render () {
    const { editorState } = this.props
    return (
      <Img 
        contentEditable
        src={editorState.html}
      />
    )
  }
}

export default Image