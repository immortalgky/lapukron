import React, { Component } from 'react'
import styled from 'styled-components'

const Circle = styled.div`
  align-items: center;
  border: 1px solid grey;
  border-radius: 50%;
  display: flex;
  height: 20px;
  justify-content: center;
  position: relative;
  width: 20px;

  &::before {
    content: '+';
  }
`

const Menu = styled(Circle)`
  background-color: white;
  font-family: 'Font Awesome 5 Pro';
  font-weight: 100;
  height: 35px;
  opacity: 0;
  position: absolute;
  transform: scale(0);
  transition: 0.5s;
  width: 35px;
  z-index: -1;

  ${props => props.image && `
    top: -250%;

    &::before {
      content: '\f03e';
    }
  `}
  ${props => props.unsplash && `
    font-weight: 900;
    right: -250%;
    transition-delay: 0.1s;

    &::before {
      content: '\f030';
    }
  `}
  ${props => props.para && `
    bottom: -250%;
    transition-delay: 0.2s;

    &::before {
      content: '\f1dd';
    }
  `}
  ${props => props.part && `
    left: -250%;
    transition-delay: 0.3s;

    &::before {
      content: '\f141';
    }
  `}

  ${Circle}.expanded & {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }
`

class Add extends Component {

  componentDidMount = () => {
    this.refs.file.addEventListener('change', () => {
      
    })
  }

  onClick = () => {
    const classList = Array.from(this.add.classList)
    if (classList.includes('expanded')) {
      this.add.classList.remove('expanded')
    } else {
      this.add.classList.add('expanded')
    }
  }

  handleImageUpload = () => {
    const click = new MouseEvent('click')
    this.refs.file.dispatchEvent(click)
  }

  handleUnsplashSelect = () => {

  }

  handleAddParagraph = () => {
    this.props.addNewNodeAfter(this.props.getKey(), {type: 'text', html: ''})
  }

  

  render () {
    return (
      <Circle 
        innerRef={c => this.add = c} 
        onClick={this.onClick}
      >
        <Menu image alt='image' title='Add an image' onClick={this.handleImageUpload}/>
        <Menu unsplash alt='unsplash' title='Add an image from Unsplash' onClick={this.handleUnsplashSelect}/>
        <Menu para alt='paragraph' title='Add a paragraph' onClick={this.handleAddParagraph}/>
        <Menu part alt='part' title='Add a new part'/>

        <input ref='file' type='file' style={{display: 'none'}}/>

      </Circle>
    )
  }
}

export default Add