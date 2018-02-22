import React, { Component } from 'react'
import ReactDom, { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import * as Helper from './Helper'

const Rectangle = styled.div`
  color: #444;
  font-size: 1.2rem;
  line-height: 2;
  outline: none;
`

class Text extends Component {

  componentDidMount = () => {
    // Set text value
    // findDOMNode(this).textContent = this.props.editorState.html
    
    // Initial focus
    if (this.props.isFocused) {
      this.focus()
    }
  }

  shouldComponentUpdate = ({editorState, isFocused}) => {
    const isNotSameHTML = editorState.html !== findDOMNode(this).innerHTML
    const isNotSameFocus = isFocused !== this.props.isFocused

    return isNotSameHTML || isNotSameFocus
  }
  
  componentDidUpdate = ({editorState}) => {
    if (this.props.editorState.html !== findDOMNode(this).innerHTML) {
      findDOMNode(this).innerHTML = this.props.editorState.html
    }

    if (this.props.isFocused) {
      this.focus()
    }
  }

  focus = () => {
    const sel = window.getSelection()
    const nodeToBeFocused = document.querySelector(`#${this.props.id}`)

    if (nodeToBeFocused.firstChild) {
      sel.collapse(nodeToBeFocused.lastChild, nodeToBeFocused.lastChild.textContent.length)
    } else {
      nodeToBeFocused.focus()
    }
  }

  onInput = () => {
    this.props.setEditorState(this.props.getKey(), Helper.createEditorState({html: findDOMNode(this).innerHTML}), 'change')
  }

  onKeyDown = (e) => {
    const caretOffset = window.getSelection().anchorOffset
    // Enter without Shift
    if (e.which === 13 && !e.shiftKey) {
      
      if (caretOffset > 0) {
        this.props.addNewNodeAfter(this.props.getKey(), Helper.createEditorState({}))
      } else {
        this.props.addNewNodeBefore(this.props.getKey(), Helper.createEditorState({})) 
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

  onPaste = (e) => {
    const caretPosition = window.getSelection().anchorOffset
    const existingData = this.props.editorState.html
    let pasteData = e.clipboardData.getData('Text')

    pasteData = existingData.substring(0, caretPosition) + pasteData + existingData.substring(caretPosition)

    this.props.setEditorState(this.props.getKey(), Helper.createEditorState({html: pasteData}), 'change')
    e.preventDefault()
  }

  render () {
    const { editorState } = this.props
    return (
      <Rectangle
        id={this.props.id} 
        contentEditable='true'
        spellCheck='false'
        dangerouslySetInnerHTML={{__html: editorState.html}}
        innerRef={c => this.text = c}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
        onPaste={this.onPaste}
      />
    )
  }
}

export default Text