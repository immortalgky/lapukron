import React, { Component } from 'react'
import Add from './Add'
import Editor from './Editor'

class RichText extends Component {
  state = {
    editorState: []
  }

  componentDidMount = () => {
    this.initialState()
  }

  createEditorState = ({type, html}) => {
    return {
      type: type || 'text',
      html: html || '',
    }
  }

  initialState = () => {
    const editorState = this.createEditorState({type: 'img', html: 'Cover here'})
    
    this.setEditorState(this.state.editorState.length + 1, editorState)
  }

  setEditorState = (idx, newEditorState, event) => {
    let editorState = this.state.editorState.slice()

    // Check index
    if (idx > editorState.length) {
      // If more than length -> add to last
      editorState = editorState.concat(newEditorState)
    } else {
      if (event === 'change') {
        // Change specific index
        editorState[idx] = newEditorState
      } else if (event === 'remove') {
        // or replace to specific index
        editorState.splice(idx, 1)
      } else {
        // or add to specific index
        editorState.splice(idx, 0, newEditorState)
      }
    }
    
    this.setState({editorState: editorState})
  }

  addNewNodeBefore = (idx, newState) => {
    this.setEditorState(idx, newState, 'add')
    this.setFocusNode(idx)
  }

  addNewNodeAfter = (idx, newState) => {
    this.setEditorState(idx + 1, newState, 'add')
    this.setFocusNode(idx + 1)
  }

  setFocusNode = (idx) => {
    setTimeout(() => {
      const sel = window.getSelection()
      const nodeToBeFocused = document.querySelector(`#item-${idx}`)
      
      if (nodeToBeFocused) {
        sel.collapse(nodeToBeFocused.firstChild, nodeToBeFocused.textContent.length)
        nodeToBeFocused.focus()
      }
    }, 100)
  }

  deleteNode = (idx) => {
    this.setEditorState(idx, {}, 'remove')
    this.setFocusNode(idx - 1)
  }

  render () {
    const { editorState } = this.state
    return (
      <div>
        {editorState.map((editorState, idx) => 
          <div key={idx} >
            <Editor 
              id={`item-${idx}`}
              editorState={editorState}
              setEditorState={this.setEditorState}
              addNewNodeBefore={this.addNewNodeBefore}
              addNewNodeAfter={this.addNewNodeAfter}
              setFocusNode={this.setFocusNode}
              deleteNode={this.deleteNode}
            />
            <Add/>
          </div>
        )}
      </div>
    )
  }
}

export default RichText