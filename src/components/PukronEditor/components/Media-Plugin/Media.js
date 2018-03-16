import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import styled from 'styled-components'
import {EditorState, AtomicBlockUtils, getVisibleSelectionRect} from 'draft-js'
import Modal from '../../../Modal/'
import UnsplashPicker from '../Unsplash'

const Wrapper = styled.div`
  display: flex;
  left: -40px;
  position: absolute;
  top: 0;
  z-index: 99;
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
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 0.5rem;
`

const Item = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid #444;
  border-radius: 50%;
  display: flex;
  height: 30px;
  justify-content: center;
  margin: 0 1px;
  width: 30px;
`

class Media extends Component {

  state = {
    collapse: true,
    position: {},
    unsplash: false
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
    const style = {...position}
    
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

  onItemMouseDown = (type) => {
    return (e) => {
      e.preventDefault()
      
      switch (type) {
        case 'PART':
          this.addMedia(type)
          break
        case 'UNSPLASH':
          // this.addMedia(type)
          this.setState({ unsplash: true })
          break
        default:
          this.refs.file.click()
          break
      }
    }
  }

  addMedia = (type, data) => {
    const editorState = this.props.store.get('getEditorState')()
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      type,
      'IMMUTABLE',
      data
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

    this.props.store.get('setEditorState')(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' '    
    ))

    this.setState({ collapse: true })
  }

  fileOnChange = () => {
    this.addMedia('IMAGE')
    this.refs.file.value = ''
  }

  getImageFromUnsplash = (image) => {
    return () => {
      this.setState({ unsplash: false }, this.addMedia('IMAGE', {url: image}))
    }
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
          <Item onMouseDown={this.onItemMouseDown('IMAGE')}><i className='fal fa-image'/></Item>
          <Item onMouseDown={this.onItemMouseDown('UNSPLASH')}><i className='fas fa-camera'/></Item>
          <Item onMouseDown={this.onItemMouseDown('VIDEO')}><i className='fal fa-play'/></Item>
          <Item onMouseDown={this.onItemMouseDown('PART')}><i className='fal fa-ellipsis-h'/></Item>
        </Menu>  
        <input ref='file' type='file' style={{display: 'none'}} onChange={this.fileOnChange}/>
        { 
          this.state.unsplash 
            ? <Modal 
                closeModal={() => this.setState({unsplash: false})}
              >
                <UnsplashPicker
                  getImage={this.getImageFromUnsplash}
                />
              </Modal> 
            : null 
        }
      </Wrapper>
    )
  }
}

export default Media