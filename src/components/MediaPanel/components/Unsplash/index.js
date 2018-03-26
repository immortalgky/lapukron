import React from 'react'
import Wrapper from './components/Wrapper'
import Input from './components/Input'
import Container from './components/Container'
import Card from './components/Card'

const state = 'UNSPLASH'
const label = 'Unsplash'
const button = <i className='fas fa-camera' style={{color: 'black'}}/>

const header = (
  <div>
    <i className='fas fa-camera' style={{color: 'black'}}/>
    Unsplash
  </div>
)

const body = (props, { photos }) => {
  return (
    <Wrapper>
      <Input/>
      <Container>
        {photos.length > 0 ? photos.map(p => <Card/>) : <div><i className='fas fa-camera fa-10x' style={{color: 'lightgrey'}}/></div>}
      </Container>
    </Wrapper>
  )
}

export default () => {
  return {
    state,
    label,
    button,
    header,
    body
  }
}