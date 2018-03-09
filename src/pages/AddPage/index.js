import React, { Component } from 'react'
import Wrapper from './Wrapper'
import {Editor, EditorState} from '../../components/PukronEditor/'

class AddPage extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  onChange = (editorState) => {
    this.setState({editorState})
  }

  render () {
    const { editorState } = this.state

    return (
      <Wrapper>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
        />
      </Wrapper>
    )
  }
}

export default AddPage