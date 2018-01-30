import React, { Component } from 'react'
import Wrapper from './Wrapper'
import Category from './Category'
import Post from '../Post'
import { CategoryText } from '../Category'
import { Text } from '../Text'

class Categories extends Component {
  renderTravelCategory = () => {
    const travels = ['1','2','3']
    return (
      travels.map((travel, idx) => {
        return <Post size={idx === 0 ? 'md' : 'sm'} underline={(idx+1) !== travels.length}/>
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
        </Category>

        <Category>
          <Text md>LATEST FROM</Text>
          <CategoryText hotel>HOTEL</CategoryText>
          {this.renderTravelCategory()}
        </Category>

        <Category>
          <Text md>LATEST FROM</Text>
          <CategoryText food>FOOD</CategoryText>
          {this.renderTravelCategory()}
        </Category>
        
        <Category>
          <Text md>LATEST FROM</Text>
          <CategoryText photo>PHOTO</CategoryText>
          {this.renderTravelCategory()}
        </Category>
      </Wrapper>
    )
  }
}

export default Categories