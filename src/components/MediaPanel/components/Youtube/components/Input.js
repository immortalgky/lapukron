import React from 'react'
import styled from 'styled-components'

const InputBar = styled.div`
  align-items: center;
  background-color: whitesmoke;
  border-radius: 2rem;
  color: grey;
  display: flex;
  margin: 0 auto;
  overflow: hidden;
  padding: 0 1rem;
  transition: 0.5s;

  :hover {
    box-shadow: 0 0 0 2px lightgrey;
  }
  :focus-within {
    background-color: white;
    box-shadow: 0 0 0 2px lightgrey;
  }
`

const Input = styled.input`
  background-color: transparent;
  border: none;
  font-size: 1rem;
  height: 15%;
  outline: none;
  padding: 1rem;
  width: 100%;
`

export default (props) => {
  return (
    <InputBar>
      <i className='far fa-search'/>
      <Input
        placeholder='Paste link or search'
        spellCheck='false'
        {...props}
      />
    </InputBar>
  )
}
