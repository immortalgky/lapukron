import React, { Component } from 'react'
import styled from 'styled-components'
import Add from './Add'
import Cover from './Cover'
import Text from './Text'

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
      case 'text': 
        return <Text {...this.props} getKey={this.getKey}/>
      case 'cover':
        return <Cover {...this.props} getKey={this.getKey}/>
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

        <AddBar>
          <Add {...this.props} getKey={this.getKey}/>
        </AddBar>
      </div>
    )
  }
}

export default Editor