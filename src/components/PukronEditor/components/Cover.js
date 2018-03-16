import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: whitesmoke;
  cursor: move;
  height: 50vh;
  margin-left: -21.43%;
  margin-right: -21.43%;
  overflow: hidden;
  position: relative;
  top: -40px;
`

const CoverPhoto = styled.img`
  left: 0;
  position: relative;
  top: 0;
  width: 100%;
`

class Cover extends Component {
  startDrag = false
  startPosition = 0

  onMouseDown = (e) => {
    this.startDrag = true
    this.startPosition = e.pageY
  }
  
  onMouseMove = (e) => {
    if (this.startDrag) {
      const change_y = (e.pageY - this.startPosition) / 8
      const current_y = findDOMNode(this.cover).getBoundingClientRect().top - 60
      const current_hight = findDOMNode(this.cover).getBoundingClientRect().height
      let new_y = current_y + change_y
      
      if (new_y > 0) new_y = 0
      if (new_y < 403.5 - current_hight) new_y = 403.5 - current_hight

      console.log(new_y)

      findDOMNode(this.cover).style.top = `${new_y}px`
    }
  }
  
  onMouseUp = (e) => {
    this.startDrag = false
  }
  render () {
    return (
      <Wrapper>
        <CoverPhoto
          src='https://source.unsplash.com/random'
          draggable={false}
          innerRef={c => this.cover = c}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
        />
        <input type='file' ref='file' style={{display: 'none'}}/>
      </Wrapper>
    )
  }
}

export default Cover