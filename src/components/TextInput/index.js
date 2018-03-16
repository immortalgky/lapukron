import React from 'react'
import Wrapper from './Wrapper'
import Addon from './Addon'
import Input from './Input'

export const TextInput = (props) => (
  <Input standard type={props.type} placeholder={props.placeholder} size={props.size}/>
)

export const TextInputCenter = (props) => (
  <Input standard center type={props.type} placeholder={props.placeholder} size={props.size}/>
)

export const TextInputWithAddon = (props) => (
  <Wrapper>
    <Addon>{props.children}</Addon>
    <Input type={props.type} placeholder={props.placeholder} size={props.size} onChange={props.onChange} value={props.value}/>
  </Wrapper>
)
