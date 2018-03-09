import React, { Component } from 'react'
import Wrapper from './Wrapper'
import { EditorState, Editor } from '../../components/RichText/'
import axios from 'axios'
import Editor_new from '../../components/Editor_v2/components/Editor'

class AddPage extends Component {
  state = {
    editorStates: EditorState.createInitialState()
  }

  onChange = (editorState) => {
    this.setState({editorStates: editorState})
  }

  onSave = () => {
    console.log('save')
    axios({
      method: 'post',
      url: 'http://localhost:3001/pukron',
      data: {
        photoURL: this.state.editorStates[1].html,
        title: this.state.editorStates[0].html,
        author: 'Gky',
        detail: JSON.stringify(this.state.editorStates),
        detailHTML: 'TEST'
      }
    })
      .then(() => {  })
      .catch()
  }

  render () {
    const { editorStates } = this.state
    return <Wrapper><Editor_new/></Wrapper>
    return (
      <Wrapper>
        <div onClick={this.onSave}>
          <i class="fal fa-save"/>
        </div>
        <Editor 
          editorStates={editorStates}
          onChange={this.onChange}
        />
      </Wrapper>
    )
  }
}

export default AddPage