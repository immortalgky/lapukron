import React, { Component } from 'react'
import Editor from './Editor'
import EditorState from '../EditorState'

class AddPage extends Component {
  state = {
    editorState: {
      blocks: [EditorState.createEditorState()]
    }
  }

  onChange = (editorState) => {
    this.setState({editorState: editorState})
  }

  render () {
    const { editorState } = this.state

    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
      />
    )
  }
}

export default AddPage