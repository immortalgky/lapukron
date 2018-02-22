import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Editor from './Editor'

const Content = styled.div`
  padding-top: 3rem;
`

const Topbar = styled.div`
  background-color: white;
  box-shadow: 1px 0 5px 1px lightgrey;
  height: 40px;
  left: 0;
  position: fixed;
  right: 0;
`

class RichText extends Component {
  state = {
    editorState: [
      // Title
      {type: 'title', html: ''},
      // Cover
      {type: 'image', html: ''}
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

  onSave = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/pukron',
      data: {
        photoURL: this.state.editorState[1].html,
        title: this.state.editorState[0].html,
        author: 'Gky',
        detail: 'detail',
        detailHTML: document.querySelector('#content').innerHTML
      }
    })
      .then(() => {  })
      .catch()
  }

  render () {
    const { editorState, focusedNode } = this.state
    return (
      <div>
        <Topbar>
          <div onClick={this.onSave}>
            <i className="fal fa-save"/>
          </div>
        </Topbar>
        <Content ref='content' id='content'>
          {editorState.map((editorState, idx) => 
            <Editor 
              key={idx}
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
        </Content>
      </div>
    )
  }
}

export default RichText