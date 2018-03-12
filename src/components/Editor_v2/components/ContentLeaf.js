import React, { Component } from 'react'
import ContentTextNode from './ContentTextNode'

class ContentLeaf extends Component {
  render () {
    const { id, text, inlineStyle } = this.props

    return (
      <span data-key={id}>
        <ContentTextNode
            id={id}
        >
          {text}
        </ContentTextNode>
      </span>
    )
  }
}

export default ContentLeaf