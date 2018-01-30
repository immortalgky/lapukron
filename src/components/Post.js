import React from 'react'
import styled from 'styled-components'
import Image from './Image'
import { Category } from './Category'
import { Header, HeaderWithLink } from './Header'
import { Text, TextWithLink } from './Text'
import { Button } from './Button'

const Wrapper = styled.div`
`
const Card = styled.div`
  color: grey;
  padding: 1rem 0;
  ${props => props.underline === true && `
    border-bottom: 1px solid lightgrey;
  `}
  ${props => props.size === 'sm' && `
    align-items: center;
    display: flex;
    flex-flow: row wrap;
  `}
  ${Wrapper} {
    flex: 1;
    margin-left: 1rem;
  }
`
const Head = styled.div`
  color: black;
`
const Detail = styled.div`
  
`
const Info = styled.div`
  color: darkgrey;
  span {
    color: #EEE;
    font-size: 9px;
  }
`

const Post = (props) => {
  const { size, underline, _id, photoURL, title, detail } = props
  return (
    <div>
      {size === 'lg' &&
        <Card size={size} underline={underline}>
          <Category size='1rem' travel>TRAVEL</Category>
          <Head>
            <HeaderWithLink to='' h3>Linux Server Essentials: Common Firewall Rules and Commands</HeaderWithLink>
          </Head>
          <Info>
            <TextWithLink to='' md lighter>Gky <span>•</span> 18th October 17</TextWithLink>
          </Info>
          <Image style={{backgroundImage: 'url("https://source.unsplash.com/random")'}}/>
          <Detail>
            <Text md lighter>This cheat sheet-style guide provides a quick reference to iptables commands that will create firewall rules are useful in common, everyday scenarios. This includes iptables examples of allowing and blocking various services by port,...</Text>
          </Detail>
        </Card>
      }
      {size === 'md' &&
        <Card size={size} underline={underline}>
          <Image style={{backgroundImage: 'url("https://source.unsplash.com/random")'}}/>
          <Info>
            <TextWithLink to='' md lighter>Gky <span>•</span> 18th October 17</TextWithLink>
          </Info>
          <Head>
            <HeaderWithLink to='' h3>Linux Server Essentials: Common Firewall Rules and Commands</HeaderWithLink>
          </Head>
          <Detail>
            <Text md lighter>This cheat sheet-style guide provides a quick reference to iptables commands that will create firewall rules are useful in common, everyday scenarios. This includes iptables examples of allowing and blocking various services by port,...</Text>
          </Detail>
          <TextWithLink to='' md bold>READ MORE</TextWithLink>
        </Card>
      }
      {size === 'sm' &&
        <Card size={size} underline={underline}>
          <Image width='64px' style={{backgroundImage: 'url("https://source.unsplash.com/random")'}}/>
          <Wrapper>
            <Head>
              <HeaderWithLink to='' h5>Linux Server Essentials: Common Firewall Rules and Commands</HeaderWithLink>
            </Head>
          </Wrapper>
        </Card>
      }
    </div>
  )
}

export default Post