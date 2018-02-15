import React, { Component } from 'react'
import styled from 'styled-components'
import Category from './Category'
import Post from '../../components/Post/'
import { CategoryText } from '../../components/Category'
import { Text } from '../../components/Text'
import { CircleButton } from '../../components/Button'

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 2rem;

  ${CircleButton} {
    align-self: center;
    font-size: 0.7rem;
  }

  @media only screen and (min-width: 320px) and (max-width: 480px) {
    padding: 1rem 0;
  } 
`

class Categories extends Component {
  renderTravelCategory = () => {
    const travels = ['1','2','3']
    return (
      travels.map((travel, idx) => {
        return <Post size={idx === 0 ? 'md' : 'xs'} underline={(idx+1) !== travels.length}/>
      })
    )
  }
  render () {
    return (
      <Wrapper>
        <Category>
          <Text md>LATEST FROM</Text>
          <CategoryText travel>TRAVEL</CategoryText>
          {this.renderTravelCategory()}
          <CircleButton to=''>MORE TRAVEL...</CircleButton>
        </Category>

        <Category>
          <Text md>LATEST FROM</Text>
          <CategoryText hotel>HOTEL</CategoryText>
          {this.renderTravelCategory()}
          <CircleButton to=''>MORE HOTEL...</CircleButton>
        </Category>

        <Category>
          <Text md>LATEST FROM</Text>
          <CategoryText food>FOOD</CategoryText>
          {this.renderTravelCategory()}
          <CircleButton to=''>MORE FOOD...</CircleButton>
        </Category>
        
        <Category>
          <Text md>LATEST FROM</Text>
          <CategoryText photo>PHOTO</CategoryText>
          {this.renderTravelCategory()}
          <CircleButton to=''>MORE PHOTO...</CircleButton>
        </Category>
      </Wrapper>
    )
  }
}

export default Categories