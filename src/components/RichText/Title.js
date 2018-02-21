import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 1rem 0;
`

const Input = styled.input.attrs({
  type: 'text',
  placeholder: 'Title',
  maxlength: 100    
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
    title: '',
    length: 0,
    max: 100
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log(nextState)
  }

  onChange = (e) => {
    this.setState({title: e.target.value, length: e.target.value.length})
  }

  render () {
    const { title, length, max } = this.state
    return (
      <Wrapper>
        <Input onChange={this.onChange} value={title}/>
        <Counter style={{color: length === 100 ? 'red' : 'inherit'}}>
          {length} / {max}
        </Counter>
      </Wrapper>
    )
  }
}

export default Title