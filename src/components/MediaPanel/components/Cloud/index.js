import React from 'react'
import Input from './components/Input'
import Button from './components/Button'


const state = 'CLOUD'
const button = <i className='fas fa-cloud' style={{color: '#1cb3e2'}}/>
const label = 'Cloud'

const header = (
  <div>
    <i className='fas fa-cloud' style={{color: '#1cb3e2'}}/>
    Cloud
  </div>
)

const body = (props, state) => {
  return (
    <div>
      <div style={{margin: '2rem 0'}}>
        <Input/>
      </div>
      <div style={{margin: '2rem 0'}}>
        <Button>OK</Button>
      </div>
    </div>
  )
}

export default () => {
  return {
    state,
    button,
    label,
    header,
    body
  }
}