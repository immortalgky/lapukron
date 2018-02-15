import React, { Component } from 'react'
import ReactDom, { findDOMNode } from 'react-dom'
import Wrapper from './Wrapper'
import Add from './Add'
import Menu from './Menu'
import Container from './Container'
import UIText from '../../components/UIText/'
import { TextInputCenter } from '../../components/TextInput/'
import RichText from '../../components/RichText/'

class AddPage extends Component {
  getElementContainer = (element) => {
    let selectedElement = findDOMNode(element)

    // Find the container of selectedElement
    while (selectedElement.parentNode !== this.refs.content) {
      selectedElement = selectedElement.parentNode
    }

    return selectedElement
  }
  getInnerElement = (element) => {
    let selectedElement = element

    // Find inner element of selectedElement
    while (selectedElement.children[0]) {
      selectedElement = selectedElement.children[0]
    }
    
    return selectedElement
  }
  handleAddUIText = (position, element) => {
    const div = document.createElement('div')
    // insert div to content container
    if (position === 'before') {
      this.refs.content.insertBefore(div, this.getElementContainer(element))
    } else if (position === 'after') {
      this.refs.content.insertBefore(div, this.getElementContainer(element).nextSibling)
    }
    // render to div
    ReactDom.render(<UIText onPressEnter={this.handleAddUIText} onPressDelete={this.handleDeleteUIText}/>, div)
  }
  handleDeleteUIText = (element) => {
    // Cannot delete if have only 1 element
    if (this.refs.content.lastChild !== this.refs.content.firstChild) {
      const elementToBeDeleted = this.getElementContainer(element)
      const elementToBeFocused = elementToBeDeleted.previousSibling ? this.getInnerElement(elementToBeDeleted.previousSibling) : this.getInnerElement(elementToBeDeleted.nextSibling)
      
      // Delete the element
      this.refs.content.removeChild(elementToBeDeleted)
      // Focus to previous element
      if (elementToBeFocused.innerHTML.length === 0) {
        elementToBeFocused.focus()
      } else {
        const length = elementToBeFocused.firstChild.length
        elementToBeFocused.focus()
        if (document.selection) {
          // IE < 9
          let sel = document.selection.createRange()
          sel.moveStart('character', length)
          sel.select()
        } else {
          // Else and other browser
          let sel = window.getSelection()
          sel.collapse(elementToBeFocused.firstChild, length)
        }
      }
    }
  }
  render () {    

    return <Wrapper><RichText/></Wrapper>


    return (
      <Wrapper>
        <TextInputCenter type='text' size='3rem' placeholder='Title'/>
        <div className='cover' title='Cover'/>
        <div ref='content' className='content'>
          <div>
            <UIText onPressEnter={this.handleAddUIText} onPressDelete={this.handleDeleteUIText} placeholder='Tell your story...'/>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default AddPage