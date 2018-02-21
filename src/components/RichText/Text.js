import React, { Component } from 'react'
import ReactDom, { findDOMNode } from 'react-dom'
import styled from 'styled-components'

const Rectangle = styled.div`
  outline: none;
`

class Text extends Component {

  shouldComponentUpdate = ({editorState}) => {
    return editorState.html !== findDOMNode(this).innerHTML
  }

  componentDidUpdate = ({editorState}) => {
    if (this.props.editorState.html !== findDOMNode(this).innerHTML) {
      findDOMNode(this).innerHTML = this.props.editorState.html
    }
  }

  onInput = () => {
    this.props.setEditorState(this.props.getKey(), {type: 'text', html: findDOMNode(this).innerHTML}, 'change')
  }

  onKeyDown = (e) => {
    const caretOffset = window.getSelection().anchorOffset
    // Enter without Shift
    if (e.which === 13 && !e.shiftKey) {
      
      if (caretOffset > 0) {
        this.props.addNewNodeAfter(this.props.getKey(), {type: 'text', html: ''})
      } else {
        this.props.addNewNodeBefore(this.props.getKey(), {type: 'text', html: ''}) 
      }
    
      e.preventDefault()
    }

    // Delete
    if (e.which === 8 && caretOffset === 0) {
      this.props.deleteNode(this.props.getKey())
    }

    // Up
    if (e.which === 38) {
      this.props.setFocusNode(this.props.getKey() - 1)
      e.preventDefault()
    }
    // Down
    if (e.which === 40) {
      this.props.setFocusNode(this.props.getKey() + 1)
      e.preventDefault()
    }
  }

  onBlur = () => {
    if (this.props.editorState.html.length === 0) {
      this.props.deleteNode(this.props.getKey())
    }
  }

  render () {
    const { editorState } = this.props
    return (
      <Rectangle
        id={this.props.id} 
        contentEditable='true'
        dangerouslySetInnerHTML={{__html: editorState.html}}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
      />
    )
  }
}

export default Text