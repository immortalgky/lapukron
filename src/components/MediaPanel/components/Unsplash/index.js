import React from 'react'
import Input from './components/Input'

const state = 'UNSPLASH'
const label = 'Unsplash'
const button = <i className='fas fa-camera' style={{color: 'black'}}/>

const header = (
  <div>
    <i className='fas fa-camera' style={{color: 'black'}}/>
    Unsplash
  </div>
)

const body = (props, state) => {
  return (
    <div>
      <Input/>
    </div>
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