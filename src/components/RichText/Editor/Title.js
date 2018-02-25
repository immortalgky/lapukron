import React, { Component } from 'react'
import styled from 'styled-components'
import EditorState from '../EditorState'
import * as Helper from '../Helper'

const Wrapper = styled.div`
  margin: 1rem 0;
`

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Title',
  maxLength: 100    
})`
  border: none;
  color: #222;
  font-size: 3rem;
  outline: none;
  text-align: center;
  width: 100%;
`

const Counter = styled.div`
  font-size: 0.7rem;
  text-align: right;
  ${props => !props.show && `
    display: none;
  `}
`

class Title extends Component {
  state = {
    length: 0,
    max: 100
  }

  onChange = (e) => {
    const { id, editorStates, onChange } = this.props

    this.setState({length: e.target.value.length})

    const newEditorStates = EditorState.changeEditorState(editorStates, EditorState.createTitle(e.target.value), 'CHANGE', Helper.getContentKey(id))
    onChange(newEditorStates) 
  }

  render () {
    const { length, max } = this.state
    const { read_only } = this.props

    return (
      <Wrapper>
        <Input onChange={this.onChange} value={this.props.editorState.html} readOnly={read_only}/>
        <Counter show={!read_only} style={{color: length === 100 ? 'red' : 'inherit'}}>
          {length} / {max}
        </Counter>
      </Wrapper>
    )
  }
}

export default Title