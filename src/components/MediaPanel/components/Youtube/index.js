import React from 'react'
import Input from './components/Input'

const state = 'YOUTUBE'
const label = 'YouTube'
const button = <i className='fab fa-youtube' style={{color: 'red'}}/>

const header = (
  <div>
    <i className='fab fa-youtube' style={{color: 'red'}}/>
    YouTube
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