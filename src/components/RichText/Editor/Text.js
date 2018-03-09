import React, { Component } from 'react'
import ReactDom, { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import EditorState from '../EditorState'
import * as Helper from '../Helper'
import Sanitizer from 'sanitizer'

const Rectangle = styled.div`
  color: #444;
  font-size: 1.2rem;
  line-height: 2;
  outline: none;
`

class Text extends Component {

  componentDidMount = () => {    
    // Initial focus
    this.text.focus()
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
  }

  // focus = () => {
  //   const sel = window.getSelection()
  //   const nodeToBeFocused = document.querySelector(`#${this.props.id}`)

  //   if (nodeToBeFocused.firstChild) {
  //     sel.collapse(nodeToBeFocused.lastChild, nodeToBeFocused.lastChild.textContent.length)
  //   } else {
  //     nodeToBeFocused.focus()
  //   }
  // }

  onInput = () => {
    const { id, editorStates, onChange } = this.props
    const newEditorStates = EditorState.changeEditorState(editorStates, EditorState.createText(findDOMNode(this).innerHTML), 'CHANGE', Helper.getContentKey(id))
    onChange(newEditorStates)
  }

  onKeyDown = (e) => {
    const { id, editorStates, onChange } = this.props
    const caretOffset = window.getSelection().anchorOffset
    let newEditorStates

    // Enter without Shift
    if (e.which === 13 && !e.shiftKey) {
      
      //if (caretOffset > 0) {
        newEditorStates = EditorState.changeEditorState(editorStates, EditorState.createText(), 'ADD', Helper.getContentKey(id) + 1)
      //} else {
        //newEditorStates = EditorState.changeEditorState(editorStates, EditorState.createText(), 'ADD', Helper.getContentKey(id))
      //}
      onChange(newEditorStates)
      e.preventDefault()
    }

    // Delete
    if (e.which === 8 && caretOffset === 0) {
      newEditorStates = EditorState.changeEditorState(editorStates, null, 'REMOVE', Helper.getContentKey(id))
      onChange(newEditorStates)
    }
  }

  onBlur = (e) => {
    const { id, editorStates, editorState, onChange } = this.props

    if (editorState.tooltip && editorState.tooltip.show) {
      const newEditorStates = EditorState.hideTooltip(editorStates, Helper.getContentKey(id))
      onChange(newEditorStates)
    }

    if (this.props.editorState.html.length === 0) {
      const newEditorStates = EditorState.changeEditorState(editorStates, null, 'REMOVE', Helper.getContentKey(id))
      onChange(newEditorStates)
    }
  }

  onPaste = (e) => {
    const { id, editorStates, onChange } = this.props
    const caretPosition = window.getSelection().anchorOffset
    const existingData = this.props.editorState.html
    let pasteData = e.clipboardData.getData('Text')

    pasteData = existingData.substring(0, caretPosition) + Sanitizer.escape(pasteData) + existingData.substring(caretPosition)

    const newEditorStates = EditorState.changeEditorState(editorStates, EditorState.createText(pasteData), 'CHANGE', Helper.getContentKey(id))
    onChange(newEditorStates)

    e.preventDefault()
  }

  onMouseUp = (e) => {
    if (!window.getSelection().isCollapsed) {
      const { id, editorStates, onChange } = this.props
      const range = window.getSelection().getRangeAt(0).getBoundingClientRect()
      const newEditorStates = EditorState.showTextTooltip(editorStates, Helper.getContentKey(id), range.x + range.width/2 - 100, range.y - 40)
      
      onChange(newEditorStates)
    }
  }

  render () {
    const { editorState, read_only } = this.props
    console.log('render')
    return (
      <Rectangle
        id={this.props.id} 
        contentEditable={!read_only}
        spellCheck='false'
        dangerouslySetInnerHTML={{__html: editorState.html}}
        innerRef={c => this.text = c}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
        onPaste={this.onPaste}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}

export default Text