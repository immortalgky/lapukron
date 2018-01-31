import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import Image from './Image'
import Info from './Info'
import Title from './Title'
import Detail from './Detail'
import { Category } from '../Category'
import { HeaderWithLink } from '../Header'
import { Text, TextWithLink }  from '../Text'
import { SocialButton, CircleButton } from '../Button'

const Footer = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  justify-content: space-between;
  margin-top: 5%;
`

const Group = styled.div`
  display: flex;
  ${SocialButton} {
    margin-left: 1rem;
    transform: scale(1.5);
  }
`

const PostLG = ({ underline }) => (
  <Card underline={underline}>
    <Category size='1rem' food>FOOD</Category>
    <Title>
      <HeaderWithLink to='' h1>Linux Server Essentials: Common Firewall Rules and Commands</HeaderWithLink>
    </Title>
    <Info>
      <TextWithLink to='' md lighter>Gky <span>•</span> 18th October 17</TextWithLink>
    </Info>
    <Image style={{backgroundImage: 'url("https://source.unsplash.com/random")'}}/>
    <Detail>
      <Text lg lighter>This cheat sheet-style guide provides a quick reference to iptables commands that will create firewall rules are useful in common, everyday scenarios. This includes iptables examples of allowing and blocking various services by port,...</Text>
    </Detail>
    <Footer>
      <CircleButton to=''>READ MORE</CircleButton>
      <Group>
        <SocialButton facebook bg to=''/>
        <SocialButton google bg to=''/>
        <SocialButton twitter bg to=''/>
      </Group>
    </Footer>
  </Card>
)

export default PostLG