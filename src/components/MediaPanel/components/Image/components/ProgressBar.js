import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: lightgrey;
  border: 1px solid darkgrey;
  border-radius: 1rem;
  height: 15px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 95%;

  ::after {
    color: white;
    content: '75%';
    font-size: 0.7rem;
    font-weight: bold;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

const ProgressBar = styled.div`
  background-color: #25ba9d;
  border-radius: 1rem;
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: 75%;
`

export default (props) => {
  return (
    <Wrapper>
      <ProgressBar/>
    </Wrapper>
  )
}