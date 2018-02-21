import React, { Component } from 'react'
import Title from './Title'
import Editor from './Editor'

class RichText extends Component {
  state = {
    editorState: [
      {type: 'cover', html: 'Cover here'},
      {type: 'text', html: ''}
    ],
    focusedNode: 1
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

  setFocusNode = (idx) => {
    this.setState({focusedNode: idx})
  }

  addNewNodeBefore = (idx, newState) => {
    this.setEditorState(idx, newState, 'add')
    this.setFocusNode(idx)
  }

  addNewNodeAfter = (idx, newState) => {
    this.setEditorState(idx + 1, newState, 'add')
    this.setFocusNode(idx + 1)
  }

  deleteNode = (idx) => {
    this.setEditorState(idx, {}, 'remove')
    this.setFocusNode(idx - 1)
  }

  render () {
    const { editorState, focusedNode } = this.state
    return (
      <div>
        <Title/>
        {editorState.map((editorState, idx) => 
          <Editor 
            id={`item-${idx}`}
            editorState={editorState}
            isFocused={idx === focusedNode}
            setEditorState={this.setEditorState}
            addNewNodeBefore={this.addNewNodeBefore}
            addNewNodeAfter={this.addNewNodeAfter}
            setFocusNode={this.setFocusNode}
            deleteNode={this.deleteNode}
          />
        )}
      </div>
    )
  }
}

export default RichText