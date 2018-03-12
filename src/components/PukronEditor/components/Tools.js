import React, { Component } from 'react'
import styled from 'styled-components'
import { getVisibleSelectionRect } from 'draft-js'

const availableMenu = [
  {type: 'style', label: 'Bold', value: 'BOLD', icon: 'fas fa-bold'},
  {type: 'style', label: 'Italic', value: 'ITALIC', icon: 'fas fa-italic'},
  {type: 'block', label: 'H1', value: 'header-one', icon: 'fas fa-h1'},
  {type: 'block', label: 'H2', value: 'header-two', icon: 'fas fa-h2'},
  {type: 'block', label: 'Quote', value: 'blockquote', icon: 'fas fa-quote-left'},
  {type: 'entity', label: 'Link', value: 'LINK', icon: 'fas fa-link'}
] 

const Bubble = styled.div`
  align-items: center;
  background-color: #444;
  border-radius: 5px;
  display: flex;
  height: 35px;
  justify-content: center;
  position: absolute;
  width: 250px;
  z-index: 98;

  &::after {
    border: 5px solid;
    border-color: #444 transparent transparent transparent;
    bottom: -10px;
    content: '';
    position: absolute;
  }
`

const Item = styled.div`
  color: ${props => {
    if (props.active) return 'tomato;'
    return 'white;'
  }};
  cursor: pointer;
  padding: 0.5rem;
`

class Tools extends Component {
  
  state = {
    position: {}
  }

  componentWillMount = () => {
    document.addEventListener('selectionchange', this.handleSelectionChange)
  }

  componentWillUnmount = () => {
    document.removeEventListener('selectionchange', this.handleSelectionChange)
  }

  

  handleSelectionChange = () => {
    setTimeout(() => {
      const selectionRect = getVisibleSelectionRect(window)
 
      if (!selectionRect) return

      const position = {
        top: selectionRect.top - 40,
        left: selectionRect.left + selectionRect.width/2,
      }

      this.setState({ position })

    }, 0)
  }

  getMouseDownEvent = (type, value) => {
    const { toggleInlineStyle, toggleBlockType, toggleLink } = this.props
    switch (type) {
      case 'style':
        return toggleInlineStyle(value)
      case 'block':
        return toggleBlockType(value)
      case 'entity':
        return toggleLink()
    }
  }
  
  getActiveStatus = (editorState, value) => {
    const currentContent = editorState.getCurrentContent()
    const blockKey = editorState.getSelection().getStartKey()
    const currentBlock = currentContent.getBlockForKey(blockKey)
    const blockType = currentBlock.getType()
    const currentInlineStyle = editorState.getCurrentInlineStyle()
  
    return currentInlineStyle.has(value) || blockType === value
  }

  getStyle = () => {
    const { editorState } = this.props
    const { position } = this.state
    const realSelection = window.getSelection()
    const fakeSelection = editorState.getSelection()
    const realCollapsed = realSelection.isCollapsed
    const fakeCollapsed = fakeSelection.isCollapsed() 
    const hasFocus = fakeSelection.hasFocus
    const isVisible = !fakeCollapsed && hasFocus && !realCollapsed
    const style = {...position}

    if (isVisible) {
      style.visibility = 'visible'
      style.transform = 'translate(-50%) scale(1)'
      style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)'
    } else {
      style.transform = 'translate(-50%) scale(0)'
      style.visibility = 'hidden'
    }

    return style
  } 

  render () {
    const { editorState } = this.props
    const { position } = this.state

    return (
      <Bubble 
        style={this.getStyle()}
      >
        {availableMenu.map(menu => {
          return (
            <Item 
              active={this.getActiveStatus(editorState, menu.value)}
              onMouseDown={this.getMouseDownEvent(menu.type, menu.value)}
            >
              <i className={menu.icon}/>
            </Item>
          )
        })}
      </Bubble>
    )
  }
}

export default Tools