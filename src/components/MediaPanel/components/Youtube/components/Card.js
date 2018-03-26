import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-flow: row wrap;
  height: 30%;
  margin: 5px 0;
  width: 100%;
`
const Thumbnail = styled.div`
  background: url('${props => props.thumbnail}');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 40%;
`
const Description = styled.div`
  background-color: white;
  height: 100%;
  padding: 0.5rem;
  width: 60%;
`
const Header = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0;
`
const Detail = styled.p`
  font-size: 0.5rem;
  font-weight: ligther;
`

const Card = (props) => {
  const { thumbnail, title, description } = props

  return (
    <Wrapper>
      <Thumbnail
        thumbnail={thumbnail}
      />
      <Description
      >
        <Header>{title}</Header>
        <Detail>{description}</Detail>
      </Description>
    </Wrapper>
  )
}

export default Card