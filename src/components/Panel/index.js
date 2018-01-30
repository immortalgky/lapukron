import React from 'react'
import Wrapper from './Wrapper'
import Gradient from './Gradient'
import Detail from './Detail'
import { Category } from '../Category'
import { Text } from '../Text'
import { HeaderWithLink } from '../Header'

const Panel = (props) => {
  const { content } = props
  if (!content) {
    return <div>Loading...</div>
  }
  return (
    <Wrapper background={content.photoURL} className={props.className}>
      <Gradient/>
      <Detail>
        <Category travel>TRAVEL</Category>
        <HeaderWithLink to=''>{content.title}</HeaderWithLink>
        <Text lighter>{content.detail.substring(0, 200)}...</Text>
      </Detail>
    </Wrapper>
  )
}

export default Panel