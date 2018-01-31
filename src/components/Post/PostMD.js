import React from 'react'
import Card from './Card'
import Image from './Image'
import Info from './Info'
import Title from './Title'
import Detail from './Detail'
import { HeaderWithLink } from '../Header'
import { Text, TextWithLink }  from '../Text'

const PostMD = ({ underline }) => (
  <Card underline={underline}>
    <Image style={{backgroundImage: 'url("https://source.unsplash.com/random")'}}/>
    <Info>
      <TextWithLink to='' md lighter>Gky <span>•</span> 18th October 17</TextWithLink>
    </Info>
    <Title>
      <HeaderWithLink to='' h3>Linux Server Essentials: Common Firewall Rules and Commands</HeaderWithLink>
    </Title>
    <Detail>
      <Text md lighter>This cheat sheet-style guide provides a quick reference to iptables commands that will create firewall rules are useful in common, everyday scenarios. This includes iptables examples of allowing and blocking various services by port,...</Text>
    </Detail>
    <TextWithLink to='' md bold>READ MORE</TextWithLink>
  </Card>
)

export default PostMD