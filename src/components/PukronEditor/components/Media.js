import React, { Component } from 'react'
import styled from 'styled-components'
import { getVisibleSelectionRect } from 'draft-js'

const Wrapper = styled.div`
  display: flex;
  left: 10%;
  position: absolute;
  top: 87px;
`

const Button = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #444;
  border-radius: 50%;
  display: flex;
  height: 30px;
  justify-content: center;
  width: 30px;

  &::after {
    content: '+';
  }
`

const Menu = styled.div`
  background-color: tomato;
`

const Item = styled.i`

`

class Media extends Component {

  state = {
    collapse: false,
    position: {}
  }

  componentWillMount = () => {
    document.addEventListener('selectionchange', this.handleSelectionChange)
  }

  handleSelectionChange = () => {
    setTimeout(() => {
      const { editorState } = this.props
      const selectionState = editorState.getSelection()
      const key = selectionState.getStartKey()
      const selectedElement = document.querySelector(`div[data-offset-key='${key}-0-0']`)
      const rect = selectedElement.getBoundingClientRect()
      const position = {
        top: rect.top
      }
      this.setState({ position })
    }, 300) 
  }

  getStyle = () => {
    const { editorState } = this.props
    const { position } = this.state
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const contentBlock = contentState.getBlockForKey(selectionState.getStartKey())
    const isVisible = contentBlock.getText() === ''
    const style = {...position}
    
    if (isVisible) {
      style.visibility = 'visible'
    } else {
      style.visibility = 'hidden'
    }
 
    return style
  }
    
  onMouseUp = (e) => {
    e.preventDefault()
  }

  render () {
    return (
      <Wrapper
        style={this.getStyle()}
      >
        <Button
          onMouseUp={this.onMouseUp}
        />
        <Menu>
          <Item className='fal fa-image'/>
        </Menu>  
      </Wrapper>
    )
  }
}

export default Media