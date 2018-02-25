import React, { Component } from 'react'
import styled from 'styled-components'
import EditorState from '../EditorState' 
import * as Helper from '../Helper'

const Circle = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 50%;
  display: flex;
  height: 20px;
  justify-content: center;
  position: relative;
  width: 20px;

  &::before {
    content: '+';
    transition: 0.5s;
  }

  &.expanded::before {
    transform: rotate(45deg);
  }
`

const MenuBar = styled.div`
  display: flex;
  font-family: 'Font Awesome 5 Pro';
  font-weight: 100;
  height: 30px;
  opacity: 0;
  position: absolute;
  top: -40px;
  transition: 0.5s;
  z-index: -1;

  ${Circle}.expanded & {
    opacity: 1;
    z-index: 0;
  }
`

const Menu = styled(Circle)`
  height: 30px;
  margin: 0 3px;
  width: 30px;
  
  &::before {
    ${props => props.image && `
      content: '\f03e';
    `}
    ${props => props.unsplash && `
      content: '\f030';
      font-weight: 900;
    `}
    ${props => props.para && `
      content: '\f039';
    `}
    ${props => props.part && `
      content: '\f141';
    `}
    ${props => props.map && `
      content: '\f3c5';
      font-weight: 900;
    `}
  }
`

class Add extends Component {

  onClick = () => {
    const classList = Array.from(this.add.classList)

    if (classList.includes('expanded')) {
      this.add.classList.remove('expanded')
    } else {
      this.add.classList.add('expanded')
    }
  }

  handleImageUpload = () => {
    const { id, editorStates, onChange } = this.props
    const newEditorStates = EditorState.changeEditorState(editorStates, EditorState.createImage(), 'ADD', Helper.getContentKey(id) + 1)
    onChange(newEditorStates)
  }

  handleUnsplashSelect = () => {

  }

  handleAddParagraph = () => {
    const { id, editorStates, onChange } = this.props
    const newEditorStates = EditorState.changeEditorState(editorStates, EditorState.createText(), 'ADD', Helper.getContentKey(id) + 1)
    onChange(newEditorStates)
  }
 
  handleAddNewPart = () => {
    const { id, editorStates, onChange } = this.props
    const newEditorStates = EditorState.changeEditorState(editorStates, EditorState.createPart(), 'ADD', Helper.getContentKey(id) + 1)
    onChange(newEditorStates)
  }
  
  render () {
    return (
      <Circle 
        innerRef={c => this.add = c} 
        onClick={this.onClick}
      >
        <MenuBar>
          <Menu image alt='image' title='Add an image' onClick={this.handleImageUpload}/>
          <Menu unsplash alt='unsplash' title='Add an image from Unsplash' onClick={this.handleUnsplashSelect}/>
          <Menu para alt='paragraph' title='Add a paragraph' onClick={this.handleAddParagraph}/>
          <Menu map alt='map' title='Add a Google map' onClick={this.handleAddNewPart}/>
          <Menu part alt='part' title='Add a new part' onClick={this.handleAddNewPart}/>
        </MenuBar>
      </Circle>
    )
  }
}

export default Add