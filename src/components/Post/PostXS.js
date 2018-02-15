import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import Image from './Image'
import Info from './Info'
import Title from './Title'
import { HeaderWithLink } from '../Header'
import { TextWithLink }  from '../Text'

const Wrapper = styled.div`
  ${Card} {
    align-items: center;
    display: flex;
  }
  ${Image} {
    flex: 1 0 64px;
    height: 64px;
    padding: 0;
  }
  ${HeaderWithLink} {
    margin: 0;
  }
`

const Group = styled.div`
  margin-left: 1rem;
`

const PostXS = ({ underline }) => (
  <Wrapper>
  <Card underline={underline}>
    <Image style={{backgroundImage: 'url("https://source.unsplash.com/random")'}}/>
    <Group>
    <Title>
      <HeaderWithLink to='' h5>Linux Server Essentials: Common Firewall Rules and Commands</HeaderWithLink>
    </Title>
    <Info>
      <TextWithLink to='' sm lighter>Gky <span>•</span> 18th October 17</TextWithLink>
    </Info>
    </Group>
  </Card>
  </Wrapper>
)

export default PostXS