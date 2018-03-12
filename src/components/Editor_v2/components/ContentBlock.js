import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import ContentLeaf from './ContentLeaf'

class ContentBlock extends Component {
  componentDidMount = () => {
    const { contentState } = this.props 
    
    if (contentState.isSelected) {
      document.querySelector('#editor').focus()
      const willBeFocusedNode = document.querySelector(`span[data-key='${contentState.id}']`).firstChild
      
      if (willBeFocusedNode.firstChild) {
        window.getSelection().collapse(willBeFocusedNode.firstChild, willBeFocusedNode.firstChild.textContent.length)
      } else {
        window.getSelection().collapse(willBeFocusedNode, 0)
      }
    }
  }
 
  render () {
    const { contentState } = this.props
    const Tag = contentState.type.toLowerCase()

    return (
      <Tag
        data-key={contentState.id}
      >
        <ContentLeaf
          id={contentState.id}
          text={contentState.text}
          inlineStyle={contentState.inlineStyle}
        />
      </Tag>
    )
  }
}

export default ContentBlock