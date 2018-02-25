import React, { Component } from 'react'
import styled from 'styled-components'
import Add from './Add'
import Title from './Title'
import ImageLoader from './ImageLoader'
import Text from './Text'
import Part from './Part'
import Tooltip from './Tooltip'
import * as Helper from '../Helper'

const AddBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 5px 0;

  ${props => !props.show && `
    display: none;
  `}
`

class ContentBlock extends Component {

  renderEditor = () => {
    switch (this.props.editorState.type) {
      case 'image':
        return <ImageLoader {...this.props}/>
      case 'part':
        return <Part {...this.props}/>
      case 'text': 
        return <Text {...this.props}/>
      case 'title':
        return <Title {...this.props}/>
      default:
        return null
    }
  }

  render () {
    const { id, read_only, editorState } = this.props

    return (
      <div>
        {
          this.renderEditor()
        }
        <AddBar show={Helper.getContentKey(id) !== 0 && !read_only}>
          <Add {...this.props}/>
        </AddBar>
        <Tooltip id={id} {...editorState.tooltip}/>
      </div>
    )
  }
}

export default ContentBlock