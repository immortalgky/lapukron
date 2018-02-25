import React, { Component } from 'react'
import styled from 'styled-components'
import ContentBlock from './ContentBlock'
import axios from 'axios'

class Editor extends Component {
  state = {
    read_only: this.props.read_only || false
  }

  render () {
    const { editorStates, onChange } = this.props
    const { read_only } = this.state

    return (
      <div id='content'>
        {editorStates.map((editorState, idx) => 
          <ContentBlock 
            key={idx}
            id={`item-${idx}`}
            editorState={editorState}
            editorStates={editorStates}
            read_only={read_only}
            onChange={onChange}
          />
        )}
      </div>
    )
  }
}

export default Editor