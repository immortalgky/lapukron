import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: #222;
  display: flex;
  height: 400px;
  margin-top: 5rem;
`
const Left = styled.div`
  flex: 1;
`
const Center = styled.div`
  flex: 1;
`
const Right = styled.div`
  flex: 1;
`

const Footer = (props) => {
  return (
    <Wrapper>
      <Left></Left>
      <Center></Center>
      <Right></Right>
    </Wrapper>
  )
}

export default Footer