import React, { Component } from 'react'
import styled from 'styled-components'
import Wrapper from './Wrapper'
import { EditorState, Editor } from '../../components/RichText/'
import { getAllContents } from '../../api/APIClient'

class Post extends Component {
  state = {
    editorStates: []
  }

  componentWillMount = () => {
    getAllContents()
    .then(response => { this.setState(prevState => ({editorStates: prevState.editorStates.concat(JSON.parse(response.data[0].detail))})) })
    .catch(err => { throw err })
  }

  render () {
    const { editorStates } = this.state
    return (
      <Wrapper>
        {
          editorStates[0] 
            ? <Editor 
                editorStates={editorStates} 
                read_only='true'
              /> 
            : <div>Loading...</div>
        }
      </Wrapper>
    )
  }
}

export default Post