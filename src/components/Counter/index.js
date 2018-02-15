import React from 'react'
import Wrapper from './Wrapper'
import Category from './Category'
import Badge from './Badge'

const categories = ['Travel', 'Hotel', 'Food', 'Photo']

const CategoryCounter = (props) => {
  return (
    <Wrapper>
      {categories.map((category, idx) => <Category>{category}<Badge>5</Badge></Category>)}
    </Wrapper>
  )
}

export default CategoryCounter