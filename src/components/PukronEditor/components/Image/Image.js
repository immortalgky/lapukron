import React, { Component } from 'react'
import styled from 'styled-components'
import { EditorState, SelectionState } from 'draft-js'
import MultiLineInput from '../../../MultiLineInput' 
import { setSelectedBlock } from '../../utils/setSelectedBlock'
import { isFocusedBlock } from '../../utils/isFocusedBlock'

const Img = styled.img.attrs({
  contentEditable: true,
  draggable: false
})`
  outline: none;
  width: 100%;

  &.isFocused {
    box-shadow: 0 0 0 3px salmon;
  }
`
const Caption = styled.div`
  display: flex;
  font-size: 0.9rem;
  font-weight: lighter;
  justify-content: center;
`

class Image extends Component {
  state = {
    isFocused: false
  }
  componentDidMount = () => {
    this.props.store.register('editorState', this.handleOnEditorStateChanged)
  }

  componentWillUnmount = () => {
    this.props.store.unregister('editorState', this.handleOnEditorStateChanged)
  }

  handleOnEditorStateChanged = () => {
    if (isFocusedBlock(this.props.store.get('editorState'), this.props.block.getKey())) {
      this.setState({ isFocused: true })
    } else {
      this.setState({ isFocused: false })
    }
  }

  onClick = (e) => {
    e.preventDefault()
    this.props.blockProps.setEditorState(setSelectedBlock(this.props.blockProps.getEditorState(), this.props.block.key))
  }

  render () {
    return ( 
      <div >
        <Img
          data-offset-key={this.props.offsetKey}
          src={this.props.src}
          onClick={this.onClick}
          className={ this.state.isFocused ? 'isFocused' : '' }
        />
      </div>
    )
  }
}

export default Image