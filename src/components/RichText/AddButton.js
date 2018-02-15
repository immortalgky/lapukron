import React, { Component } from 'react'
import styled from 'styled-components'

const Button = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #777;
  border-radius: 50%;
  display: flex;
  font-size: 2rem;
  font-weight: 100;
  height: 35px;
  justify-content: center;
  left: -50px;
  position: relative;
  width: 35px;

  &::after {
    content: '+';
    transition: 0.5s;
  }

  &.expanded::after {
    transform: rotate(45deg);
  }
`
const Tools = styled.div`
  display: flex;
  height: 100%;
  left: 50%;
  position: absolute;
  opacity: 0;
  width: 0;

  ${Button}.expanded & {
    opacity: 1;
    width: 80vw;
  }
`
const Item = styled(Button)`
  font-family: 'Font Awesome 5 Pro';
  font-size: 1rem;
  font-weight: 100;
  left: 0;
  margin: 0 1px;
  transform: scale(0);
  transition: 0.5s;
  
  &::after {
    content: '${props => props.content}';
  }
  &:nth-of-type(1) {
    margin-left: 1.5rem;
  }

  ${Button}.expanded & {
    transform: scale(0.85);
  }
`
const itemList = [
  {key: 'image', content: '\f03e'},
  {key: 'Unsplash', content: '\f030'},
  {key: 'Video', content: '\f03d'},
  {key: 'Part', content: '\f141'},
  {key: 'Quote', content: '\f10d'}
]

class AddButton extends Component {
  state = {
    collapse: true
  }

  handleButtonOnClick = () => {
    this.setState(prevState => ({collapse: !prevState.collapse}))
  }

  handleAddBlockOnClick = (type) => {
    return (e) => {
      switch (type) {
        case 'image':
          return this.handleImageUpload()

        case 'Unsplash':
          return false 
          
        case 'Video':
          return false

        case 'Part':
          return false
        
        case 'Quote':
          return false

        default:
          return false
      }
    }
  }

  handleImageUpload = () => {
    const event = new MouseEvent('click')
    this.refs.file.dispatchEvent(event)
    this.props.addNewBlock('text')
  }

  render () {
    const { collapse } = this.state
    return (
      <Button className={collapse ? null : 'expanded'} onClick={this.handleButtonOnClick}>
        <Tools>
          {itemList.map(i => <Item key={i.key} content={i.content} onClick={this.handleAddBlockOnClick(i.key)}/>)}
        </Tools>
        <input ref='file' type='file' style={{display: 'none'}}/>
      </Button>
    )
  }
}

export default AddButton