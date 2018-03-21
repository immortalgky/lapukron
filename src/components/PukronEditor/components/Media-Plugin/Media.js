import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import ImageButton from './components/ImageButton'
import UnsplashButton from './components/UnsplashButton'
import YoutubeButton from './components/YoutubeButton'
import NewPartButton from './components/NewPartButton'
import {EditorState, AtomicBlockUtils, getVisibleSelectionRect} from 'draft-js'


const Wrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  left: -40px;
  position: absolute;
  top: 0;
  z-index: 98;
`
const Button = styled.div`
  background-color: white;
  border: 2px solid #444;
  border-radius: 50%;
  font-size: 1.5rem;
  height: 30px;
  width: 30px;

  &::after {
    content: '+';
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`
const Menu = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 0.5rem;
`
const Item = styled.div`
  align-items: center;
  background-color: white;
  border: 2px solid #444;
  border-radius: 50%;
  display: flex;
  height: 30px;
  justify-content: center;
  margin: 0 1px;
  width: 30px;
`
const defaultStructure = [
  ImageButton,
  UnsplashButton,
  YoutubeButton,
  NewPartButton
]
class Media extends Component {

  state = {
    collapse: true,
    position: {},
    structure: this.props.structure || defaultStructure
  }

  componentWillMount = () => {
    this.props.store.register('editorState', this.handleSelectionChange)
  }

  componentWillReceiveProps = () => {
    this.setState({ collapse: true })
  }

  componentWillUnmount = () => {
    this.props.store.unregister('editorState', this.handleSelectionChange)
  }

  handleSelectionChange = () => {
    setTimeout(() => {
      const editorState = this.props.store.get('getEditorState')()
      const selectionState = editorState.getSelection()
      const key = selectionState.getStartKey()
      const selectedElement = document.querySelector(`[data-offset-key='${key}-0-0']`)
      if (!selectedElement) return 
      const rect = selectedElement.getBoundingClientRect()
      const editorParent = findDOMNode(this.props.store.get('getEditorRef')().refs.editor).parentNode
      const position = {
        top: rect.top - editorParent.getBoundingClientRect().top
      }
     
      this.setState({ position })
    }) 
  }

  getStyle = () => {
    const editorState = this.props.store.get('getEditorState')()
    const { position } = this.state
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const contentBlock = contentState.getBlockForKey(selectionState.getStartKey())
    const isVisible = contentBlock.getText() === ''
    const style = { ...position }
    
    if (isVisible) {
      style.visibility = 'visible'
    } else {
      style.visibility = 'hidden'
    }
 
    return style
  }
    
  buttonStyle = () => {
    const { collapse } = this.state
    const style = {}

    if (!collapse) {
      style.transition = '0.5s'
      style.transform = 'rotate(45deg)'
    } else {
      style.transition = '0.5s'
      style.transform = 'rotate(0deg)'
    }

    return style
  }

  menuStyle = () => {
    const { collapse } = this.state
    const style = {}
    
    if (collapse) {
      style.display = 'none'
    } else {
      style.display = 'flex'
    }

    return style
  }

  onButtonMouseUp = (e) => {
    e.preventDefault()
    this.setState(prevState => ({ collapse: !prevState.collapse }))
  }

  render () {
    return (
      <Wrapper
        style={this.getStyle()}
      >
        <Button
          style={this.buttonStyle()}
          onMouseUp={this.onButtonMouseUp}
        />
        <Menu
          style={this.menuStyle()}
        >
          {
            this.state.structure.map(Button => 
              <Item>
                <Button store={this.props.store}/>
              </Item>
            )
          }
        </Menu>  
      </Wrapper>
    )
  }
}

export default Media