import React, { Component } from 'react'
import styled from 'styled-components'

const CoverImage = styled.div`
  background-color: lightgrey;
  height: 400px;

  &::before {
    align-items: center;
    color: grey;
    content: '\f083';
    display: flex;
    font-family: 'Font Awesome 5 Pro';
    font-size: 150px;
    font-weight: 900;
    height: 100%;
    justify-content: center;
  }
`

class Cover extends Component {
 
  componentDidMount = () => {
    this.refs.file.addEventListener('change', () => {
      
    })
  }

  onClick = () => {
    this.refs.file.click()
  }

  render () {
    return (
      <div>
        <CoverImage
          onClick={this.onClick}
        />
        <input ref='file' type='file' style={{display: 'none'}}/>
      </div>
    )
  }
}

export default Cover