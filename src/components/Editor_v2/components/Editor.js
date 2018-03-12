import React, { Component } from 'react'
import ContentBlock from './ContentBlock'
import EditorState from '../EditorState'
import '../Editor.css'


class Editor extends Component {

  onInput = (e) => {
    const { editorState, onChange } = this.props
    const sel = window.getSelection()
    const selNode = sel.anchorNode.parentNode
    const id = selNode.dataset.key
    const idx = editorState.blocks.findIndex(el => el.id === id)

    if (idx !== -1) {
      editorState.blocks[idx].text = selNode.textContent
      onChange(editorState)
    }
  }

  onKeyDown = (e) => {
    const { editorState, onChange } = this.props

    if (e.which === 13) {
      e.preventDefault()
      editorState.blocks.forEach(el => el.isSelected = false)

      editorState.blocks.push(EditorState.createEditorState())
      onChange(editorState)
    }

    if (e.which === 8) {
      //e.preventDefault()
      
     
    }
  }

  nextNode = (node) => {
    if (node.hasChildNodes()) {
      return node.firstChild
    } else {
      while (node && !node.nextSibling) {
        node = node.parentNode
      }
      if (!node) {
        return null
      }
      return node.nextSibling
    }
  }

  render () {
    const { editorState } = this.props
    
    return (
      <div
        id='editor'
        contentEditable='true'
        spellCheck='false'
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
      >
        {
          editorState.blocks.map((contentState, idx) => 
            <ContentBlock
              key={contentState.id}
              contentState={contentState}
            />
          )
        }
      </div>
    )
  }
}

export default Editor