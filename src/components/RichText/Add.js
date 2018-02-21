import React, { Component } from 'react'
import styled from 'styled-components'

const Circle = styled.div`
  align-items: center;
  border: 1px solid grey;
  border-radius: 50%;
  display: flex;
  height: 20px;
  justify-content: center;
  margin-top: 5px;
  width: 20px;

  &::before {
    content: '+';
  }
`

class Add extends Component {
  render () {
    return (
      <Circle/>
    )
  }
}

export default Add