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

  onClick = (e) => {
    e.preventDefault()
    document.execCommand('foreColor', false, 'red')
    
    // const sel = window.getSelection()
    // const range = document.createRange()

    // range.setStart(sel.baseNode, sel.baseOffset)
    // range.setEnd(sel.extentNode, sel.extentOffset)
    // const strong = document.createElement('strong')
    // range.surroundContents(strong)

  
  }  

  render () {
    const { id, show, x, y } = this.props

    return (
      show
        ? <Bubble x={x} y={y}>
            <div onMouseDown={this.onClick}>
              <i class="fas fa-bold"/>
            </div>
            <div>
              <i class="fas fa-italic"/>
            </div>
            <div className='hr'>|</div>
            <div>
              <i class="fas fa-h1"/>
            </div>
            <div>
              <i class="fas fa-h2"/>
            </div>
            <div className='hr'>|</div>
            <div>
              <i class="fas fa-quote-left"/>
            </div>
          </Bubble>
        : null
    )
  }
}

export default Tooltip