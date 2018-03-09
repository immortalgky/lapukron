import React, { Component } from 'react'
import styled from 'styled-components'

const Bubble = styled.div`
  align-items: center;
  background-color: #222;
  border: none;
  border-radius: 5px;
  color: white;
  display: flex;
  height: 30px;
  justify-content: center;
  left: ${props => props.x}px;
  position: absolute;
  top: ${props => props.y}px;
  width: 200px;

  &::after {
    border: 10px solid transparent;
    border-top-color: #222;
    bottom: -20px;
    content: ''; 
    left: calc(50% - 10px);
    position: absolute;
  }

  div {
    margin: 0 5px;
  }

  .hr {
    color: grey;
  }
`

class Tooltip extends Component {

  onMouseDown = (type) => {
    return (e) => {
      e.preventDefault()

      switch (type) {
        case 'bold':
          document.execCommand('bold', false)
          break
        case 'italic':
          document.execCommand('italic', false)
          break
        case 'h1':
          document.execCommand('formatBlock', false, 'H1')
          break
        case 'h2':
          document.execCommand('formatBlock', false, 'H2')
          break
        case 'quote':
          document.execCommand('formatBlock', false, 'BLOCKQUOTE')
          break
      }
    }
    
    

  
  }  

  render () {
    const { id, show, x, y } = this.props

    return (
      show
        ? <Bubble x={x} y={y}>
            <div onMouseDown={this.onMouseDown('bold')}>
              <i class="fas fa-bold"/>
            </div>
            <div onMouseDown={this.onMouseDown('italic')}>
              <i class="fas fa-italic"/>
            </div>
            <div className='hr'>|</div>
            <div onMouseDown={this.onMouseDown('h1')}>
              <i class="fas fa-h1"/>
            </div>
            <div onMouseDown={this.onMouseDown('h2')}>
              <i class="fas fa-h2"/>
            </div>
            <div className='hr'>|</div>
            <div onMouseDown={this.onMouseDown('quote')}>
              <i class="fas fa-quote-left"/>
            </div>
          </Bubble>
        : null
    )
  }
}

export default Tooltip