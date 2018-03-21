import React from 'react'
import styled from 'styled-components'

const Textarea = styled.textarea.attrs({
  maxLength: 80,
  placeholder: 'Title',
  rows: 1,
  spellCheck: false
})`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  overflow: hidden;
  outline: none;
  resize: none;
  width: 60%;
  word-break: break-word;
  word-wrap: break-word;

  ::placeholder {
    color: whitesmoke;
  }

  &:focus::placeholder {
    color: lightgrey;
  }
`
const Title = (props) => {
  return (
    <Textarea
      id='textarea'
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      {...props}
    />
  )
}

const handleOnChange = (e) => {
  resize(e.target)
}

const handleOnKeyDown = (e) => {
  if (e.which === 13) {
    if (lineNumber(e.target.value) + 1 > e.target.rows) {
      return e.preventDefault()
    }
  }
}

const lineNumber = (value) => {
  return value.split(/\r*\n/).length
}

const resize = (element) => {
  element.style.height = 'auto'
  element.style.height = `${element.scrollHeight}px`
}

export default Title