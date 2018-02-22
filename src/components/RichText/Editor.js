import React, { Component } from 'react'
import styled from 'styled-components'
import Add from './Add'
import Title from './Title'
import ImageLoader from './ImageLoader'
import Text from './Text'
import Part from './Part'

const AddBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 5px 0;
`

class Editor extends Component {

  renderEditor = () => {
    switch (this.props.editorState.type) {
      case 'title':
        return <Title {...this.props} getKey={this.getKey}/>
      case 'text': 
        return <Text {...this.props} getKey={this.getKey}/>
      case 'image':
        return <ImageLoader {...this.props} getKey={this.getKey}/>
      case 'part':
        return <Part {...this.props} getKey={this.getKey}/>
      default:
        return null
    }
  }

  getKey = () => {
    const key = this.props.id.replace('item-', '')
    return parseInt(key)
  } 

  render () {
    return (
      <div>
        {this.renderEditor()}

        {this.getKey() !== 0 &&
          <AddBar>
            <Add {...this.props} getKey={this.getKey}/>
          </AddBar>
        }

      </div>
    )
  }
}

export default Editor