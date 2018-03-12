import React, { Component } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'


class ContentTextNode extends Component {
//   shouldComponentUpdate = (nextProps) => {
//     return nextProps.children !== findDOMNode(this).textContent
//   }

  componentDidUpdate = () => {
    if (this.props.children !== findDOMNode(this).textContent) {
      findDOMNode(this).textContent = this.props.children

      // Force the focus to last char in case value changed by script
      window.getSelection().collapse(findDOMNode(this).firstChild, findDOMNode(this).firstChild.textContent.length)
    }
  }

  render () {
    const { id, children } = this.props 

    return (
      <span data-key={id}>
        {children}
        <br/>
      </span>
    )
  } 
}

export default ContentTextNode