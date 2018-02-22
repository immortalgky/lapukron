import React, { Component } from 'react'
import styled from 'styled-components'
import * as Helper from './Helper'

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
`

class Title extends Component {
  state = {
    length: 0,
    max: 100
  }

  onChange = (e) => {
    this.props.setEditorState(this.props.getKey(), Helper.createEditorState({type: 'title', html: e.target.value}), 'change')
    this.setState({length: e.target.value.length})
  }

  render () {
    const { length, max } = this.state
    return (
      <Wrapper>
        <Input onChange={this.onChange} value={this.props.editorState.html}/>
        <Counter style={{color: length === 100 ? 'red' : 'inherit'}}>
          {length} / {max}
        </Counter>
      </Wrapper>
    )
  }
}

export default Title