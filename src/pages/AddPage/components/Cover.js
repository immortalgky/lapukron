import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: whitesmoke;
  height: 100vh;
  margin-left: -21.43%;
  margin-right: -21.43%;
  overflow: hidden;
  position: relative;
`
const CoverPhoto = styled.div`
  background: url('https://source.unsplash.com/1600x900/?nature');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: 0;
  position: relative;
  top: 0;
  width: 100%;
`
const Gradient = styled.div`
  background-image: linear-gradient(-136deg, rgba(32, 34, 37, 0) 0, rgba(24, 26, 28, .13) 13%, #101113 100%);
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
`

class Cover extends Component {
  render () {
    return (
      <Wrapper>
        <CoverPhoto
          draggable={false}
          innerRef={c => this.cover = c}
        />
        <Gradient/>
        <input type='file' ref='file' style={{display: 'none'}}/>
      </Wrapper>
    )
  }
}

export default Cover